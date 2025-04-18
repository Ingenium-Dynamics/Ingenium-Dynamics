(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Ajusta espaciado en dispositivos móviles para evitar solapamientos
   */
  function adjustMobileSpacing() {
    // Solo ejecutar en dispositivos móviles
    if (window.innerWidth <= 768) {
      const header = document.querySelector('#header');
      const headText = document.querySelector('#head_text');
      const pageTitle = document.querySelector('.page-title');
      
      if (header) {
        const headerHeight = header.offsetHeight;
        
        // Ajustar espacio para head_text si existe
        if (headText) {
          headText.style.paddingTop = `${headerHeight + 20}px`;
        }
        
        // Ajustar espacio para page-title si existe
        if (pageTitle) {
          pageTitle.style.paddingTop = `${headerHeight + 40}px`;
        }
      }
    }
  }
  
  // Ejecutar en carga y redimensionamiento
  window.addEventListener('load', adjustMobileSpacing);
  window.addEventListener('resize', adjustMobileSpacing);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Maneja los clics en los botones de solicitar plan
   * Redirige al formulario de contacto con los parámetros necesarios
   */
  function initPlanRequestButtons() {
    // Selecciona todos los botones "Solicitar" independientemente de la estructura
    document.querySelectorAll('.buy-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        // Prevenir comportamiento predeterminado
        e.preventDefault();
        e.stopPropagation();
        
        // Obtener el nombre del plan del encabezado más cercano
        const planCard = this.closest('.pricing-card') || this.closest('.pricing-table');
        
        // Intentar obtener el título del plan - compatibilidad con diferentes estructuras
        let planTitle = "";
        if (planCard) {
          const h3Title = planCard.querySelector('.pricing-header h3');
          const h4Title = planCard.querySelector('.pricing-header h4');
          planTitle = (h3Title ? h3Title.textContent.trim() : (h4Title ? h4Title.textContent.trim() : ""));
        }
        
        // Determinar el departamento
        let departamento = "Web Development";
        
        // Determinar el asunto según el idioma de la página
        let asunto = "";
        const lang = document.documentElement.lang || 'es';
        
        if (lang === 'fr') {
          asunto = `Demande plan ${planTitle}`;
        } else if (lang === 'en') {
          asunto = `Request plan ${planTitle}`;
        } else {
          asunto = `Solicitud de Plan ${planTitle}`;
        }
        
        // Redirigir directamente a la página de contacto con los parámetros necesarios
        window.location.href = `contact.html?asunto=${encodeURIComponent(asunto)}&departamento=${encodeURIComponent(departamento)}`;
      });
    });
  }

  // Inicializar los botones de solicitud cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', initPlanRequestButtons);

})();