/* eslint-disable*/
const electron = require('electron')
const handler = require('serve-handler')
const http = require('http')
const rollup = require('rollup')
/* eslint-enable */

// eslint-disable-next-line
const spinner = require('ora')('Loading...').start()

const path = require('path')
const { spawn } = require('child_process')

const watchConfig = require('./rollup.config')

let isFirstRun = true
let electronProcess = null

function log(str) {
  console.log(`\n${str.toString()}`)
}

function startServer() {
  const server = http.createServer((request, response) => {
    handler(request, response, {
      public: 'dist/renderer',
    })
  })
  server.listen(9080)
}

function stopElectron() {
  if (electronProcess && electronProcess.kill) {
    electronProcess.kill()
    electronProcess = null
  }
}

function startElectron() {
  if (electronProcess && electronProcess.kill) return

  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '../dist/main/index.js'),
  ])

  electronProcess.stdout.on('data', data => {
    log(data)
  })

  electronProcess.stderr.on('data', data => {
    log(data)
  })

  electronProcess.on('close', () => {
    if (electronProcess && electronProcess.kill) electronProcess.kill()
  })
}

function init() {
  const watcher = rollup.watch(watchConfig)

  watcher.on('event', event => {
    const { code, input } = event

    switch (code) {
      case 'BUNDLE_START':
        if (input === 'src/main/index.js') {
          spinner.text = 'Building main script...'
          stopElectron()
        } else {
          spinner.text = 'Building renderer script...'
        }
        break
      case 'BUNDLE_END':
        if (input === 'src/main/index.js') {
          spinner.text = 'Starting electron...'
        } else if (isFirstRun) {
          isFirstRun = false
          startServer()
        }
        spinner.text = 'Waiting for file changes...'
        break
      case 'END':
        startElectron()
        break
      case 'ERROR':
      case 'FATAL':
        console.log('ERROR: ', event.error)
        spinner.text = 'Error occurred: Waiting for file changes...'
        break
      default:
        break
    }
  })
}

init()
