function calcularCosto() {
  let costo = 0;

  // Agregar costos según selección
  if (document.getElementById("idioma1").checked) costo += 0;
  if (document.getElementById("idioma2").checked) costo += 15000;
  if (document.getElementById("idioma3").checked) costo += 28000;
  if (document.getElementById("idioma4").checked) costo += 42000;

  if (document.getElementById("dominio").checked) costo += 15000;
  if (document.getElementById("personal").checked) costo += 5000;

  if (document.getElementById("paginaContacto").checked) costo += 10000;

  if (document.getElementById("all_in_one").checked) costo += 100000;
  if (document.getElementById("multi_2").checked) costo += 150000;
  if (document.getElementById("multi_4").checked) costo += 200000;

  // Convertir según la moneda seleccionada
  const monedaSelect = document.getElementById("moneda");
  const tasaCambio = parseFloat(
    monedaSelect.options[monedaSelect.selectedIndex].dataset.tasa
  );
  const moneda = monedaSelect.value.toUpperCase();
  const costoConvertido = (costo * tasaCambio).toFixed(0);

  // Mostrar el costo con la moneda
  document.getElementById(
    "resultado"
  ).textContent = `${costoConvertido} ${moneda}`;

  // Mostrar el costo
  //document.getElementById("resultado").textContent = `$${costo}`;
}

// Enviar formulario por email
document
  .getElementById("projectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    const seleccion = {
      idioma: formData.get("idioma"),
      cuenta: formData.get("cuenta"),
      paginaContacto: document.getElementById("paginaContacto").checked
        ? "Sí"
        : "No",
      estructura: formData.get("estructura"),
    };

    const emailBody = `
                Idioma seleccionado: ${seleccion.idioma}\n
                Tipo de cuenta: ${seleccion.cuenta}\n
                Página de contacto: ${seleccion.paginaContacto}\n
                Estructura del sitio: ${seleccion.estructura}\n
                Valor estimado: ${
                  document.getElementById("resultado").textContent
                }
            `;

    window.location.href = `mailto:francisco.monroy@gmail.com?subject=Solicitud de contacto&body=${encodeURIComponent(
      emailBody
    )}`;
  });
