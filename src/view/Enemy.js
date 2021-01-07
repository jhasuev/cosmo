export default function(){
  this.canvas = document.getElementById("enemy")
  this.ctx = this.canvas.getContext("2d")

  this.draw = ({ images_default, type, images_die, images_die_options, width, height, x, y, xp, status }) => {
    let image;
    if (status == 'dying') {
      image = images_die[type]
    } else {
      image = images_default[type]
    }

    if (image) {
      this.ctx.beginPath()
      if (status == 'dying') {

        let sx = images_die_options.sx
        let sy = images_die_options.sy
        let sWidth = images_die_options.sWidth
        let sHeight = images_die_options.sHeight

        this.ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height)
      } else {
        this.ctx.drawImage(image, x, y, width, height)
      }
      this.ctx.fill()
    } else {
      this.ctx.beginPath()
      this.ctx.rect(x, y, width, height)
      this.ctx.fillStyle = 'red'
      this.ctx.fill()
    }

    if (status != 'dying') {
      this.ctx.beginPath()
      this.ctx.font = `bold 20px "Trebuchet MS"`
      this.ctx.fillStyle = '#fff'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(xp, x + (width / 2), y + (height / 2))
      this.ctx.fill()
    }
  }

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  return this;
}