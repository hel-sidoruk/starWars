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

  let planetsContainer = document.createElement('div')
  planetsContainer.classList.add('planets-container')
  planetsContainer.append(titlePlanets)


  if (data.planets.length > 2) document.querySelector('.content').append(showAllBtn)
  for (let planet of data.planets) {
    let hidden = false
    if (data.planets.indexOf(planet) >= 2) hidden = true
    let grid = false
    if (data.planets.indexOf(planet) == data.planets.length - 1 && data.planets.length % 2 != 0) grid = true
    getData(planet).then(res => {
      let planetBlock = renderPlanet(res, hidden, grid)
      planetsContainer.append(planetBlock)
    })

  }
  if (data.planets.length > 2) planetsContainer.append(showAllBtn)
  document.querySelector('.content').append(planetsContainer)

  for (let i = 1; i < 9; i++) {
    let image = new Image()
    image.src = `images/${data.title.toLowerCase().split(' ').join('-')}/${i}.webp`
    image.classList.add('episode-image', 'element-animation')
    document.querySelector('.content').append(image)
  }

  let titleSpecies = document.createElement('h2')
  titleSpecies.classList.add('title', 'species-title')
  titleSpecies.textContent = 'Species'

  let speciesContainer = document.createElement('div')
  speciesContainer.classList.add('species-container')
  speciesContainer.append(titleSpecies)
  for (let species of data.species) {
    getData(species).then(res => {
      let speciesItem = renderSpecies(res)
      speciesContainer.append(speciesItem)
    })
  }

  document.querySelector('.content').append(speciesContainer)

  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");
  for (let elm of elements) {
    observer.observe(elm);
  }
}

function renderSpecies(data) {
  let speciesBlock = document.createElement('div')
  speciesBlock.classList.add('species')

  let speciesImage = new Image()
  speciesImage.classList.add('species-image')
  if (data.name == `Yoda's species`) {
    speciesImage.src = `images/species/yoda.webp`
  }
  else {
    speciesImage.src = `images/species/${data.name.toLowerCase().split(' ').join('-')}.webp`
  }

  let speciesName = document.createElement('h3')
  speciesName.classList.add('species-name', 'text')
  if (data.name == `Yoda's species`) {
    speciesName.textContent = 'Yoda'
  }
  else {
    speciesName.textContent = data.name
  }



  speciesBlock.addEventListener('click', function(){
    let modalContent = document.querySelector('.species-modal-content')
    document.querySelector('.modal').classList.add('modal--active')
    let imagesSrc = this.firstElementChild.src
    let idx = imagesSrc.indexOf('images')
    let path = imagesSrc.slice(idx)
    let imageSpecies = new Image()
    imageSpecies.src = path
    document.querySelector('.species-modal').insertBefore(imageSpecies, modalContent)
    modalContent.firstElementChild.textContent = this.lastElementChild.textContent
    for (let value of ['average_height', 'average_lifespan', 'classification', 'eye_colors', 'hair_colors', 'language', 'skin_colors']) {
      document.getElementById(value).textContent = data[value]
    }
  })

  speciesBlock.addEventListener("mouseover", () => {
    document.querySelector(".mouse").classList.add("species-link-visible");
  });
  speciesBlock.addEventListener("mouseleave", () => {
    document.querySelector(".mouse").classList.remove("species-link-visible");
  });


  speciesBlock.append(speciesImage)
  speciesBlock.append(speciesName)

  return speciesBlock
}



function renderPlanet(planet, hidden, grid) {
  let planetBlock = document.createElement('div')
  planetBlock.classList.add('planet-block')
  if (hidden) planetBlock.classList.add('planet-block--hidden')
  if (grid) planetBlock.classList.add('planet-block--12')
  for (let value of ['name', 'population', 'terrain', 'climate', 'diameter']) addPlanetDescr(planet, value, planetBlock)
  return planetBlock
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

let modal = document.querySelector('.modal')

document.querySelector('.back-link').addEventListener("mouseover", () => {
  document.querySelector(".mouse").classList.add("back-link-visible");
});
document.querySelector('.back-link').addEventListener("mouseleave", () => {
  document.querySelector(".mouse").classList.remove("back-link-visible");
});

document.querySelector('.modal').addEventListener('click', (e)=>{
  if (e._isClickedInsideModal) return
  modal.classList.remove('modal--active')
  modal.querySelector('img').remove()
})

document.querySelector('.species-modal').addEventListener('click', (e)=>{
  e._isClickedInsideModal = true
})
