import './scss/main.scss'
import User from './components/User.js'
import Movement from './components/Movement.js'
import Enemy from './components/Enemy.js'

User.drawUser()
Enemy.start()

setTimeout(() => {
  Enemy.stop()

  setTimeout(() => {
    Enemy.start()
  }, 2222)
}, 2222)

Movement.onmove = () => {
  User.move(Movement.x, Movement.y)
}