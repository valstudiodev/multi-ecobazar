"use strict"

document.addEventListener('click', documentActions)

export function initEffects() {
  // initScrollHeader()
  // filterAction()
  filterInit()
  scrollHeaderHide()
}
// ===========================================================================================
// window.addEventListener('scroll', scrollHeader)

// ===========================================================================================
// -----------------------------
// scroll-header
// -----------------------------
// function initScrollHeader() {
//    const header = document.querySelector('.header');
//    if (!header) return;

//    window.addEventListener('scroll', () => {
//       header.classList.toggle('scrolled', window.scrollY > 50);
//    });
// }

// function initScrollHeader() {
//   const header = document.querySelector('.header');
//   if (!header) return;

//   // 1. Ініціалізація: встановлюємо стан відразу при завантаженні
//   let currentScroll = window.scrollY;
//   let lastScroll = currentScroll;
//   let downStart = currentScroll;

//   // Якщо сторінка вже проскролена при завантаженні (після оновлення)
//   if (currentScroll > 50) {
//     header.classList.add('scrolled');
//     // Можна додати 'visible', щоб хедер був відразу при оновленні,
//     // або залишити прихованим до першого руху вгору
//     header.classList.add('visible');
//   }

//   const OFFSET = 50;
//   const DELTA = 8;
//   const HIDE_AFTER = 40;

//   const onScroll = () => {
//     const current = window.scrollY;

//     // 2. ЗАХИСТ ВІД FOOTER: перевіряємо, чи ми в самому низу
//     // Якщо до низу сторінки залишилось менше 20px, ігноруємо логіку появи
//     const scrollHeight = document.documentElement.scrollHeight;
//     const screenHeight = window.innerHeight;
//     const isBottom = current + screenHeight >= scrollHeight - 20;

//     // Захист: меню відкрите або iOS "відскок" (negative scroll)
//     if (document.documentElement.classList.contains('menu-open') ||
//       header.classList.contains('menu-open') ||
//       current < 0) {
//       return;
//     }

//     const diff = current - lastScroll;
//     if (Math.abs(diff) < DELTA) return;

//     // Верх сторінки (повне скидання)
//     if (current <= OFFSET) {
//       header.classList.remove('scrolled', 'visible');
//       header.style.transform = '';
//       downStart = current;
//       lastScroll = current;
//       return;
//     }

//     // Скрол вниз
//     if (diff > 0) {
//       if (current - downStart > HIDE_AFTER) {
//         header.classList.add('scrolled');
//         header.classList.remove('visible');
//       }
//     }
//     // Скрол вгору (тільки якщо ми НЕ в самому низу)
//     else {
//       if (!isBottom) {
//         header.classList.add('scrolled', 'visible');
//       }
//       downStart = current;
//     }

//     lastScroll = current;
//   };

//   // throttle для оптимізації (опціонально, але scroll і так працює часто)
//   window.addEventListener('scroll', onScroll, { passive: true });
// }

function scrollHeaderHide() {
  const header = document.querySelector('.header');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 100) {
      header.classList.remove('hide');
      return;
    }

    if (currentScroll > lastScroll) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = currentScroll;
  });
}

// ===========================================================================================
// -----------------------------
// MENU-BURGER
// -----------------------------
function documentActions(e) {
  const targetElement = e.target
  if (targetElement.closest('.icon-menu')) {
    document.body.classList.toggle('menu-open')
    document.body.classList.toggle('scroll-lock')
    document.documentElement.classList.toggle('menu-open')
  }
}

// ===========================================================================================
// -----------------------------
// flip-cart
// -----------------------------
// function toggleCardContent() {
//    const cards = document.querySelectorAll('.cart-work__inner');

//    cards.forEach(card => {
//       card.addEventListener('click', () => {
//          // При кліку додаємо або прибираємо клас активного стану
//          if (window.innerWidth <= 768) {
//             card.classList.toggle('animCart');
//          }

//       });
//    });
// }

// ===========================================================================================
// -----------------------------
// icon-show
// -----------------------------
// function showList() {
//    const iconShows = document.querySelectorAll(`.row-menu__icon`)

//    iconShows.forEach(iconShow => {
//       iconShow.addEventListener('click', () => {
//          if (iconShow) {
//             iconShow.classList.toggle('icon-active')
//          }
//       })
//    })
// }

// function showList() {
//    const items = document.querySelectorAll('.row-menu');

//    items.forEach(item => {
//       const icon = item.querySelector('.row-menu__icon');
//       const wrap = item.querySelector('.row-menu__wrap');

//       icon.addEventListener('click', () => {
//          icon.classList.toggle('icon-active');
//          wrap.classList.toggle('open');
//       });
//    });
// }



// 1. Знаходимо всі кнопки за класом
// const buttons = document.querySelectorAll('.item-filter__button');

// // 2. Проходимо циклом по кожній кнопці в колекції
// buttons.forEach(function (btn) {

//   // 3. Для кожної окремої кнопки (btn) вішаємо слухача
//   btn.addEventListener('click', function () {

//     // При кліку додаємо клас 'active' саме тій кнопці, на яку натиснули
//     this.classList.toggle('active');

//     // Якщо хочете, щоб при кліку на одну кнопку з інших клас зникав:
//     // buttons.forEach(el => el.classList.remove('active'));
//     // this.classList.add('active');
//   });

// });


// ======================== filter =========================
function filterAction() {
  const filterButtons = document.querySelectorAll(`.navigation-tabs__button`)
  const filterItems = document.querySelectorAll(`.body-tabs-product__item`)

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      filterItems.forEach(item => {
        const category = item.dataset.category;

        const isMatch = filterValue === category;

        if (isMatch) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });
}


function filterInit() {
  const filterNav = document.querySelector('.navigation-tabs');
  const buttons = document.querySelectorAll('.navigation-tabs__button');
  const items = document.querySelectorAll('.body-tabs-product__item');

  filterNav?.addEventListener('click', (e) => {
    const target = event.target;

    const clickedBtn = target.closest('.navigation-tabs__button');

    if (!clickedBtn) return;

    const filterValue = clickedBtn.dataset.filter;

    if (!filterValue) return;

    buttons.forEach(button => {
      button.classList.remove('active');
    });

    clickedBtn.classList.add('active');

    items.forEach(item => {
      const isVisible =
        filterValue === 'all' ||
        item.dataset.category === filterValue;

      item.classList.toggle('active', isVisible);
    });
  });
}

