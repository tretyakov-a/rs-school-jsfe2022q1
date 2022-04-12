import petCard from '../templates/pet-card.ejs';
import { getRandomInt } from './helpers';
import { showModal } from './modal';

let container = null;
let slideContainer = null;
let slideWrapper = null;
let prevBtn = null;
let nextBtn = null;

const shadowSize = 35;
const transition = 'left ease-out 0.4s';
let isTransition = false;
const currentCardIds = [];
let currentSlide = null;
let cardsPerSlide = 0;
let petCards = null;

function getCardsPerSlide() {
  const width = window.visualViewport.width;
  return width >= 1280 ? 3 : width >= 768 ? 2 : 1;
}

function generateSlide() {
  const slide = document.createElement('ul');
  slide.classList.add('main-pets-slider__slide');
  slide.style.width = slideWrapper.offsetWidth - shadowSize * 2 + 'px';
  slide.innerHTML = generateSlideContent();
  return slide;
}

function generateRandomCardIds() {
  const excludedCardIds = [...currentCardIds];
  const maxId = petCards.length - 1;
  currentCardIds.length = 0;
  let i = 0;
  while (i < cardsPerSlide) {
    const newId = getRandomInt(0, maxId);
    if (excludedCardIds.findIndex(el => el === newId) !== -1) {
      continue;
    }
    i += 1;
    currentCardIds.push(newId);
    excludedCardIds.push(newId);
  }
}

function generateInitialCardIds() {
  currentCardIds.length = 0;
  for (let i = 0; i < cardsPerSlide; i += 1) {
    currentCardIds.push(i);
  }
}

function generateSlideContent() {
  return currentCardIds.map(id => petCards[id]).join('');
}

function updateSlider(rnd, position = 'afterbegin') {
  if (currentSlide) {
    currentSlide.setAttribute('data-slider', 'previous-slide');
  }
  rnd ? generateRandomCardIds() : generateInitialCardIds();
  currentSlide = generateSlide();
  slideContainer.insertAdjacentElement(position, currentSlide);

  if (!rnd) {
    removePreviousSlide();
  }

  setTimeout(() => {
    currentSlide.style.width = `${slideWrapper.offsetWidth - shadowSize * 2}px`;
  });
}

function removePreviousSlide() {
  const previousSlide = slideContainer.querySelector('[data-slider="previous-slide"');
  if (previousSlide) {
    slideContainer.removeChild(previousSlide);
  }
}

function handleWindowResize() {
  const newCardPerSlide = getCardsPerSlide();
  if (cardsPerSlide !== newCardPerSlide) {
    cardsPerSlide = newCardPerSlide;
    updateSlider(false);
  }
  currentSlide.style.width = `${slideWrapper.offsetWidth - shadowSize * 2}px`;
}

function addSlide(start, end, position) {
  if (isTransition) {
    return;
  }
  updateSlider(true, position);

  slideContainer.style.left = start;
  
  setTimeout(() => {
    isTransition = true;
    slideContainer.style.pointerEvents = 'none';
    slideContainer.style.transition = transition;
    slideContainer.style.left = end;
  });
}

function handleNextBtnClick() {
  addSlide('0px', `-${slideWrapper.offsetWidth - shadowSize}px`, 'beforeend');
}

function handlePrevBtnClick() {
  addSlide(`-${slideWrapper.offsetWidth - shadowSize}px`, '0px', 'afterbegin');
}

function handeTransitionEnd() {
  isTransition = false;
  slideContainer.style.pointerEvents = 'all';
  slideContainer.style.transition = '';
  slideContainer.style.left = '0px';
  removePreviousSlide();
}

function handleSliderContainerClick(e) {
  const el = e.target.closest(`[data-card-index]`);
  if (el) {
    showModal(el.dataset.cardIndex);
  }
}

export default function init(data) {
  container = document.querySelector('.main-pets-slider');
  slideContainer = container.querySelector('.main-pets-slider__slide-container');
  slideWrapper = container.querySelector('.main-pets-slider__slide-wrapper');
  prevBtn = container.querySelector('.main-pets-slider__prev button');
  nextBtn = container.querySelector('.main-pets-slider__next button');

  petCards = data.map((item, index) => `<li class="main-pets-slider__list-item" data-card-index="${index}">${petCard(item)}</li>`);
  
  slideContainer.innerHTML = '';
  
  cardsPerSlide = getCardsPerSlide();
  updateSlider(false);

  window.addEventListener('resize', handleWindowResize);
  nextBtn.addEventListener('click', handleNextBtnClick);
  prevBtn.addEventListener('click', handlePrevBtnClick);
  slideContainer.addEventListener('transitionend', handeTransitionEnd);
  slideContainer.addEventListener('click', handleSliderContainerClick);
}