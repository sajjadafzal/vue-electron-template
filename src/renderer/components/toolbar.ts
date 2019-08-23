import { parentLayer } from './stage'
import Konva from 'konva'
import { canvasState } from './utilities'

export function clearCanvas() {
  parentLayer.removeChildren()
  parentLayer.draw()
}

// const rect = new Konva.Rect({
//   width: 100,
//   height: 100,
//   x: 100,
//   y: 100,
//   stroke: '#000',
//   draggable: true,
// })
// parentLayer.add(rect)
// parentLayer.draw()

// export function addCircle() {
//   const circ = new Konva.Circle({
//     radius: 100,
//     x: 150,
//     y: 150,
//     stroke: '#000',
//     draggable: true,
//   })

//   parentLayer.add(circ)
//   parentLayer.draw()
// }
