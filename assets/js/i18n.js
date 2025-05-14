/**
 * Sistema de internacionalización para Ingenium Dynamics
 * Carga traducciones desde archivos JSON y permite cambiar dinámicamente el idioma
 */

// Objeto global para almacenar las traducciones
const I18N = {
  currentLanguage: 'es',
  translations: {},
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en', 'fr'],
  
  /**
   * Inicializa el sistema de internacionalización
   * @param {string} lang - Idioma a cargar (código de 2 letras)
   * @returns {Promise} - Promesa que se resuelve cuando se carga el idioma
   */
  init: function(lang = '') {
    // Determinar el idioma inicial
    if (!lang) {
      // Intentar detectar del navegador
      const browserLang = navigator.language.substring(0, 2);
      lang = this.supportedLanguages.includes(browserLang) ? browserLang : this.defaultLanguage;
      
      // Verificar si hay una preferencia guardada
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && this.supportedLanguages.includes(savedLang)) {
        lang = savedLang;
      }
      
      // Si la URL tiene un subfolder de idioma, usar ese
      const pathParts = window.location.pathname.split('/');
      for (const part of pathParts) {
        if (this.supportedLanguages.includes(part)) {
          lang = part;
          break;
        }
      }
    }

    // Guardar el idioma seleccionado
    this.currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Cargar el archivo de traducción
    return this.loadLanguage(lang);
  },
  
  /**
   * Carga un archivo de idioma
   * @param {string} lang - Código del idioma a cargar
   * @returns {Promise} - Promesa que se resuelve cuando se carga el idioma
   */
  loadLanguage: function(lang) {
    return fetch(`/assets/locales/${lang}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar el idioma ${lang}`);
        }
        return response.json();
      })
      .then(data => {
        this.translations = data;
        this.applyTranslations();
        document.documentElement.setAttribute('lang', lang);
        
        // Actualizar metadatos según el idioma
        if (data.meta) {
          document.querySelector('meta[name="language"]').setAttribute('content', data.meta.language);
          document.querySelector('meta[http-equiv="content-language"]').setAttribute('content', data.meta.contentLanguage);
        }
        
        return data;
      })
      .catch(error => {
        console.error('Error cargando idioma:', error);
        // Si falla, intentar cargar el idioma por defecto
        if (lang !== this.defaultLanguage) {
          return this.loadLanguage(this.defaultLanguage);
        }
      });
  },
  
  /**
   * Cambia el idioma de la aplicación
   * @param {string} lang - Código del idioma a establecer
   * @returns {Promise} - Promesa que se resuelve cuando se cambia el idioma
   */
  changeLanguage: function(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error(`Idioma no soportado: ${lang}`);
      return Promise.reject(`Idioma no soportado: ${lang}`);
    }
    
    this.currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Si estamos en una página con estructura de carpetas por idioma,
    // redirigir a la versión correspondiente
    const currentPath = window.location.pathname;
    
    // Verificar si estamos en una ruta que incluye un idioma
    let shouldRedirect = false;
    let newPath = currentPath;
    
    for (const supportedLang of this.supportedLanguages) {
      const langPattern = new RegExp(`^/${supportedLang}/`);
      if (langPattern.test(currentPath)) {
        shouldRedirect = true;
        // Reemplazar el idioma en la ruta
        newPath = currentPath.replace(langPattern, `/${lang}/`);
        break;
      }
    }
    
    // Si estamos en la raíz y el nuevo idioma no es el predeterminado, redirigir
    if (!shouldRedirect && !currentPath.includes('/') && lang !== this.defaultLanguage) {
      const pageName = currentPath.split('/').pop() || 'index.html';
      newPath = `/${lang}/${pageName}`;
      shouldRedirect = true;
    }
    
    if (shouldRedirect) {
      window.location.href = newPath;
      return Promise.resolve();
    }
    
    // Si no hay redirección, cargar el idioma y aplicar traducciones
    return this.loadLanguage(lang);
  },
  
  /**
   * Aplica las traducciones a todos los elementos con el atributo data-i18n
   */
  applyTranslations: function() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.get(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
          element.placeholder = translation;
        } else if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // También podemos aplicar traducciones a atributos
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const data = element.getAttribute('data-i18n-attr').split(':');
      if (data.length === 2) {
        const attr = data[0];
        const key = data[1];
        const translation = this.get(key);
        
        if (translation) {
          element.setAttribute(attr, translation);
        }
      }
    });
  },
  
  /**
   * Obtiene una traducción por su clave
   * @param {string} key - Clave de la traducción (formato: section.subsection.key)
   * @param {Object} params - Parámetros para interpolar en la traducción
   * @returns {string} - Texto traducido
   */
  get: function(key, params = {}) {
    // Dividir la clave en partes (por ejemplo, "contact.form.submit" => ["contact", "form", "submit"])
    const parts = key.split('.');
    
    // Navegar por el objeto de traducciones siguiendo la ruta de la clave
    let value = this.translations;
    for (const part of parts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        console.warn(`Clave de traducción no encontrada: ${key}`);
        return key; // Devolver la clave como fallback
      }
    }
    
    // Si el valor no es un string, no podemos usarlo como traducción
    if (typeof value !== 'string') {
      console.warn(`Valor de traducción no es una cadena: ${key}`);
      return key;
    }
    
    // Interpolar parámetros si los hay
    if (params && Object.keys(params).length > 0) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }
    
    return value;
  },
  
  /**
   * Genera un selector de idioma
   * @param {string} containerId - ID del elemento donde se insertará el selector
   */
  createLanguageSelector: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const langNames = {
      'es': 'Español',
      'en': 'English',
      'fr': 'Français'
    };
    
    let html = '<div class="language-selector">';
    
    this.supportedLanguages.forEach(lang => {
      const isActive = lang === this.currentLanguage ? 'active' : '';
      html += `<button class="lang-btn ${isActive}" data-lang="${lang}">${langNames[lang]}</button>`;
    });
    
    html += '</div>';
    
    container.innerHTML = html;
    
    // Agregar event listeners
    container.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        this.changeLanguage(lang);
      });
    });
  }
};

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  I18N.init().then(() => {
    // Crear selector de idioma si existe el contenedor
    if (document.getElementById('language-selector')) {
      I18N.createLanguageSelector('language-selector');
    }
  });
}); 