import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import createSocketServer from './createSocketServer';
const debug = require('electron-debug');

debug();
const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  // create electron app
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true, // TODO: remove
    },
  });
  createSocketServer(app);
  if (isProd) {
    await mainWindow.loadURL('app://./index.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
