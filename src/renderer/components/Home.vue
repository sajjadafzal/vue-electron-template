<template>
  <div>
    <div id="divCanvas"></div>
    <div id="divToolbar">
      <button id="clear" @click="clearCanvas">
        <i class="material-icons md-dark md-48">remove_from_queue</i>
        <br />Clear
      </button>
      <button id="draw" @click="enableDraw">
        <i class="material-icons md-dark md-48">create</i>
        <br />draw
      </button>
      <button @click="addCircle">
        <i class="material-icons md-dark md-48">add_circle_outline</i>
        <br />Circle
      </button>
      <button @click="enableSelection">
        <i class="material-icons md-dark md-48">tab_unselected</i>
        <br />Select
      </button>
      <button @click="enableTransform">
        <i class="material-icons md-dark md-48">crop_free</i>
        <br />Transform
      </button>
      <button id="DrawChoices" @click="drawChoices">
        <i class="material-icons md-dark md-48">more_horiz</i>
        <br />Draw
        <br />Choices
      </button>
      <span>No of Questions</span>
      <input id="noOfQuestions" v-model="uiState.noOfQuestions" type="number" min="1" max="100" />
      <span>No of Options</span>
      <input id="noOfOptions" v-model="uiState.noOfOptions" type="number" min="2" max="6" />
      <span>No of Columns</span>
      <input id="noOfColumns" v-model="uiState.noOfColumns" type="number" min="1" max="5" />
      <span>No of Canvas Objects</span>
      <span id="CanvasObjectsNumbers"></span>
      <span>Mouse:</span>
      <span id="Mouse"></span>
    </div>
    <!--{{$data}} {{poka}} !-->
    {{canvasState}}
    {{uiState}}
  </div>
</template>

<script>
import { createCanvas } from './stage'
import { clearCanvas, drawChoices } from './toolbar'
import { canvasState, CanvasModes, uiState } from './utilities'

export default {
  name: 'Home',

  data() {
    return { canvasState, uiState }
  },
  created() {},

  mounted() {
    createCanvas()
  },
  methods: {
    clearCanvas() {
      clearCanvas()
    },

    enableDraw() {
      canvasState.setMode(CanvasModes.DRAW_RECTANGLE)
    },

    addCircle() {},

    enableSelection() {
      canvasState.setMode(CanvasModes.SELECTION)
    },

    enableTransform() {
      canvasState.setMode(CanvasModes.TRANSFORM)
    },

    drawChoices() {
      canvasState.setMode(CanvasModes.DRAW_CHOICES)
      drawChoices()
    },
  },
}
</script>

<style>
canvas {
  border: 1px solid red !important;
}
</style>
