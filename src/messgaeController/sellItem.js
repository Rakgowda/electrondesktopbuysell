const electron = window.require('electron');
const { ipcRenderer } = electron;

var d =0;
export default function sellItem(tabelName) {
    
    return new Promise((resolve,reject) => {
        ipcRenderer.once('sellfetchsuccessfully', (_, arg) => {
            // console.log(arg)
            resolve(arg)
            
            // resolve(arg);
        });
        ipcRenderer.once('sellerrorInsert', (_, arg) => {
            debugger;
            console.log(arg)
            // alert(arg)
            reject(arg);
            
        });
      
       console.log(tabelName)
        
       ipcRenderer.send('sellItem', tabelName);
        
    })
    
}   