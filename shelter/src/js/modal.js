
import petFullCardTemplate from '../templates/pet-full-card.ejs';

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal__content');

const modalShowModificator = 'modal_show';
const modalHideModificator = 'modal_hide';
const animationDuration = 400;
let petsData = null;

function handleModalClick(e) {
  const isClickOutsideWindow = !e.target.closest('.modal__window');
  const isClickOnCloseBtn = e.target.closest('.modal__close-btn');

  if (isClickOutsideWindow || isClickOnCloseBtn) {
    hideModal();
  }
}

function hideModal() {
  modal.classList.remove(modalShowModificator);
  modal.classList.add(modalHideModificator);

  setTimeout(() => {
    modal.classList.remove(modalHideModificator);
  }, animationDuration);
}

function showModal(cardIndex) {
  modalContent.innerHTML = petFullCardTemplate(petsData[cardIndex]);
  modal.classList.add(modalShowModificator);

  setTimeout(() => {
    modal.classList.remove(modalHideModificator);
  }, animationDuration);
}

function initModal(data) {
  petsData = data;
  modal.addEventListener('click', handleModalClick);
}

export {
  initModal,
  showModal
}