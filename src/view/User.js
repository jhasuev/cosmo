export default function(){
    this.canvas = document.getElementById("user")
    this.ctx = this.canvas.getContext("2d")

    this.draw = ({ image, width, height, position }) => {
        this.clear()

        this.ctx.beginPath()

        if (image) {
          this.ctx.drawImage(image, position.x, position.y, width, height)
        } else {
          this.ctx.rect(position.x, position.y, width, height)
          this.ctx.fillStyle = '#73c902'
        }

        this.ctx.fill()
    }

    this.clear = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    return this;
}