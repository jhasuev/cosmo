import Game from "../index";

export default {
    list: [],
        enemy_conf: {
    xp: {
        normal: 10,
            stronger: 20,
            boss: 30,
    },
    xp_coef: 1,
},

    move(){
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
        if (Game.user.isCollised({ ...enemy }) && !Game.user.killing) {
            this.list.forEach(enemy => {
                enemy._dy = enemy.dy
                enemy.dy = -Game.height / 24
            })
            Game.user.kill(Game.assets.user_die).then(() => {
                Game.movement.setPositionsDefault()
                Game.info.lives -= 1

                if (Game.info.lives <= 0) {
                    Game.info.setDefault()
                }

                this.list.forEach(enemy => {
                    enemy.dy = enemy._dy
                    enemy.y = 0 - enemy.height * 1.5
                    delete enemy._dy
                })
            })
        }
    })
},

    add(){
    for (let i = 0; i < 5; i++) {
        let type = this.getRandomType()
        let { width, height } = Game.assets[`enemy_${type}`].img

        width /= 4
        height /= 4

        let xp = Math.floor(this.enemy_conf.xp[type] * this.enemy_conf.xp_coef)

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
},

    getRandomType(){
    if (Math.random() < .8) return 'normal'
    if (Math.random() < .8) return 'stronger'
    return 'boss'
},

    hit(index){
    let enemy = this.list[index]
    enemy.xp -= 1

    if (enemy.xp <= 0) {
        if (enemy.type != 'normal') {
            Game.bullet.upTo(enemy.type)
        }

        enemy.killing = true
        enemy.type = `${enemy.type}_die`

        this.kill(index).then(() => {
            this.list.splice(index, 1)
            if (this.list.length == 0) {
                this.add()
            }
        })

        Game.info.scoreUp()
    }
},

    kill(idx){
    return new Promise((resolve) => {
        let enemy = this.list[idx]
        let frames = Game.assets['enemy_' + enemy.type].frames

        let interval = setInterval(() => {
            if(++enemy.frame >= frames) {
                clearInterval(interval)
                resolve()
            }
        }, 1000 / 24)
    })
},

    render(ctx){
    this.list.forEach(enemy => {
        let enemyAsset = Game.assets[`enemy_${enemy.type}`]

        let { img, frames } = enemyAsset

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
        ctx.rect(x,y, enemy.width, h)
        ctx.fill()

        // сам ХП
        ctx.beginPath()
        ctx.fillStyle = fillStyle
        ctx.rect(x,y, xp_width, h)
        ctx.fill()
    })
},
}