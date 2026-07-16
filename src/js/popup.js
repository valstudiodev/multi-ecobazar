
export function PopUpInitial() {
  initPopup()
}

const SELECTORS = {
  popup: '[data-popup]',
  open: '[data-popup-open]',
  close: '[data-popup-close]',
  overlay: '.popup__overlay',
};

let activePopup = null;

function lockScroll() {
  // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.classList.add('lock');
  // document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function unlockScroll() {
  document.body.classList.remove('lock');
  // document.body.style.paddingRight = '';
}

function openPopup(name) {
  const popup = document.querySelector(`${SELECTORS.popup}[data-popup="${name}"]`);

  if (!popup) return;

  activePopup = popup;
  popup.classList.add('is-open');

  lockScroll();
}

function closePopup() {
  if (!activePopup) return;

  activePopup.classList.remove('is-open');

  unlockScroll();

  activePopup = null;
}

function handleClick(event) {
  const target = event.target;

  const openBtn = target.closest(SELECTORS.open);
  if (openBtn) {
    openPopup(openBtn.dataset.popupOpen);
    return;
  }

  const closeBtn = target.closest(SELECTORS.close);
  if (closeBtn) {
    closePopup();
    return;
  }

  const overlay = target.closest(SELECTORS.overlay);

  if (overlay && target === overlay) {
    closePopup();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
}

export function initPopup() {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
}

