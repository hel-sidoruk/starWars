let mouse = document.querySelector(".mouse");
function moveMouse(e) {
  if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
    mouse.style.opacity = 0
  }
  else {
    mouse.style.opacity = 1
    mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`
  }
}
export function initMouse() {
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', moveMouse)


  }
}
