import Game from "../index";
import { isCollised } from '../helper'

export default {
    x: 0,
    y: 0,
    width: 20,
    height: 58,
    offset: .75,
    list: [],
    createTimeout: null,

    type: "default",
    types: {
        default: {
            interval: 300, // ms
            speed: 20, // px | step
            count: 1, // bullets count
        },
        secondary: {
            interval: 200, // ms
            speed: 40, // px | step
            count: 2, // bullets count
        },
        fast: {
            interval: 150, // ms
            speed: 50, // px | step
            count: 3, // bullets count
        },
    },
    levels: ["default", "secondary", "fast"],

    get create_interval() {
        return this.types[this.type].interval
    },
    get speed() {
        return this.types[this.type].speed
    },
    get count() {
        return this.types[this.type].count
    },

    start(){
        this.stop()
        this.createTimeout = setTimeout(() => {
            this.add()
            this.start()
        }, this.create_interval)
    },
    stop(){
        this.createTimeout = clearTimeout(this.createTimeout)
    },

    render(ctx){
        this.list.forEach(bullet => {
            ctx.drawImage(Game.assets.bullet, bullet.x, bullet.y, bullet.width, bullet.height)
        })
    },

    add() {
        let x = this.x - (this.width * this.offset) * this.count + this.width * this.offset

        for (let i = 0; i < this.count; i++) {
            x += this.width * this.offset * 2 * !!i
            this.list.push({
                x,
                y: this.y + (15 * this.count),
                dx: 0,
                dy: this.speed,
                width: this.width,
                height: this.height,
                readyToRemove: false,
            })
        }
    },

    removeIfNeeded() {
        this.list = this.list.filter(bullet => !bullet.readyToRemove)
    },

    move() {
        this.list.forEach((bullet) => {
            bullet.y -= bullet.dy
            bullet.x -= bullet.dx

            if (bullet.y + bullet.height < 0) {
                bullet.readyToRemove = true
                return;
            }

            // смотрим, побили ли мы что-нибудь
            for (let enemyIDX in Game.enemy.list) {
                let enemy = Game.enemy.list[enemyIDX]
                if (enemy.killing) {
                    continue;
                }

                if (isCollised({ ...enemy }, { ...bullet })) {
                    // бъем по поражению / противнику
                    Game.enemy.hit(enemyIDX)
                    // убираем пулю / снаряд
                    bullet.readyToRemove = true
                    return;
                }
            }

        })
    },

    up() {
        let currentIndex = this.levels.indexOf(this.type)

        if (++currentIndex > this.levels.length - 1) {
            currentIndex = this.levels.length - 1
        }

        this.type = this.levels[currentIndex]
    },

    down() {
        let currentIndex = this.levels.indexOf(this.type)

        if (--currentIndex < 0) {
            currentIndex = 0
        }

        this.type = this.levels[currentIndex]
    },
}