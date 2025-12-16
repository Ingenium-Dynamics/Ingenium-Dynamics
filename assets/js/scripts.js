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

// Rotate mobile images for Real Estate App
$(document).ready(function() {
    const images = [
        'assets/img/webapps/web_app_prop/wa_prop_mob_01.webp',
        'assets/img/webapps/web_app_prop/wa_prop_mob_02.webp',
        'assets/img/webapps/web_app_prop/wa_prop_mob_03.webp'
    ];
    let currentIndex = 0;
    const mobileImg = $('.mobile-view img');
    
    if(mobileImg.length) {
        setInterval(function() {
            currentIndex = (currentIndex + 1) % images.length;
            mobileImg.fadeOut(400, function() {
                $(this).attr('src', images[currentIndex]).fadeIn(400);
            });
        }, 3000);
    }
});
