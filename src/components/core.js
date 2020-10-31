import { canvas, ctx } from "./canvas.js"

function fitCanvas() {
  let scale_x = window.innerWidth / canvas.width
  let scale_y = window.innerHeight / canvas.height
  let scale = Math.min(scale_x, scale_y)
  canvas.style.transform = `scale(${scale})`
}

window.addEventListener("load", fitCanvas)
window.addEventListener("resize", fitCanvas)