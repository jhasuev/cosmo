const canvasLayers = {}

document.querySelectorAll("canvas").forEach(canvas => {
  canvas.width = 720
  canvas.height = 1280

  canvasLayers[canvas.id] = {
    canvas,
    ctx: canvas.getContext("2d"),
  }
})

export const canvas_enemy = canvasLayers.enemy.canvas
export const ctx_enemy = canvasLayers.enemy.ctx

export const canvas_bg = canvasLayers.bg.canvas
export const ctx_bg = canvasLayers.bg.ctx

export const canvas_info = canvasLayers.info.canvas
export const ctx_info = canvasLayers.info.ctx

export const canvas_user = canvasLayers.user.canvas
export const ctx_user = canvasLayers.user.ctx

export const canvas_shooting = canvasLayers.shooting.canvas
export const ctx_shooting = canvasLayers.shooting.ctx