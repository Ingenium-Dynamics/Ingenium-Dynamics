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