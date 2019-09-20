import { parentLayer } from './stage'
import Konva from 'konva' //This Import is only for TestingCode() function. Remove it on final release
import { canvasState } from './utilities'
import { MultipleChoices, ChoiceBox } from './Shapes'

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

export function TestingCode() {
  let rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 20,
    height: 20,
    offsetX: 0,
    offsetY: 0,
    strokeWidth: 1,
    stroke: 'Green',
    strokeScaleEnabled: false,
  })
  parentLayer.add(rect)
  parentLayer.draw()
  let conf = {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    text: 'A',
    fontSize: 15,
    fill: 'RGB(160,160,160)',
    cornerRadius: 15,
  }
  let crect = new ChoiceBox(conf)

  drawPoint(50, 50, 'Red')
  drawPoint(50, 100, 'Blue')

  let grp = new Konva.Group()
  grp.setAttr('draggable', true)
  grp.add(crect.groupObj)
  parentLayer.add(grp)
  let tr = new Konva.Transformer()

  tr.attachTo(grp)
  //tr.attachTo(crect.textObj)

  parentLayer.add(tr)
  parentLayer.draw()
}

function drawPoint(x: number, y: number, clr: string) {
  let rect = new Konva.Rect({
    x: x,
    y: y,
    width: 1,
    height: 1,
    strokeWidth: 1,
    stroke: clr,
    perfectDrawEnabled: false,
  })

  parentLayer.add(rect)
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
