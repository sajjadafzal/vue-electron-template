const babel = require('rollup-plugin-babel')
const builtins = require('rollup-plugin-node-builtins')
const commonjs = require('rollup-plugin-commonjs')
const copy = require('rollup-plugin-copy')
const deletePlugin = require('rollup-plugin-delete')
const minify = require('rollup-plugin-babel-minify')
const resolve = require('rollup-plugin-node-resolve')
const scss = require('rollup-plugin-scss')
const typescript = require('rollup-plugin-typescript')
const vue = require('rollup-plugin-vue').default

const pkg = require('../package.json')
const production = !process.env.NODE_ENV === 'development'

module.exports = [
  {
    external: [
      // ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
    ],
    input: 'src/main/index.js',
    output: {
      file: 'dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      deletePlugin({ targets: 'dist/*' }),
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
      clearScreen: true,
      include: 'src/main/**',
    },
  },
  {
    external: [
      // ...Object.keys(pkg.dependencies),
      // ...Object.keys(pkg.devDependencies),
      'electron',
      'vue-electron',
    ],
    input: 'src/renderer/index.js',
    output: {
      file: 'dist/renderer/index.js',
      format: 'cjs',
    },
    plugins: [
      copy({
        'src/renderer/index.html': 'dist/renderer/index.html',
        'src/renderer/assets': 'dist/renderer/assets',
      }),
      builtins(),
      resolve(),
      commonjs(),
      vue(),
      scss({
        output: 'dist/renderer/index.css',
        includePaths: ['node_modules'],
      }),
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
      clearScreen: true,
      include: ['src/renderer/**'],
    },
  },
]
