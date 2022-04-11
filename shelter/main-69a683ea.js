(()=>{var __webpack_modules__={846:(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";const headerNav=document.querySelector(".header__container"),hamburgerButton=headerNav.querySelector(".burger");function handleDocumentClick(e){const isClickOutsideMenu=!e.path.find((el=>el.classList&&el.classList.contains("header-menu"))),isClickOnLink=e.path.find((el=>el.classList&&el.classList.contains("header-menu__link")));(isClickOutsideMenu||isClickOnLink)&&hide()}function handleHamburgerButtonClick(e){headerNav.classList.contains("header__container_show")?hide():function show(){headerNav.classList.add("header__container_show"),setTimeout((()=>{document.addEventListener("click",handleDocumentClick)}))}()}function hide(){headerNav.classList.remove("header__container_show"),headerNav.classList.add("header__container_hide"),setTimeout((()=>{document.removeEventListener("click",handleDocumentClick),headerNav.classList.remove("header__container_hide")}),400)}var pet_card=__webpack_require__(288),pet_card_default=__webpack_require__.n(pet_card),pet_full_card=__webpack_require__(822),pet_full_card_default=__webpack_require__.n(pet_full_card);const modal=document.querySelector(".modal"),modalContent=modal.querySelector(".modal__content");let petsData=null;function handleModalClick(e){const isClickOutsideWindow=!e.path.find((el=>el.classList&&el.classList.contains("modal__window"))),isClickOnCloseBtn=e.path.find((el=>el.classList&&el.classList.contains("modal__close-btn")));(isClickOutsideWindow||isClickOnCloseBtn)&&function hideModal(){modal.classList.remove("modal_show"),modal.classList.add("modal_hide"),setTimeout((()=>{modal.classList.remove("modal_hide")}),400)}()}function showModal(cardIndex){modalContent.innerHTML=pet_full_card_default()(petsData[cardIndex]),modal.classList.add("modal_show"),setTimeout((()=>{modal.classList.remove("modal_hide")}),400)}let container=null,slideContainer=null,slideWrapper=null,prevBtn=null,nextBtn=null;let isTransition=!1;const currentCardIds=[];let currentSlide=null,cardsPerSlide=0,petCards=null;function getCardsPerSlide(){const width=window.visualViewport.width;return width>=1280?3:width>=768?2:1}function generateSlide(){const slide=document.createElement("ul");return slide.classList.add("main-pets-slider__slide"),slide.style.width=slideWrapper.offsetWidth+"px",slide.innerHTML=function generateSlideContent(){return currentCardIds.map((id=>petCards[id])).join("")}(),slide}function updateSlider(rnd,position="afterbegin"){currentSlide&&currentSlide.setAttribute("data-slider","previous-slide"),rnd?function generateRandomCardIds(){const excludedCardIds=[...currentCardIds],maxId=petCards.length-1;currentCardIds.length=0;let i=0;for(;i<cardsPerSlide;){const newId=(min=0,max=maxId,min=Math.ceil(min),max=Math.floor(max),Math.floor(Math.random()*(max-min+1)+min));-1===excludedCardIds.findIndex((el=>el===newId))&&(i+=1,currentCardIds.push(newId),excludedCardIds.push(newId))}var min,max}():function generateInitialCardIds(){currentCardIds.length=0;for(let i=0;i<cardsPerSlide;i+=1)currentCardIds.push(i)}(),currentSlide=generateSlide(),slideContainer.insertAdjacentElement(position,currentSlide),rnd||removePreviousSlide(),setTimeout((()=>{currentSlide.style.width=`${slideWrapper.offsetWidth}px`}))}function removePreviousSlide(){const previousSlide=slideContainer.querySelector('[data-slider="previous-slide"');previousSlide&&slideContainer.removeChild(previousSlide)}function handleWindowResize(){const newCardPerSlide=getCardsPerSlide();cardsPerSlide!==newCardPerSlide&&(cardsPerSlide=newCardPerSlide,updateSlider(!1)),currentSlide.style.width=`${slideWrapper.offsetWidth}px`}function addSlide(start,end,position){isTransition||(updateSlider(!0,position),slideContainer.style.left=start,setTimeout((()=>{isTransition=!0,slideContainer.style.transition="left ease-out 0.4s",slideContainer.style.left=end})))}function handlePrevBtnClick(){addSlide(`-${slideWrapper.offsetWidth}px`,"0px","afterbegin")}function handleNextBtnClick(){addSlide("0px",`-${slideWrapper.offsetWidth}px`,"beforeend")}function handeTransitionEnd(){isTransition=!1,slideContainer.style.transition="",slideContainer.style.left="0px",removePreviousSlide()}function handleSliderContainerClick(e){const el=e.target.closest("[data-card-index]");el&&showModal(el.dataset.cardIndex)}let paginator=null,pageContainer=null,pageWrapper=null,controls=null,pageNumber=null,controlBtns={};let pagination_isTransition=!1,pagination_petsData=null,cardsPerPage=8,activePage=0;const pages=[];function pagination_getCardsPerSlide(){const width=window.visualViewport.width;return width>=1280?8:width>=768?6:3}function generatePage(pageIndex){const list=document.createElement("ul");list.classList.add("pets-paginator__list"),list.innerHTML=function generatePageContent(pageIndex){const start=pageIndex*cardsPerPage;return pagination_petsData.slice(start,start+cardsPerPage).map(((item,index)=>`<li class="pets-paginator__list-item" data-card-index="${index}">${pet_card_default()(item)}</li>`)).join("")}(pageIndex);const page=document.createElement("div");return page.classList.add("pets-paginator__page"),page.style.width=pageWrapper.offsetWidth+"px",page.setAttribute("data-page-index",pageIndex),page.appendChild(list),page}function getPagesNumber(){return Math.floor(pagination_petsData.length/cardsPerPage)}function pagination_handleWindowResize(){const newCardsPerPage=pagination_getCardsPerSlide();cardsPerPage!==newCardsPerPage&&(cardsPerPage=newCardsPerPage,generatePages(),changePage(0,!0)),pages.forEach((page=>{page.style.width=`${pageWrapper.offsetWidth}px`}));const offset=activePage*pageWrapper.offsetWidth;pageContainer.style.left=`-${offset}px`}function changePage(index,isCardsPerPageChanged=!1){const lastPageIndex=getPagesNumber()-1;Object.keys(controlBtns).forEach((key=>controlBtns[key].classList.remove("button_circle-inactive"))),0===index?(controlBtns.first.classList.add("button_circle-inactive"),controlBtns.prev.classList.add("button_circle-inactive")):index===lastPageIndex&&(controlBtns.next.classList.add("button_circle-inactive"),controlBtns.last.classList.add("button_circle-inactive")),activePage=index,pageNumber.textContent=activePage+1,function movePage(isCardsPerPageChanged=!1){const offset=activePage*pageWrapper.offsetWidth;setTimeout((()=>{isCardsPerPageChanged||(pagination_isTransition=!0,pageContainer.style.transition="left ease-out 0.4s"),pageContainer.style.left=`-${offset}px`}))}(isCardsPerPageChanged)}function pagination_handeTransitionEnd(){pagination_isTransition=!1,pageContainer.style.transition=""}function handleContolsClick(e){if(pagination_isTransition)return;const el=e.target.closest("[data-btn]");if(el)switch(el.dataset.btn){case"first":changePage(0);break;case"prev":changePage(activePage-1);break;case"next":changePage(activePage+1);break;case"last":changePage(getPagesNumber()-1)}}function handlePageContainerClick(e){const el=e.target.closest("[data-card-index]");el&&showModal(el.dataset.cardIndex)}function pagination_init(data){paginator=document.querySelector(".pets-paginator"),pageContainer=paginator.querySelector(".pets-paginator__container"),pageWrapper=paginator.querySelector(".pets-paginator__wrapper"),controls=paginator.querySelector(".pets-paginator__controls"),pageNumber=paginator.querySelector('[data-btn="page-number"]'),controlBtns=["first","prev","next","last"].reduce(((acc,name)=>(acc[name]=paginator.querySelector(`[data-btn="${name}"]`),acc)),{}),cardsPerPage=pagination_getCardsPerSlide(),pagination_petsData=function generatePetsData(data){const petsData=[];for(let i=0;i<6;i+=1)petsData.push(...data);return petsData}(data),function updatePages(){const pagesNumber=getPagesNumber();pageContainer.innerHTML="",pages.length=0;for(let i=0;i<pagesNumber;i+=1){const page=generatePage(i);pages.push(page),pageContainer.appendChild(page)}setTimeout((()=>{pages.forEach((page=>{page.style.width=`${pageWrapper.offsetWidth}px`}))}))}(),window.addEventListener("resize",pagination_handleWindowResize),controls.addEventListener("click",handleContolsClick),pageContainer.addEventListener("click",handlePageContainerClick),pageContainer.addEventListener("transitionend",pagination_handeTransitionEnd)}const pets_namespaceObject=JSON.parse('[{"name":"Katrine","img":"../../assets/images/katrine.png","type":"Cat","breed":"British Shorthair","description":"Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.","age":"6 months","inoculations":["panleukopenia"],"diseases":["none"],"parasites":["none"]},{"name":"Jennifer","img":"../../assets/images/jennifer.png","type":"Dog","breed":"Labrador","description":"Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.","age":"2 months","inoculations":["none"],"diseases":["none"],"parasites":["none"]},{"name":"Woody","img":"../../assets/images/woody.png","type":"Dog","breed":"Golden Retriever","description":"Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.","age":"3 years 6 months","inoculations":["adenovirus","distemper"],"diseases":["right back leg mobility reduced"],"parasites":["none"]},{"name":"Sophia","img":"../../assets/images/sophia.png","type":"Dog","breed":"Shih tzu","description":"Sophia here and I\'m looking for my forever home to live out the best years of my life. I am full of energy. Everyday I\'m learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.","age":"1 month","inoculations":["parvovirus"],"diseases":["none"],"parasites":["none"]},{"name":"Timmy","img":"../../assets/images/timmy.png","type":"Cat","breed":"British Shorthair","description":"Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.","age":"2 years 3 months","inoculations":["calicivirus","viral rhinotracheitis"],"diseases":["kidney stones"],"parasites":["none"]},{"name":"Charly","img":"../../assets/images/charly.png","type":"Dog","breed":"Jack Russell Terrier","description":"This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.","age":"8 years","inoculations":["bordetella bronchiseptica","leptospirosis"],"diseases":["deafness","blindness"],"parasites":["lice","fleas"]},{"name":"Scarlett","img":"../../assets/images/scarlett.png","type":"Dog","breed":"Jack Russell Terrier","description":"Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.","age":"3 months","inoculations":["parainfluenza"],"diseases":["none"],"parasites":["none"]},{"name":"Freddie","img":"../../assets/images/freddie.png","type":"Cat","breed":"British Shorthair","description":"Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.","age":"2 months","inoculations":["rabies"],"diseases":["none"],"parasites":["none"]}]'),petsImagePaths=function importAll(r){return r.keys().reduce(((acc,key)=>({...acc,[key.match(/.\/([a-z]*).png/)[1]]:r(key)})),{})}(__webpack_require__(557));Object.keys(petsImagePaths).forEach((key=>{(new Image).src=petsImagePaths[key]})),pets_namespaceObject.forEach((item=>{const name=item.name.toLocaleLowerCase();item.img=petsImagePaths[name]})),document.addEventListener("DOMContentLoaded",(()=>{!function initHeaderMenu(){hamburgerButton.addEventListener("click",handleHamburgerButtonClick)}(),function initModal(data){petsData=data,modal.addEventListener("click",handleModalClick)}(pets_namespaceObject),document.querySelector(".pets-paginator")&&pagination_init(pets_namespaceObject),document.querySelector(".main-pets-slider")&&function init(data){container=document.querySelector(".main-pets-slider"),slideContainer=container.querySelector(".main-pets-slider__slide-container"),slideWrapper=container.querySelector(".main-pets-slider__slide-wrapper"),prevBtn=container.querySelector(".main-pets-slider__next button"),nextBtn=container.querySelector(".main-pets-slider__prev button"),petCards=data.map(((item,index)=>`<li class="main-pets-slider__list-item" data-card-index="${index}">${pet_card_default()(item)}</li>`)),slideContainer.innerHTML="",cardsPerSlide=getCardsPerSlide(),updateSlider(!1),window.addEventListener("resize",handleWindowResize),nextBtn.addEventListener("click",handleNextBtnClick),prevBtn.addEventListener("click",handlePrevBtnClick),slideContainer.addEventListener("transitionend",handeTransitionEnd),slideContainer.addEventListener("click",handleSliderContainerClick)}(pets_namespaceObject)}))},288:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="pet-card">\n  <div class="pet-card__img-container">\n    <img src="'),__append(escapeFn(locals.img)),__append('" alt="charly">\n  </div>\n  <h3 class="pet-card__title">'),__append(escapeFn(locals.name)),__append('</h3>\n  <button class="pet-card__button button">Learn more</button>\n</div>');return __output}},822:module=>{module.exports=function anonymous(locals,escapeFn,include,rethrow){escapeFn=escapeFn||function(markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var __output="";function __append(s){null!=s&&(__output+=s)}with(locals||{})__append('<div class="pet-full-card">\n  <div class="pet-full-card__img">\n    <img src="'),__append(escapeFn(locals.img)),__append('" alt="pet portrait">\n  </div>\n  <div class="pet-full-card__text">\n    <h3 class="pet-full-card__title">'),__append(escapeFn(locals.name)),__append('</h3>\n    <h4 class="pet-full-card__subtitle">'),__append(escapeFn(locals.type)),__append(" - "),__append(escapeFn(locals.breed)),__append('</h4>\n    <p class="pet-full-card__description">'),__append(escapeFn(locals.description)),__append('</p>\n    <ul class="pet-full-card__list">\n      <li class="pet-full-card__list-item"><b>Age:</b> '),__append(escapeFn(locals.age)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Inoculations:</b> '),__append(escapeFn(locals.inoculations)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Diseases:</b> '),__append(escapeFn(locals.diseases)),__append('</li>\n      <li class="pet-full-card__list-item"><b>Parasites:</b> '),__append(escapeFn(locals.parasites)),__append("</li>\n    </ul>\n  </div>\n</div>");return __output}},557:(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./charly.png":61,"./freddie.png":686,"./jennifer.png":880,"./katrine.png":729,"./scarlett.png":205,"./sophia.png":349,"./timmy.png":378,"./woody.png":838};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=557},61:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/charly-ced4e399.png"},686:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/freddie-fadecb22.png"},880:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/jennifer-e36eb697.png"},729:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/katrine-ed5f000e.png"},205:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/scarlett-642d2287.png"},349:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/sophia-2344312c.png"},378:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/timmy-f28b802b.png"},838:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=__webpack_require__.p+"images/woody-9926a26c.png"}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.p="";var __webpack_exports__=__webpack_require__(846)})();
//# sourceMappingURL=main-69a683ea.js.map