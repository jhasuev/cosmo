import './scss/main.scss'
import User from './components/User.js'
import Movement from './components/Movement.js'
import Enemy from './components/Enemy.js'
import Shooting from './components/Shooting.js'

Shooting.setPositions(User.position.x + User.width / 2, User.position.y)

User.drawUser()
Enemy.start()

setTimeout(() => {
  Enemy.stop()
  Shooting.stop()

  setTimeout(() => {
    Enemy.start()
    Shooting.start()
  }, 2222)
}, 2222)

Movement.onmove = () => {
  User.move(Movement.x, Movement.y)
  Shooting.setPositions(Movement.x, Movement.y - User.height / 2)
}