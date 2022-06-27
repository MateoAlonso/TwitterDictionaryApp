const { app, BrowserWindow, Menu, Tray} = require('electron');

let tray;
const diccWindow = () => {
  const icon = __dirname + '/assets/dictionary.ico';
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'Diccionario',
    icon: icon,
  });
  win.loadFile(__dirname + '/index.html');
  win.on('closed', () => {win.destroy();});
  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
  });
}

app.whenReady().then(() => {
  diccWindow();
  const icon = __dirname + '/assets/dictionary.ico';
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  tray = new Tray(icon);
  tray.setContextMenu(mainMenu);
  diccWindow.on('minimize',function(event){
    event.preventDefault();
    diccWindow.hide();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})


const menuTemplate = [
  {
    label: 'Dictionary',
    submenu: [
      {
        label: 'Open',
        accelerator: 'Ctrl+d',
        click(){
          diccWindow();
        },
      }
    ],
  },
  {
    label: 'Kill',
    click(){
      app.quit();
    }
  }
];

if(process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'devTools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: 'Ctrl+q',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
      role: 'reload'
      }
    ]
  });
}
