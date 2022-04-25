import Slider from '.';
import { shuffle } from '../helpers';

export default class Paginator extends Slider {
  constructor(className, options) {
    super(className, options);

    this.cardIds = this.generateCardIds();

    this.updateSlider();
  }
  
  getCardsPerSlide = () => {
    const width = window.visualViewport.width;
    return width >= 1280 ? 8 : width >= 768 ? 6 : 3;
  }

  generateCardIds = () => {
    const dataIds = Array(this.data.length).fill().map((_, i) => i);
    const ids = [];
    for (let i = 0; i < 6; i += 1) {
      ids.push(...dataIds);
    }
    return ids;
  }
  
  getSlidesNumber = () => {
    return Math.floor(this.cardIds.length / this.cardsPerSlide);
  }

  generateSlideContent = () => {
    const start = this.currentIndex * this.cardsPerSlide;
    const cardIds = shuffle(this.cardIds.slice(start, start + this.cardsPerSlide));
    return cardIds.map(id => this.cards[id]).join('');
  }

  generateSlide = () => {
    const list = document.createElement('ul');
    list.classList.add(`${this.sliderClass}__list`);
    list.innerHTML = this.generateSlideContent();
    const slide = document.createElement('div');
    slide.classList.add(this.slideClass, this.mods.currSlide);
    slide.style.width = this.getSlideWidth();
    slide.append(list);
    return slide;
  }
}
