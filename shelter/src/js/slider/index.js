
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
  
  getSlideWidth = () => {
    return `${this.slideContainer.offsetWidth - this.shadowSize * 2}px`;
  }

  createSlides() {
    this.currentSlide = this.generateSlide();
    this.slideContainer.insertAdjacentElement('afterbegin', this.currentSlide);
  }

  updateSlidesWidth() {
    this.currentSlide.style.width = this.getSlideWidth();
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
    this.updateButtons();
    this.updateSlideNumber();
  }
  
  handleWindowResize = () => {
    if (!this.updateSlider()) {
      this.updateSlidesWidth();
    }
  }

  handleTransitionEnd = (e) => {
    if (!e.target.classList.contains(this.slideClass)) {
      return;
    }
    this.removePreviousSlide();
    this.isTransition = false;
    this.slideContainer.classList.remove(this.mods.end);
  }
  
  animate(start) {
    if (this.currentSlide) {
      this.currentSlide.classList.replace(this.mods.currSlide, this.mods.prevSlide);
      this.prevSlide = this.currentSlide;
    }

    this.createSlides();

    this.currentSlide.addEventListener('transitionend', this.handleTransitionEnd, { once: true });
    this.currentSlide.style.left = start;
    this.slideContainer.classList.add(this.mods.start);
  
    setTimeout(() => {
      this.isTransition = true;
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
    if (this.isInfinite) {
      return;
    }
    const lastPageIndex = this.getSlidesNumber() - 1;
      
    const { btnInactive } = this.mods;
    const { first, prev, next, last } = this.btns;

    const addInactive = btn => btn.el && btn.el.classList.add(btnInactive);
    const removeInactive = key => this.btns[key].el && this.btns[key].el.classList.remove(btnInactive);

    Object.keys(this.btns).forEach(removeInactive);
    if (index === 0) {
      [first, prev].forEach(addInactive);
    } else if (index === lastPageIndex) {
      [next, last].forEach(addInactive);
    }
  }

  changeSlide = (index) => {
    this.updateButtons(index);
    const offset = this.slideContainer.offsetWidth * (index < this.currentIndex ? -1 : 1); 
    this.currentIndex = index;
    this.updateSlideNumber();
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