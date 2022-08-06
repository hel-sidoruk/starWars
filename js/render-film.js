/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import { createNewElement } from './settings.js';
import { mouseHoverEffect } from './mouse.js';

const modal = document.querySelector('.modal');
const speciesModal = document.querySelector('.species-modal');
const modalContent = document.querySelector('.species-modal-content');
const planetHiddenClass = 'planet-block--hidden';

function getSpeciesItem(data) {
  const speciesBlock = createNewElement('div', ['species']);
  const speciesImage = createNewElement('img', ['species-image']);
  const speciesName = createNewElement('h3', ['species-name', 'text'], data.name);

  if (data.name === 'Yoda\'s species') {
    speciesImage.src = 'images/species/yoda.webp';
    speciesName.textContent = 'Yoda';
  } else {
    speciesImage.src = `images/species/${data.name.toLowerCase().split(' ').join('-')}.webp`;
  }

  // eslint-disable-next-line func-names
  speciesBlock.addEventListener('click', function () {
    modal.classList.add('modal--active');
    document.body.classList.add('stop-scroll');
    const imagesSrc = this.firstElementChild.src;
    const idx = imagesSrc.indexOf('images');
    const path = imagesSrc.slice(idx);
    const imageSpecies = new Image();
    imageSpecies.src = path;
    speciesModal.insertBefore(imageSpecies, modalContent);
    modalContent.firstElementChild.textContent = this.lastElementChild.textContent;
    for (const value of ['average_height', 'average_lifespan', 'classification', 'eye_colors', 'hair_colors', 'language', 'skin_colors']) {
      document.getElementById(value).textContent = data[value];
    }
  });

  mouseHoverEffect(speciesBlock, 'species-link-visible');

  speciesBlock.append(speciesImage);
  speciesBlock.append(speciesName);

  return speciesBlock;
}

function getPlanetItem(planet, hidden, grid) {
  const planetBlock = createNewElement('div', ['planet-block']);
  if (hidden) planetBlock.classList.add('planet-block--hidden');
  if (grid) planetBlock.classList.add('planet-block--12');
  for (const value of ['name', 'population', 'terrain', 'climate', 'diameter']) {
    const text = createNewElement('p', ['planet-descr', 'text']);
    text.innerHTML = `<span class="planet-text">${value}: </span>${planet[value]}`;
    planetBlock.append(text);
  }
  return planetBlock;
}

function renderPlanets(planetsArray) {
  const planetsContainer = createNewElement('div', ['planets-container']);
  const titlePlanets = createNewElement('h2', ['title', 'planet-title'], 'Planets');
  const showAllBtn = createNewElement('button', ['show-planets', 'go-btn'], 'Show all planets');

  showAllBtn.setAttribute('data-switch', true);
  showAllBtn.addEventListener('click', () => {
    if (showAllBtn.dataset.switch === 'true') {
      document.querySelectorAll(`.${planetHiddenClass}`).forEach((element) => {
        element.classList.remove(planetHiddenClass);
      });
      showAllBtn.setAttribute('data-switch', false);
      showAllBtn.textContent = 'Hide';
    } else if (showAllBtn.dataset.switch === 'false') {
      const arr = document.querySelectorAll('.planet-block');
      for (let i = 2; i < arr.length; i++) {
        arr[i].classList.add(planetHiddenClass);
      }
      showAllBtn.setAttribute('data-switch', true);
      showAllBtn.textContent = 'Show all planets';
    }
  });

  planetsContainer.append(titlePlanets);
  if (planetsArray.length > 2) planetsContainer.append(showAllBtn);
  for (const planet of planetsArray) {
    let hidden = false;
    if (planetsArray.indexOf(planet) >= 2) hidden = true;
    let grid = false;
    if (planetsArray.indexOf(planet) === planetsArray.length - 1 && planetsArray.length % 2 !== 0) {
      grid = true;
    }
    const planetBlock = getPlanetItem(planet, hidden, grid);
    planetsContainer.append(planetBlock);
  }

  mouseHoverEffect(showAllBtn, 'links-visible');
  return planetsContainer;
}

function renderSpecies(speciesArray) {
  const speciesContainer = createNewElement('div', ['species-container']);
  const titleSpecies = createNewElement('h2', ['title', 'species-title'], 'Species');

  speciesContainer.append(titleSpecies);

  for (const species of speciesArray) {
    const speciesItem = getSpeciesItem(species);
    speciesContainer.append(speciesItem);
  }

  modal.addEventListener('click', (e) => {
    if (e._isClickedInsideModal) return;
    document.body.classList.remove('stop-scroll');
    modal.classList.remove('modal--active');
    modal.querySelector('img').remove();
  });

  speciesModal.addEventListener('click', (e) => {
    e._isClickedInsideModal = true;
  });

  return speciesContainer;
}

export function renderFilm(data, planetsArray, speciesArray) {
  const episodeContainer = document.querySelector('.episode-container');
  const content = createNewElement('div', ['content']);
  const title = createNewElement('h1', ['film-title', 'element-animation'], data.title);
  const text = createNewElement('p', ['film-text', 'element-animation'], data.opening_crawl);
  content.append(title);
  content.append(text);
  for (let i = 1; i < 9; i++) {
    const image = createNewElement('img', ['episode-image', 'element-animation']);
    image.src = `images/${data.title.toLowerCase().split(' ').join('-')}/${i}.webp`;
    content.append(image);
  }
  content.append(renderPlanets(planetsArray));
  content.append(renderSpecies(speciesArray));

  document.title = data.title;
  episodeContainer.classList.add(data.title.toLowerCase().split(' ').join('-'));

  return content;
}
