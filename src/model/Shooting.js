import { getRatioHeight } from '../helpers/index'

export default function(args){
  this.image = null
  this.width = null
  this.height = null
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

    this.image = document.getElementById("bullet-img")

    if (!this.width || !this.height) {
      let width = 20
      let height = getRatioHeight(width, this.image.width, this.image.height)

      this.width = width
      this.height = height
    }

    if (fb) fb()
  }

  this.isOutOfEdges = () => {
    return this.y + this.height < 0
  }

  return this;
}