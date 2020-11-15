export default function loadImage(src, fb) {
    let img = new Image()
    img.src = src
    img.onload = img.onerror = (event) => {
        let statuses = {
            load: "success",
            error: "fail",
        }
        fb(img, statuses[event.type])
    }
    return img
}