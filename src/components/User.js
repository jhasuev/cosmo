import {
  canvas_user as canvas,
  ctx_user as ctx
} from "./canvas.js"

export default new function(){
  this.width = 50
  this.height = 50

  this.position = { x :  0, y : 0 }

  this.setPositions = (x, y) => {
    this.position.x = x - this.width / 2
    this.position.y = y - this.height / 2

    if (this.position.x < 0) this.position.x = 0
    if (this.position.y < 0) this.position.y = 0

    if (this.position.x + this.width > canvas.width) {
      this.position.x = canvas.width - this.width
    }
    if (this.position.y + this.height > canvas.height) {
      this.position.y = canvas.height - this.height
    }
  }

  this.setPositions(canvas.width / 2, canvas.height -  this.height * 2)

  this.drawUser = () => {
    ctx.beginPath()
    ctx.rect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = '#73c902'
    ctx.fill()
  }

  this.move = (x, y) => {
    this.remove()
    this.setPositions(x, y)
    this.drawUser()
  }

  this.remove = () => {
    ctx.clearRect(this.position.x - 1, this.position.y - 1, this.width + 2, this.height + 2)
  }

  return this
}