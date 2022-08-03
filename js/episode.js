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

  let imagesContainer = document.createElement('div')
  imagesContainer.classList.add('images-container')

  document.querySelector('.content').append(title)
  document.querySelector('.content').append(text)
  for (let i = 1; i < 9; i++) {
    let image = new Image()
    image.src = `images/${data.title.toLowerCase().split(' ').join('-')}/${i}.webp`
    image.classList.add('element-animation')
   imagesContainer.append(image)
  }
  document.querySelector('.content').append(imagesContainer)
  for (let planet of data.planets) {
    getData(planet).then(res => console.log(res))
  }
  for (let specie of data.species) {
    getData(specie).then(res => console.log(res))
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll(".element-animation");
  for (let elm of elements) {
    observer.observe(elm);
  }
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

