import Konva from 'konva'
import { canvasState, CanvasModes, Point } from './utilities'
import { KonvaEventObject } from 'konva/types/Node'
import { start } from 'repl'

var stage: Konva.Stage
var startPos = new Point()
var endPos = new Point()
var inProgressRect: Konva.Rect | undefined

export let parentLayer = new Konva.Layer()
let workingLayer

export function createCanvas() {
  stage = new Konva.Stage({
    container: 'divCanvas',
    width: 640,
    height: 480,
  })
  //canvas.getContainer().style.border = '1px solid black'
  stage.add(parentLayer)

  stage.on('mousedown', function(e: KonvaEventObject<MouseEvent>) {
    switch (canvasState.getMode()) {
      case CanvasModes.DRAW_RECTANGLE:
        startPos.x = e.evt.clientX
        startPos.y = e.evt.clientY
        var obj = {
          x: startPos.x,
          y: startPos.y,
          width: 0,
          height: 0,
          stroke: 'gray',
          strokeWidth: canvasState.shapesStrokeWidth,
          dash: [5, 5],
          dashEnabled: true,
        }

        inProgressRect = new Konva.Rect(obj)
        parentLayer.add(inProgressRect)
        //drawRectangle(e)
        break
      case CanvasModes.SELECTION:
      default:
        return
    }
  })

  stage.on('mouseup', function(e: KonvaEventObject<MouseEvent>) {
    switch (canvasState.getMode()) {
      case CanvasModes.DRAW_RECTANGLE:
        if (!inProgressRect) return

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        inProgressRect.remove()
        inProgressRect = undefined
        parentLayer.draw()
        let width = endPos.x - startPos.x
        let height = endPos.y - startPos.y

        if (width < 10 || height < 10) return
        drawRectangle(startPos, endPos)
        break
      case CanvasModes.SELECTION:
      default:
        return
    }
  })

  stage.on('mousemove', function(e: KonvaEventObject<MouseEvent>) {
    switch (canvasState.getMode()) {
      case CanvasModes.DRAW_RECTANGLE:
        if (!inProgressRect) return

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        inProgressRect.setAttr('width', endPos.x - startPos.x)
        inProgressRect.setAttr('height', endPos.y - startPos.y)
        parentLayer.draw()
        //drawRectangle(startPos, endPos)
        break
      case CanvasModes.SELECTION:
      default:
        return
    }
  })
}

function drawRectangle(startPosition: Point, endPosition: Point) {
  var rect = new Konva.Rect({
    x: startPos.x,
    y: startPos.y,
    width: endPos.x - startPos.x,
    height: endPos.y - startPos.y,
    stroke: 'black',
    strokeWidth: canvasState.shapesStrokeWidth,
    draggable: false,
  })

  parentLayer.add(rect)
  parentLayer.draw()
  // console.log(e)
}
