import { initPreloader } from './js/preloader-animation.js'
import { initMouse } from './js/mouse.js'
import { initBackground } from './js/background.js'
initPreloader()
initMouse()
initBackground()



async function getdata() {
  let response = await fetch('https://swapi.dev/api/films/')
  return await response.json()
}
getdata().then(res => render(res.results))


// <div class="film">
//  <img class="image element-animation" src="images/a-new-hope.webp" />
//  <div class="film-descr">
//    <p class="text element-animation">Episode IV</p>
//    <h2 class="title element-animation">A New Hope</h2>
//    <a href="#" class="go-btn element-animation">Go to Episode</a>
//  </div>
//</div>
//<div class="film">
//  <div class="film-descr">
//    <p class="text element-animation">Episode V</p>
//    <h2 class="title element-animation">The Empire Strikes Back</h2>
//    <a href="#" class="go-btn element-animation">Go to Episode</a>
//  </div>
//  <img class="image image-right element-animation" src="images/the-empire-strikes-back.webp" />
//</div>

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('element-show');
    }
  });
}

function render(data) {
  let numbers = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI'
  }
  for (let film of data) {
    let episode = document.createElement('p')
    episode.classList.add('text', 'element-animation')
    episode.textContent = `Episode ${numbers[film.episode_id]}`
    console.log(film.episode_id);
    console.log('film.episode_id % 2 ==', film.episode_id % 2);

    let title = document.createElement('h2')
    title.classList.add('title', 'element-animation')
    title.textContent = film.title

    let goBtn = document.createElement('a')
    goBtn.classList.add('go-btn', 'element-animation')
    goBtn.href = '#'
    goBtn.textContent = 'Go to Episode'

    let image = new Image()
    if (film.episode_id % 2 != 0) image.classList.add('image-right')
    image.classList.add('image', 'element-animation')
    image.src = `images/${film.title.toLowerCase().split(' ').join('-')}.webp`

    let filmBlock = document.createElement('div')
    filmBlock.classList.add('film')
    let filmDescr = document.createElement('div')
    filmDescr.classList.add('film-descr')
    filmDescr.append(episode)
    filmDescr.append(title)
    filmDescr.append(goBtn)
    filmBlock.append(image)
    filmBlock.append(filmDescr)
    document.querySelector('.content').append(filmBlock)
    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.element-animation');
    for (let elm of elements) {
      observer.observe(elm);
    }
  }
}

