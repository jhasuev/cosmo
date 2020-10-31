import './scss/main.scss'
import './components/core.js'
import { User as UserClass } from './components/User.js'
const User = new UserClass()

User.draw()
setTimeout(() => {
  User.move(10, 10)
}, 2222)