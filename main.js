import { initBackground } from './js/background.js'


let text = 'May the force be with you'.split('')

let title = document.getElementById('byline')
text.forEach(letter=>{
  let span = document.createElement('span')
  if (letter == ' ') letter = '&nbsp'
  span.innerHTML = letter
  title.appendChild(span)
})

let preloader = document.querySelector('.preloader')

initBackground()

setTimeout(() => {
  document.querySelector('.starwars-demo').remove()
}, 7000);
setTimeout(() => {
  preloader.classList.add('preloader--hidden')
}, 7200);

async function getdata() {
  let response = await fetch('https://swapi.dev/api')
  return await response.json()
}
getdata().then(res => console.log(res))
