//Efecto de suavizado en los enlaces de navegación:
$(document).ready(function(){
    $('a.nav-link').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 800);
    });
});



$(document).ready(function(){
    let i = 0;
    let txt = 'Soluciones Innovadoras de Desarrollo Web y Aplicaciones'; 
    let speed = 100;
    
    function typeWriter() {
        if (i < txt.length) {
            $('#hero h1').append(txt.charAt(i));
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});


//botones carrusel
$('.carousel-control-prev, .carousel-control-next').hover(
    function() {
        $(this).css('transform', 'scale(1.2)').css('color', '#FFD700');
    },
    function() {
        $(this).css('transform', 'scale(1)').css('color', '');
    }
);



//suavizado enlaces
$(document).ready(function(){
    $('a.nav-link').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 800);
    });
});


