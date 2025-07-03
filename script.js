'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollTobtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const linksContainer = document.querySelector('.nav__links');
const tabButtons = document.querySelectorAll('.operations__tab');
const tabButtonsContainer = document.querySelector(
  '.operations__tab-container'
);
const operationsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scrolling

scrollTobtn.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation using smooth scrolling

linksContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    // console.log(e.target);
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed component

tabButtonsContainer.addEventListener('click', function (e) {
  // console.log(e.target);
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;
  tabButtons.forEach(b => b.classList.remove('operations__tab--active'));
  operationsContent.forEach(c =>
    c.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Hovering effect to nav links

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Adding sticky navigation using Intersection Oberver API

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const headerObserfunc = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerObserfunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Revealing element on a scroll

// console.log(allSections);

const sectionObserverFunction = function (entries, oberver) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    oberver.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(sectionObserverFunction, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


//Lazy loading images

// console.log(lazyImages);

const imageObeserverfun = function(entries, observer)
{
  const [entry] = entries;
  console.log(entry); 

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imageObeserver = new IntersectionObserver(imageObeserverfun, {
  root : null,
  threshold : 0,
  rootMargin : '200px'
});

lazyImages.forEach(image => imageObeserver.observe(image));

