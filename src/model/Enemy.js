import { getRatioHeight } from '../helpers/index'

export default function(){
  this.width = null;
  this.height = null;
  this.x = null;
  this.y = null;
  this.shakeDistance = 20;
  this.type = 'normal';

  this.image = null
  this.images = {
    "normal" : document.getElementById('enemy-normal-img'),
    "stronger" : document.getElementById('enemy-stronger-img'),
    "boss" : document.getElementById('enemy-boss-img'),
  }

  this.load = fb => {
    if (this.image) return;

    this.image = this.images[this.type]
    let width = 70
    let height = getRatioHeight(width, this.image.width, this.image.height)

    this.width = width
    this.height = height

    if (fb) fb()
  }

  return this;
}