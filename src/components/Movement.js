import Game from "../index";
export default {
    x: 0,
    y: 0,
    positions: {
        start: {},
        move: {},
        origin: {},
    },
    styles: {},

    init(){
        [
            "mousedown",
            "mousemove",
            "mouseup",
            "mouseleave",

            "touchstart",
            "touchmove",
            "touchend",
        ].forEach(eventType => {
            Game.canvas.addEventListener(eventType, (event) => {
                this.setPositions(event)
            })
        });

        ["load", "resize"].forEach(eventType => {
            window.addEventListener(eventType, () => {
                this.setStyles(getComputedStyle(Game.canvas))
            })
        });

        this.setPositionsDefault()
    },

    setPositions(event){
        let { x, y } = this.getPositions(event)
        x = x || this.positions.move.x || this.x
        y = y || this.positions.move.y || this.y

        if (["mousedown", "touchstart"].includes(event.type)) {
            this.positions.start.x = x
            this.positions.start.y = y
            this.positions.move.x = x
            this.positions.move.y = y
            this.positions.origin.x = this.x
            this.positions.origin.y = this.y
        }
        if (["mousemove", "touchmove"].includes(event.type)) {
            this.positions.move.x = x
            this.positions.move.y = y
        }
        if (["mouseup", "touchend", "mouseleave"].includes(event.type)) {
            this.clearPositions()
        }

        if (["mousemove", "touchmove"].includes(event.type) && (this.positions.start.x || this.positions.start.y)) {
            this.x = this.positions.origin.x + ((this.positions.move.x - this.positions.start.x) * 1.15)
            this.y = this.positions.origin.y + ((this.positions.move.y - this.positions.start.y) * 1.15)

            // границы
            if (this.y - Game.user.height / 2 < 0) this.y = Game.user.height / 2
            if (Game.user.height / 2 > Game.height - this.y) this.y = Game.height - Game.user.height / 2

            if (Game.user.width / 2 > this.x) this.x = Game.user.width / 2
            if (Game.user.width / 2 > Game.width - this.x) this.x = Game.width - Game.user.width / 2
        }

    },

    clearPositions(){
        this.positions.start.x = null
        this.positions.start.y = null
        this.positions.move.x = null
        this.positions.move.y = null
        this.positions.origin.x = null
        this.positions.origin.y = null
    },

    setPositionsDefault(){
        this.x = 720 / 2
        this.y = 1100

        this.clearPositions()
    },

    getPositions(event){
        let layerX;
        let layerY;
        let { width, height } = this.styles

        if ([ "touchstart", "touchmove" ].includes(event.type)) {
            let touch = event.touches[0]

            layerX = touch.clientX - touch.target.offsetLeft
            layerY = touch.clientY - touch.target.offsetTop
        } else {
            layerX = event.layerX
            layerY = event.layerY
        }

        let percentCursorX = layerX / width * 100
        let percentCursorY = layerY / height * 100

        let x = Game.width / 100 * percentCursorX
        let y = Game.height / 100 * percentCursorY

        return { x, y }
    },

    setStyles(styles) {
        this.styles.width = parseFloat(styles.width)
        this.styles.height = parseFloat(styles.height)
    },

}