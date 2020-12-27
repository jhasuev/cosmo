import { loadImage } from '../helpers/index'

export default function(){
    this.image = null;
    this.positions = [
        {x: 0, y: 0},
        {x: 0, y: 0},
    ]

    this.load = fb => {
        loadImage("assets/img/bg.jpg",(img, type) => {
            this.image = img

            if (fb) fb()
        })
    }

    this.move = (canvas) => {
        let mustReset = this.positions[0].y >= 0
        this.positions.forEach((img, idx) => {
            if(mustReset) {
                img.y = ((this.positions.length - 1 - idx) * canvas.height) * -1
            } else {
                img.y += 2
            }
        })
    }

    return this;
}