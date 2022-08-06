/* eslint-disable import/extensions */
import { preloader, starWarsDemo } from './settings.js';

const text = 'May the force be with you'.split('');
const title = document.getElementById('byline');

export function initPreloader() {
  text.forEach((letter) => {
    const span = document.createElement('span');
    if (letter === ' ') letter = '&nbsp';
    span.innerHTML = letter;
    title.appendChild(span);
  });

  starWarsDemo.classList.add('starwars-demo--amimate');

  setTimeout(() => {
    starWarsDemo.remove();
  }, 7000);
  setTimeout(() => {
    preloader.classList.add('preloader--hidden');
  }, 7200);
}

function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

export function animateaAppearingElements() {
  const options = { threshold: [0.5] };
  const observer = new IntersectionObserver(onEntry, options);
  const animatedElements = document.querySelectorAll('.element-animation');
  for (const elm of animatedElements) {
    observer.observe(elm);
  }
}
