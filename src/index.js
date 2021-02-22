import './scss/main.scss'
import Movement from "./components/Movement";
import User from "./components/User";
import Enemy from "./components/Enemy"
import Bullet from "./components/Bullet"
import Info from "./components/Info"

// TODO: отрефакторить код
const Game = {
    canvas: undefined,
    ctx: undefined,
    width: 720,
    height: 1280,

    movement: Movement,
    user: User,
    enemy: Enemy,
    bullet: Bullet,
    info: Info,

    assets: {
        bg: 'assets/img/bg.jpg',
        user: {
            img: 'assets/img/user-starship.png',
            frames: 1,
        },
        user_die: {
            img: 'assets/img/user-starship-die-sprite.png',
            frames: 10,
        },
        bullet: 'assets/img/bullet2.png',

        enemy_normal: {
            img: 'assets/img/enemy-starship-normal.png',
            frames: 1,
        },
        enemy_stronger: {
            img: 'assets/img/enemy-starship-stronger.png',
            frames: 1,
        },
        enemy_boss: {
            img: 'assets/img/enemy-starship-boss.png',
            frames: 1,
        },
        enemy_normal_die: {
            img: 'assets/img/enemy-starship-normal-die-sprite.png',
            frames: 10,
        },
        enemy_stronger_die: {
            img: 'assets/img/enemy-starship-stronger-die-sprite.png',
            frames: 10,
        },
        enemy_boss_die: {
            img: 'assets/img/enemy-starship-boss-die-sprite.png',
            frames: 10,
        },
    },

    init() {
        this.canvas = document.getElementById("game")
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx = this.canvas.getContext("2d")

        this.load().then(() => {
            this.movement.init()
            this.info.setDefault()
            this.setPositions()
            this.start()
        })
    },

    load() {
        return new Promise(resolve => {
            let imagesCount = Object.keys(this.assets).length
            let loadedCount = 0

            for (let asset in this.assets) {
                let img = new Image()

                if (typeof this.assets[asset] == 'object') {
                    img.src = this.assets[asset].img
                    this.assets[asset].img = img
                } else {
                    img.src = this.assets[asset]
                    this.assets[asset] = img
                }

                img.onload = () => {
                    if (imagesCount > ++loadedCount) {
                        resolve()
                    }
                }
            }
        })
    },

    start() {
        this.run()
        this.bullet.start()
        this.enemy.add()
    },

    run() {
        this.update()
        this.render()

        requestAnimationFrame(() => {
            this.run()
        })
    },

    update() {
        // движение потрнов
        this.bullet.move()

        // удаление потронов
        this.bullet.removeIfNeeded()

        // установка позиции игрока + потронов
        this.setPositions()

        // движение врагов
        this.enemy.move()
    },

    render() {
        this.ctx.drawImage(this.assets.bg, 0, 0, this.width, this.height)

        this.user.render(this.ctx)
        this.enemy.render(this.ctx)
        this.bullet.render(this.ctx)
        this.info.render(this.ctx)
    },

    setPositions() {
        // установка позиции игрока
        this.user.x = this.movement.x - this.user.width / 2
        this.user.y = this.movement.y - this.user.height / 2

        // установка позиции появления потронов
        this.bullet.x = this.user.x + this.user.width / 2 - this.bullet.width / 2
        this.bullet.y = this.user.y - this.bullet.height
    },

    dieRestart(){
        this.bullet.stop()
        this.user.kill(this.assets.user_die).then(() => {
            Game.enemy.enemiesGoBack().then(() => {
                if (this.info.lives <= 0) {
                    this.info.setDefault()
                }
                this.user.killing = false
                this.user.frame = 0
                this.movement.setPositionsDefault()
                this.info.lives -= 1
                this.bullet.start()
            })
        })
    },
}

export default Game
Game.init();
