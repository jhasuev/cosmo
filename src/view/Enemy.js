export default function(){
  this.canvas = document.getElementById("enemy")
  this.ctx = this.canvas.getContext("2d")

  this.draw = ({ image, x, y, width, height, xp }) => {
    this.ctx.beginPath()
    if (image) {
      this.ctx.drawImage(image, x, y, width, height)
    } else {
      this.ctx.rect(x, y, width, height)
      this.ctx.fillStyle = 'red'
    }

    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.font = `bold 20px "Trebuchet MS"`
    this.ctx.fillStyle = '#fff'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(xp, x + (width / 2), y + (height / 2))
    this.ctx.fill()
  }

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  return this;
}