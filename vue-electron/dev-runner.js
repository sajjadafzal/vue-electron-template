/* eslint-disable*/
const electron = require('electron')
const rollup = require('rollup')
const liveServer = require('live-server')
/* eslint-enable */

// eslint-disable-next-line
const spinner = require('ora')('Loading...').start()
let watcher

const path = require('path')
const { spawn } = require('child_process')

const watchConfig = require('./rollup.config')

let isManualRestart = false
let isFirstRun = true
let electronProcess = null

function startServer() {
  liveServer.start({
    root: 'dist/renderer/',
    port: '9080',
    open: false,
    logLevel: 0,
    wait: 100,
  })
}

function stopElectron() {
  isManualRestart = true

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

  electronProcess.on('close', () => {
    stopElectron()

    if (!isManualRestart) {
      watcher.close()
      spinner.stop()
      process.exit(0)
    }
  })
}

function init() {
  watcher = rollup.watch(watchConfig)

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
