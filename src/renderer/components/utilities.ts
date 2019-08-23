enum Shapes {
  RECTANTLE = 'RECTANGLE',
  TEXT = 'TEXT',
  OPTIONS = 'OPTIONS',
}
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

    return this
  }

  setSelectionMode() {
    this.canvasMode = CanvasModes.SELECTION
    return this
  }

  getMode(): CanvasModes {
    return this.canvasMode
  }
}

export const canvasState = new CanvasState()
