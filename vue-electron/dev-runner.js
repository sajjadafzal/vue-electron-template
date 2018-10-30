/* eslint-disable*/
const electron = require('electron')
const handler = require('serve-handler')
const http = require('http')
const rollup = require('rollup')
/* eslint-enable */

const path = require('path')
const { spawn } = require('child_process')

const watchConfig = require('./rollup.config')

let isFirstRun = true
let electronProcess = null

function log(str) {
  console.log(`\n${str.toString()}`)
}

function startServer() {
  const server = http.createServer(handler)
  server.listen(9080)
}

function stopElectron() {
  if (electronProcess) {
    electronProcess.kill()
    electronProcess = null
  }
}

function startElectron() {
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
    electronProcess.kill()
  })
}

function init() {
  const watcher = rollup.watch(watchConfig)

  watcher.on('event', event => {
    const { code, input } = event

    switch (code) {
      case 'BUNDLE_START':
        if (input === 'src/main/index.js') stopElectron()
        break
      case 'BUNDLE_END':
        if (input === 'src/main/index.js') startElectron()
        break
      case 'END':
        if (isFirstRun) {
          isFirstRun = false

          startServer()
          startElectron()
          // eslint-disable-next-line
          const spinner = require('ora')('Loading...').start()
        }
        break
      case 'ERROR':
      case 'FATAL':
        console.log('ERROR: ', event.error)
        break
      default:
        break
    }
  })
}

init()
