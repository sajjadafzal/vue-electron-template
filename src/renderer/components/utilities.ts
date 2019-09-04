/** SHAPES ENUMERATION */
enum Shapes {
  RECTANTLE = 'RECTANGLE',
  TEXT = 'TEXT',
  OPTIONS = 'OPTIONS',
}

/** Point objects can store the x and y position of the stage or canvas*/
export class Point {
  x: number
  y: number

  constructor(xVal?: number, yVal?: number) {
    this.x = xVal || 0
    this.y = yVal || 0
  }
}
/** Different modes of canvas or stage */
export enum CanvasModes {
  SELECTION = 'SELECTION',
  DRAW_RECTANGLE = 'DRAW_RECTANGLE',
  DRAW_CHOICES = 'DRAW_CHOICES',
}

class CanvasState {
  private canvasMode: CanvasModes = CanvasModes.SELECTION
  public status: string = ''
  shapesStrokeWidth: number = 2

  constructor() {}

  getMode(): CanvasModes {
    return this.canvasMode
  }

  setMode(mode: CanvasModes) {
    this.canvasMode = mode
  }
}

export const canvasState = new CanvasState() /* canvasState is an object reference and the reference will remain constant. Means we can change the object properties. */
