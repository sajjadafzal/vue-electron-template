import Konva from 'konva'
import { parentLayer } from './stage'

interface Config {
  x: number
  y: number
  width: number
  height: number
  text: string

  stroke?: string
  strokeWidth?: number
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
}

export function getConfig(config: Config) {
  return {
    ...defaults,
    ...config,
  }
}

export class ChoiceBox {
  private rect: Konva.Rect
  private text: Konva.Text
  private group = new Konva.Group()

  get x(): number {
    return this.rect.getAttr('x')
  }

  set x(value: number) {
    this.rect.setAttr('x', value)
    parentLayer.draw()
  }

  get y(): number {
    return this.rect.getAttr('y')
  }

  set y(value: number) {
    this.rect.setAttr('y', value)
    parentLayer.draw()
  }
  constructor(config: Config) {
    let thisConfig = {
      ...defaults,
      ...config,
    }

    this.rect = new Konva.Rect({
      x: thisConfig.x,
      y: thisConfig.y,
      width: thisConfig.width,
      height: thisConfig.height,
      stroke: thisConfig.stroke,
      strokeWidth: thisConfig.strokeWidth,
      padding: thisConfig.padding,
      margin: thisConfig.margin,
    })
    this.text = new Konva.Text({
      x: thisConfig.x, // + thisConfig.width / 2,
      y: thisConfig.y, // + config.height / 2,
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
    })
    //this.group.setAttr('draggable', true)
    this.group.add(this.rect)
    this.group.add(this.text)
    parentLayer.add(this.group)
    //parentLayer.add(this.text)
    parentLayer.draw()
  }

  public update(config: Config) {
    this.rect.setAttrs(config)
    parentLayer.draw()
  }
}
