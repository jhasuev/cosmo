import {
  canvas_shooting as canvas,
  ctx_shooting as ctx
} from "./canvas.js"

import Enemy from './Enemy.js'
import { loadImage } from '../helpers/index'

export default new function(){
  this.position = { x: null, y: null }

  this.offsets = 1.2

  this.width = 88 / 5
  this.height = 272 / 5

  this.step = 10
  this.speed = 5
  this.interval = 300

  this.bulletImageElement = null

  this.bullets = []
  this.bulletCount = 1

  this.moveTimer = null
  this.addTimer = null


  loadImage("assets/img/bullet1.png",(img, type) => {
    if (type === 'success') {
      this.bulletImageElement = img
    }
  })

  this.draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bullets.forEach(bullet => {
      if (this.bulletImageElement) {
        ctx.beginPath()
        ctx.drawImage(
            this.bulletImageElement,
            bullet.x,
            bullet.y,
            this.width,
            this.height
        )
        ctx.fill()
      }
    })
  }

  this.goNext = () => {
    if (!this.bulletImageElement) return;

    let disapperedBullets = []
    this.bullets.forEach((bullet, bulletID) => {
      bullet.y -= this.step

      let xTo = bullet.xStart / 5
      if (xTo) {
        bullet.xStart -= xTo
        bullet.x += xTo
        bullet.y += Math.abs(xTo) * (Math.abs(xTo) / 20)
      }

      if (bullet.y + bullet.height < 0) {
        disapperedBullets.push(bulletID)
        return;
      }

      let bulletStartX = bullet.x
      let bulletStopX = bullet.x + bullet.width
      let bulletStartY = bullet.y
      let bulletStopY = bullet.y + bullet.height

      for(let enemyIDX in Enemy.enemies) {
        let enemy = Enemy.enemies[enemyIDX]
        switch(false){
          case enemy.x + Enemy.conf.width > bulletStartX :break;
          case enemy.x < bulletStopX :break;
          case enemy.y + Enemy.conf.height / 1.5 > bulletStartY :break;
          case enemy.y < bulletStopY :break;

          default:
            // бъем по поражению / противнику
            Enemy.enemyHit(enemyIDX)

            // убираем пулю / снаряд
            disapperedBullets.push(bulletID)
            this.bullets[bulletID].inEnemy = true

            return;
        }
      }
    })

    this.remove(disapperedBullets)
  }

  this.add = () => {
    if (!isFinite(this.position.x) || !isFinite(this.position.y)) return;

    // размеры пушек, взависимости от их количество
    let sizes = [
          {
            width: this.width,
            height: this.height
          },
          {
            width: this.width  / 1.5,
            height: this.height  / 1.5
          },
          {
            width: this.width / 2,
            height: this.height / 2
          },
          {
            width: this.width / 2.5,
            height: this.height / 2.5
          },
        ]
    let size = sizes[this.bulletCount - 1] || sizes[sizes.length - 1]

    let xStart = this.position.x - (size.width * this.offsets) * this.bulletCount + size.width * this.offsets

    for (let i = 0; i < this.bulletCount; i++){
      xStart += (size.width * this.offsets) * 2 * (!!i * 1)
      this.bullets.push({
        width: size.width,
        height: size.height,
        xStart: xStart - this.position.x,
        x: this.position.x - size.width / 2,
        y: this.position.y - this.bulletCount * 5,
      })
    }

  }
  
  this.remove = bulletIDs => {
    bulletIDs.forEach(bulletID => {
      if (!this.bullets[bulletID]) return;
      // убираем пулю
      if (
          // если она за пределами холста
          this.bullets[bulletID].y + this.bullets[bulletID].height < 0
          // или сбил врага
          || this.bullets[bulletID].inEnemy
      ) {
        this.bullets.splice(bulletID, 1)
      }
    })
  }

  this.start = () => {
    if (this.moveTimer) this.stop()

    // движение пул
    this.moveTimer = setInterval(() => {
      if (!this.moveTimer) return;

      this.move()
    }, this.speed)

    // создание/добавление новых пул
    this.addTimer = setInterval(() => {
      if (this.addTimer) this.add()
    }, this.interval)
  }

  this.move = () => {
    this.draw()
    this.goNext()
  }
  
  this.stop = () => {
    clearInterval(this.moveTimer)
    clearInterval(this.addTimer)
    this.moveTimer = null
    this.addTimer = null
  }

  this.setPositions = (x, y) => {
    this.position.x = x
    this.position.y = y
  }

  this.start()

  return this
}