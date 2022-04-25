const header = document.querySelector('.header');
const topButton = document.querySelector('.top-button');
const headerNav = document.querySelector('.header__container');
const hamburgerButton = headerNav.querySelector('.burger');
const body = document.querySelector('body');
const headerNavShowModificator = 'header__container_show';
const headerNavHideModificator = 'header__container_hide';
const noScrollModificator = 'no-y-scroll';
const animationDuration = 400;

function handleDocumentClick(e) {
  const isClickOutsideMenu = !e.target.closest('.header-menu');
  const isClickOnLink = e.target.closest('.header-menu__link');

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
  body.classList.add(noScrollModificator);
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
    body.classList.remove(noScrollModificator);
  }, animationDuration);
}

export default function initHeaderMenu() {
  hamburgerButton.addEventListener('click', handleHamburgerButtonClick);

  let observer = new IntersectionObserver(
    (entries, observer) => { 
      entries.forEach(entry => {
        const { top } = entry.target.getBoundingClientRect();
        const method = header.offsetHeight < Math.abs(top) ? 'add' : 'remove';
        topButton.classList[method]('top-button_show');
      });
    }
  );
  observer.observe(header);

  const stickyHeader = document.querySelector('.header_pets');
  if (stickyHeader) {
    let observer = new IntersectionObserver( 
      ([e]) => e.target.classList.toggle('header_pets_sticky', e.intersectionRatio < 1),
      {threshold: [1]}
    );
    
    observer.observe(stickyHeader);
  }
}