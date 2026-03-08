"use strict"

export function formUtils() {
   typeSwitcher()
   updateCartAccessible()

}
// ===========================================================================================

// ===========================================================================================
// -----------------------------
// typeSwitcher form
// -----------------------------
export function typeSwitcher() {
   // Знаходимо всі інпути з класом 'type-switcher'
   const inputs = document.querySelectorAll('.type-switcher');

   inputs.forEach(input => {
      const desiredType = input.getAttribute('data-type');
      // 🔑 Ключова зміна: Зберігаємо початковий текст placeholder
      const originalPlaceholder = input.getAttribute('data-placeholder');

      // 1. Обробник події ФОКУС (focus)
      input.addEventListener('focus', function () {
         // Змінюємо тип на бажаний ('date' або 'time')
         this.type = desiredType;
      });

      // 2. Обробник події ВТРАТА ФОКУСУ (blur)
      input.addEventListener('blur', function () {

         // 1. Перевіряємо, чи поточний тип — це той, який ми хочемо приховати
         if (this.type === desiredType) {

            // 2. Ключова перевірка: Якщо поле візуально порожнє
            if (this.value === "") {

               // 🔑 КРОК ВИПРАВЛЕННЯ: Примусово скидаємо значення перед зміною типу.
               // Це обходить проблеми кешування та внутрішніх значень браузера.
               this.value = "";

               // Повертаємо тип назад на 'text'
               this.type = 'text';

               // Відновлюємо placeholder
               this.placeholder = originalPlaceholder;
            }
         }
      });

      // 3. Додатковий крок: Встановлюємо правильний тип, якщо є значення при завантаженні
      if (input.value) {
         input.type = desiredType;
      }

      // Переконаємось, що інпут починає з 'text' і має коректний placeholder
      if (!input.value && input.type !== 'text') {
         input.type = 'text';
         input.placeholder = originalPlaceholder;
      }
   });
}


// function updateCartAccessible(count) {
//    const container = document.getElementById('cart-counter-container');

//    if (container) {
//       container.innerHTML = `
//       <span class="visually-hidden">Items in cart:</span>
//       <span id="cart-counter-value">${count}</span>
//     `;
//    }
// }
