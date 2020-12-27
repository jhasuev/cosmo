import { loadImage } from '../helpers/index'

export default function(){
  this.image = null
  this.width = 444 / 4
  this.height = 376 / 4
  this.position = { x :  150, y : 150 }

  this.load = fb => {
    loadImage("assets/img/user-starship.png",(img) => {
      this.image = img
      if (fb) fb()
    })
  }

  this.setPositions = (x, y, canvas) => {
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

  this.initStartPositions = (canvas) => {
    this.setPositions(canvas.width / 2, canvas.height -  this.height * 2, canvas)
  }

  return this;
}