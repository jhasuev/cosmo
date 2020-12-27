export function loadImage(src, fb_success, fb_fail) {
    if (!window.__COSMO_LOADED_IMAGES__) {
        // тут хранятся все загружаемые изображения
        window.__COSMO_LOADED_IMAGES__ = {}
    }

    // если такое изображение уже загружали - возвращаем её
    if (window.__COSMO_LOADED_IMAGES__[ src ]) {
        return fb_success && fb_success(window.__COSMO_LOADED_IMAGES__[ src ])
    }

    let img = new Image()
    img.src = src

    img.onload = () => {
        fb_success && fb_success(img)
        window.__COSMO_LOADED_IMAGES__[ src ] = img
    }
    img.onerror = event => { fb_fail && fb_fail(event) }

    return img
}