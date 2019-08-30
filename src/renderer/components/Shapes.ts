import Konva from 'konva'
import { parentLayer } from './stage'

interface Config {
  x: number
  y: number
  text: string
  stroke?: string
  width: number
  height: number
  strokeWidth?: number
  fontSize?: number
  fontFamily?: String
  fill?: number
}

interface TextConfig {
  x: number
  y: number
  text?: string
  fontSize?: number
  fontFamily?: String
  fill?: number
}

var defaults = {
  x: 0,
  y: 0,
  stroke: 'RGB(185,185,185)',
  width: 20,
  height: 20,
  strokeWidth: 2,
}

var textDefaults = {
  text: '',
  fontSize: 30,
  fontFamily: 'Calibri',
  fill: defaults.stroke,
}

function getConfig(config: Config) {
  return {
    ...defaults,
    ...textDefaults,
    ...config,
  }
}

function getTextConfig(textConfig: TextConfig) {
  return {
    ...textDefaults,
    ...textConfig,
  }
}

export class ChoiceBox {
  private rect: Konva.Rect
  private text: Konva.Text

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
    this.rect = new Konva.Rect(getConfig(config))
    this.text = new Konva.Text({
      x: config.width / 2,
      y: config.height / 2,
    })
    parentLayer.add(this.rect)
    parentLayer.draw()
  }

  public update(config: Config) {
    this.rect.setAttrs(config)
    parentLayer.draw()
  }
}
