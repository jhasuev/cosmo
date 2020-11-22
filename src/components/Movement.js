import {
  canvas_user as canvas,
} from "./canvas.js"

export default new function(){
  this.x = 0
  this.y = 0
  this.styles = {}

  this.setPositions = (event) => {
    let canvasWidth = this.styles.width
    let canvasHeight = this.styles.height

    let layerX,
        layerY;

    if (event.type == 'touchmove') {
      let touch = event.touches[0]
      layerX = touch.clientX - touch.target.offsetLeft
      layerY = touch.clientY - touch.target.offsetTop
    } else {
      layerX = event.layerX
      layerY = event.layerY
    }

    let percentCursorX = layerX / canvasWidth * 100
    let percentCursorY = layerY / canvasHeight * 100

    this.x = canvas.width / 100 * percentCursorX
    this.y = canvas.height / 100 * percentCursorY

    // fallback function
    if (this.onmove) this.onmove()
  }

  canvas.addEventListener("mousemove", this.setPositions)
  canvas.addEventListener("touchmove", this.setPositions)

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