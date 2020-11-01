const canvasLayers = {}

document.querySelectorAll("canvas").forEach(canvasLayer => {
  canvasLayer.width = 360 * 2
  canvasLayer.height = 640 * 2

  canvasLayers[canvasLayer.id] = {
    canvas: canvasLayer,
    ctx: canvasLayer.getContext("2d"),
  }
})

export const canvas_enimy = canvasLayers.enimy.canvas
export const ctx_enimy = canvasLayers.enimy.ctx

export const canvas_info = canvasLayers.info.canvas
export const ctx_info = canvasLayers.info.ctx

export const canvas_user = canvasLayers.user.canvas
export const ctx_user = canvasLayers.user.ctx