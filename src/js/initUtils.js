"use strict"

export function initUtils() {
  slidersInit()
}

// ===========================================================================================
// -----------------------------
// accordions
// -----------------------------
document.addEventListener("click", (e) => {
  // 1. Шукаємо кнопку-заголовок через closest (делегування)
  const btn = e.target.closest("[data-accordion-btn]");
  if (!btn) return;

  // 2. Знаходимо батьківський елемент та потрібні деталі
  const accordion = btn.closest("[data-accordion]");
  const body = accordion.querySelector("[data-accordion-body]");
  const icon = btn.querySelector("[data-accordion-icon]");

  if (!body) return;

  const isOpen = accordion.classList.contains("is-open");

  if (!isOpen) {
    // --- ВІДКРИТТЯ ---
    accordion.classList.add("is-open");
    if (icon) icon.classList.add("icon-active"); // Клас активної іконки

    body.style.height = `${body.scrollHeight}px`;

    body.addEventListener("transitionend", function handler() {
      if (accordion.classList.contains("is-open")) {
        body.style.height = "auto";
      }
      body.removeEventListener("transitionend", handler);
    }, { once: true });

  } else {
    // --- ЗАКРИТТЯ ---
    body.style.height = `${body.scrollHeight}px`;
    body.offsetHeight; // force reflow

    requestAnimationFrame(() => {
      body.style.height = "0";
      accordion.classList.remove("is-open");
      if (icon) icon.classList.remove("icon-active"); // Прибираємо клас
    });
  }
});

// const accordions = document.querySelectorAll('details[data-accordion]');

// accordions.forEach(el => {
//    const summary = el.querySelector('[data-accordion-btn]');
//    const body = el.querySelector('[data-accordion-body]'); // Шукаємо за атрибутом

//    if (!summary || !body) return; // Захист від помилок, якщо структура інша

//    summary.addEventListener('click', (e) => {
//       e.preventDefault(); // Важливо: зупиняємо стандартне відкриття

//       // Перевіряємо стан через атрибут open
//       if (el.hasAttribute('open')) {
//          collapse(el, body);
//       } else {
//          expand(el, body);
//       }
//    });
// });

// function expand(el, body) {
//    el.style.overflow = 'hidden';
//    el.setAttribute('open', ''); // Додаємо open відразу

//    const height = body.scrollHeight; // Вимірюємо реальну висоту контенту
//    body.style.height = '0px';

//    // Маленький хак для браузера, щоб він помітив зміну висоти
//    body.offsetHeight;

//    body.style.height = height + 'px';

//    // Очищаємо висоту після анімації для адаптивності
//    body.addEventListener('transitionend', () => {
//       if (el.hasAttribute('open')) body.style.height = 'auto';
//    }, { once: true });
// }

// function collapse(el, body) {
//    // Встановлюємо поточну висоту в px замість auto для старту анімації
//    body.style.height = body.scrollHeight + 'px';
//    body.offsetHeight;

//    body.style.height = '0px';

//    body.addEventListener('transitionend', () => {
//       // Тільки якщо ми все ще в стані закриття, прибираємо open
//       if (body.style.height === '0px') {
//          el.removeAttribute('open');
//       }
//    }, { once: true });
// }

// ===========================================================================================
// -----------------------------
// SLIDER
// -----------------------------
function slidersInit() {
  if (document.querySelector('.slider-testimonials')) {
    const swiper = new Swiper('.slider-testimonials', {
      loop: true,

      navigation: {
        nextEl: '.button-arrow--right',
        prevEl: '.button-arrow--left',
      },

      breakpoints: {
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        450: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        650: {
          slidesPerView: 1.8,
          spaceBetween: 10,
        },
        884: {
          slidesPerView: 2.2,
          spaceBetween: 15,
          centteredSlides: true,
        },
        1066: {
          slidesPerView: 2.5,
          spaceBetween: 20,
          centteredSlides: false,
        },
        1320: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  }

  if (document.querySelector('.slider-main-product')) {
    const sliderProductThums = new Swiper('.thumbs-product-slider__thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      direction: 'vertical',
      loop: false,
      observer: true,
      observeParents: true,
      freeMode: true,
      watchSlidesProgress: true,

      navigation: {
        nextEl: ".thumbs-product-slider__btn--next",
        prevEl: ".thumbs-product-slider__btn--prev",
      },

      breakpoints: {
        320: {
          direction: 'horizontal',
          slidesPerView: 3,
        },
        670: {
          direction: 'vertical',
          slidesPerView: 4,
        }
      },
    });
    const sliderProductMain = new Swiper('.slider-main-product', {
      spaceBetween: 10,
      loop: true,

      thumbs: {
        swiper: sliderProductThums,
      },
    });
  }
}



// ===========================================================================================
// -----------------------------
// filter
// -----------------------------
// document.addEventListener('DOMContentLoaded', () => {
//    const menuButtons = document.querySelectorAll('[data-filter]');
//    const galleryItems = document.querySelectorAll('[data-group]');

//    function filterItems(category) {
//       galleryItems.forEach(item => {
//          item.style.display = item.dataset.group === category ? 'grid' : 'none';
//       });
//    }

//    menuButtons.forEach((btn, index) => {
//       btn.addEventListener('click', () => {
//          menuButtons.forEach(b => b.classList.remove('active'));
//          btn.classList.add('active');
//          filterItems(btn.dataset.filter);
//       });

//       if (index === 0) {
//          btn.classList.add('active');
//          filterItems(btn.dataset.filter);
//       }
//    });
// });


// ===========================================================================================
// -----------------------------
// active-link
// -----------------------------
// const links = document.querySelectorAll('.menu-header__link')
// const current = window.location.pathname

// links.forEach(link => {
//    link.addEventListener('active', () => {
//       if (link.getAttribute('href') === current) {
//          link.classList.toggle('active-page')
//       }
//       console.log("works");
//    })
// })



