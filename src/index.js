import './scss/main.scss'
import User from './components/User.js'
import Movement from './components/Movement.js'

User.drawUser()

Movement.onmove = () => {
  User.move(Movement.x, Movement.y)
}