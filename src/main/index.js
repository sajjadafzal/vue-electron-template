/* eslint-disable */
const { app, BrowserWindow } = require('electron')

require('electron-debug')({
  showDevTools: true,
})
/* eslint-enable */
const path = require('path')

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

let mainWindow
let winURL = 'http://localhost:9080'

if (process.env.NODE_ENV === 'production')
  winURL = `file://${path.join(__dirname, '..', 'renderer/index.html')}`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    width: 1000,
    height: 700,
    minWidth: 500,
    minHeight: 350,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegrationInWorker: false,
      webSecurity: true,
    },
    show: false,
  })

  // mainWindow.setMenu(null)
  mainWindow.loadURL(winURL)

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.ELECTRON_ENV === 'development' ||
      process.argv.indexOf('--debug') !== -1
    ) {
      require('vue-devtools').install() //eslint-disable-line
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
