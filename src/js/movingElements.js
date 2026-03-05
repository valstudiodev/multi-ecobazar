"use strict"

export function movingElements() {
   // buttonsMovement()
   dynamicAdaptHeader()
}
// ===========================================================================================
function buttonsMovement() {
   const btnActions = document.querySelectorAll('.buttons-active__moving');
   if (btnActions.length < 2) return;

   const btnOne = btnActions[0];
   const btnTwo = btnActions[1];

   const oldParent = btnOne.parentElement;
   if (!oldParent) return;

   const btnOneAnchor = btnOne.nextSibling;
   const btnTwoAnchor = btnTwo.nextSibling;

   const itemLink = document.querySelector('.menu-header__item:last-child');
   if (!itemLink) return;

   const mediaQuery = window.matchMedia('(max-width: 493px)');

   function toggleButtons(mq) {
      if (mq.matches) {
         itemLink.insertAdjacentElement('afterend', btnOne);
         btnOne.insertAdjacentElement('afterend', btnTwo);
      } else {
         if (btnOneAnchor) oldParent.insertBefore(btnOne, btnOneAnchor);
         if (btnTwoAnchor) oldParent.insertBefore(btnTwo, btnTwoAnchor);
      }
   }

   mediaQuery.addEventListener('change', toggleButtons);
   toggleButtons(mediaQuery);
}

// 1. Знаходимо всі потрібні елементи
const phoneLink = document.querySelector('.bottom-header__link');
const targetContainer = document.querySelector('.actions-body-header');
const originalParent = document.querySelector('.bottom-header__container');

function handleResponsive() {
   // Отримуємо поточну ширину вікна
   const windowWidth = window.innerWidth;

   if (windowWidth <= 768) {
      // Переносимо в кінець actions-body-header
      if (phoneLink.parentNode !== targetContainer) {
         targetContainer.appendChild(phoneLink);
      }
   } else {
      // Повертаємо на початкове місце
      if (phoneLink.parentNode !== originalParent) {
         originalParent.appendChild(phoneLink);
      }
   }
}

// 2. Слухаємо зміну розміру вікна
window.addEventListener('resize', handleResponsive);

// 3. Викликаємо функцію відразу при завантаженні сторінки
handleResponsive();


// ===========================================================================================
// -----------------------------
// dynamicAdaptHeader
// -----------------------------
function dynamicAdaptHeader() {
   const topHeader = document.querySelector('.top-header')
   const header = document.querySelector('.header')
   const menu = document.querySelector('.menu-header')

   const phoneHeader = document.querySelector('.bottom-header__link')
   const searchHeader = document.querySelector('.search-header__form')

   const bottomContainer = document.querySelector('.bottom-header__container')
   const actionsHeader = document.querySelector('.actions-body-header')
   const placeSearch = document.querySelector('.body-header__search')

   if (header) {
      const media = window.matchMedia("(max-width: 767.98px)")
      media.addEventListener("change", (e) => {
         dynamicAdaptHeaderInit(media)
      })
      dynamicAdaptHeaderInit(media)
   }

   function dynamicAdaptHeaderInit(media) {
      if (media.matches) {
         bottomContainer.insertAdjacentElement('beforeend', searchHeader)
         actionsHeader.insertAdjacentElement('beforeend', phoneHeader)
         menu.insertAdjacentElement('beforeend', topHeader)
      } else {
         bottomContainer.insertAdjacentElement('beforeend', phoneHeader)
         placeSearch.insertAdjacentElement('beforeend', searchHeader)
         header.insertAdjacentElement("afterbegin", topHeader)
      }
      searchHeader.classList.toggle('--dynamic', media.matches)
      phoneHeader.classList.toggle('--dynamic', media.matches)
   }
}
