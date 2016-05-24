const uiWidth = 750
const d = document.documentElement
const res = () => {
  d.style.fontSize = 100 / uiWidth * d.clientWidth + 'px'
}
res()
window.addEventListener('resize', res)