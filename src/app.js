'use strict';
require('babel/polyfill');

import app from 'app';
import BrowserWindow from 'browser-window';
import crashReporter from 'crash-reporter';
import Menu from 'menu';
import appMenu from './browser/menu/appMenu';
import ipc from 'ipc';
import dialog from 'dialog';

let mainWindow = null;
if(process.env.NODE_ENV === 'develop'){
  crashReporter.start();
  //appMenu.append(devMenu);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  //Menu.setApplicationMenu(appMenu);
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800
  });

  mainWindow.loadUrl('file://' + __dirname + '/renderer/index.html');
});
