import Konva from 'konva'
import { canvasState, CanvasModes } from './utilities'
import { KonvaEventObject } from 'konva/types/Node'

var stage: Konva.Stage

export let parentLayer = new Konva.Layer()

export function createCanvas() {
  stage = new Konva.Stage({
    container: 'divCanvas',
    width: 640,
    height: 480,
  })
  //canvas.getContainer().style.border = '1px solid black'
  stage.add(parentLayer)

  stage.on('mousedown', function(e) {
    switch (canvasState.getMode()) {
      case CanvasModes.DRAW_RECTANGLE:
        drawRectangle(e)
        break
      case CanvasModes.SELECTION:
      default:
        return
    }
  })
}

function drawRectangle(e: KonvaEventObject<MouseEvent>) {
  console.log(e)
}
