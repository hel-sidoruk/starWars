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

  for (let planet of data.planets) {
    getData(planet).then(res => renderPlanet(res))
  }
  for (let i = 1; i < 9; i++) {
    let image = new Image()
    image.src = `images/${data.title.toLowerCase().split(' ').join('-')}/${i}.webp`
    image.classList.add('episode-image', 'element-animation')
    document.querySelector('.content').append(image)
  }
  document.querySelector('.content').append(titlePlanets)
  for (let species of data.species) {
    getData(species).then(res => console.log(res.name))
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");
  for (let elm of elements) {
    observer.observe(elm);
  }
}
function renderPlanet(planet) {
  let planetBlock = document.createElement('div')
  planetBlock.classList.add('planet-block')
  let planetName = document.createElement('p')
  planetName.classList.add('planet-descr')
  planetName.classList.add('text')
  planetName.innerHTML = `<span class="planet-text">Name: </span>${planet.name}`
  let population = document.createElement('p')
  population.classList.add('planet-descr')
  population.classList.add('text')
  population.innerHTML = `<span class="planet-text">Population: </span>${planet.population}`
  let terrain = document.createElement('p')
  terrain.classList.add('planet-descr')
  terrain.classList.add('text')
  terrain.innerHTML = `<span class="planet-text">Terrain: </span>${planet.terrain}`
  let orbitalPeriod = document.createElement('p')
  orbitalPeriod.classList.add('planet-descr')
  orbitalPeriod.classList.add('text')
  orbitalPeriod.innerHTML = `<span class="planet-text">Orbital Period: </span>${planet.orbital_period}`
  let climate = document.createElement('p')
  climate.classList.add('planet-descr')
  climate.classList.add('text')
  climate.innerHTML = `<span class="planet-text">Climate: </span>${planet.climate}`
  let diameter = document.createElement('p')
  diameter.classList.add('planet-descr')

  diameter.classList.add('text')
  diameter.innerHTML = `<span class="planet-text">Diameter: </span>${planet.diameter}`
  for (let value of [planetName, population, terrain, orbitalPeriod, climate, diameter]) planetBlock.append(value)
  document.querySelector('.content').append(planetBlock)
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

