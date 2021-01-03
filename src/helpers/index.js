export function getRatioHeight(new_width, origin_width, origin_height) {
    let width_percent = 100 / origin_width * new_width
    return origin_height / 100 * width_percent
}