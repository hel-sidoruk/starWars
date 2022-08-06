/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { createNewElement } from './settings.js';

export function renderMainPage(data) {
  const sectionTitle = createNewElement('h1', ['section-title', 'element-animation'], 'All episodes')
  const content = createNewElement('div', ['content']);
  const numbers = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
  };
  let counter = 0;
  for (const film of data.results) {
    counter++;

    const episode = createNewElement(
      'p',
      ['text', 'element-animation'],
      `Episode ${numbers[film.episode_id]}`,
    );
    const title = createNewElement(
      'h2',
      ['title', 'element-animation'],
      film.title,
    );
    const goBtn = createNewElement(
      'a',
      ['go-btn', 'element-animation'],
      'Go to Episode',
    );
    const image = createNewElement('img', ['image', 'element-animation']);
    const filmBlock = createNewElement('div', ['film']);
    const filmDescr = createNewElement('div', ['film-descr']);
    goBtn.href = `episode.html?episodeID=${counter}`;
    image.src = `images/${film.title.toLowerCase().split(' ').join('-')}.webp`;

    for (const element of [episode, title, goBtn]) filmDescr.append(element);
    filmBlock.append(image);
    filmBlock.append(filmDescr);
    content.append(filmBlock);
  }

  return { content, sectionTitle };
}
