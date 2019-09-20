import Konva from 'konva'
import { parentLayer } from './stage'
import { drawChoices } from './toolbar'

interface ChoiceBoxConfig {
  //Shared Properties of Konva.Rect and Konva.Text
  x: number
  y: number
  width: number
  height: number
  //Only Properties of Konva.Rect
  strokeWidth?: number
  cornerRadius?: number
  //Only Properties of Konva.Text
  text: string
  fontSize?: number
  fontFamily?: string
  fill?: string
  opacity?: number
  align?: string
  verticalAlign?: string
}

var defaults = {
  x: 0,
  y: 0,
  stroke: 'RGB(185,185,185)',
  width: 20,
  height: 20,
  strokeWidth: 2,
  text: '',
  fontSize: 18,
  fontFamily: 'Calibri',
  fill: 'RGB(185,185,185)',
  padding: 0,
  margin: 0,
  opacity: 1,
  align: 'center',
  verticalAlign: 'middle',
  cornerRadius: 8,
}

function getConfig(config: ChoiceBoxConfig) {
  return {
    ...defaults,
    ...config,
  }
}

export class ChoiceBox {
  private krect: Konva.Rect
  private ktext: Konva.Text
  private group: Konva.Group

  get x(): number {
    return this.krect.getAttr('x')
  }

  set x(value: number) {
    this.krect.setAttr('x', value)
    parentLayer.draw()
  }

  get y(): number {
    return this.krect.getAttr('y')
  }

  set y(value: number) {
    this.krect.setAttr('y', value)
    parentLayer.draw()
  }

  get text(): string {
    return this.ktext.getAttr('text')
  }

  set text(value: string) {
    this.krect.setAttr('text', value)
    parentLayer.draw()
  }

  get rectObj() {
    return this.krect
  }
  get textObj() {
    return this.ktext
  }

  get groupObj() {
    return this.group
  }


  constructor(config: ChoiceBoxConfig) {
    let thisConfig = {
      ...defaults,
      ...config,
    }

    this.krect = new Konva.Rect({
      x: thisConfig.x,
      y: thisConfig.y,
      width: thisConfig.width,
      height: thisConfig.height,
      stroke: thisConfig.stroke,
      strokeWidth: thisConfig.strokeWidth,
      padding: thisConfig.padding,
      margin: thisConfig.margin,
      cornerRadius: thisConfig.cornerRadius,
      name: 'ChoiceBoxRect',
    })

    this.ktext = new Konva.Text({
      x: thisConfig.x,
      y: thisConfig.y,
      width: thisConfig.width,
      height: thisConfig.height,
      text: thisConfig.text,
      fontSize: thisConfig.fontSize,
      fontFamily: thisConfig.fontFamily,
      padding: thisConfig.padding,
      margin: thisConfig.margin,
      align: thisConfig.align,
      verticalAlign: thisConfig.verticalAlign,
      fill: thisConfig.fill,
      opacity: thisConfig.opacity,
      name: 'ChoiceBoxText',
    })

    this.group = new Konva.Group({
      name: 'ChoiceBoxGroup',
      // x: thisConfig.x,
      // y: thisConfig.y,
      // width: thisConfig.width,
      // height: thisConfig.height,
    })

    //this.group.setAttr('draggable', true)
    this.group.add(this.krect)
    this.group.add(this.ktext)
    parentLayer.add(this.group)
    //parentLayer.add(this.text)
    parentLayer.draw()
  }

  public update(config: ChoiceBoxConfig) {
    this.krect.setAttrs(config)
    parentLayer.draw()
  }
}

interface MultipleChoicesConfig {
  x: number
  y: number
  titleToChoice_Distance: number
  choiceToChoice_Distance: number
  Title: string
  titleWidth: number
  titleHeight: number
  choices: Array<string>
  choiceBoxWidth: number
  choiceBoxHeight: number
}

var mulipleChoicesDefaults = {
  x: 0,
  y: 0,
  choiceBoxWidth: 10,
  choiceBoxHeight: 10,
  titleWidth: 10,
  titleHeight: 10,
  titleToChoice_Distance: 10,
  choiceToChoice_Distance: 20,
  Title: 'Title',
  choices: [],
}
export class MultipleChoices {
  constructor(config: MultipleChoicesConfig) {
    // let xOffset: number
    // x: 100
    let thisConfig = {
      ...mulipleChoicesDefaults,
      ...config,
    }

    let ch = new ChoiceBox({
      x: thisConfig.x,
      y: thisConfig.y,
      width: thisConfig.titleWidth,
      height: thisConfig.titleHeight,
      text: thisConfig.Title,
      strokeWidth: 0,
      fontSize: thisConfig.titleHeight,
      align: 'left',
    })

    let x = 0

    thisConfig.choices.forEach((choice, index) => {
      let y: number
      if (index === 0) x = thisConfig.x + thisConfig.titleToChoice_Distance
      else x = x + thisConfig.choiceToChoice_Distance
      y = thisConfig.y

      let ch = new ChoiceBox({
        x: x,
        y: y,
        width: thisConfig.choiceBoxWidth,
        height: thisConfig.choiceBoxHeight,
        text: choice,
      })
    })
    //parentLayer.draw()
  }
}
