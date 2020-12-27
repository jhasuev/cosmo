import './scss/main.scss'

document.querySelectorAll("canvas").forEach(canvas => {
  canvas.width = 720
  canvas.height = 1280
})

import Game from './controller/Game.js'

Game.init();

// TODO: придумать хороший MVC
// TODO: сделать контроллер для всего проекта и убрать лишний код из компонентов-классов
// TODO: чтоб у каждой сущности был свой объект: персонаж, противник, пуля...

document.body.style.backgroundImage = "url(assets/img/bg.jpg)"