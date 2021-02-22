import Game from "../index";

export default {
    scores: null,
    recordScores: null,
    lives: null,

    render(ctx) {
        let fz = 20
        let offsets = 10
        let box_width = 150
        let line = 3
        let box_height = (fz * line) + offsets * line
        let y = Game.height - box_height

        // фон
        ctx.beginPath()
        ctx.fillStyle = 'rgba(0,0,0,.5)'
        ctx.rect(0, y, box_width, box_height)
        ctx.fill()
        ctx.beginPath()

        // текста
        ctx.fillStyle = '#fff'
        ctx.font = `bold ${fz}px "Trebuchet MS"`
        let texts = [
            `Lives: ${this.lives}`,
            `Scores: ${this.scores}`,
            `Record: ${this.recordScores}`,
        ]
        texts.forEach((text, index) => {
            ctx.fillText(text, 0 + offsets, y + offsets + fz * (index + 1), box_width - offsets * 2)
        })
        ctx.fill()
    },

    scoreUp() {
        if (++this.scores > this.recordScores) {
            this.recordScores = this.scores
            localStorage.recordScores = this.scores
        }
    },

    setDefault() {
        this.lives = 5
        this.scores = 0
        this.recordScores = localStorage.recordScores || 0
    },
}