export function isCollised(first, second){
    let firstStartX = first.x
    let firstStopX = first.x + first.width
    let firstStartY = first.y
    let firstStopY = first.y + first.height

    return second.x + second.width > firstStartX
        && second.x < firstStopX
        && second.y + second.height > firstStartY
        && second.y < firstStopY;
}