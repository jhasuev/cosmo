import './scss/main.scss'
import Game from './controller/Game.js'

document.querySelectorAll("canvas").forEach(canvas => {
  canvas.width = 720
  canvas.height = 1280
})

// все изображения, которые нужно загрузить
document.querySelector('.js-game-images').innerHTML = `
  <img src="assets/img/bg.jpg?v=${COSMO_VERSION}" id="bg-img">
  <img src="assets/img/bullet2.png?v=${COSMO_VERSION}" id="bullet-img">
  <img src="assets/img/enemy-starship-boss.png?v=${COSMO_VERSION}" id="enemy-boss-img">
  <img src="assets/img/enemy-starship-normal.png?v=${COSMO_VERSION}" id="enemy-normal-img">
  <img src="assets/img/enemy-starship-stronger.png?v=${COSMO_VERSION}" id="enemy-stronger-img">
  <img src="assets/img/user-starship.png?v=${COSMO_VERSION}" id="user-img">
`

let images = document.querySelectorAll(".js-game-images img")
let must_load_images_num = images.length

images.forEach(img => {
  img.onload = () => {
    must_load_images_num -= 1

    // все картинки загружены (осталось 0 картинок для загрузки)
    if (must_load_images_num === 0) {

      // убираем прелоадер
      document.getElementById("js-preloader").style.display = "none"

      // запускаем игру
      Game.init();
    }
  }
})