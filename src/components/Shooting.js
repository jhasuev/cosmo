import {
  canvas_shooting as canvas,
  ctx_shooting as ctx
} from "./canvas.js"

export default new function(){
  this.position = { x: null, y: null }

  this.conf = {
    size: 10, // ball size | px
    step: 10, // move step | px
    speed: 5, // time for each step | ms
    interval: 100, // interval between create a new bullet | ms
  }

  this.bullets = []

  this.moveTimer = null
  this.addTimer = null

  this.draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bullets.forEach(bullet => {
      ctx.beginPath()
      ctx.arc(bullet.x, bullet.y, this.conf.size, 0, 2 * Math.PI)
      ctx.fillStyle = "#dc4a07"
      ctx.fill()
    })
  }

  this.goNext = () => {
    let disapperedBullets = []
    this.bullets.forEach((bullet, bulletID) => {
      bullet.y -= this.conf.step

      if (bullet.y + this.conf.size / 2 <= 0) {
        disapperedBullets.push(bulletID)
      }
    })

    this.remove(disapperedBullets)
  }

  this.add = () => {
    if (!isFinite(this.position.x) || !isFinite(this.position.y)) return;

    this.bullets.push({
      x: this.position.x,
      y: this.position.y
    })
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