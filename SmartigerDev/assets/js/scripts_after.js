//fadein
/*$(document).ready(function(){
    $(window).scroll(function(){
        $('.fadeInUp').each(function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if(bottom_of_window > bottom_of_object){
                $(this).animate({'opacity':'1', 'margin-top':'0px'}, 600);
            }
        });
    });
});*/
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