import { parentLayer } from './stage'
import Konva from 'konva'
import { canvasState } from './utilities'
import { MultipleChoices } from './Shapes'

export function clearCanvas() {
  parentLayer.removeChildren()
  parentLayer.draw()
}

export function drawChoices() {
  for (var i: number = 1; i <= 10; i++) {
    new MultipleChoices({
      x: 10,
      y: 0 + i * 35,
      Title: 'Q' + i,
      titleWidth: 60,
      titleHeight: 25,
      choices: ['A', 'B', 'C', 'D'],
      choiceBoxWidth: 22,
      choiceBoxHeight: 18,
      titleToChoice_Distance: 60,
      choiceToChoice_Distance: 35,
    })
  }
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
