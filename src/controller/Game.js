// Models
import BgModel from '../model/Bg.js'
import UserModel from '../model/User.js'
import EnemyModel from '../model/Enemy.js'
import ShootingModel from '../model/Shooting.js'
import InfoModel from '../model/Info.js'

// Views
import BgView from '../view/Bg.js'
import UserView from '../view/User.js'
import EnemyView from '../view/Enemy.js'
import ShootingView from '../view/Shooting.js'
import InfoView from '../view/Info.js'

// User moving system
import Movement from '../core/movement.js'

export default new function (){
    this.UserModel = new UserModel()
    this.BgModel = new BgModel()
    this.ShootingModel = ShootingModel
    this.InfoModel = new InfoModel()

    this.UserView = new UserView()
    this.BgView = new BgView()
    this.EnemyView = new EnemyView()
    this.InfoView = InfoView
    this.ShootingView = ShootingView

    // Настройки для потронов
    this.bullets = [] // все потроны / конструкторы
    this.bulletCount = 1 // кол-во потронов за раз
    this.enemyHitCounts = 10
    this.bulletStep = 22 // шаг поли
    this.bulletOffset = 1 // расстояние между потронами
    this.bulletStartPos = { x: 150, y: 350 } // позиция, где будут появляться потроны (меняется при перемешение персонажа)

    // Настройки противников
    this.enemies = []

    this.init = () => {
        this.BgInit()
        this.UserInit()
        this.ShootingInit()
        this.EnemyInit()
        this.ShowInfo()
    }

    this.ShowInfo = () => {
        this.InfoView.showInfo(this.InfoModel)
    }

    this.UpdateInfo = (info) => {
        if (typeof info.score == 'number') this.InfoModel.setScore(info.score)
        if (typeof info.xp == 'number') this.InfoModel.setXP(info.xp)

        this.ShowInfo()
    }

    /**
     *  .BgInit() | Служит для инициализации фона + его анимированию
     */
    this.BgInit = () => {
        if (!this.BgModel) this.BgModel = new BgModel()
        if (!this.BgView) this.BgView = new BgView()

        this.BgModel.load(() => {
            this.BgDraw()
        })


        clearInterval(this.BgTimer)
        this.BgTimer = null

        this.BgTimer = setInterval(() => {
            if (!this.BgTimer) return;
            this.BgModel.move(this.BgView.canvas)
            this.BgDraw()
        }, 1000 / 60)
    }

    /**
     *  .BgDraw() | Служит для вырисовки самого фона
     */
    this.BgDraw = () => {
        this.BgView.draw({ ...this.BgModel })
    }

    /**
     * .UserInit() | Инициализация персонажа / игрока
     */
    this.UserInit = () => {
        if (!this.UserModel) return;
        this.UserModel.initStartPositions(this.UserView.canvas)

        this.UserModel.load(() => {
            this.UserDraw()

            let UserMovement = new Movement(this.UserView.canvas)

            // перемешение игрока при ховере
            UserMovement.onmove(position => {
                this.UserModel.setPositions(position.x, position.y, this.UserView.canvas)
                this.UserDraw()
            })
        })
    }

    /**
     * .UserDraw() | Служит для вырисовки самого персонажа / игрока
     */
    this.UserDraw = () => {
        this.UserView.draw({ ...this.UserModel })
    }

    this.isUserCollidingWithEnemy = () => {
        let isCollided = false

        let userTop = this.UserModel.position.y
        let userBottom = userTop + this.UserModel.height
        let userLeft = this.UserModel.position.x
        let userRight = userLeft + this.UserModel.width

        for(let enemyIDX in this.enemies) {
            let enemy = this.enemies[enemyIDX]

            let enemyTop = enemy.y
            let enemyBottom = enemyTop + enemy.height
            let enemyLeft = enemy.x
            let enemyRight = enemyLeft + enemy.width
            if (
                enemyTop < userBottom
                && enemyBottom > userTop
                && enemyLeft < userRight
                && enemyRight > userLeft
            ) {
                isCollided = true
                break;
            }
        }

        return isCollided
    }

    this.ShootingInit = () => {
        let ShootingMovement = new Movement(this.UserView.canvas)

        // установка позиции потронов по умолчанию
        this.bulletStartPos.x = this.UserModel.position.x + this.UserModel.width / 2
        this.bulletStartPos.y = this.UserModel.position.y

        // смена позиции появления потронов при перемешения игрока
        ShootingMovement.onmove(({x, y}) => {
            if (x < this.UserModel.width / 2) {
                x = this.UserModel.width / 2
            }
            if (this.UserView.canvas.width - x < this.UserModel.width / 2) {
                x = this.UserView.canvas.width - this.UserModel.width / 2
            }

            this.bulletStartPos.x = x
            this.bulletStartPos.y = y
        })

        // добавление потронов
        this.ShootingAddingInterval = setInterval(() => {
            if (!this.ShootingAddingInterval) return;

            this.ShootingAdd()
            this.ShootingDraw()
        }, 500)

        // движение потронов
        this.ShootingMovingInterval = setInterval(() => {
            if (!this.ShootingMovingInterval) return;

            this.ShootingMove()
            this.ShootingDraw()
        }, 10)
    }

    /**
     * .ShootingDraw() | служит для вырисовки потрона
     * */
    this.ShootingDraw = () => {
        this.ShootingView.clear()
        this.bullets.forEach(bullet => {
            this.ShootingView.draw({ ...bullet })
        })
    }

    /**
     * .this.ShootingAdd() | добавляет потрон
     * */
    this.ShootingAdd = () => {
        let Shooting = new this.ShootingModel()
        // размеры пушек, взависимости от их количество
        let sizes = [
            {
                width: Shooting.width,
                height: Shooting.height
            },
            {
                width: Shooting.width  / 1.25,
                height: Shooting.height  / 1.25
            },
            {
                width: Shooting.width / 1.5,
                height: Shooting.height / 1.5
            },
            {
                width: Shooting.width / 1.75,
                height: Shooting.height / 1.75
            },
        ]
        let size = sizes[this.bulletCount - 1] || sizes[sizes.length - 1]

        let xStart = this.bulletStartPos.x - (size.width * this.bulletOffset) * this.bulletCount + size.width * this.bulletOffset

        for (let i = 0; i < this.bulletCount; i++){
            xStart += (size.width * this.bulletOffset) * 2 * (!!i * 1)

            let NewShootingModel = new ShootingModel({
                width: size.width,
                height: size.height,
                xStart: xStart - this.bulletStartPos.x,
                x: this.bulletStartPos.x - size.width / 2,
                y: this.bulletStartPos.y - this.bulletCount * 5,
            })

            NewShootingModel.load(() => {
                this.ShootingDraw()
            })

            this.bullets.push(NewShootingModel)
        }

        // console.log(this.bullets)
    }

    /**
     * .ShootingMove() | двигает потронов
     * TODO: дописать функционал сбивание противников...
     * */
    this.ShootingMove = () => {
        let disappearedBullets = []
        this.bullets.forEach((bullet, bulletID) => {
            bullet.y -= this.bulletStep

            let xTo = bullet.xStart / 5
            if (xTo) {
                bullet.xStart -= xTo
                bullet.x += xTo
                bullet.y += Math.abs(xTo) * (Math.abs(xTo) / 20)
            }

            if (bullet.isOutOfEdges()) {
                return disappearedBullets.push(bulletID)
            }

            let bulletStartX = bullet.x
            let bulletStopX = bullet.x + bullet.width
            let bulletStartY = bullet.y
            let bulletStopY = bullet.y + bullet.height

            // смотрим, побили ли мы что-нибудь
            for(let enemyIDX in this.enemies) {
                let enemy = this.enemies[enemyIDX]
                switch(false){
                    case enemy.x + enemy.width > bulletStartX :break;
                    case enemy.x < bulletStopX :break;
                    case enemy.y + enemy.height / 1.5 > bulletStartY :break;
                    case enemy.y < bulletStopY :break;

                    default:
                        // бъем по поражению / противнику
                        // enemy.enemyHit(enemyIDX)
                        this.EnemyHit(enemyIDX)

                        // убираем пулю / снаряд
                        disappearedBullets.push(bulletID)
                        this.bullets[bulletID].inEnemy = true

                        return;
                }
            }
        })

        if (this.isUserCollidingWithEnemy()) {
            this.UpdateInfo({
                xp: this.InfoModel.xp - 1
            })
        }

        this.ShootingRemove(disappearedBullets)
    }

    /**
     * .ShootingRemove() | для удалении потронов, которые находятся за границей игры
     * или же которые сбили врагов
     * */
    this.ShootingRemove = bulletIDs => {
        bulletIDs.forEach(bulletID => {
            if (!this.bullets[bulletID]) return;
            // убираем пулю
            if (
                // если она за пределами холста
                this.bullets[bulletID].isOutOfEdges()
                // или сбил врага
                || this.bullets[bulletID].inEnemy
            ) {
                this.bullets.splice(bulletID, 1)
            }
        })
    }

    this.EnemyInit = () => {
        this.EnemyAdd()
        this.EnemyMoveTimer = setInterval(() => {
            if(this.EnemyMoveTimer) {
                this.EnemyMove()
                this.EnemyDraw()
            }
        }, 50)
    }

    this.EnemyAdd = () => {
        const perOnRow = 5
        const offset = 50

        let exampleModel = new EnemyModel()

        // TODO: ровно по центру что-то пока не получается, потом попробовать поправить
        let xEnd = this.EnemyView.canvas.width - (perOnRow * (exampleModel.width + offset))
        if (xEnd - exampleModel.width / 2 < 0) {
            return console.error("xEnd is not correct:", xEnd);
        }

        let x = xEnd / 2 + offset / 2
        for(let i = 0; i < perOnRow; i++){
            let model = new EnemyModel()
                model.x = x
                model.y = 0 - model.height
                model.xp = this.enemyHitCounts

            model.load()
            this.enemies.push(model)

            x += model.width + offset
        }
    }


    this.EnemyMove = () => {
        this.enemies.forEach(enemy => {

            if(!('originX' in enemy)) {
                enemy.originX = enemy.x
                enemy.shakeXDirection = true
            }

            // слишком вправо ушло, меняем направление движения (возвращаем влево)
            if (enemy.x > enemy.originX + enemy.shakeDistance) {
                enemy.shakeXDirection = false
            }

            // слишком влево ушло, меняем направление движения (возвращаем вправо)
            if (enemy.x < enemy.originX - enemy.shakeDistance) {
                enemy.shakeXDirection = true
            }

            // TODO: сделать так, чтоб двигался медленее, когда он будет находится ближе к изначальной точке
            let step = 1

            // двигаем влево/вправо
            if (enemy.shakeXDirection) {
                enemy.x += step
            } else {
                enemy.x -= step
            }

            // двигаем врага вниз
            enemy.y += 1
        })
    }

    this.EnemyDraw = () => {
        this.EnemyView.clear()
        this.enemies.forEach(enemy => {
            this.EnemyView.draw({...enemy})
        })
    }

    this.EnemyHit = enemyIDX => {
        // снижаем хп у противника
        --this.enemies[enemyIDX].xp

        if (this.enemies[enemyIDX].xp <= 0) {

            // убиваем противника, если у него закончилось хп
            this.enemies.splice(enemyIDX, 1)

            // если врагов больше нет
            if (!this.enemies.length) {
                this.enemyHitCounts += 10
                this.EnemyAdd()
            }

            // добавляем потроны
            if (this.bulletCount < 5) {
                this.bulletCount++
            }

            // добавляем очко игроку (не то что вы подумали)
            this.UpdateInfo({ score: this.InfoModel.score + 1 })
        }
    }
}