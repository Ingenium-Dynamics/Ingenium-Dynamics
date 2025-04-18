$(document).ready(function() {
    console.log("Script cargado"); // Verifica que el script se está ejecutando

    $(window).scroll(function() {
        $('.fade').each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).animate({ opacity: 1 }, 800);
            }
        });
    });
});

// Scripts ejecutados después de cargar el contenido

// Función para ajustar la altura del encabezado en la carga de la página
document.addEventListener("DOMContentLoaded", function() {
  // Ajustar el espacio para el encabezado en vista móvil
  function adjustPageTitlePadding() {
    if (window.innerWidth <= 768) {
      const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
      const pageTitle = document.querySelector('.page-title');
      if (pageTitle) {
        pageTitle.style.paddingTop = (headerHeight + 20) + 'px';
      }
      
      // Ajustar también la posición del head_text
      const headText = document.getElementById('head_text');
      if (headText) {
        headText.style.paddingTop = '15px';
      }
    }
  }
  
  // Ejecutar al cargar y cuando se redimensiona la ventana
  adjustPageTitlePadding();
  window.addEventListener('resize', adjustPageTitlePadding);
});