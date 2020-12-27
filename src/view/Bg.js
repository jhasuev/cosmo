export default function(){
    this.canvas = document.getElementById("bg")
    this.ctx = this.canvas.getContext("2d")

    this.draw = ({ image, positions }) => {
        if (!image || !positions || !Array.isArray(positions)) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        positions.forEach(img => {
            this.ctx.drawImage(
                image,
                img.x, img.y,
                this.canvas.width, this.canvas.height
            )
        })
        this.ctx.fill()
    }

    return this;
}