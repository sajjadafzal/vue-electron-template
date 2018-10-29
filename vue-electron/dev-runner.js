/* eslint-disable*/
const electron = require('electron')
/* eslint-enable */

const path = require('path')

const { spawn } = require('child_process')

let electronProcess = null
const manualRestart = false

function startRenderer() {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {})
}

function electronLog(data) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `${line}\n`
  })
  console.info(log)
}

function startElectron() {
  electronProcess = spawn(electron, [
    '--inspect=5858',
    path.join(__dirname, '../dist/electron/main.js'),
  ])

  electronProcess.stdout.on('data', data => {
    electronLog(data)
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data)
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function startMain() {
  return new Promise((resolve, reject) => {})
}

function init() {
  console.log('\nStarting pack scripts...')

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      console.log('\nStarting electron...')
      startElectron()
    })
    .catch(err => {
      console.error('\nError: \n', err)
    })
}

init()
