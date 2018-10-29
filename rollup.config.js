import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import vue from 'rollup-plugin-vue'

const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'src/main/index.js',
      format: 'iife',
      sourcemap: production,
      sourcemapFile: 'dist/electron/main.min.js.map',
    },
    plugins: [
      buble(),
      resolve(),
      commonjs(),
      production && minify({ comments: false }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'src/renderer/main.js',
      format: 'iife',
      sourcemap: production,
      sourcemapFile: 'dist/electron/renderer.min.js.map',
    },
    plugins: [
      buble(),
      commonjs(),
      sass(),
      vue(),
      production && minify({ comments: false }),
    ],
    watch: {
      clearScreen: false,
    },
  },
]
