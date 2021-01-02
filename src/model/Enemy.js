import { loadImage } from '../helpers/index'

export default function(){
  this.width = 548 / 7;
  this.height = 754 / 7;
  this.x = null;
  this.y = null;
  this.shakeDistance = 20;
  this.type = 'normal';

  this.image = null

  this.load = fb => {
    if (this.image) return;

    let image_src = ""
    if (this.type == 'normal') image_src = "assets/img/enemy-starship-normal.png"
    if (this.type == 'stronger') image_src = "assets/img/enemy-starship-stronger.png"
    if (this.type == 'boss') image_src = "assets/img/enemy-starship-boss.png"

    loadImage(image_src,(img) => {
      this.image = img
      if (fb) fb()
    })
  }

  return this;
}