const preloader = document.querySelector('.preloader');
const starWarsDemo = document.querySelector('.starwars-demo');
const appContainer = document.querySelector('.app-container');
const mouse = document.querySelector('.mouse');
const URL = 'https://swapi.dev/api/films';
const cssPromices = {};

export function createNewElement(element, className, text) {
  const newElement = document.createElement(element);
  newElement.classList.add(...className);
  if (text) newElement.textContent = text;
  return newElement;
}

export function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }
  if (src.endsWith('.css')) {
    if (!cssPromices[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromices[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.appendChild(link);
    }
    return cssPromices[src];
  }
  return fetch(src).then((res) => res.json());
}

export {
  preloader, starWarsDemo, mouse, URL, appContainer
};
