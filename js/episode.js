import { initMouse } from "./mouse.js";
import { initBackground } from "./background.js";
initMouse()
initBackground()

async function getFilm(id) {
  let response = await fetch(`https://swapi.dev/api/films/${id}`);
  return await response.json();
}
async function getData(url) {
  let response = await fetch(url);
  return await response.json();
}

let searchParams = new URLSearchParams(location.search)
let filmID = searchParams.get('episodeID')
getFilm(filmID).then(res => renderFilm(res))
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    }
  });
}

function renderFilm(data) {
  document.title = data.title
  console.log(data);
  let title = document.createElement("h1");
  title.classList.add("film-title");
  title.textContent = data.title;

  let text = document.createElement('p')
  text.textContent = data.opening_crawl
  text.classList.add('film-text')

  document.querySelector('.episode-container').classList.add(data.title.toLowerCase().split(' ').join('-'))

  document.querySelector('.content').append(title)
  document.querySelector('.content').append(text)
  let titlePlanets = document.createElement('h2')
  titlePlanets.classList.add('title', 'planet-title')
  titlePlanets.textContent = 'Planets'

  let showAllBtn = document.createElement('button')
  showAllBtn.textContent = 'Show all planets'
  showAllBtn.classList.add('show-planets', 'go-btn')
  showAllBtn.setAttribute('data-switch', true)
  showAllBtn.addEventListener("mouseover", () => {
    document.querySelector(".mouse").classList.add("links-visible");
  });
  showAllBtn.addEventListener("mouseleave", () => {
    document.querySelector(".mouse").classList.remove("links-visible");
  });
  showAllBtn.addEventListener('click', ()=>{
    if (showAllBtn.dataset.switch == 'true') {
      document.querySelectorAll('.planet-block--hidden').forEach(element=>{
        element.classList.remove('planet-block--hidden')
      })
      showAllBtn.setAttribute('data-switch', false)
      showAllBtn.textContent = 'Hide'
    }
    else if (showAllBtn.dataset.switch == 'false'){
      let arr = document.querySelectorAll('.planet-block')
      for (let i = 2; i < arr.length; i++) {
        arr[i].classList.add('planet-block--hidden')
      }
      showAllBtn.setAttribute('data-switch', true)
      showAllBtn.textContent = 'Show all planets'

    }
  })

  if (data.planets.length > 2) document.querySelector('.content').append(showAllBtn)
  for (let planet of data.planets) {
    let hidden = false
    if (data.planets.indexOf(planet) >= 2) hidden = true
    let grid = false
    if (data.planets.indexOf(planet) == data.planets.length - 1 && data.planets.length % 2 != 0) grid = true
    getData(planet).then(res => {
      renderPlanet(res, hidden, grid)
    })

  }
  for (let i = 1; i < 9; i++) {
    let image = new Image()
    image.src = `images/${data.title.toLowerCase().split(' ').join('-')}/${i}.webp`
    image.classList.add('episode-image', 'element-animation')
    document.querySelector('.content').append(image)
  }
  document.querySelector('.content').append(titlePlanets)
  // for (let species of data.characters) {
  //   getData(species).then(res => console.log(res))
  // }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");
  for (let elm of elements) {
    observer.observe(elm);
  }
}
function renderPlanet(planet, hidden, grid) {
  let planetBlock = document.createElement('div')
  planetBlock.classList.add('planet-block')
  if (hidden) planetBlock.classList.add('planet-block--hidden')
  if (grid) planetBlock.classList.add('planet-block--12')
  for (let value of ['name', 'population', 'terrain', 'climate', 'diameter']) addPlanetDescr(planet, value, planetBlock)
  document.querySelector('.content').append(planetBlock)
}

function addPlanetDescr(planet, query, planetBlock) {
  let text = document.createElement('p')
  text.classList.add('planet-descr', 'text')
  text.innerHTML = `<span class="planet-text">${query}: </span>${planet[query]}`
  planetBlock.append(text)
}

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseover", () => {
    document.querySelector(".mouse").classList.add("links-visible");
  });
  link.addEventListener("mouseleave", () => {
    document.querySelector(".mouse").classList.remove("links-visible");
  });
});

document.querySelector('.back-link').addEventListener("mouseover", () => {
  document.querySelector(".mouse").classList.add("back-link-visible");
});
document.querySelector('.back-link').addEventListener("mouseleave", () => {
  document.querySelector(".mouse").classList.remove("back-link-visible");
});
