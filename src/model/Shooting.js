import { loadImage } from '../helpers/index'

export default function(args){
  this.image = null
  this.width = 138 / 7
  this.height = 289 / 7
  this.x = null
  this.y = null
  this.xStart = null

  if (args) {
    this.width = args.width
    this.height = args.height
    this.x = args.x
    this.y = args.y
    this.xStart = args.xStart
  }

  this.load = fb => {
    if (this.image) return;

    loadImage("assets/img/bullet2.png",(img) => {
      this.image = img
      if (fb) fb()
    })
  }

  this.isOutOfEdges = () => {
    return this.y + this.height < 0
  }

  return this;
}