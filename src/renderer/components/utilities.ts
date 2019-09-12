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
  TRANSFORM = 'TRANSFORM',
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

class UIState {
  private _noOfQuestions: number
  private _noOfOptions: number
  private _noOfColumns: number

  constructor() {
    this._noOfQuestions = 1
    this._noOfOptions = 2
    this._noOfColumns = 1
  }

  get noOfQuestions(): number {
    return this._noOfQuestions
  }

  set noOfQuestions(value: number) {
    this._noOfQuestions = value
  }

  get noOfOptions(): number {
    return this._noOfOptions
  }

  set noOfOptions(value: number) {
    this._noOfOptions = value
  }

  get noOfColumns(): number {
    return this._noOfColumns
  }

  set noOfColumns(value: number) {
    this._noOfColumns = value
  }
}

export const uiState = new UIState()
export const canvasState = new CanvasState() /* canvasState is an object reference and the reference will remain constant. Means we can change the object properties. */
