import Konva from 'konva'
import { canvasState, CanvasModes, Point } from './utilities'
import { KonvaEventObject, NodeConfig } from 'konva/types/Node'

import { start } from 'repl'
import { ChoiceBox } from './Shapes'

var stage: Konva.Stage
var startPos = new Point()
var endPos = new Point()
var inProgressRect: Konva.Rect | undefined

export let parentLayer = new Konva.Layer()
let workingLayer
var obj = {
  x: startPos.x,
  y: startPos.y,
  width: 0,
  height: 0,
  stroke: 'gray',
  strokeWidth: canvasState.shapesStrokeWidth,
  dash: [5, 5],
  dashEnabled: true,
  name: 'ReferenceRect',
}

export function createCanvas() {
  stage = new Konva.Stage({
    container: 'divCanvas',
    width: 496,
    height: 701,
  })
  //canvas.getContainer().style.border = '1px solid black'
  stage.add(parentLayer)

  // console.log(
  //   (document.getElementsByTagName('canvas')[0].style =
  //     'border: 1px solid green')
  //)

  stage.on('mousedown', function(e: KonvaEventObject<MouseEvent>) {
    switch (canvasState.getMode()) {
      case CanvasModes.SELECTION:
      case CanvasModes.DRAW_RECTANGLE:
        obj.x = startPos.x = e.evt.clientX
        obj.y = startPos.y = e.evt.clientY

        inProgressRect = new Konva.Rect(obj)
        parentLayer.add(inProgressRect)
        break

      default:
        return
    }
  })

  stage.on('mouseup', function(e: KonvaEventObject<MouseEvent>) {
    //console.log('mouse_up')
    let width: number
    let height: number

    switch (canvasState.getMode()) {
      case CanvasModes.DRAW_RECTANGLE:
        if (!inProgressRect)
          return /* checking for reference-rectangle in case the pointer has left the stage, the action is void (reference-rectangle is removed upon stage leaving) */

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        inProgressRect.remove()
        inProgressRect = undefined
        parentLayer.draw()

        width = endPos.x - startPos.x
        height = endPos.y - startPos.y

        if (width < 10 || height < 10) return

        let conf = {
          x: startPos.x,
          y: startPos.y,
          width: width,
          height: height,
          text: 'A',
          fontSize: 15,
          fill: 'RGB(160,160,160)',
          cornerRadius: 15,
        }

        let ch = new ChoiceBox(conf)

        break
      case CanvasModes.SELECTION:
        if (!inProgressRect) return

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        width = endPos.x - startPos.x
        height = endPos.y - startPos.y

        if (e.target === stage) {
          //@ts-ignore
          stage.find('Transformer').destroy() //Konva Collections types are not fully defined for TypeScript
          parentLayer.draw()
          console.log('Transformers destroyed')
        } else {
          if (e.target === inProgressRect) {
            let tr = new Konva.Transformer()
            let shapes = parentLayer.find((shp: Konva.Node) => {
              if (
                shp.getAttr('name') != 'ReferenceRect' &&
                shp.getAttr('name') === 'ChoiceBoxGroup'
              ) {
                if (
                  shp.getAttr('x') >= startPos.x &&
                  shp.getAttr('y') >= startPos.y
                ) {
                  if (
                    shp.getAttr('x') + shp.getAttr('width') <= endPos.x &&
                    shp.getAttr('y') + shp.getAttr('height') <= endPos.y
                  ) {
                    console.log(shp)
                    return shp
                  }
                }
              }
            })
           //console.log(shapes)
            let transformGroup = new Konva.Group()
            shapes.each(s => {
              //tr.attachTo(s.parent)
              //s.parent.setAttr('draggable', true)

              transformGroup.add(s as Konva.Shape)
            })
            transformGroup.setAttr('draggable', true)
            //tr.setAttr('draggable', true)
            tr.attachTo(transformGroup)
            parentLayer.add(tr)
            canvasState.setMode(CanvasModes.TRANSFORM)
            parentLayer.draw()
          }
        }

        inProgressRect.remove()
        inProgressRect = undefined
        parentLayer.draw()

      default:
        return
    }
  })

  stage.on('mouseleave', function(e: KonvaEventObject<MouseEvent>) {
    /*Remove the reference drawing upon mouse leaving the stage */
    if (inProgressRect) {
      inProgressRect.remove()
      inProgressRect = undefined
      parentLayer.draw()
    }
  })

  stage.on('mousemove', function(e: KonvaEventObject<MouseEvent>) {
    switch (canvasState.getMode()) {
      case CanvasModes.SELECTION:
      case CanvasModes.DRAW_RECTANGLE:
        if (!inProgressRect) return

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        inProgressRect.setAttr('width', endPos.x - startPos.x)
        inProgressRect.setAttr('height', endPos.y - startPos.y)
        parentLayer.draw()
        break
      default:
        return
    }
  })

  stage.on('dblclick', function(e: KonvaEventObject<MouseEvent>) {
    //console.log('double click')
  })
  //   stage.on('click tap', function(e: KonvaEventObject<MouseEvent>) {
  //     // if click on empty area - remove all transformers
  //     if (e.target === stage) {
  //       let col = stage.find('Transformer') //.each(el => el.destroy())
  //       if (col != undefined) {
  //         col.each(item => item.destroy())
  //       }

  //       parentLayer.draw()
  //       return
  //     }
  //     // do nothing if clicked NOT on our rectangles
  //     if (!e.target.hasName('rect')) {
  //       return
  //     }
  //     // remove old transformers
  //     // TODO: we can skip it if current rect is already selected
  //     //stage.find('Transformer').destroy()

  //     // create new transformer
  //     var tr = new Konva.Transformer()
  //     parentLayer.add(tr)
  //     tr.attachTo(e.target)
  //     parentLayer.draw()
  //   })
}
