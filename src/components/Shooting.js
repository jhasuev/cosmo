import {
  canvas_shooting as canvas,
  ctx_shooting as ctx,
  loadImage
} from "./canvas.js"
import Enemy from './Enemy.js'

export default new function(){
  this.position = { x: null, y: null }

  this.conf = {
    offsets: 1.2, // расстаянние между шарами (пульками)
    size: 20, // ball size | px
    step: 10, // move step | px
    speed: 5, // time for each step | ms
    interval: 100, // interval between create a new bullet | ms
  }

  this.bulletImageElement = null

  this.bullets = []
  this.bulletCount = 1

  this.moveTimer = null
  this.addTimer = null


  loadImage("assets/img/bullet.png",(img, type) => {
    if (type === 'load') {
      this.bulletImageElement = img
    }
  })

  this.draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bullets.forEach(bullet => {
      ctx.beginPath()

      if (this.bulletImageElement) {
        ctx.drawImage(
            this.bulletImageElement,
            bullet.x - bullet.size / 2,
            bullet.y - bullet.size / 2,
            this.conf.size,
            this.conf.size
        )
      } else {
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, 2 * Math.PI)
        ctx.fillStyle = "#dc4a07"
      }

      ctx.fill()
    })
  }

  this.goNext = () => {
    let disapperedBullets = []
    this.bullets.forEach((bullet, bulletID) => {
      bullet.y -= this.conf.step

      let xTo = bullet.xStart / 5
      if (xTo) {
        bullet.xStart -= xTo
        bullet.x += xTo
        bullet.y += Math.abs(xTo) * (Math.abs(xTo) / 20)
      }

      if (bullet.y + bullet.size / 2 < 0) {
        disapperedBullets.push(bulletID)
      }

      let bulletStartY = bullet.y - bullet.size / 2
      let bulletStopY = bullet.y + bullet.size / 2
      let bulletStartX = bullet.x - bullet.size / 2
      let bulletStopX = bullet.x + bullet.size / 2

      Enemy.enemies.forEach((enemy, enemyIDX) => {
        switch(false){
          case enemy.y + Enemy.conf.height > bulletStartY :break;
          case enemy.y < bulletStopY :break;
          case enemy.x + Enemy.conf.width > bulletStartX :break;
          case enemy.x < bulletStopX :break;

          default:
            // бъем по поражению / противнику
            Enemy.enemyHit(enemyIDX)

            // убираем пулю / снаряд
            disapperedBullets.push(bulletID)
            this.bullets[bulletID].inEnemy = true
        }
      })
    })

    this.remove(disapperedBullets)
  }

  this.add = () => {
    if (!isFinite(this.position.x) || !isFinite(this.position.y)) return;

    // размеры пушек, взависимости от их количество
    let sizes = [
          this.conf.size,
          this.conf.size / 1.5,
          this.conf.size / 2,
          this.conf.size / 2.5,
        ],
        size = sizes[this.bulletCount - 1] || sizes[sizes.length - 1]

    let xStart = this.position.x - (size * this.conf.offsets) * this.bulletCount + size * this.conf.offsets

    for (let i = 0; i < this.bulletCount; i++){
      xStart += (size * this.conf.offsets) * 2 * (!!i * 1)
      this.bullets.push({
        size,
        xStart: xStart - this.position.x,
        x: this.position.x,
        y: this.position.y - this.bulletCount * 5,
      })
    }

  }
  
  this.remove = bulletIDs => {
    bulletIDs.forEach(bulletID => {
      if (!this.bullets[bulletID]) return;
      // проверок много не бывает
      if (this.bullets[bulletID].y + this.bullets[bulletID].size / 2 < 0 || this.bullets[bulletID].inEnemy) {
        this.bullets.splice(bulletID, 1)
      }
    })
  }

  this.start = () => {
    if (this.moveTimer) this.stop()

    this.moveTimer = setInterval(() => {
      if (!this.moveTimer) return;

      this.move()
    }, this.conf.speed)

    this.addTimer = setInterval(() => {
      if (this.addTimer) this.add()
    }, this.conf.interval)
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