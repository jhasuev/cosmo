import {
  canvas_user as canvas,
  ctx_user as ctx
} from "./canvas.js"

export default new function(){
  this.x = 0
  this.y = 0
  this.styles = {}

  canvas.addEventListener("mousemove", (e) => {
    e = e || event

    let canvasWidth = this.styles.width
    let canvasHeight = this.styles.height

    let percentCursourX = e.layerX / canvasWidth * 100
    let percentCursourY = e.layerY / canvasHeight * 100

    this.x = canvas.width / 100 * percentCursourX
    this.y = canvas.height / 100 * percentCursourY

    // fallback function
    if (this.onmove) this.onmove()
  })

  this.setStyles = styles => {
    this.styles.width = parseFloat(styles.width)
    this.styles.height = parseFloat(styles.height)
  }

  window.addEventListener("resize", () => {
    this.setStyles(getComputedStyle(canvas))
  })
  
  window.addEventListener("load", () => {
    this.setStyles(getComputedStyle(canvas))
  })

  return this
}