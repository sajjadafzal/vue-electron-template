import Konva from 'konva'
import { parentLayer } from './stage'

var defaults = {
  stroke: 'RGB(185,185,185)',
  width: 20,
  height: 20,
  x: 0,
  y: 0,
  strokeWidth: 2,
}

interface Config {
  x: number
  y: number
  stroke?: string
  width?: number
  height?: number
  strokeWidth?: number
}

function getConfig(config: Config) {
  return {
    ...defaults,
    ...config,
  }
}

export class ChoiceBox {
  private rect: Konva.Rect

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

    parentLayer.add(this.rect)
    parentLayer.draw()
  }

  public update(config: Config) {
    this.rect.setAttrs(config)
    parentLayer.draw()
  }
}
