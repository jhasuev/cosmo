import { loadImage } from '../helpers/index'

export default function(){
  this.width = 548 / 7;
  this.height = 754 / 7;
  this.x = null;
  this.y = null;
  this.shakeDistance = 20;
  // this.xp = 10;

  this.image = null

  this.load = fb => {
    if (this.image) return;

    loadImage("assets/img/enemy-starship.png",(img) => {
      this.image = img
      if (fb) fb()
    })
  }

  return this;
}