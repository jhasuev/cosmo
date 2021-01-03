export default new function(){
  this.canvas = document.getElementById("info")
  this.ctx = this.canvas.getContext("2d")

  this.showInfo = (info) => {
    this.clear()

    let fz = 20
    let offsets = 10
    let box_width = 150
    let line = 3
    let box_height = (fz * line) + offsets * line

    // фон
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,255,0,.5)'
    this.ctx.rect(0, 0, box_width, box_height )
    this.ctx.fill()
    this.ctx.beginPath()

    // текста
    this.ctx.fillStyle = '#000'
    this.ctx.font = `bold ${fz}px "Trebuchet MS"`
    this.ctx.fillText(`XP: ${info.xp}`, 0 + offsets, offsets + fz, box_width - offsets * 2)
    this.ctx.fillText(`Score: ${info.score}`, 0 + offsets, offsets + fz * 2, box_width - offsets * 2)
    this.ctx.fillText(`Record: ${info.record}`, 0 + offsets, offsets + fz * 3, box_width - offsets * 2)
    this.ctx.fill()
  }

  this.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  return this;
}