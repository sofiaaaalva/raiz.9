// ==========================================================================
// CARRUSEL 1: RESEÑAS (MATEO, VALERIA, ETC.)
// ==========================================================================
// ==========================================================================
// CARRUSEL 1: RESEÑAS (MATEO, VALERIA, ETC.) - PROTEGIDO CON IF
// ==========================================================================
const trackReviews = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Solo ejecutamos la lógica si el track del carrusel existe en la página actual
if (trackReviews) {
    let currentIndex = 0;
    let isTransitioning = false;

    // Guardamos las tarjetas originales antes de clonar
    const originalCards = Array.from(trackReviews.querySelectorAll('.eames-card'));
    const totalRealSlides = originalCards.length;

    // CLONACIÓN MÚLTIPLE
    const firstClone = originalCards[0].cloneNode(true);
    const secondClone = originalCards[1].cloneNode(true);
    trackReviews.appendChild(firstClone);
    trackReviews.appendChild(secondClone);

    function getCardsInView() {
        return window.innerWidth > 992 ? 2 : 1;
    }

    function updateCarousel(withTransition = true) {
        const viewport = document.querySelector('.carousel-viewport');
        if (!viewport) return;

        const visibleCards = getCardsInView();
        const gap = parseInt(window.getComputedStyle(trackReviews).gap) || 0;
        
        const viewportWidth = viewport.getBoundingClientRect().width;
        const totalGapsWidth = gap * (visibleCards - 1);
        const cardWidth = (viewportWidth - totalGapsWidth) / visibleCards;

        const allRenderedCards = trackReviews.querySelectorAll('.eames-card');
        allRenderedCards.forEach((card) => {
            card.style.width = `${cardWidth}px`;
        });

        if (withTransition) {
            trackReviews.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            trackReviews.style.transition = 'none';
        }

        const moveAmount = currentIndex * (cardWidth + gap);
        trackReviews.style.transform = `translateX(-${moveAmount}px)`;

        allRenderedCards.forEach((card, index) => {
            let normalizedIndex = index;
            if (index >= totalRealSlides) {
                normalizedIndex = index - totalRealSlides;
            }
            
            let targetActiveIndex = currentIndex;
            if (currentIndex === totalRealSlides) {
                targetActiveIndex = 0;
            }

            if (normalizedIndex === targetActiveIndex && index === currentIndex) {
                card.classList.add('is-active');
            } else if (currentIndex === totalRealSlides && index === 0) {
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
            }
        });

        if (currentIndex === 0) {
            if (prevBtn) prevBtn.classList.add('is-hidden');
        } else {
            if (prevBtn) prevBtn.classList.remove('is-hidden');
        }
    }

    function setupCardClicks() {
        const allRenderedCards = trackReviews.querySelectorAll('.eames-card');
        allRenderedCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index === currentIndex || isTransitioning) return;
                isTransitioning = true;
                currentIndex = index;
                updateCarousel(true);
            });
        });
    }

    trackReviews.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= totalRealSlides) {
            currentIndex = 0;
            updateCarousel(false); 
        }
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updateCarousel(true);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            if (currentIndex === 0) {
                currentIndex = totalRealSlides;
                updateCarousel(false);
                trackReviews.offsetHeight; // Forzar reflow
                currentIndex--;
                updateCarousel(true);
            } else {
                currentIndex--;
                updateCarousel(true);
            }
        });
    }

    window.addEventListener('resize', () => {
        updateCarousel(false);
    });

    setupCardClicks();
    updateCarousel(false);
}



// Acordeón FAQ 
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const currentItem = trigger.parentElement;
            currentItem.classList.toggle('active');
        });
    });
});

//SECCION IMAGEN VIDEO
// Seleccionamos el contenedor principal primero
const visionWrapper = document.querySelector('.vision-image-wrapper');

// Solo si el contenedor existe en la página actual, ejecutamos el resto
if (visionWrapper) {
    const visionVideo = visionWrapper.querySelector('video');

    // Cuando el mouse ENTRA al contenedor
    visionWrapper.addEventListener('mouseenter', () => {
        if (visionVideo) visionVideo.play(); // Le da play al video
        visionWrapper.classList.add('active'); // Activa los estilos CSS (opacity)
    });

    // Cuando el mouse SALE del contenedor
    visionWrapper.addEventListener('mouseleave', () => {
        if (visionVideo) visionVideo.pause(); // Pausa el video
        visionWrapper.classList.remove('active'); // Quita los estilos CSS
    });
}


// ==========================================================================
// CARRUSEL 2: GALERÍA CÁPSULA (PIEZAS INTERVENIDAS)
// ==========================================================================
const itemsCapsula = [
  { src: 'imagenes/capsula1sinfondo.png', label: 'Silla Loma' },
  { src: 'imagenes/capsula3sinfondo.png', label: 'Sillón Aragem' },
  { src: 'imagenes/capsula5sinfondo.png', label: 'Cómoda Nogal' },
  { src: 'imagenes/capsula2sinfondo.png', label: 'Silla Veta' },
  { src: 'imagenes/capsula4sinfondo.png', label: 'Mesa Nexo' },
];

let currentCapsula = 0;
const trackCapsula = document.getElementById('track');
const counterCapsula = document.getElementById('counter');

function getVisibleCapsula(center) {
  const n = itemsCapsula.length;
  return [
    (center - 2 + n) % n,
    (center - 1 + n) % n,
    center,
    (center + 1) % n,
    (center + 2) % n,
  ];
}

function renderCapsula() {
  if (!trackCapsula) return;
  const vis = getVisibleCapsula(currentCapsula);
  trackCapsula.innerHTML = '';

  vis.forEach((idx, pos) => {
    const card2 = document.createElement('div');
    let cls = 'card2 ';
    if (pos === 2) cls += 'active';
    else if (pos === 1 || pos === 3) cls += 'side';
    else cls += 'far-side';
    card2.className = cls;

    const img = document.createElement('img');
    img.src = itemsCapsula[idx].src;
    img.alt = itemsCapsula[idx].label;
    card2.appendChild(img);

    if (pos === 2) {
      const overlay = document.createElement('div');
      overlay.className = 'card2-overlay';
      overlay.innerHTML = `
        <span class="overlay-text">${itemsCapsula[idx].label}</span>
        <button class="overlay-btn" aria-label="Ver pieza">+</button>
      `;
      card2.appendChild(overlay);
    }

    if (pos !== 2) {
      card2.addEventListener('click', () => {
        const diff = pos - 2;
        currentCapsula = (currentCapsula + diff + itemsCapsula.length) % itemsCapsula.length;
        renderCapsula();
      });
    }

    trackCapsula.appendChild(card2);
  });

  if (counterCapsula) {
    const num = String(currentCapsula + 1).padStart(2, '0');
    counterCapsula.textContent = num;
  }
}

if (document.getElementById('prev')) {
    document.getElementById('prev').addEventListener('click', () => {
      currentCapsula = (currentCapsula - 1 + itemsCapsula.length) % itemsCapsula.length;
      renderCapsula();
    });
}

if (document.getElementById('next')) {
    document.getElementById('next').addEventListener('click', () => {
      currentCapsula = (currentCapsula + 1) % itemsCapsula.length;
      renderCapsula();
    });
}

// Inicializar carruseles al cargar la página
window.addEventListener('load', () => {
    updateCarousel();
    renderCapsula();
});

// FORMULARIO CONTACTO
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('custom-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Captura de datos del formulario
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Aquí puedes realizar tu llamada fetch/AJAX para enviar los datos
      console.log('Datos listos para enviar:', data);

      // Ejemplo de feedback visual básico
      const submitButton = this.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 1500); 
    });
  }
});


//METODOLOGIA PAGINA DETALLE

function toggleCard(clickedCard) {
  const container = document.getElementById('fichero-container');
  
  // Si la tarjeta clickeada ya estaba activa, la cerramos
  if (clickedCard.classList.contains('active')) {
    clickedCard.classList.remove('active');
    container.classList.remove('has-active');
  } else {
    // Removemos la clase activa de cualquier otra tarjeta abierta
    const activeCard = container.querySelector('.fichero-card.active');
    if (activeCard) {
      activeCard.classList.remove('active');
    }
    
    // Activamos la tarjeta actual y el estado del contenedor padre
    clickedCard.classList.add('active');
    container.classList.add('has-active');
  }
}

// ENTORNO AISLADO PARA LAS ESPECIFICACIONES TÉCNICAS (Súper Seguro)
{
  // Detecta automáticamente las 2 columnas restantes (materiales y acabados)
  document.querySelectorAll('.tecnica-col').forEach(column => {
    column.addEventListener('click', () => {
      const targetId = column.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      
      const columnsContainer = column.parentElement; 
      const allPanels = document.querySelectorAll('.tecnica-panel');

      if (!targetPanel || !columnsContainer) return;

      const isAlreadyActive = column.classList.contains('active');

      // 1. Resetear todos los botones de esta sección
      columnsContainer.querySelectorAll('.tecnica-col').forEach(c => {
        c.classList.remove('active');
        const icon = c.querySelector('.tecnica-icon');
        if (icon) icon.textContent = '+';
      });
      
      // 2. Ocultar todos los paneles (.tecnica-panel)
      allPanels.forEach(p => {
        p.classList.remove('active');
      });

      columnsContainer.classList.remove('has-active');

      // 3. Activar solo si no estaba abierto antes
      if (!isAlreadyActive) {
        column.classList.add('active');
        const icon = column.querySelector('.tecnica-icon');
        if (icon) icon.textContent = '-';
        columnsContainer.classList.add('has-active');
        targetPanel.classList.add('active');
      }
    });
  });
}

// SECCION ACABADOS PAGINA DETALLE
// ENTORNO AISLADO PARA LA INTERACCIÓN DE ACABADOS
{
  document.querySelectorAll('.acabados-btn').forEach(button => {
    button.addEventListener('click', () => {
      const parentContainer = button.parentElement;
      const displayImage = document.getElementById('acabados-display-img');
      const newImageSrc = button.getAttribute('data-image');

      if (!parentContainer || !displayImage || !newImageSrc) return;

      // 1. Quitar estado activo a todas las palabras
      parentContainer.querySelectorAll('.acabados-btn').forEach(btn => {
        btn.classList.remove('active');
      });

      // 2. Asignar activo al elemento clickeado
      button.classList.add('active');

      // 3. Cambiar la imagen de la izquierda
      displayImage.src = newImageSrc;
    });
  });
}

//SECCION VIDEO PAGINA DETALLE
// ENTORNO AISLADO PARA VIDEO AUTOMÁTICO EN SCROLL
{
  const videoSection = document.querySelector('.video-full-section');
  const videoElement = document.querySelector('.video-full-element');

  // Solo se ejecuta si la sección y el video existen en la página actual
  if (videoSection && videoElement) {
    const options = {
      root: null,       // Evalúa respecto a la pantalla del navegador
      threshold: 0.4    // Arranca cuando el 40% de la sección ya es visible en pantalla
    };

    const handleVideoScroll = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Si el usuario está en la sección, le da Play
          videoElement.play().catch(error => {
            console.log("Autoplay protegido por el navegador:", error);
          });
        } else {
          // Si el usuario se va de la sección, se Pausa solo
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleVideoScroll, options);
    observer.observe(videoSection);
  }
}

//ANIMACION SECCION NUMEROS PAGINA DETALLE
// ENTORNO AISLADO PARA REVELADO SECUENCIAL DE ESTADÍSTICAS
// ENTORNO AISLADO PARA REVELADO SECUENCIAL DE ESTADÍSTICAS REPETITIVO
{
  const statsGrid = document.querySelector('.stats-grid');

  if (statsGrid) {
    const observerOptions = {
      root: null,
      threshold: 0.2 // Se activa cuando el 20% de la sección asoma en pantalla
    };

    const revealStats = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cuando entra en pantalla, activa la animación lenta
          statsGrid.classList.add('reveal-active');
        } else {
          // CUANDO SE VA DE PANTALLA, QUITA LA CLASE PARA REINICIARLA
          statsGrid.classList.remove('reveal-active');
        }
      });
    };

    const statsObserver = new IntersectionObserver(revealStats, observerOptions);
    statsObserver.observe(statsGrid);
  }
}

//ANIMACION SECCION FRASE PAGINA DETALLE
// ENTORNO AISLADO PARA REVELADO REPETITIVO DE LA FRASE EDITORIAL
{
  const fraseSection = document.querySelector('.frase-section');

  if (fraseSection) {
    const observerOptions = {
      root: null,
      threshold: 0.2 // Se activa cuando el 20% de la frase asoma en pantalla
    };

    const handleFraseScroll = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Activa el deslizamiento paralelo al entrar
          fraseSection.classList.add('reveal-active');
        } else {
          // Limpia la clase al salir para que se vuelva a ejecutar en el próximo pase
          fraseSection.classList.remove('reveal-active');
        }
      });
    };

    const fraseObserver = new IntersectionObserver(handleFraseScroll, observerOptions);
    fraseObserver.observe(fraseSection);
  }
}