import './scss/main.scss'

const Game = {
  canvas: undefined,
  ctx: undefined,
  width: 720,
  height: 1280,

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

  user: undefined,
  bullet: undefined,
  movement: undefined,
  enemy: undefined,
  info: undefined,

  init(){
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

  load(){
    return new Promise(resolve => {
      let imagesCount = Object.keys(this.assets).length
      let loadedCount = 0

      for (let asset in this.assets) {
        let url = this.assets[asset].img || this.assets[asset]

        let img = new Image()
        img.src = url
        img.onload = () => {
          if(++loadedCount == imagesCount) {
            resolve()
          }
        }

        if (this.assets[asset].img) {
          this.assets[asset].img = img
        } else {
          this.assets[asset] = img
        }
      }
    })
  },

  start(){
    this.run()

    this.bulletsAddTimer = setInterval(() => {
      this.bullet.add()
    }, this.bullet.create_interval)


    this.enemy.add()
  },

  render(){
    this.ctx.drawImage(this.assets.bg, 0, 0, this.width, this.height)

    // user
    const userAsset = this.user.killing ? this.assets.user_die : this.assets.user
    this.user.render(this.ctx, userAsset)

    this.enemy.list.forEach(enemy => {
      let enemyAsset = this.assets[`enemy_${enemy.type}`]

      let { img, frames } = enemyAsset

      let sx = img.width / frames * enemy.frame
      let sy = 0
      let sWidth = img.width / frames
      let sHeight = img.height

      this.ctx.drawImage(img, sx, sy, sWidth, sHeight, enemy.x, enemy.y, enemy.width, enemy.height)

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
      this.ctx.beginPath()
      this.ctx.fillStyle = 'rgba(255,255,255,.4)'
      this.ctx.rect(x,y, enemy.width, h)
      this.ctx.fill()

      // сам ХП
      this.ctx.beginPath()
      this.ctx.fillStyle = fillStyle
      this.ctx.rect(x,y, xp_width, h)
      this.ctx.fill()
    })

    this.bullet.list.forEach(bullet => {
      this.ctx.drawImage(
          this.assets.bullet,
          bullet.x,
          bullet.y,
          bullet.width,
          bullet.height
      )
    })

    this.info.render(this.ctx)
  },

  run(){
    this.update()
    this.render()

    requestAnimationFrame(() => {
      this.run()
    })
  },

  update(){
    // движение потрнов
    this.bullet.move()

    // удаление потронов
    this.bullet.removeIfNeeded()

    // установка позиции игрока + потронов
    this.setPositions()

    // движение врагов
    this.enemy.move()
  },

  setPositions(){
    // установка позиции игрока
    this.user.x = this.movement.x - this.user.width / 2
    this.user.y = this.movement.y - this.user.height / 2

    // установка позиции появления потронов
    this.bullet.x = this.user.x + this.user.width / 2 - this.bullet.width / 2
    this.bullet.y = this.user.y - this.bullet.height
  },

}

Game.movement = {
  x: 0,
  y: 0,
  positions: {
    start: {},
    move: {},
    origin: {},
  },
  styles: {},

  init(){
    [
      "mousedown",
      "mousemove",
      "mouseup",
      "mouseleave",

      "touchstart",
      "touchmove",
      "touchend",
    ].forEach(eventType => {
      Game.canvas.addEventListener(eventType, (event) => {
        this.setPositions(event)
      })
    });

    ["load", "resize"].forEach(eventType => {
      window.addEventListener(eventType, () => {
        this.setStyles(getComputedStyle(Game.canvas))
      })
    });

    this.setPositionsDefault()
  },

  setPositions(event){
    let { x, y } = this.getPositions(event)
    x = x || this.positions.move.x || this.x
    y = y || this.positions.move.y || this.y

    if (["mousedown", "touchstart"].includes(event.type)) {
      this.positions.start.x = x
      this.positions.start.y = y
      this.positions.move.x = x
      this.positions.move.y = y
      this.positions.origin.x = this.x
      this.positions.origin.y = this.y
    }
    if (["mousemove", "touchmove"].includes(event.type)) {
      this.positions.move.x = x
      this.positions.move.y = y
    }
    if (["mouseup", "touchend", "mouseleave"].includes(event.type)) {
      this.clearPositions()
    }

    if (["mousemove", "touchmove"].includes(event.type) && (this.positions.start.x || this.positions.start.y)) {
      this.x = this.positions.origin.x + ((this.positions.move.x - this.positions.start.x) * 1.15)
      this.y = this.positions.origin.y + ((this.positions.move.y - this.positions.start.y) * 1.15)

      // границы
      if (this.y - Game.user.height / 2 < 0) this.y = Game.user.height / 2
      if (Game.user.height / 2 > Game.height - this.y) this.y = Game.height - Game.user.height / 2

      if (Game.user.width / 2 > this.x) this.x = Game.user.width / 2
      if (Game.user.width / 2 > Game.width - this.x) this.x = Game.width - Game.user.width / 2
    }

  },

  clearPositions(){
    this.positions.start.x = null
    this.positions.start.y = null
    this.positions.move.x = null
    this.positions.move.y = null
    this.positions.origin.x = null
    this.positions.origin.y = null
  },

  setPositionsDefault(){
    this.x = 720 / 2
    this.y = 1100

    this.clearPositions()
  },

  getPositions(event){
    let layerX;
    let layerY;
    let { width, height } = this.styles

    if ([ "touchstart", "touchmove" ].includes(event.type)) {
      let touch = event.touches[0]

      layerX = touch.clientX - touch.target.offsetLeft
      layerY = touch.clientY - touch.target.offsetTop
    } else {
      layerX = event.layerX
      layerY = event.layerY
    }

    let percentCursorX = layerX / width * 100
    let percentCursorY = layerY / height * 100

    let x = Game.width / 100 * percentCursorX
    let y = Game.height / 100 * percentCursorY

    return { x, y }
  },

  setStyles(styles) {
    this.styles.width = parseFloat(styles.width)
    this.styles.height = parseFloat(styles.height)
  },

}

Game.user = {
  x: 720 / 2 - 368 / 4 / 2,
  y: 1000,
  ratio: 4,
  width: 368 / 4,
  height: 503 / 4,
  killing: false,
  frame: 0,

  render(ctx, asset){
    const { img, frames } = asset

    const sx = img.width / frames * this.frame
    const sy = 0
    const sWidth = img.width / frames
    const sHeight = img.height

    ctx.drawImage(img, sx, sy, sWidth, sHeight, this.x, this.y, this.width, this.height)
  },

  kill(asset){
    return new Promise(resolve => {
      this.killing = true
      this.frame = 0

      let killingInterval = setInterval(() => {
        if(++this.frame >= asset.frames) {
          clearInterval(killingInterval)
          this.killing = false
          this.frame = 0
          resolve()
        }
      }, 1000 / 24)
    })
  },

  isCollised({ x, y, width, height }){
    let bulletStartX = x
    let bulletStopX = x + width
    let bulletStartY = y
    let bulletStopY = y + height

    return this.x + this.width > bulletStartX
        && this.x < bulletStopX
        && this.y + this.height / 1.5 > bulletStartY
        && this.y < bulletStopY;
  },
}

Game.enemy = {
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
}

Game.bullet = {
  x: 0,
  y: 0,
  width: 20,
  height: 58,
  offset: .75,
  list: [],

  type: "default",
  types: {
    default: {
      interval: 300, // ms
      speed: 20, // px | step
      count: 1, // bullets count
    },
    secondary: {
      interval: 200, // ms
      speed: 40, // px | step
      count: 2, // bullets count
    },
    fast: {
      interval: 150, // ms
      speed: 50, // px | step
      count: 3, // bullets count
    },
  },

  get create_interval(){
    return this.types[this.type].interval
  },
  get speed(){
    return this.types[this.type].speed
  },
  get count(){
    return this.types[this.type].count
  },

  add(){
    let x = this.x - (this.width * this.offset) * this.count + this.width * this.offset

    for (let i = 0; i < this.count; i++) {
      x += (this.width * this.offset) * 2 * (!!i * 1)
      this.list.push({
        x,
        y: this.y + 11,
        dx: 0,
        dy: this.speed,
        width: this.width,
        height: this.height,
        readyToRemove: false,
      })
    }
  },

  removeIfNeeded(){
    this.list = this.list.filter(bullet => !bullet.readyToRemove)
  },

  move(){
    this.list.forEach((bullet, bullet_index) => {
      bullet.y -= bullet.dy
      bullet.x -= bullet.dx

      if (bullet.y + bullet.height < 0) {
        bullet.readyToRemove = true
        return;
      }

      // смотрим, побили ли мы что-нибудь
      for(let enemyIDX in Game.enemy.list) {
        let enemy = Game.enemy.list[enemyIDX]
        if (enemy.killing)
          continue;

        if(this.isCollised(enemy, bullet_index)){
          // бъем по поражению / противнику
          Game.enemy.hit(enemyIDX)

          // убираем пулю / снаряд
          bullet.readyToRemove = true

          return;
        }
      }

    })
  },

  isCollised(enemy, bullet_index){
    let bullet = this.list[bullet_index]
    let bulletStartX = bullet.x
    let bulletStopX = bullet.x + bullet.width
    let bulletStartY = bullet.y - bullet.dy
    let bulletStopY = bullet.y + bullet.height - bullet.dy

    return enemy.x + enemy.width > bulletStartX
        && enemy.x < bulletStopX
        && enemy.y + enemy.height / 1.5 > bulletStartY
        && enemy.y < bulletStopY;
  },

  upTo(type){
    switch(type){
      case 'fast':
      case 'boss':
        this.type = 'fast'
        break;
      case 'stronger':
      case 'secondary':
        this.type = 'secondary'
        break;
      default:
        this.type = 'default'
    }

    setTimeout(() => {
      this.down()
    }, 10000)
  },

  down(){
    let levels = [ "default", "secondary", "fast" ]
    let currentIndex = levels.indexOf(this.type)
    if (--currentIndex < 0) {
      currentIndex = 0
    }
    this.type = levels[currentIndex]
  },
}

Game.info = {
  scores: null,
  recordScores: null,
  lives: null,

  render(ctx){
    let fz = 20
    let offsets = 10
    let box_width = 150
    let line = 3
    let box_height = (fz * line) + offsets * line
    let y = Game.height - box_height

    // фон
    ctx.beginPath()
    ctx.fillStyle = 'rgba(0,0,0,.5)'
    ctx.rect(0, y, box_width, box_height )
    ctx.fill()
    ctx.beginPath()

    // текста
    ctx.fillStyle = '#fff'
    ctx.font = `bold ${fz}px "Trebuchet MS"`
    ctx.fillText(`Lives: ${this.lives}`, 0 + offsets, y + offsets + fz, box_width - offsets * 2)
    ctx.fillText(`Scores: ${this.scores}`, 0 + offsets, y + offsets + fz * 2, box_width - offsets * 2)
    ctx.fillText(`Record: ${this.recordScores}`, 0 + offsets, y + offsets + fz * 3, box_width - offsets * 2)
    ctx.fill()
  },

  scoreUp(){
    if(++this.scores > this.recordScores) {
      this.recordScores = this.scores
      localStorage.recordScores = this.scores
    }
  },

  setDefault(){
    this.lives = 5
    this.scores = 0
    this.recordScores = localStorage.recordScores || 0
  },
}


Game.init();