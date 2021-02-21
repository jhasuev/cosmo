import Game from "../index";

export default {
    x: 0,
    y: 0,
    width: 20,
    height: 58,
    offset: .75,
    list: [],

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

    get create_interval() {
        return this.types[this.type].interval
    },
    get speed() {
        return this.types[this.type].speed
    },
    get count() {
        return this.types[this.type].count
    },

    add() {
        let x = this.x - (this.width * this.offset) * this.count + this.width * this.offset

        for (let i = 0; i < this.count; i++) {
            x += (this.width * this.offset) * 2 * (!!i * 1)
            this.list.push({
                x,
                y: this.y + 11,
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
        this.list.forEach((bullet, bullet_index) => {
            bullet.y -= bullet.dy
            bullet.x -= bullet.dx

            if (bullet.y + bullet.height < 0) {
                bullet.readyToRemove = true
                return;
            }

            // смотрим, побили ли мы что-нибудь
            for (let enemyIDX in Game.enemy.list) {
                let enemy = Game.enemy.list[enemyIDX]
                if (enemy.killing)
                    continue;

                if (this.isCollised(enemy, bullet_index)) {
                    // бъем по поражению / противнику
                    Game.enemy.hit(enemyIDX)

                    // убираем пулю / снаряд
                    bullet.readyToRemove = true

                    return;
                }
            }

        })
    },

    isCollised(enemy, bullet_index) {
        let bullet = this.list[bullet_index]
        let bulletStartX = bullet.x
        let bulletStopX = bullet.x + bullet.width
        let bulletStartY = bullet.y - bullet.dy
        let bulletStopY = bullet.y + bullet.height - bullet.dy

        return enemy.x + enemy.width > bulletStartX
            && enemy.x < bulletStopX
            && enemy.y + enemy.height / 1.5 > bulletStartY
            && enemy.y < bulletStopY;
    },

    upTo(type) {
        switch (type) {
            case 'fast':
            case 'boss':
                this.type = 'fast'
                break;
            case 'stronger':
            case 'secondary':
                this.type = 'secondary'
                break;
            default:
                this.type = 'default'
        }

        setTimeout(() => {
            this.down()
        }, 10000)
    },

    down() {
        let levels = ["default", "secondary", "fast"]
        let currentIndex = levels.indexOf(this.type)
        if (--currentIndex < 0) {
            currentIndex = 0
        }
        this.type = levels[currentIndex]
    },
}