"use strict"

export function movingElements() {
   // buttonsMovement()
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
