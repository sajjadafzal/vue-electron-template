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
        <i class="material-icons md-dark md-48">open_with</i>
        <br />Select
      </button>
      <button id="DrawOptions">
        <i class="material-icons md-dark md-48">more_horiz</i>
        <br />Draw
        <br />Options
      </button>
      <span>No of Canvas Objects</span>
      <span id="CanvasObjectsNumbers"></span>
      <span>Mouse:</span>
      <span id="Mouse"></span>
    </div>
    <!--{{$data}} {{poka}} !-->
    {{canvasState}}
  </div>
</template>

<script>
import { createCanvas } from './stage'
import { clearCanvas, enableDraw, addCircle, enableSelection } from './toolbar'
import { canvasState } from './utilities'

export default {
  name: 'Home',

  data() {
    return { canvasState }
  },

  methods: {
    clearCanvas() {
      clearCanvas()
    },

    enableDraw() {
      canvasState.setDrawMode()
    },

    addCircle() {},

    enableSelection() {
      canvasState.setSelectionMode()
    },
  },

  created() {},

  mounted() {
    createCanvas()
  },
}
</script>

<style></style>
