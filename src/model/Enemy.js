import { getRatioHeight } from '../helpers/index'

export default function(){
  this.width = 70;
  this.height = 96;
  this.x = null;
  this.y = null;
  this.shakeDistance = 20;
  this.type = 'normal';
  this.status = 'alive';

  this.images_default = {
    "normal" : document.getElementById('enemy-normal-img'),
    "stronger" : document.getElementById('enemy-stronger-img'),
    "boss" : document.getElementById('enemy-boss-img'),
  }
  this.images_die = {
    "normal" : document.getElementById('enemy-normal-die-img'),
    "stronger" : document.getElementById('enemy-stronger-die-img'),
    "boss" : document.getElementById('enemy-boss-die-img'),
  }

  this.images_die_options = {
    slideIndex: 0,
    sx: this.images_die[this.type].width / 10 * 0,
    sy: 0,
    sWidth: this.images_die[this.type].width / 10,
    sHeight: this.images_die[this.type].height,
  }

  this.kill = () => {
    this.status = 'dying'

    return new Promise((resolve) => {

      setInterval(() => {
        if(this.setDieSlide() == 'end') {
          resolve()
        }
      }, 1000 / 24)
    })
  }

  this.setDieSlide = () => {
    if (this.images_die_options.slideIndex >= 10) return 'end';

    this.images_die_options.slideIndex += 1
    this.images_die_options.sx = this.images_die[this.type].width / 10 * this.images_die_options.slideIndex
  }

  this.load = fb => {
    if (fb) fb()
  }

  return this;
}