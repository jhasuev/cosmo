import Game from "../index";

export default {
    x: 720 / 2 - 368 / 4 / 2,
    y: 1000,
    ratio: 4,
    width: 368 / 4,
    height: 503 / 4,
    killing: false,
    frame: 0,

    render(ctx, asset) {
        const {img, frames} = asset

        const sx = img.width / frames * this.frame
        const sy = 0
        const sWidth = img.width / frames
        const sHeight = img.height

        ctx.drawImage(img, sx, sy, sWidth, sHeight, this.x, this.y, this.width, this.height)
    },

    kill(asset) {
        return new Promise(resolve => {
            this.killing = true
            this.frame = 0

            let killingInterval = setInterval(() => {
                if (++this.frame >= asset.frames) {
                    clearInterval(killingInterval)
                    this.killing = false
                    this.frame = 0
                    resolve()
                }
            }, 1000 / 24)
        })
    },

    isCollised({x, y, width, height}) {
        let bulletStartX = x
        let bulletStopX = x + width
        let bulletStartY = y
        let bulletStopY = y + height

        return this.x + this.width > bulletStartX
            && this.x < bulletStopX
            && this.y + this.height / 1.5 > bulletStartY
            && this.y < bulletStopY;
    },
}