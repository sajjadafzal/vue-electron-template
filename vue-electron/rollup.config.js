const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const copy = require('rollup-plugin-copy')
const css = require('rollup-plugin-css-only')
const minify = require('rollup-plugin-babel-minify')
const resolve = require('rollup-plugin-node-resolve')
const sass = require('rollup-plugin-sass')
const typescript = require('rollup-plugin-typescript')
const vue = require('rollup-plugin-vue').default

const production = !process.env.ROLLUP_WATCH

module.exports = [
  {
    input: 'src/main/index.js',
    output: {
      file: 'dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
      }),
      production &&
        minify({
          comments: false,
        }),
    ],
    watch: {
      exclude: 'node_modules/**',
      clearScreen: false,
      include: 'src/main/**',
    },
  },
  {
    input: 'src/renderer/index.js',
    output: {
      file: 'dist/renderer/index.js',
      format: 'cjs',
    },
    plugins: [
      copy({
        'src/renderer/index.html': 'dist/renderer/index.html',
      }),
      resolve(),
      commonjs(),
      css(),
      sass({
        output: true,
      }),
      vue(),
      typescript(),
      babel({
        exclude: 'node_modules/**',
      }),
      production &&
        minify({
          comments: false,
        }),
    ],
    watch: {
      exclude: 'node_modules/**',
      clearScreen: false,
      include: ['src/renderer/**'],
    },
  },
]
