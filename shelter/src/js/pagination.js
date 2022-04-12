
import { showModal } from './modal';
import petCard from '../templates/pet-card.ejs';
import { shuffle } from './helpers';

let paginator = null;
let pageContainer = null;
let pageWrapper = null;
let controls = null;
let pageNumber = null;
let controlBtns = {};

const transition = 'left ease-out 0.4s';
let isTransition = false;
let petsData = null;
let cardsPerPage = 8;
let activePage = 0;
const pages = [];

const btnInactiveModificator = 'button_circle-inactive';

function getCardsPerSlide() {
  const width = window.visualViewport.width;
  return width >= 1280 ? 8 : width >= 768 ? 6 : 3;
}

function generatePage(pageIndex) {
  const list = document.createElement('ul');
  list.classList.add('pets-paginator__list');
  list.innerHTML = generatePageContent(pageIndex);
  const page = document.createElement('div');
  page.classList.add('pets-paginator__page');
  page.style.width = pageWrapper.offsetWidth + 'px';
  page.setAttribute('data-page-index', pageIndex);
  page.appendChild(list);
  return page;
}

function generatePageContent(pageIndex) {
  const start = pageIndex * cardsPerPage;
  // const pageData = shuffle(petsData.slice(start, start + cardsPerPage));
  const pageData = petsData.slice(start, start + cardsPerPage);
  return pageData.map((item, index) => `<li class="pets-paginator__list-item" data-card-index="${index}">${petCard(item)}</li>`).join('');
}

function getPagesNumber() {
  return Math.floor(petsData.length / cardsPerPage);
}

function generatePetsData(data) {
  const petsData = [];
  for (let i = 0; i < 6; i += 1) {
    petsData.push(...data);
  }
  return petsData;
}

function updatePages() {
  const pagesNumber = getPagesNumber();
  
  pageContainer.innerHTML = '';
  pages.length = 0;
  for (let i = 0; i < pagesNumber; i += 1)  {
    const page = generatePage(i);
    pages.push(page);
    pageContainer.appendChild(page);
  }

  setTimeout(() => {
    pages.forEach(page => {
      page.style.width = `${pageWrapper.offsetWidth}px`;
    });
  });
}

function handleWindowResize() {
  const newCardsPerPage = getCardsPerSlide();
  if (cardsPerPage !== newCardsPerPage) {
    cardsPerPage = newCardsPerPage;
    updatePages();
    changePage(0, true);
  }
  pages.forEach(page => {
    page.style.width = `${pageWrapper.offsetWidth}px`;
  });

  const offset = activePage * pageWrapper.offsetWidth;
  pageContainer.style.left = `-${offset}px`;
}

function changePage(index, isCardsPerPageChanged = false) {
  const lastPageIndex = getPagesNumber() - 1;
  Object.keys(controlBtns).forEach(key => controlBtns[key].classList.remove(btnInactiveModificator))
  if (index === 0) {
    controlBtns['first'].classList.add(btnInactiveModificator);
    controlBtns['prev'].classList.add(btnInactiveModificator);
  } else if (index === lastPageIndex) {
    controlBtns['next'].classList.add(btnInactiveModificator);
    controlBtns['last'].classList.add(btnInactiveModificator);
  }
  
  activePage = index;
  pageNumber.textContent = activePage + 1;
  movePage(isCardsPerPageChanged);
}

function movePage(isCardsPerPageChanged = false) {
  const offset = activePage * pageWrapper.offsetWidth;
  
  setTimeout(() => {
    if (!isCardsPerPageChanged) {
      isTransition = true;
      pageContainer.style.transition = transition;
    }
    pageContainer.style.left = `-${offset}px`;
  })
}

function handeTransitionEnd() {
  isTransition = false;
  pageContainer.style.transition = '';
}


function handleContolsClick(e) {
  if (isTransition) {
    return;
  }
  const el = e.target.closest(`[data-btn]`);
  if (el) {
    switch (el.dataset.btn) {
      case 'first': changePage(0); break;
      case 'prev': changePage(activePage - 1); break;
      case 'next': changePage(activePage + 1); break;
      case 'last': changePage(getPagesNumber() - 1); break;
    }
  }
}

function handlePageContainerClick(e) {
  const el = e.target.closest(`[data-card-index]`);
  if (el) {
    showModal(el.dataset.cardIndex);
  }
}

export default function init(data) {
  paginator = document.querySelector('.pets-paginator');
  pageContainer = paginator.querySelector('.pets-paginator__container');
  pageWrapper = paginator.querySelector('.pets-paginator__wrapper');
  controls = paginator.querySelector('.pets-paginator__controls');
  pageNumber = paginator.querySelector('[data-btn="page-number"]');
  controlBtns = ['first', 'prev', 'next', 'last'].reduce((acc, name) => {
    acc[name] = paginator.querySelector(`[data-btn="${name}"]`);
    return acc;
  }, {});

  cardsPerPage = getCardsPerSlide();
  petsData = generatePetsData(data);
  updatePages();

  window.addEventListener('resize', handleWindowResize);
  controls.addEventListener('click', handleContolsClick);
  pageContainer.addEventListener('click', handlePageContainerClick);
  pageContainer.addEventListener('transitionend', handeTransitionEnd);
}