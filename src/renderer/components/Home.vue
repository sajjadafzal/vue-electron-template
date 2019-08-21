<template>
  <div>
    <div id="divCanvas">
      <canvas id="mainCanvas" width="640" height="480"></canvas>
    </div>
    <div id="divToolbar">
      <button id="clear" @click="clearCanvas">
        <i class="material-icons md-dark md-48">remove_from_queue</i>
        <br />Clear
      </button>
      <button id="draw">
        <i class="material-icons md-dark md-48">create</i>
        <br />draw
      </button>
      <button id="selection">
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
  </div>
</template>

<script>
// import { canvas } from './designer'
import { clearFabricCanvas, addCanvas } from './toolbar.ts'

import Vue from 'vue'

export default Vue.extend({
  name: 'Home',

  data() {
    return {}
  },

  methods: {
    clearCanvas(e) {
      clearFabricCanvas(e)
    },
  },
})
</script>

<style>
.hero-body {
  height: 100vh;
}
</style>
