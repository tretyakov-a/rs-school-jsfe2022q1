
// const topButton = document.querySelector('.top-button');
const headerNav = document.querySelector('.header__container');
// const headerContainer = document.querySelector('.header__container');
const hamburgerButton = headerNav.querySelector('.burger');
const headerNavShowModificator = 'header__container_show';
const headerNavHideModificator = 'header__container_hide';
const animationDuration = 400;

function handleDocumentClick(e) {
  const isClickOutsideMenu = !e.path.find(el => el.classList && el.classList.contains('header-menu'));
  const isClickOnLink = e.path.find(el => el.classList && el.classList.contains('header-menu__link'));

  if (isClickOutsideMenu || isClickOnLink) {
    hide();
  }
}

function handleHamburgerButtonClick(e) {
  const isShowed = headerNav.classList.contains(headerNavShowModificator);
  if (isShowed) {
    hide();
  } else {
    show();
  }
}

function show() {
  headerNav.classList.add(headerNavShowModificator);
  setTimeout(() => {
    document.addEventListener('click', handleDocumentClick);
  });
}

function hide() {
  headerNav.classList.remove(headerNavShowModificator);
  headerNav.classList.add(headerNavHideModificator);

  setTimeout(() => {
    document.removeEventListener('click', handleDocumentClick);
    headerNav.classList.remove(headerNavHideModificator);
  }, animationDuration);
}
  
export default function initHeaderMenu() {
  hamburgerButton.addEventListener('click', handleHamburgerButtonClick);
}