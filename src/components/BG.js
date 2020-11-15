import {
    canvas_bg as canvas,
    ctx_bg as ctx
} from "./canvas.js"
import loadImage from '../helpers/index'

export default new function(){
    this.bgImageElement = null
    this.bgImages = [
        {
            x: 0, y: 0,
        },
        {
            x: 0, y: canvas.height,
        },
    ]

    loadImage("assets/img/bg.jpg",(img, type) => {
        if (type === 'load') {
            this.bgImageElement = img
            this.draw()
            setInterval(this.move, 1000 / 100)
        }
    })

    this.draw = () => {
        if (this.bgImageElement) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            this.bgImages.forEach(img => {
                ctx.drawImage(
                    this.bgImageElement,
                    img.x, img.y,
                    canvas.width, canvas.height
                )
            })
            ctx.fill()
        }
    }

    this.move = () => {
        let mustReset = this.bgImages[0].y >= 0
        this.bgImages.forEach((img, idx) => {
            if(mustReset) {
                img.y = ((this.bgImages.length - 1 - idx) * canvas.height) * -1
            } else {
                img.y += .5
            }
        })
        this.draw()
    }

    return this;
}