import Slider from '.';
import { getRandomInt } from '../helpers';

export default class Carousel extends Slider {
  constructor(className, options) {
    super(className, options);

    this.isInfinite = true;
    this.currentCardIds = [];

    this.updateSlider();
  }

  getCardsPerSlide = () => {
    const width = window.visualViewport.width;
    return width >= 1280 ? 3 : width >= 768 ? 2 : 1;
  }

  generateSlideContent = () => {
    const cardIds = this.generateRandomCardIds();
    return cardIds.map(id => this.cards[id]).join('');
  }
  
  getSlidesNumber = () => {
    return 1;
  }

  generateRandomCardIds = () => {
    const excludedCardIds = [...this.currentCardIds];
    const maxId = this.cards.length - 1;
    this.currentCardIds.length = 0;
    let i = 0;
    while (i < this.cardsPerSlide) {
      const newId = getRandomInt(0, maxId);
      if (excludedCardIds.findIndex(el => el === newId) !== -1) {
        continue;
      }
      i += 1;
      this.currentCardIds.push(newId);
      excludedCardIds.push(newId);
    }
    return this.currentCardIds;
  }

  generateSlide = () => {
    const slide = document.createElement('ul');
    slide.classList.add(this.slideClass, this.mods.currSlide);
    slide.innerHTML = this.generateSlideContent();
    return slide;
  }
}
