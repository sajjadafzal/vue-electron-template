const fs = require('fs')

const babel = require('rollup-plugin-babel')
const builtins = require('rollup-plugin-node-builtins')
const commonjs = require('rollup-plugin-commonjs')
const copy = require('rollup-plugin-copy')
const json = require('rollup-plugin-json')
const minify = require('rollup-plugin-babel-minify')
const resolve = require('rollup-plugin-node-resolve')
const scss = require('rollup-plugin-scss')
const typescript = require('rollup-plugin-typescript')
const vue = require('rollup-plugin-vue').default

const pkg = require('../package.json')
const production = process.env.NODE_ENV === 'production'

fs.createReadStream('src/renderer/index.html').pipe(
  fs.createWriteStream('dist/renderer/index.html'),
)

module.exports = [
  {
    external: [...Object.keys(pkg.devDependencies)],
    input: 'src/main/index.js',
    output: {
      file: 'dist/main/index.js',
      format: 'cjs',
    },
    plugins: [
      builtins(),
      resolve(),
      commonjs(),
      typescript(),
      json(),
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
    external: [...Object.keys(pkg.devDependencies)],
    input: 'src/renderer/index.js',
    output: {
      file: 'dist/renderer/index.js',
      format: 'cjs',
    },
    plugins: [
      copy({
        'src/renderer/assets': 'dist/renderer/assets',
      }),
      builtins(),
      resolve(),
      commonjs(),
      vue(),
      scss({
        output: 'dist/renderer/index.css',
        includePaths: ['node_modules'],
        indentedSyntax: true,
        outputStyle: production ? 'compressed' : 'expanded',
      }),
      typescript(),
      json(),
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
