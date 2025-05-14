/**
 * Script para cargar proyectos en la página de portafolio utilizando el sistema de internacionalización (i18n)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que el sistema i18n esté inicializado
  let checkI18nInterval = setInterval(function() {
    if (window.I18N && window.I18N.translations && window.I18N.translations.projects) {
      clearInterval(checkI18nInterval);
      loadProjects();
    }
  }, 100);
  
  // Si después de 3 segundos no se ha cargado i18n, usar datos locales
  setTimeout(function() {
    if (!window.I18N || !window.I18N.translations || !window.I18N.translations.projects) {
      clearInterval(checkI18nInterval);
      console.warn('No se pudo cargar el sistema i18n, usando datos locales');
      loadProjectsFromLocal();
    }
  }, 3000);
});

function loadProjects() {
  const projects = window.I18N.translations.projects;
  initializePortfolio(projects);
}

function loadProjectsFromLocal() {
  // Datos locales como fallback si i18n no está disponible
  const projects = [
    {
      id: 1,
      title: "Haras los Pellines",
      description:
        "Page d'atterrissage créée à l'aide de HTML, CSS, Bootstrap et JavaScript, avec un formulaire de contact implémenté à l'aide des technologies AWS.",
      images: [
        "../assets/img/portfolio/haras_los_pellines.webp",
        "../assets/img/portfolio/haras_los_pellines01.webp",
        "../assets/img/portfolio/haras_los_pellines02.webp",
      ],
      web: "https://haraslospellines.com",
    },
    {
      id: 2,
      title: "LanguageLife",
      description:
        "Page d'atterrissage multilingue pour l'Académie de Langues et d'Art, avec une section Galerie avec les peintures réalisées et un historique des expositions auxquelles ils ont participé.",
      images: [
        "../assets/img/portfolio/languagelife1.webp",
        "../assets/img/portfolio/languagelife2.webp",
        "../assets/img/portfolio/languagelife3.webp",
        "../assets/img/portfolio/languagelife4.webp",
      ],
      web: "https://www.languageartlife.com/fr/index.html",
    },
    {
      id: 3,
      title: "Psychologue Alex Oyarzún",
      description:
        "Page d'atterrissage professionnelle pour le psychologue Alex Oyazún. Il présente le professionnel, ses services et ses réseaux sociaux. Il n'est pas disponible dans certains pays à la demande du client.",
      images: [
        "../assets/img/portfolio/alexoyarzun1.webp",
        "../assets/img/portfolio/alexoyarzun2.webp",
        "../assets/img/portfolio/alexoyarzun3.webp",
      ],
      web: "https://www.psicologoalexoyarzun.com/",
    },
    {
      id: 4,
      title: "Nico Castro Photographie",
      description:
        "Page d'atterrissage professionnelle pour le photographe Nicolas Castro. Il présente le professionnel, ses services, ses réseaux sociaux et une partie de son travail.",
      images: [
        "../assets/img/portfolio/nicocastro1.webp",
        "../assets/img/portfolio/nicocastro2.webp",
        "../assets/img/portfolio/nicocastro3.webp",
      ],
      web: "https://dyw57mjcdz9b2.cloudfront.net/",
    },
    {
      id: 5,
      title: "Fidias Place",
      description:
        "Page d'atterrissage professionnelle pour une académie de danse, avec les détails de ses services et ses horaires.",
      images: [
        "../assets/img/portfolio/fidias1.webp",
        "../assets/img/portfolio/fidias2.webp",
        "../assets/img/portfolio/fidias3.webp",
        "../assets/img/portfolio/fidias4.webp",
      ],
      web: "https://ingenium-dynamics.github.io/fidias/index2.html",
    },
  ];
  
  initializePortfolio(projects);
}

function initializePortfolio(projects) {
  // Añadir event listeners para los proyectos
  document.querySelectorAll('.portfolio-item').forEach(item => {
    const projectId = parseInt(item.getAttribute('data-project-id'));
    if (projectId) {
      item.addEventListener('click', () => showModal(projectId, projects));
    }
  });
}

function showModal(projectId, projects) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  // Actualizar título y descripción
  document.getElementById("projectModalLabel").textContent = project.title;
  document.getElementById("projectDescription").textContent = project.description;
  
  // Actualizar el enlace de la URL
  const projectModalWeb = document.getElementById("projectModalWeb");
  projectModalWeb.href = project.web;
  
  // Obtener el texto del botón desde i18n o usar un valor por defecto
  let visitText = "Visiter ";
  if (window.I18N && window.I18N.get) {
    visitText = window.I18N.get("portfolio.visitButton") + " ";
  }
  projectModalWeb.textContent = visitText + project.title;
  
  // Determinar la ruta base para las imágenes según la ubicación actual
  let basePath = "./";
  const pathSegments = window.location.pathname.split('/');
  if (pathSegments.some(segment => ['en', 'fr'].includes(segment))) {
    basePath = "../";
  }
  
  // Procesar rutas de las imágenes
  const processedImages = project.images.map(img => {
    // Si la imagen ya tiene la ruta correcta, usarla como está
    if (img.startsWith(basePath)) {
      return img;
    }
    // Si no, construir la ruta correcta
    return img.replace(/^\.\//, basePath).replace(/^\.\.\//, basePath);
  });
  
  // Generar contenido del carrusel
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = processedImages
    .map(
      (img, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${img}" class="d-block w-100" alt="${project.title}">
        </div>
      `
    )
    .join("");

  // Mostrar modal
  const projectModal = new bootstrap.Modal(
    document.getElementById("projectModal")
  );
  projectModal.show();
}
