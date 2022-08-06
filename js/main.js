/* eslint-disable import/extensions */
import {
  preloader, starWarsDemo, URL, loadResource, appContainer,
} from './settings.js';
import { initPreloader, animateaAppearingElements } from './animation.js';
import { initMouse, mouseHoverEffect } from './mouse.js';
import { initBackground } from './background.js';

initMouse();
initBackground();

const searchParams = new URLSearchParams(window.location.search);
const filmID = searchParams.get('episodeID');

if (window.location.pathname === '/index.html') {
  if (!searchParams.get('back')) initPreloader();
  else {
    starWarsDemo.remove();
    preloader.classList.add('preloader--hidden');
  }
}

function renderPage(moduleName, apiUrl, cssStyles) {
  Promise.all([moduleName, apiUrl, cssStyles].map((src) => loadResource(src)))
    .then(([pageModule, data]) => {
      appContainer.append(pageModule.renderMainPage(data));
      animateaAppearingElements();
      document.querySelectorAll('a').forEach((link) => {
        mouseHoverEffect(link, 'links-visible');
      });
    });
}

function renderFilmPage(data) {
  Promise.all([
    Promise.all(data.planets.map((src) => loadResource(src))),
    Promise.all(data.species.map((src) => loadResource(src))),
    loadResource('./render-film.js'),
    loadResource('css/film-page.css'),
  ])
    .then(([planets, species, module]) => {
      appContainer.append(module.renderFilm(data, planets, species));
      animateaAppearingElements();
    });
}

if (filmID) {
  loadResource(`${URL}/${filmID}`).then((res) => renderFilmPage(res));
  mouseHoverEffect(document.querySelector('.back-link'), 'back-link-visible');
} else {
  renderPage(
    './render-main.js',
    URL,
    'css/main-page.css',
  );
}
