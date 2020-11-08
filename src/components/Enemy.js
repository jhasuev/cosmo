import {
  canvas_enemy as canvas,
  ctx_enemy as ctx
} from "./canvas.js"
import Shooting from './Shooting.js'

export default new function(){
  this.conf = {
    width: 50,
    height: 50,
    fz: 20
  }
  this.enemies = [
    {
      x: 50,
      y: 100,
      leftBits: 10,
    },
    {
      x: 150,
      y: 100,
      leftBits: 10,
    },
    {
      x: 250,
      y: 100,
      leftBits: 10,
    },
    {
      x: 350,
      y: 100,
      leftBits: 10,
    },
    {
      x: 450,
      y: 100,
      leftBits: 10,
    },
    {
      x: 550,
      y: 100,
      leftBits: 10,
    },
  ]
  this.timer = false

  this.drawEnemies = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.enemies.forEach(enemy => {
      ctx.beginPath()
      ctx.rect(enemy.x, enemy.y, this.conf.width, this.conf.height)
      ctx.fillStyle = 'orange'
      ctx.fill()

      ctx.beginPath()
      ctx.font = `bold ${this.conf.fz}px "Trebuchet MS"`
      ctx.fillStyle = '#9f1800'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(enemy.leftBits, enemy.x + (this.conf.width / 2), enemy.y + (this.conf.height / 2))
      ctx.fill()
    })
  }

  this.move = () => {
    this.enemies.forEach(enemy => {

      if(!isFinite(enemy.shakeX)) {
        enemy.shakeX = 0
        enemy.shakeXDirection = false
      }

      if (Math.abs(enemy.shakeX) >= 3) {
        enemy.shakeXDirection = !enemy.shakeXDirection
      }

      enemy.shakeX += .125 * (enemy.shakeXDirection ? -1 : 1)

      enemy.x += enemy.shakeX
      enemy.y += .5
    })
    this.drawEnemies()
  }

  this.start = () => {
    this.stop()

    this.timer = setInterval(() => {
      if(this.timer) {
        this.move()
      }
    }, 50)
  }

  this.stop = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  this.enemyHit = enemyIDX => {
    // снижаем хп у противника
    if (--this.enemies[enemyIDX].leftBits <= 0) {
      // убиваем противника, если у него закончилось хп
      this.enemies.splice(enemyIDX, 1)
      Shooting.bulletCount++
    }
  }

  return this
}