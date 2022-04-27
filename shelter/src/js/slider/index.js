
export default class Slider {
  constructor(className, options = {}) {
    this.sliderClass = className;
    this.slideClass = `${this.sliderClass}__slide`;
    this.options = options;
    this.slider = document.querySelector(`.${this.sliderClass}`);
    this.slideContainer = this.select('container');
    this.slideNumber = this.select('slide-number')
    this.btns = ['first', 'prev', 'next', 'last'].reduce((acc, name) => {
      return { ...acc, [name]: { el: this.select(name) } };
    }, {});
    
    this.shadowSize = this.options.shadowSize || 35;
    this.cardsPerSlide = this.options.cardsPerSlide || 0;
    this.data = options.data || null;
    
    this.isInfinite = false;
    this.isTransition = false;
    this.currentIndex = 0;
    
    this.currentSlide = null;
    this.prevSlide = null;
    this.onUpdate = [];
    
    this.cards = this.data.map(this.renderListItem);

    this.mods = {
      start: `${this.sliderClass}__container_start`,
      end: `${this.sliderClass}__container_end`,
      btnInactive: 'button_circle-inactive',
      currSlide: `${this.slideClass}_current`,
      prevSlide: `${this.slideClass}_previous`
    }

    this.btns['first'].action = () => this.changeSlide(0);
    this.btns['prev'].action = () => this.changeSlide(this.currentIndex - 1);
    this.btns['next'].action = () => this.changeSlide(this.currentIndex + 1);
    this.btns['last'].action = () => this.changeSlide(this.getSlidesNumber() - 1);

    this.slideContainer.innerHTML = '';
    
    window.addEventListener('resize', this.handleWindowResize);
    this.slider.addEventListener('click', this.handleSliderClick);
  }

  select(name) {
    return this.slider.querySelector(`[data-slider="${name}"]`);
  }

  renderListItem = (data, index) => {
    const { cardTemplate } = this.options;
    return `<li class=${this.slideClass}-item" data-card-index="${index}">${cardTemplate(data)}</li>`;
  }

  getCardsPerSlide = () => {
    return this.cardsPerSlide;
  }

  createSlides() {
    this.currentSlide = this.generateSlide();
    this.slideContainer.insertAdjacentElement('afterbegin', this.currentSlide);
  }

  updateSlider() {
    const newCardsPerPage = this.getCardsPerSlide();
    if (this.cardsPerSlide === newCardsPerPage) {
      return false;
    }
    this.cardsPerSlide = newCardsPerPage;
    this.slideContainer.innerHTML = '';
    this.currentIndex = 0;

    if (this.onUpdate.length > 0) {
      this.onUpdate.forEach(cb => cb());
    }
    this.createSlides();
    this.updateButtons(0);
    this.updateSlideNumber();
  }
  
  handleWindowResize = () => {
    this.updateSlider();
  }

  handleTransitionEnd = (e) => {
    if (!e.target.classList.contains(this.slideClass)) {
      return;
    }
    this.currentSlide.removeEventListener('transitionend', this.handleTransitionEnd);
    this.removePreviousSlide();
    this.slideContainer.classList.remove(this.mods.end);
    this.isTransition = false;
    this.updateButtons();
  }
  
  animate(start) {
    this.currentSlide.style.left = start;
    this.slideContainer.classList.add(this.mods.start);
    this.currentSlide.addEventListener('transitionend', this.handleTransitionEnd);
    
    setTimeout(() => {
      this.currentSlide.style.left = `${this.shadowSize}px`;
      this.slideContainer.classList.replace(this.mods.start, this.mods.end);
    });
  }

  updateSlideNumber(number = this.currentIndex + 1) {
    if (this.slideNumber) {
      this.slideNumber.textContent = number;
    }
  }
  
  updateButtons(index = this.currentIndex) {
    const { btnInactive } = this.mods;
    const { first, prev, next, last } = this.btns;
    const addInactive = btn => btn.el && btn.el.classList.add(btnInactive);
    const removeInactive = btn => btn.el && btn.el.classList.remove(btnInactive);

    const method = this.isTransition ? addInactive : removeInactive;
    [first, prev, next, last].forEach(method);

    if (!this.isInfinite) {
      const lastPageIndex = this.getSlidesNumber() - 1;
      if (index === 0) {
        [first, prev].forEach(addInactive);
      } else if (index === lastPageIndex) {
        [next, last].forEach(addInactive);
      }
    }
  }

  changeSlide = (index) => {
    this.isTransition = true;

    this.updateButtons(index);
    const offset = this.slideContainer.offsetWidth * (index < this.currentIndex ? -1 : 1); 
    this.currentIndex = index;
    this.updateSlideNumber();
    if (this.currentSlide) {
      this.currentSlide.classList.replace(this.mods.currSlide, this.mods.prevSlide);
      this.prevSlide = this.currentSlide;
    }
    this.createSlides();
    this.animate(`${offset}px`);
  }

  removePreviousSlide = () => {
    const previousSlide = this.prevSlide || this.slideContainer.querySelector(this.mods.prevSlide);
    if (previousSlide) {
      this.slideContainer.removeChild(previousSlide);
    }
  }

  handleSliderClick = (e) => {
    if (this.isTransition) {
      return;
    }

    const btn = e.target.closest(`[data-slider]`);
    btn && this.btns[btn.dataset.slider] && this.btns[btn.dataset.slider].action();

    const el = e.target.closest(`[data-card-index]`);
    if (el) {
      this.options.handleCardClick.call(null, el.dataset.cardIndex);
    }
  }
}