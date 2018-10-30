const babel = require('rollup-plugin-babel')
const builtins = require('rollup-plugin-node-builtins')
const commonjs = require('rollup-plugin-commonjs')
const copy = require('rollup-plugin-copy')
const css = require('rollup-plugin-css-only')
const globals = require('rollup-plugin-node-globals')
const minify = require('rollup-plugin-babel-minify')
const resolve = require('rollup-plugin-node-resolve')
const sass = require('rollup-plugin-sass')
const typescript = require('rollup-plugin-typescript')
const vue = require('rollup-plugin-vue').default

const pkg = require('../package.json')
const production = !process.env.ROLLUP_WATCH

module.exports = [
  {
    external: Object.keys(pkg.dependencies).concat(
      Object.keys(pkg.devDependencies),
    ),
    input: 'src/main/index.js',
    output: {
      file: 'dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      globals(),
      builtins(),
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
    external: Object.keys(pkg.dependencies).concat(
      Object.keys(pkg.devDependencies),
    ),
    input: 'src/renderer/index.js',
    output: {
      file: 'dist/renderer/index.js',
      format: 'cjs',
    },
    plugins: [
      copy({
        'src/renderer/index.html': 'dist/renderer/index.html',
      }),
      globals(),
      builtins(),
      resolve({
        extensions: ['.scss', '.sass'],
      }),
      commonjs(),
      sass(),
      css(),
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
