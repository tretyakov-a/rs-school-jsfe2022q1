(()=>{var __webpack_modules__={878:(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";function shuffle(array){const result=[...array];for(let i=result.length-1;i>0;i-=1){let j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}const header=document.querySelector(".header"),topButton=document.querySelector(".top-button"),headerNav=document.querySelector(".header__container"),hamburgerButton=headerNav.querySelector(".burger"),body=document.querySelector("body");function handleDocumentClick(e){const isClickOutsideMenu=!e.target.closest(".header-menu"),isClickOnLink=e.target.closest(".header-menu__link");(isClickOutsideMenu||isClickOnLink)&&hide()}function handleHamburgerButtonClick(e){headerNav.classList.contains("header__container_show")?hide():function show(){body.classList.add("no-y-scroll"),headerNav.classList.add("header__container_show"),setTimeout((()=>{document.addEventListener("click",handleDocumentClick)}))}()}function hide(){headerNav.classList.remove("header__container_show"),headerNav.classList.add("header__container_hide"),setTimeout((()=>{document.removeEventListener("click",handleDocumentClick),headerNav.classList.remove("header__container_hide"),body.classList.remove("no-y-scroll")}),400)}class Slider{constructor(className,options={}){this.sliderClass=className,this.slideClass=`${this.sliderClass}__slide`,this.options=options,this.slider=document.querySelector(`.${this.sliderClass}`),this.slideContainer=this.select("container"),this.slideNumber=this.select("slide-number"),this.btns=["first","prev","next","last"].reduce(((acc,name)=>({...acc,[name]:{el:this.select(name)}})),{}),this.shadowSize=this.options.shadowSize||35,this.cardsPerSlide=this.options.cardsPerSlide||0,this.data=options.data||null,this.isInfinite=!1,this.isTransition=!1,this.currentIndex=0,this.currentSlide=null,this.prevSlide=null,this.onUpdate=[],this.cards=this.data.map(this.renderListItem),this.mods={start:`${this.sliderClass}__container_start`,end:`${this.sliderClass}__container_end`,btnInactive:"button_circle-inactive",currSlide:`${this.slideClass}_current`,prevSlide:`${this.slideClass}_previous`},this.btns.first.action=()=>this.changeSlide(0),this.btns.prev.action=()=>this.changeSlide(this.currentIndex-1),this.btns.next.action=()=>this.changeSlide(this.currentIndex+1),this.btns.last.action=()=>this.changeSlide(this.getSlidesNumber()-1),this.slideContainer.innerHTML="",window.addEventListener("resize",this.handleWindowResize),this.slider.addEventListener("click",this.handleSliderClick)}select(name){return this.slider.querySelector(`[data-slider="${name}"]`)}renderListItem=(data,index)=>{const{cardTemplate}=this.options;return`<li class=${this.slideClass}-item" data-card-index="${index}">${cardTemplate(data)}</li>`};getCardsPerSlide=()=>this.cardsPerSlide;getSlideWidth=()=>this.slideContainer.offsetWidth-2*this.shadowSize+"px";createSlides(){this.currentSlide=this.generateSlide(),this.slideContainer.insertAdjacentElement("afterbegin",this.currentSlide)}updateSlidesWidth(){this.currentSlide.style.width=this.getSlideWidth()}updateSlider(){const newCardsPerPage=this.getCardsPerSlide();if(this.cardsPerSlide===newCardsPerPage)return!1;this.cardsPerSlide=newCardsPerPage,this.slideContainer.innerHTML="",this.currentIndex=0,this.onUpdate.length>0&&this.onUpdate.forEach((cb=>cb())),this.createSlides(),this.updateButtons(),this.updateSlideNumber(),setTimeout((()=>{this.updateSlidesWidth()}))}handleWindowResize=()=>{this.updateSlider()||this.updateSlidesWidth()};handleTransitionEnd=e=>{e.target.classList.contains(this.slideClass)&&(this.removePreviousSlide(),this.isTransition=!1,this.slideContainer.classList.remove(this.mods.end))};animate(start){this.currentSlide&&(this.currentSlide.classList.replace(this.mods.currSlide,this.mods.prevSlide),this.prevSlide=this.currentSlide),this.createSlides(),this.currentSlide.addEventListener("transitionend",this.handleTransitionEnd,{once:!0}),this.currentSlide.style.left=start,this.slideContainer.classList.add(this.mods.start),setTimeout((()=>{this.isTransition=!0,this.currentSlide.style.left=`${this.shadowSize}px`,this.slideContainer.classList.replace(this.mods.start,this.mods.end)}))}updateSlideNumber(number=this.currentIndex+1){this.slideNumber&&(this.slideNumber.textContent=number)}updateButtons(index=this.currentIndex){if(this.isInfinite)return;const lastPageIndex=this.getSlidesNumber()-1,{btnInactive}=this.mods,{first,prev,next,last}=this.btns,addInactive=btn=>btn.el&&btn.el.classList.add(btnInactive);Object.keys(this.btns).forEach((key=>this.btns[key].el&&this.btns[key].el.classList.remove(btnInactive))),0===index?[first,prev].forEach(addInactive):index===lastPageIndex&&[next,last].forEach(addInactive)}changeSlide=index=>{this.updateButtons(index);const offset=this.slideContainer.offsetWidth*(index<this.currentIndex?-1:1);this.currentIndex=index,this.updateSlideNumber(),this.animate(`${offset}px`)};removePreviousSlide=()=>{const previousSlide=this.prevSlide||this.slideContainer.querySelector(this.mods.prevSlide);previousSlide&&this.slideContainer.removeChild(previousSlide)};handleSliderClick=e=>{if(this.isTransition)return;const btn=e.target.closest("[data-slider]");btn&&this.btns[btn.dataset.slider]&&this.btns[btn.dataset.slider].action();const el=e.target.closest("[data-card-index]");el&&this.options.handleCardClick.call(null,el.dataset.cardIndex)}}class Carousel extends Slider{constructor(className,options){super(className,options),this.isInfinite=!0,this.currentCardIds=[],this.updateSlider()}getCardsPerSlide=()=>{const width=window.visualViewport.width;return width>=1280?3:width>=768?2:1};generateSlideContent=()=>this.generateRandomCardIds().map((id=>this.cards[id])).join("");getSlidesNumber=()=>1;generateRandomCardIds=()=>{const excludedCardIds=[...this.currentCardIds],maxId=this.cards.length-1;this.currentCardIds.length=0;let i=0;for(;i<this.cardsPerSlide;){const newId=(min=0,max=maxId,min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1)+min));-1===excludedCardIds.findIndex((el=>el===newId))&&(i+=1,this.currentCardIds.push(newId),excludedCardIds.push(newId))}var min,max;return this.currentCardIds};generateSlide=()=>{const slide=document.createElement("ul");return slide.classList.add(this.slideClass,this.mods.currSlide),slide.style.width=this.getSlideWidth(),slide.innerHTML=this.generateSlideContent(),slide}}class Paginator extends Slider{constructor(className,options){super(className,options),this.cardIds=this.generateCardIds(),this.shuffledCardIds=[],this.onUpdate.push(this.shuffleCardIds),this.updateSlider()}shuffleCardIds=()=>{this.shuffledCardIds.length=0;for(let i=0;i<this.cardIds.length;i+=this.cardsPerSlide){const cardIds=shuffle(this.cardIds.slice(i,i+this.cardsPerSlide));this.shuffledCardIds.push(...cardIds)}};getCardsPerSlide=()=>{const width=window.visualViewport.width;return width>=1280?8:width>=768?6:3};generateCardIds=()=>{const dataIds=Array(this.data.length).fill().map(((_,i)=>i)),ids=[];for(let i=0;i<6;i+=1)ids.push(...dataIds);return ids};getSlidesNumber=()=>Math.floor(this.cardIds.length/this.cardsPerSlide);generateSlideContent=()=>{const start=this.currentIndex*this.cardsPerSlide;return this.shuffledCardIds.slice(start,start+this.cardsPerSlide).map((id=>this.cards[id])).join("")};generateSlide=()=>{const list=document.createElement("ul");list.classList.add(`${this.sliderClass}__list`),list.innerHTML=this.generateSlideContent();const slide=document.createElement("div");return slide.classList.add(this.slideClass,this.mods.currSlide),slide.style.width=this.getSlideWidth(),slide.append(list),slide}}var pet_full_card=__webpack_require__(822),pet_full_card_default=__webpack_require__.n(pet_full_card);const modal=document.querySelector(".modal"),modalContent=modal.querySelector(".modal__content"),modal_body=document.querySelector("body");let petsData=null;function handleModalClick(e){const isClickOutsideWindow=!e.target.closest(".modal__window"),isClickOnCloseBtn=e.target.closest(".modal__close-btn");(isClickOutsideWindow||isClickOnCloseBtn)&&function hideModal(){modal.classList.remove("modal_show"),modal.classList.add("modal_hide"),modal_body.classList.remove("no-y-scroll"),setTimeout((()=>{modal.classList.remove("modal_hide")}),400)}()}var pet_card=__webpack_require__(288),pet_card_default=__webpack_require__.n(pet_card);const pets_namespaceObject=JSON.parse('[{"name":"Katrine","img":"../../assets/images/katrine.png","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"name":"Jennifer","img":"../../assets/images/jennifer.png","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"name":"Woody","img":"../../assets/images/woody.png","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"name":"Sophia","img":"../../assets/images/sophia.png","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"name":"Timmy","img":"../../assets/images/timmy.png","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"name":"Charly","img":"../../assets/images/charly.png","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]},{"name":"Scarlett","img":"../../assets/images/scarlett.png","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"name":"Freddie","img":"../../assets/images/freddie.png","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]}]'),petsImagePaths=function importAll(r){return r.keys().reduce(((acc,key)=>({...acc,[key.match(/.\/([a-z]*).png/)[1]]:r(key)})),{})}(__webpack_require__(557));Object.keys(petsImagePaths).forEach((key=>{(new Image).src=petsImagePaths[key]})),pets_namespaceObject.forEach((item=>{const name=item.name.toLocaleLowerCase();item.img=petsImagePaths[name]}));const sliderOptions={data:pets_namespaceObject,cardTemplate:pet_card_default(),handleCardClick:function showModal(cardIndex){modalContent.innerHTML=pet_full_card_default()(petsData[cardIndex]),modal.classList.add("modal_show"),modal_body.classList.add("no-y-scroll"),setTimeout((()=>{modal.classList.remove("modal_hide")}),400)}};document.addEventListener("DOMContentLoaded",(()=>{if(function initHeaderMenu(){hamburgerButton.addEventListener("click",handleHamburgerButtonClick),new IntersectionObserver(((entries,observer)=>{entries.forEach((entry=>{const{top}=entry.target.getBoundingClientRect(),method=header.offsetHeight<Math.abs(top)?"add":"remove";topButton.classList[method]("top-button_show")}))})).observe(header);const stickyHeader=document.querySelector(".header_pets");stickyHeader&&new IntersectionObserver((([e])=>e.target.classList.toggle("header_pets_sticky",e.intersectionRatio<1)),{threshold:[1]}).observe(stickyHeader)}(),function initModal(data){petsData=data,modal.addEventListener("click",handleModalClick)}(pets_namespaceObject),document.querySelector(".pets-paginator")){new Paginator("pets-paginator",sliderOptions)}if(document.querySelector(".main-pets-slider")){new Carousel("main-pets-slider",sliderOptions)}}))},288:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="pet-card">\n  <div class="pet-card__img-container">\n    <img src="'),__append(escapeFn(locals.img)),__append('" alt="charly">\n  </div>\n  <h3 class="pet-card__title">'),__append(escapeFn(locals.name)),__append('</h3>\n  <button class="pet-card__button button">Learn more</button>\n</div>');return __output}},822:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="pet-full-card">\n  <div class="pet-full-card__img">\n    <img src="'),__append(escapeFn(locals.img)),__append('" alt="pet portrait">\n  </div>\n  <div class="pet-full-card__text">\n    <h3 class="pet-full-card__title">'),__append(escapeFn(locals.name)),__append('</h3>\n    <h4 class="pet-full-card__subtitle">'),__append(escapeFn(locals.type)),__append(" - "),__append(escapeFn(locals.breed)),__append('</h4>\n    <p class="pet-full-card__description">'),__append(escapeFn(locals.description)),__append('</p>\n    <ul class="pet-full-card__list">\n      <li class="pet-full-card__list-item"><b>Age:</b> '),__append(escapeFn(locals.age)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Inoculations:</b> '),__append(escapeFn(locals.inoculations)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Diseases:</b> '),__append(escapeFn(locals.diseases)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Parasites:</b> '),__append(escapeFn(locals.parasites)),__append("</li>\n    </ul>\n  </div>\n</div>");return __output}},557:(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./charly.png":61,"./freddie.png":686,"./jennifer.png":880,"./katrine.png":729,"./scarlett.png":205,"./sophia.png":349,"./timmy.png":378,"./woody.png":838};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=557},61:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/charly-91488a52.png"},686:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/freddie-fadecb22.png"},880:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/jennifer-e36eb697.png"},729:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/katrine-ed5f000e.png"},205:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/scarlett-642d2287.png"},349:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/sophia-2344312c.png"},378:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/timmy-f28b802b.png"},838:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/woody-9926a26c.png"}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.p="";var __webpack_exports__=__webpack_require__(878)})();
//# sourceMappingURL=main-33f0dfad.js.map