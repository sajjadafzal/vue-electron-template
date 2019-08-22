import { canvasModes, canvasSettings } from './utilities'
import { clearFabricCanvas } from './toolbar'

// @ts-ignore
/** @type  { fabric } */
const fabric = window.fabric

export const canvas = new fabric.Canvas('mainCanvas')

let canvasMode: canvasModes = canvasModes.normal
var fabricCanvasSettings = new canvasSettings()

let startx: number = 10
let starty: number = 10
let width: number = 20
let height: number = 50
let fill: string = 'transparent'

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
