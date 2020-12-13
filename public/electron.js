const { app, BrowserWindow,Menu } = require('electron')
require('../src/messgaeController/main');
const path = require("path");
const isDev = require("electron-is-dev");

let addItem ;
let win;
function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(isDev? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);
    win.on("closed", () => (mainWindow = null));

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  // win.webContents.openDevTools()

  win.on("close",()=>app.quit())
}


function createAddItemWindow () {
  addItem = new BrowserWindow({
    width: 400,
    height: 300,
    title:'Add item',
    webPreferences: {
      nodeIntegration: true
    }
  })

  addItem.loadURL(isDev? "http://localhost:3000/addItem": `file://${path.join(__dirname, "../build/index.html")}`);

  if(process.env.NODE_ENV === 'production')
  {
    addItem.setMenu(null)

  }

  addItem.on('close',()=>addItem=null)

  
}
// app.whenReady().then(createWindow);
app.once('ready',()=>{    
  createWindow()
})




const menuTemplate=[
  {
    label:'File',
    submenu:[
      {
        label:'New Item',
        click(){
          createAddItemWindow()
        }
      },
      {
        label:'Quit',
        accelerator:process.platform==='darwin'?'Command+Q':'Control+Q',
        click(){
          app.quit();
          
        }
      }
    ]
  }

]

if(process.platform==="darwin")
{
  menuTemplate.unshift({})
}


if(process.env.NODE_ENV !== 'production')
{
  menuTemplate.push({
    label:'View',
    submenu:[
      {
        role:'reload'
      },
      {
        label:'Developer Toll',
        accelerator:process.platform==='darwin'?'Command+I':'Control+I',
        click(item,windowsfocused)
        {
          windowsfocused.toggleDevTools()
        }
      }
    ]
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
      
//     createWindow()
//   }
// })

