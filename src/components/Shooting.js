import {
  canvas_shooting as canvas,
  ctx_shooting as ctx
} from "./canvas.js"
import Enemy from './Enemy.js'

export default new function(){
  this.position = { x: null, y: null }

  this.conf = {
    offsets: 1.5, // расстаянние между шарами (пульками)
    size: 10, // ball size | px
    step: 10, // move step | px
    speed: 5, // time for each step | ms
    interval: 100, // interval between create a new bullet | ms
  }

  this.bullets = []
  this.bulletCount = 1

  this.moveTimer = null
  this.addTimer = null

  this.draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bullets.forEach(bullet => {
      ctx.beginPath()
      ctx.arc(bullet.x, bullet.y, bullet.size, 0, 2 * Math.PI)
      ctx.fillStyle = "#dc4a07"
      ctx.fill()
    })
  }

  this.goNext = () => {
    let disapperedBullets = []
    this.bullets.forEach((bullet, bulletID) => {
      bullet.y -= this.conf.step

      // не знаю пока почему, но пульки умирают раньше времени
      // поэтому поставлю вот такой вот костыл пока что...
      if (bullet.y + bullet.size / 2 < -333) {
        disapperedBullets.push(bulletID)
      }

      Enemy.enemies.forEach((enemy, enemyIDX) => {
        if (
               enemy.y + Enemy.conf.height > bullet.y - bullet.size / 2
            && enemy.y < bullet.y + bullet.size / 2
            && enemy.x + Enemy.conf.width > bullet.x - bullet.size / 2
            && enemy.x < bullet.x + bullet.size / 2
        ) {
          // бъем по поражению / противнику
          Enemy.enemyHit(enemyIDX)

          // убираем пулю / снаряд
          disapperedBullets.push(bulletID)
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

    let x = this.position.x - (size * this.conf.offsets) * this.bulletCount
    x += size * this.conf.offsets

    for (let i = 0; i < this.bulletCount; i++){
      x += (size * this.conf.offsets) * 2 * (!!i * 1)
      this.bullets.push({
        size,
        x,
        y: this.position.y,
      })
    }

  }
  
  this.remove = (bulletIDs) => {
    bulletIDs.forEach(bulletID => this.bullets.splice(bulletID, 1))
  }

  this.start = () => {
    if (this.moveTimer) this.stop()

    this.moveTimer = setInterval(() => {
      if (!this.moveTimer) return;

      this.move()
    }, this.conf.speed)

    this.addTimer = setInterval(() => {
      if (!this.addTimer) return;

      this.add()
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