import '../styles/index.scss';

import { importAll } from './helpers';
import initHeaderMenu from './header-menu';
import Carousel from './slider/carousel';
import Paginator from './slider/paginator';
import { initModal, showModal } from './modal';
import petCardTemplate from '../templates/pet-card.ejs';

const petsImagePaths = importAll(require.context('../assets/pictures/pets', false, /.png$/));
Object.keys(petsImagePaths).forEach(key => {
  const img = new Image();
  img.src = petsImagePaths[key];
})

import petsData from './pets.json';
petsData.forEach(item => {
  const name = item.name.toLocaleLowerCase();
  item.img = petsImagePaths[name];
})

const sliderOptions = {
  data: petsData,
  cardTemplate: petCardTemplate,
  handleCardClick: showModal
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderMenu();
  initModal(petsData);
  
  if (document.querySelector('.pets-paginator')) {
    const paginator = new Paginator('pets-paginator', sliderOptions)
  }
  
  if (document.querySelector('.main-pets-slider')) {
    const carousel = new Carousel('main-pets-slider', sliderOptions);
  }
});