import Konva from 'konva'
import { canvasState, CanvasModes, Point } from './utilities'
import { KonvaEventObject, NodeConfig } from 'konva/types/Node'

import { start } from 'repl'
import { ChoiceBox } from './Shapes'
import { Group } from 'konva/types/Group'

var stage: Konva.Stage
var startPos = new Point()
var endPos = new Point()
var inProgressRect: Konva.Rect | undefined
var tr: Konva.Transformer
var StoredShape: Konva.Group
var transformGroup = new Konva.Group({name: 'transformGroup'})
var ZeroTransform = transformGroup.getAbsoluteTransform().getMatrix()
export let parentLayer = new Konva.Layer()

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
  parentLayer.add(transformGroup)
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
        //StoredShape = ch.KonvaGroup
        break
      case CanvasModes.TRANSFORM:
       
        // let shapes = parentLayer.find('.IsSelected')
        // shapes.each(s => {
        //   console.log(s.getAttr('scaleX') + ',' + s.getAttr('scaleY'))
        //   s.removeName('IsSelected')
        //   console.log(s)
        // })
        //canvasState.setMode(CanvasModes.SELECTION)
        break
      case CanvasModes.SELECTION:
        if (!inProgressRect) return

        endPos.x = e.evt.clientX
        endPos.y = e.evt.clientY

        width = endPos.x - startPos.x
        height = endPos.y - startPos.y

        if (e.target === stage) {
            //remove transformers if any
        } else {
          if (e.target === inProgressRect) {

            var thisHitStatus = { isHit: false }
            parentLayer.children.each(shp => {
              thisHitStatus.isHit = false
              HitTest(
                shp,
                startPos.x,
                startPos.y,
                endPos.x,
                endPos.y,
                true,
                thisHitStatus
              )
              if (shp.getAttr('name') != 'transformGroup'){
              if (shp.nodeType == 'Group' && thisHitStatus.isHit) shp.moveTo(transformGroup)//transformGroup.add(shp as Konva.Group)
              //else if (shp.nodeType == 'Shape' && thisHitStatus.isHit) transformGroup.add(shp as Konva.Shape)
              }
            })
            StoredShape = transformGroup.clone()
            console.log(transformGroup.getAbsoluteTransform().getMatrix())
            transformGroup.setAttr('draggable', true)
            //parentLayer.add(transformGroup) - uncomment if transformGroup is a local variable
            //tr.setAttr('draggable', true)
            tr = new Konva.Transformer()
            tr.attachTo(transformGroup)
            parentLayer.add(tr)
            parentLayer.draw()
            canvasState.setMode(CanvasModes.TRANSFORM)
          }
        }

        inProgressRect.remove()
        inProgressRect = undefined
        parentLayer.draw()

      default:
        return
    }
  })
  function ResetTransformation(node:Konva.Node){
      node.setAttrs({
        scaleX:1,
        scaleY:1,
        

      })

  }
  function HitTest(
    node: Konva.Node,
    hitX1: number,
    hitY1: number,
    hitX2: number,
    hitY2: number,
    checkHitChildren: boolean,
    hitStat: { isHit: boolean }
  ) {
    if (hitStat.isHit) return

    if (node.hasChildren() && checkHitChildren) {
      node.children.each(ch => {
        if (!hitStat.isHit) {
          HitTest(ch, hitX1, hitY1, hitX2, hitY2, true, hitStat)
        }
      })
    } else {
      if (node.getAttr('name') != 'ReferenceRect' && node.className == 'Rect') {
        if (node.getAttr('x') >= hitX1 && node.getAttr('y') >= hitY1) {
          if (
            node.getAttr('x') + node.getAttr('width') <= hitX2 &&
            node.getAttr('y') + node.getAttr('height') <= hitY2
          ) {
            hitStat.isHit = true
            return
          }
        }
      }
    }
    return
  }

  function FindTopLevelNode(node: Konva.Node): Konva.Node | undefined {
    if (node.parent && node.parent.nodeType == 'Layer') return node
    else return FindTopLevelNode(node.parent as Konva.Node)
  }

  stage.on('mouseleave', function(e: KonvaEventObject<MouseEvent>) {
    /*Remove the reference drawing upon mouse leaving the stage */
    if (inProgressRect) {
      inProgressRect.remove()
      inProgressRect = undefined
      parentLayer.draw()
    }
    canvasState.setMode(CanvasModes.SELECTION)
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
      case CanvasModes.TRANSFORM:
        if (!tr) return
      //console.log(tr)
      default:
        return
    }
  })

  stage.on('dblclick', function(e: KonvaEventObject<MouseEvent>) {
    //console.log('double click')
    if (e.target === stage) {
      //@ts-ignore
      var trs = stage.find('Transformer')
      trs.each(tr => {
        //@ts-ignore
        if (tr.className == 'Transformer') {
          //@ts-ignore
          tr.detach()
          tr.destroy()
        }
      })
      //@ts-ignore
      let ThisRotation = transformGroup.getRotation()
      let ThisTransform = transformGroup.getAbsoluteTransform()
      const trMat = ThisTransform.getMatrix()

      if (transformGroup.hasChildren()) transformGroup.children.each(c => {
        const matrix = c.getAbsoluteTransform().getMatrix()
        const attrs = decompose(matrix)
        c.moveTo(parentLayer)
        c.setAttrs(attrs)
        //c.rotate(ThisRotation)
      })
      //transformGroup.getTransform().multiply(ThisTransform.invert())
      //ResetTransformation(transformGroup)
      transformGroup.setAttrs(decompose(ZeroTransform))
      parentLayer.draw()
      //console.log('Transformers destroyed')
    }
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

  function decompose(mat) {
    var mScaleX = mat[0]
    var mSkewY = mat[1]
    var mSkewX = mat[2]
    var mScaleY = mat[3]
    var mTransX = mat[4]
    var mTransY = mat[5]

    var delta = mScaleX * mScaleY - mSkewY * mSkewX

    let result = {
      x: mTransX,
      y: mTransY,
      rotation: 0,
      scaleX: 0,
      scaleY: 0,
      skewX: 0,
      skewY: 0,
    }

    // Apply the QR-like decomposition.
    if (mScaleX != 0 || mSkewY != 0) {
      var r = Math.sqrt(mScaleX * mScaleX + mSkewY * mSkewY)
      result.rotation =
        mSkewY > 0 ? Math.acos(mScaleX / r) : -Math.acos(mScaleX / r)
      result.scaleX = r
      result.scaleY = delta / r
      result.skewX = Math.atan((mScaleX * mSkewX + mSkewY * mScaleY) / (r * r))
      //result.scleY = 0
    } else if (mSkewX != 0 || mScaleY != 0) {
      var s = Math.sqrt(mSkewX * mSkewX + mScaleY * mScaleY)
      result.rotation =
        Math.PI / 2 -
        (mScaleY > 0 ? Math.acos(-mSkewX / s) : -Math.acos(mSkewX / s))
      result.scaleX = delta / s
      result.scaleY = s
      result.skewX = 0
      result.skewY = Math.atan((mScaleX * mSkewX + mSkewY * mScaleY) / (s * s))
    } else {
      // a = b = c = d = 0
    }

    result.rotation *= 180 / Math.PI
    return result
  }
}
