import {
  canvas_user as canvas,
  ctx_user as ctx
} from "./canvas.js"
import loadImage from '../helpers/index'

export default new function(){
  this.width = 444 / 4
  this.height = 376 / 4
  this.userImageElement = null

  loadImage("assets/img/user-starship.png",(img, type) => {
    if (type === 'success') {
      this.userImageElement = img
      this.remove()
      this.drawUser()
    }
  })

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
    if (this.userImageElement) {
      ctx.drawImage(this.userImageElement, this.position.x, this.position.y, this.width, this.height)
    } else {
      ctx.rect(this.position.x, this.position.y, this.width, this.height)
      ctx.fillStyle = '#73c902'
    }
    ctx.fill()
  }

  this.move = (x, y) => {
    this.remove()
    this.setPositions(x, y)
    this.drawUser()
  }

  this.remove = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return this
}