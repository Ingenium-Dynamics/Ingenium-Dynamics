document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleButton = document.getElementById("theme-checkbox");

  // Recuperar tema guardado
  const savedTheme = localStorage.getItem("theme") || "light-background";
  body.classList.add(savedTheme);

  toggleButton.addEventListener("click", () => {
    // Cambiar entre light y dark
    const isLight = body.classList.contains("light-background");
    const newTheme = isLight ? "dark-background" : "light-background";

    body.classList.remove("light-background", "dark-background");
    body.classList.add(newTheme);

    // Guardar la preferencia
    localStorage.setItem("theme", newTheme);
    toggleButton.textContent = isLight ? "Modo Oscuro" : "Modo Claro";
  });
});
