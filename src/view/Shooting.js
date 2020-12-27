export default new function(){
  this.canvas = document.getElementById("shooting")
  this.ctx = this.canvas.getContext("2d")

  this.draw = ({ image, x, y, width, height }) => {
    this.ctx.beginPath()
    if (image) {
      this.ctx.drawImage(image, x, y, width, height)
    } else {
      this.ctx.rect(x, y, width, height)
      this.ctx.fillStyle = 'red'
    }

    this.ctx.fill()
  }

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  return this;
}