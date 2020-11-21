const electron = window.require('electron');
const { ipcRenderer } = electron;

var d =0;
export default function addItemQuery(sql) {
    
    return new Promise((resolve) => {
        ipcRenderer.once('insetDetail', (_, arg) => {
            console.log(arg)
            resolve(arg)
            
            // resolve(arg);
        });
        ipcRenderer.once('errorInsert', (_, arg) => {
            console.log(arg)
            alert(arg)
            // resolve(arg);
            
        });
      
       
        console.log("navu ")
       ipcRenderer.send('itemAdding', sql);
        
    })
    
}   