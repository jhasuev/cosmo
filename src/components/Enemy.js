import Game from "../index";
import { isCollised } from '../helper'

export default {
    levelUpTimer: null,
    list: [],
    xp: {
        normal: 10,
        stronger: 20,
        boss: 30,
    },

    move() {
        let step = .04

        this.list.forEach(enemy => {
            enemy.x += enemy.dx
            enemy.y += enemy.dy

            if (enemy.xDir) {
                enemy.dx += step
            } else {
                enemy.dx -= step
            }

            if (Math.abs(enemy.dx) > 1) {
                enemy.xDir = !enemy.xDir
            }

            // проверка столкновений/коллизий с игроком
            if (isCollised({ ...enemy }, { ...Game.user }) && !Game.user.killing) {
                Game.dieRestart()
            }
            if (enemy.y > Game.height - enemy.height && !Game.user.killing) {
                Game.dieRestart()
            }
        })
    },

    add() {
        for (let i = 0; i < 5; i++) {
            let type = this.getRandomType()
            let { width, height } = Game.assets[`enemy_${type}`].img

            width /= 4
            height /= 4

            let xp = Math.floor(this.xp[type] * this.getCoef())

            this.list.push({
                type,
                xp,
                xp_total: xp,

                x: i * (368 / 4 + 50) + 40,
                y: -height,
                dy: .75,
                dx: 0,

                killing: false,
                frame: 0,

                width: width,
                height: height,
            })
        }

        // console.log(this.list)
    },

    getCoef(){
        let xp_coef = 1

        if (Game.info.scores > 10) xp_coef = 1.5
        if (Game.info.scores > 20) xp_coef = 2
        if (Game.info.scores > 30) xp_coef = 3
        if (Game.info.scores > 40) xp_coef = 4
        if (Game.info.scores > 50) xp_coef = 5

        return xp_coef
    },

    getRandomType() {
        if (Math.random() < .8) return 'normal'
        if (Math.random() < .8) return 'stronger'
        return 'boss'
    },

    hit(index) {
        let enemy = this.list[index]
        enemy.xp -= 1

        if (enemy.xp <= 0 && !enemy.killing) {
            if (enemy.type !== 'normal') {
                Game.bullet.up()
            }
            this.levelUpTimer = clearInterval(this.levelUpTimer)
            this.levelUpTimer = setInterval(() => {
                Game.bullet.down()
            }, 10 * 1000)

            enemy.killing = true
            enemy.type = `${enemy.type}_die`

            this.removeEnemiesTimer = clearTimeout(this.removeEnemiesTimer)
            this.kill(index).then(() => {
                enemy.must_remove = true
                this.removeEnemiesTimer = setTimeout(() => {
                    this.list = this.list.filter(enemy => !enemy.must_remove)
                    if (this.list.length === 0) {
                        this.add()
                    }
                },1000 / 24)
            })

            Game.info.scoreUp()
        }
    },

    kill(idx) {
        return new Promise((resolve) => {
            let enemy = this.list[idx]
            let frames = Game.assets['enemy_' + enemy.type].frames

            let interval = setInterval(() => {
                if (++enemy.frame >= frames) {
                    clearInterval(interval)
                    resolve()
                }
            }, 1000 / 24)
        })
    },

    render(ctx) {
        this.list.forEach(enemy => {
            let enemyAsset = Game.assets[`enemy_${enemy.type}`]

            let {img, frames} = enemyAsset

            let sx = img.width / frames * enemy.frame
            let sy = 0
            let sWidth = img.width / frames
            let sHeight = img.height

            ctx.drawImage(img, sx, sy, sWidth, sHeight, enemy.x, enemy.y, enemy.width, enemy.height)

            // если ХП закончилось, пропускаем
            if (enemy.xp <= 0) return;

            let xp_percent = 100 / enemy.xp_total * enemy.xp
            let xp_width = enemy.width / 100 * xp_percent

            let x = enemy.x
            let y = enemy.y - 10
            let h = 2

            let fillStyle = '#fff'
            if (xp_percent < 50) fillStyle = '#f90'
            if (xp_percent < 20) fillStyle = '#f00'

            // фон линии ХП
            ctx.beginPath()
            ctx.fillStyle = 'rgba(255,255,255,.4)'
            ctx.rect(x, y, enemy.width, h)
            ctx.fill()

            // сам ХП
            ctx.beginPath()
            ctx.fillStyle = fillStyle
            ctx.rect(x, y, xp_width, h)
            ctx.fill()
        })
    },

    enemiesGoBack() {
        return new Promise(resolve => {
            let enemyHeight = 0
            this.list.forEach(enemy => {
                enemy._dy = enemy.dy
                enemy.dy = -1

                if (enemyHeight < enemy.height) {
                    enemyHeight = enemy.height
                }
            })

            let goBackInterval = setInterval(() => {
                this.list.forEach(enemy => {
                    enemy.dy *= 1.45
                })

                let maxY = this.list.reduce((max, current) => current.y > max ? current.y : max, -enemyHeight)
                if (maxY <= -enemyHeight) {
                    goBackInterval = clearInterval(goBackInterval)
                    this.list.forEach(enemy => {
                        enemy.dy = enemy._dy
                        enemy.y = 0 - enemy.height * 1.5
                    })
                    resolve()
                }
            }, 1000 / 24)
        })
    },
}