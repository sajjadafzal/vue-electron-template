import { canvasModes, canvasSettings } from './utilities'
import { clearFabricCanvas } from './toolbar'

// @ts-ignore
const fabric = window.fabric

export const canvas = new fabric.Canvas('mainCanvas')

let canvasMode: canvasModes = canvasModes.normal
var fabricCanvasSettings = new canvasSettings()

let startx: number
let starty: number

var rect = new fabric.Rect({
  left: startx,
  top: starty,
  width: width,
  height: height,
  fill: 'transparent',
  stroke: bgColor.toRgba(),
  ...shapeProps,
  padding: 0,
})
