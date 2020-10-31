import { canvas, ctx } from "./canvas.js"

export function User() {
  this.width = 50
  this.height = 50

  this.position = {
    x : canvas.width / 2 - this.width / 2,
    y : canvas.height - this.height * 2,
  }

  this.draw = () => {
    ctx.beginPath()
    ctx.rect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = 'red'
    ctx.fill()
  }

  this.move = (x,y) => {
    this.remove()
    this.position.x = x
    this.position.y = y
    this.draw()
  }

  this.remove = () => {
    ctx.clearRect(this.position.x, this.position.y, this.width, this.height)
  }

  return this
}