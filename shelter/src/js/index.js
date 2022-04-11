import '../styles/index.scss';

import { importAll } from './helpers';
import initHeaderMenu from './header-menu';
import initSlider from './slider';
import { initModal } from './modal';
import initPagination from './pagination';

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

initHeaderMenu();
initModal(petsData);

if (document.querySelector('.pets-paginator')) {
  initPagination(petsData);
}

if (document.querySelector('.main-pets-slider')) {
  initSlider(petsData);
}