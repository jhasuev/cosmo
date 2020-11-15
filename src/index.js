import './scss/main.scss'
import './components/BG.js'
import User from './components/User.js'
import Movement from './components/Movement.js'
import Enemy from './components/Enemy.js'
import Shooting from './components/Shooting.js'
import {
  canvas_user as canvas,
} from "./components/canvas.js"

Shooting.setPositions(User.position.x + User.width / 2, User.position.y)

User.drawUser()
Enemy.start()

/*
setTimeout(() => {
  Enemy.stop()
  Shooting.stop()

  setTimeout(() => {
    Enemy.start()
    Shooting.start()
  }, 2222)
}, 2222)
 */

Movement.onmove = () => {
  User.move(Movement.x, Movement.y)
  let x = Movement.x
  let y = Movement.y - User.height / 2

  if (x < User.width / 2) {
    x = User.width / 2
  }
  if (canvas.width - x < User.width / 2) {
    x = canvas.width - User.width / 2
  }

  Shooting.setPositions(x, y)
}


document.body.style.backgroundImage = "url(assets/img/bg.jpg)"