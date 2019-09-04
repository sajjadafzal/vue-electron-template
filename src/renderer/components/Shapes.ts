import Konva from 'konva'
import { parentLayer } from './stage'

interface Config {
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
  cornerRadius: 0,
}

function getConfig(config: Config) {
  return {
    ...defaults,
    ...config,
  }
}

export class ChoiceBox {
  private rect: Konva.Rect
  private ktext: Konva.Text
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

  get text(): string {
    return this.ktext.getAttr('text')
  }

  set text(value: string) {
    this.rect.setAttr('text', value)
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
      cornerRadius: thisConfig.cornerRadius,
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
    })
    //this.group.setAttr('draggable', true)
    this.group.add(this.rect)
    this.group.add(this.ktext)
    parentLayer.add(this.group)
    //parentLayer.add(this.text)
    parentLayer.draw()
  }

  public update(config: Config) {
    this.rect.setAttrs(config)
    parentLayer.draw()
  }
}
