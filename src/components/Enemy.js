import {
  canvas_enemy as canvas,
  ctx_enemy as ctx
} from "./canvas.js"
import Shooting from './Shooting.js'
import { loadImage } from '../helpers/index'

export default new function(){
  this.conf = {
    width: 548 / 7,
    height: 754 / 7,
    fz: 20,
    shakeDistance: 20,
  }
  this.enemyHitCounts = 10;
  this.enemies = []
  this.timer = false

  this.enemyImageElement = null

  loadImage("assets/img/enemy-starship.png",(img, type) => {
    if (type === 'success') {
      this.enemyImageElement = img
    }
  })

  this.drawEnemies = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.enemies.forEach(enemy => {
      ctx.beginPath()

      if (this.enemyImageElement) {
        ctx.drawImage(this.enemyImageElement, enemy.x, enemy.y, this.conf.width, this.conf.height)
      } else {
        ctx.rect(enemy.x, enemy.y, this.conf.width, this.conf.height)
        ctx.fillStyle = 'red'
      }

      ctx.fill()

      ctx.beginPath()
      ctx.font = `bold ${this.conf.fz}px "Trebuchet MS"`
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(enemy.leftBits, enemy.x + (this.conf.width / 2), enemy.y + (this.conf.height / 2))
      ctx.fill()
    })
  }

  this.move = () => {
    this.enemies.forEach(enemy => {

      if(!('originX' in enemy)) {
        enemy.originX = enemy.x
        enemy.shakeXDirection = true
      }

      // слишком вправо ушло, меняем направление движения (возвращаем влево)
      if (enemy.x > enemy.originX + this.conf.shakeDistance) {
        enemy.shakeXDirection = false
      }

      // слишком влево ушло, меняем направление движения (возвращаем вправо)
      if (enemy.x < enemy.originX - this.conf.shakeDistance) {
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

  // добавление врагов
  this.add = () => {
    const perOnRow = 5
    const offset = 50

    // TODO: ровно по центру что-то пока не получается, потом попробовать поправить
    let xEnd = canvas.width - (perOnRow * (this.conf.width + offset))
    if (xEnd - this.conf.width / 2 < 0) {
      return console.error("xEnd is not correct:", xEnd);
    }

    let x = xEnd / 2 + offset / 2
    for(let i = 0; i < perOnRow; i++){
      this.enemies.push({
        x,
        y: 0 - this.conf.height,
        leftBits: this.enemyHitCounts,
      })
      x += this.conf.width + offset
    }
  }

  this.add()

  this.enemyHit = enemyIDX => {
    // снижаем хп у противника
    if (--this.enemies[enemyIDX].leftBits <= 0) {
      // убиваем противника, если у него закончилось хп
      this.enemies.splice(enemyIDX, 1)
      if (!this.enemies.length) {
        this.enemyHitCounts += 10
        this.add()
      }

      if (Shooting.bulletCount < 5) {
        Shooting.bulletCount++
      }
    }
  }

  return this
}