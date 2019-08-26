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
  constructor() {}
}
/** Different modes of canvas or stage */
export enum CanvasModes {
  SELECTION = 'SELECTION',
  DRAW_RECTANGLE = 'DRAW_RECTANGLE',
}

class CanvasState {
  private canvasMode: CanvasModes = CanvasModes.SELECTION
  public status: string = ''
  shapesStrokeWidth: number = 2

  constructor() {}

  setDrawMode() {
    this.canvasMode = CanvasModes.DRAW_RECTANGLE
    return this /* For enabling syntax like "function1().function2()" */
  }

  setSelectionMode() {
    this.canvasMode = CanvasModes.SELECTION
    return this
  }

  getMode(): CanvasModes {
    return this.canvasMode
  }

  setMode(mode: CanvasModes) {
    this.canvasMode = mode
  }
}

class ChoiceBox()
export const canvasState = new CanvasState() /* canvasState is an object reference and the reference will remain constant. Means we can change the object properties. */
