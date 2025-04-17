const projects = [
  {
    id: 1,
    title: "Haras los Pellines",
    description:
      "Landing page créée en utilisant HTML, CSS, Bootstrap et JavaScript, avec un formulaire de contact implémenté à l'aide des technologies AWS.",
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
      "Landing page multilingue pour une académie de langues et d'art, avec une section galerie présentant les peintures réalisées et un historique des expositions auxquelles elle a participé.",
    images: [
      "../assets/img/portfolio/languagelife1.webp",
      "../assets/img/portfolio/languagelife2.webp",
      "../assets/img/portfolio/languagelife3.webp",
      "../assets/img/portfolio/languagelife4.webp",
    ],
    web: "https://www.languagelife.cl",
  },
  {
    id: 3,
    title: "Psicólogo Alex Oyarzún",
    description:
      "Landing page professionnelle pour le psychologue Alex Oyarzún. Elle présente le professionnel, ses services et ses réseaux sociaux. Non disponible dans certains pays à la demande du client.",
    images: [
      "../assets/img/portfolio/alexoyarzun1.webp",
      "../assets/img/portfolio/alexoyarzun2.webp",
      "../assets/img/portfolio/alexoyarzun3.webp",
    ],
    web: "https://www.psicologoalexoyarzun.com/",
  },
  {
    id: 4,
    title: "Nico Castro Photography",
    description:
      "Page d'accueil professionnelle pour le photographe Nicolas Castro. Elle présente le professionnel, ses services, ses réseaux sociaux et quelques-uns de ses travaux",
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
      "Page d'accueil professionnelle pour une académie de danse, avec des détails sur ses services et ses horaires.",
    images: [
      "../assets/img/portfolio/fidias1.webp",
      "../assets/img/portfolio/fidias2.webp",
      "../assets/img/portfolio/fidias3.webp",
      "../assets/img/portfolio/fidias4.webp",
    ],
    web: "https://ingenium-dynamics.github.io/fidias/index2.html",
  },
  // Añade más proyectos aquí...
];

function showModal(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  // Actualizar título y descripción
  document.getElementById("projectModalLabel").textContent = project.title;

  document.getElementById("projectDescription").textContent =
    project.description;
  // Actualizar el enlace de la URL
  const projectModalWeb = document.getElementById("projectModalWeb");
  projectModalWeb.href = project.web;
  projectModalWeb.textContent = "Visiter " + project.title;
  // Generar contenido del carrusel
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = project.images
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
