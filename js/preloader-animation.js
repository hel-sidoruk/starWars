let text = 'May the force be with you'.split('')
let title = document.getElementById('byline')
let preloader = document.querySelector('.preloader')

export function initPreloader() {
  text.forEach(letter=>{
    let span = document.createElement('span')
    if (letter == ' ') letter = '&nbsp'
    span.innerHTML = letter
    title.appendChild(span)
  })
  setTimeout(() => {
    document.querySelector('.starwars-demo').remove()
  }, 7000);
  setTimeout(() => {
    preloader.classList.add('preloader--hidden')
  }, 7200);
}
