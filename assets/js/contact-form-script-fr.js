// Configuración de AWS
const REGION = "us-east-1";
const IDENTITY_POOL_ID = "us-east-1:4cb32f41-9337-4954-83a1-214f3ead6d6d";
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:183295419448:Topic_ContactForm_ID_es_WI_01"; /*pestaña web informativa*/
const SNS_TOPIC_02_ARN = "arn:aws:sns:us-east-1:183295419448:Topic_ContactForm_ID_es_EC_02"; /*pestaña de e-commerce*/
const SNS_TOPIC_03_ARN = "arn:aws:sns:us-east-1:183295419448:Topic_ContactForm_ID_es_CG_03"; /*pestaña de consultas generales*/

// Configurar AWS SDK
AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
});

// Crear el cliente SNS
const sns = new AWS.SNS();

// Función para enviar el mensaje a SNS con tópico específico
function sendMessageToSNS(name, email, message, additionalData = {}, topicArn = SNS_TOPIC_ARN) {
    // Preparar el mensaje base
    let messageContent = `Nouveau message de contact:\nNom: ${name}\nEmail: ${email}\nMessage: ${message}`;
    
    // Agregar datos adicionales si existen
    if (Object.keys(additionalData).length > 0) {
        Object.entries(additionalData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Si es un array (como checkboxes seleccionados)
                messageContent += `\n${key}: ${value.join(', ')}`;
            } else if (value) {
                // Solo incluir si tiene valor
                messageContent += `\n${key}: ${value}`;
            }
        });
    }
    
    // Depuración: Mostrar información del mensaje a enviar
    console.log(`Envoi du message à SNS: Sujet ${topicArn}`);
    console.log(`Données à envoyer: Nom=${name}, Email=${email}`);
    
    const params = {
        Message: messageContent,
        TopicArn: topicArn
    };

    return new Promise((resolve, reject) => {
        sns.publish(params, function(err, data) {
            if (err) {
                console.error("Erreur lors de l'envoi du message:", err);
                reject(err);
            } else {
                console.log("Message envoyé avec succès:", data.MessageId);
                resolve(data);
            }
        });
    });
}

// Función para validar el formulario
function validateForm(name, email, message) {
    if (!name || !email || !message) {
        return { valid: false, message: "Veuillez remplir tous les champs." };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return { valid: false, message: "Veuillez entrer un email valide." };
    }
    return { valid: true };
}

// Función para mostrar mensajes
function showMessage(text, type, formContainer) {
    // Buscar o crear el elemento para mostrar mensajes
    let alertMsg = formContainer.querySelector('.alert-msg');
    
    if (!alertMsg) {
        alertMsg = document.createElement('div');
        alertMsg.className = 'alert-msg mt-3 alert';
        formContainer.appendChild(alertMsg);
    }
    
    alertMsg.textContent = text;
    alertMsg.className = 'alert-msg mt-3 alert ' + (type === 'error' ? 'alert-danger' : 'alert-success');
    alertMsg.style.display = 'block';
    
    // Hacer scroll al mensaje
    alertMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Implementar rate limiting
const RATE_LIMIT = 3; // Número máximo de envíos permitidos
const TIME_WINDOW = 3600000; // Ventana de tiempo en milisegundos (1 hora)

function checkRateLimit() {
    const now = Date.now();
    let rateData = JSON.parse(localStorage.getItem('rateLimitData')) || { count: 0, timestamp: now };

    if (now - rateData.timestamp > TIME_WINDOW) {
        rateData = { count: 0, timestamp: now };
    }

    if (rateData.count >= RATE_LIMIT) {
        return { allowed: false, message: "Vous avez dépassé la limite d'envois. Veuillez réessayer plus tard." };
    }

    rateData.count++;
    localStorage.setItem('rateLimitData', JSON.stringify(rateData));
    return { allowed: true };
}

// Función para recolectar datos de cualquier formulario
function collectFormData(form) {
    const formData = {};
    
    // Recopilar inputs, excluyendo campos relacionados con captcha
    form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), textarea, select').forEach(input => {
        if (input.name && input.value.trim() && 
            input.name !== 'h-captcha-response' && 
            input.name !== 'g-recaptcha-response' &&
            !input.name.includes('captcha')) {
            formData[input.name] = input.value.trim();
        }
    });
    
    // Recopilar checkboxes agrupados por nombre
    const checkboxGroups = {};
    form.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (checkbox.name && checkbox.value) {
            // Si el nombre termina con [], es un array
            const name = checkbox.name.replace('[]', '');
            if (!checkboxGroups[name]) {
                checkboxGroups[name] = [];
            }
            checkboxGroups[name].push(checkbox.value);
        }
    });
    
    // Agregar los grupos de checkboxes al formData
    Object.entries(checkboxGroups).forEach(([name, values]) => {
        formData[name] = values;
    });
    
    // Recopilar radio buttons
    form.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
        if (radio.name && radio.value) {
            formData[radio.name] = radio.value;
        }
    });
    
    return formData;
}

// Manejar el envío de los formularios
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los formularios de las pestañas
    const forms = document.querySelectorAll('.tab-pane form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Verificar captcha - Método mejorado para obtener el valor de hCaptcha
            let hcaptchaResponse = '';
            try {
                // Primero, intentar obtener el token desde el API global de hCaptcha
                if (window.hcaptcha) {
                    hcaptchaResponse = window.hcaptcha.getResponse();
                }
                
                // Si no se obtiene de la primera forma, buscar un campo oculto que podría tener el token
                if (!hcaptchaResponse) {
                    const captchaInput = this.querySelector('input[name="h-captcha-response"]');
                    if (captchaInput && captchaInput.value) {
                        hcaptchaResponse = captchaInput.value;
                    }
                }
                
                // Si aún no hay token, buscar el campo generado automáticamente por hCaptcha
                if (!hcaptchaResponse) {
                    const captchaTextarea = document.querySelector('textarea[name="h-captcha-response"]');
                    if (captchaTextarea && captchaTextarea.value) {
                        hcaptchaResponse = captchaTextarea.value;
                    }
                }
                
                // Verificación adicional: buscar en todos los iframes de hCaptcha
                if (!hcaptchaResponse) {
                    const captchaIframe = this.querySelector('.h-captcha iframe');
                    if (captchaIframe) {
                        console.log("Iframe hCaptcha trouvé, mais impossible d'obtenir le token directement");
                    }
                }
                
                console.log("État du captcha:", hcaptchaResponse ? "Token obtenu" : "Impossible d'obtenir le token");
            } catch (error) {
                console.error("Erreur lors de la vérification du hCaptcha:", error);
            }
            
            if (!hcaptchaResponse) {
                showMessage("Veuillez compléter le captcha avant d'envoyer le formulaire", "error", this);
                return;
            }
            
            // Verificar el límite de envíos
            const rateLimitCheck = checkRateLimit();
            if (!rateLimitCheck.allowed) {
                showMessage(rateLimitCheck.message, 'error', this);
                return;
            }
            
            // Obtener datos básicos del formulario
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            // Validar datos básicos
            const validation = validateForm(name, email, message);
            if (!validation.valid) {
                showMessage(validation.message, 'error', this);
                return;
            }
            
            // Obtener datos adicionales del formulario
            const formData = collectFormData(this);
            
            // Determinar qué pestaña está activa para seleccionar el tópico correcto
            let topicArn = SNS_TOPIC_ARN; // Por defecto, Web Informativa
            
            // Determinar a qué pestaña pertenece este formulario
            const tabPane = this.closest('.tab-pane');
            if (tabPane) {
                if (tabPane.id === 'ecomform') {
                    topicArn = SNS_TOPIC_02_ARN; // E-commerce
                } else if (tabPane.id === 'contactform') {
                    topicArn = SNS_TOPIC_03_ARN; // Consultas Generales
                }
            }
            
            // Preparar UI para el envío
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            try {
                // Eliminar datos duplicados de formData
                delete formData.name;
                delete formData.email;
                delete formData.message;
                
                // Eliminar cualquier token de captcha para no enviarlos por SNS
                delete formData.captchaToken;
                delete formData['h-captcha-response'];
                delete formData['g-recaptcha-response'];
                
                // Enviar el mensaje al tópico correspondiente
                await sendMessageToSNS(name, email, message, formData, topicArn);
                showMessage("Votre message a été envoyé avec succès. Merci!", "success", this);
                this.reset();
                
                // Restablecer estados de UI personalizados
                this.querySelectorAll('.btn-check:checked').forEach(input => {
                    input.checked = false;
                });
                
                this.querySelectorAll('.hosting-option input:checked, .payment-card input:checked').forEach(input => {
                    input.checked = false;
                });
                
                // Resetear completamente el formulario para eliminar la validación
                this.classList.remove('was-validated');
                
                // Restablecer el captcha
                if (window.hcaptcha) {
                    try {
                        window.hcaptcha.reset();
                        console.log("hCaptcha réinitialisé avec succès");
                    } catch (e) {
                        console.error("Erreur lors de la réinitialisation du hCaptcha:", e);
                    }
                }
                
                // También limpiar cualquier campo oculto relacionado con el captcha
                const hiddenCaptchaInputs = this.querySelectorAll('input[name="h-captcha-response"]');
                hiddenCaptchaInputs.forEach(input => {
                    input.value = '';
                });
                
                // Dar tiempo para que se complete la animación y luego ocultar cualquier alerta después de 5 segundos
                setTimeout(() => {
                    const alertMsg = this.querySelector('.alert-msg');
                    if (alertMsg) {
                        alertMsg.style.display = 'none';
                    }
                }, 5000);
            } catch (error) {
                console.error("Erreur lors du traitement du formulaire:", error);
                showMessage("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.", "error", this);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    });
    
    // Gestionar la visualización del campo de teléfono en el formulario de contacto general
    const contactPreferences = document.querySelectorAll('input[name="contactPreference"]');
    const phoneFieldContainer = document.getElementById('phoneFieldContainer');
    
    if (contactPreferences.length > 0 && phoneFieldContainer) {
        contactPreferences.forEach(pref => {
            pref.addEventListener('change', function() {
                // Mostrar el campo de teléfono si se selecciona teléfono o WhatsApp
                if (this.value === 'phone' || this.value === 'whatsapp') {
                    phoneFieldContainer.style.display = 'block';
                    const phoneInput = phoneFieldContainer.querySelector('input');
                    if (phoneInput) {
                        phoneInput.required = true;
                    }
                } else {
                    phoneFieldContainer.style.display = 'none';
                    const phoneInput = phoneFieldContainer.querySelector('input');
                    if (phoneInput) {
                        phoneInput.required = false;
                    }
                }
            });
        });
    }
    
    // Función para alternar la visibilidad del textarea de secciones adicionales
    window.toggleTextarea = function() {
        const checkbox = document.getElementById('paginasadicional');
        const container = document.getElementById('seccionesAdicionalesContainer');
        
        if (checkbox && container) {
            container.style.display = checkbox.checked ? 'block' : 'none';
        }
    };
    
    // Contador de caracteres para textareas con límite
    const textareasWithLimit = document.querySelectorAll('textarea[maxlength]');
    textareasWithLimit.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const charCountElement = this.parentElement.querySelector('[id$="charCount"]');
            if (charCountElement) {
                charCountElement.textContent = this.value.length;
            }
        });
    });
});