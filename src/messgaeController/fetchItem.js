const electron = window.require('electron');
const { ipcRenderer } = electron;

var d =0;
export default function fetchItemQuery(tabelName) {
    
    return new Promise((resolve) => {
        ipcRenderer.once('fetchsuccessfully', (_, arg) => {
            // console.log(arg)
            resolve(arg)
            
            // resolve(arg);
        });
        ipcRenderer.once('errorInsert', (_, arg) => {
            console.log(arg)
            // alert(arg)
            resolve(arg);
            
        });
      
       
        
       ipcRenderer.send('selectItem', tabelName);
        
    })
    
}   