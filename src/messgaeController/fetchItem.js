const electron = window.require('electron');
const { ipcRenderer } = electron;

var d =0;
export default function fetchItemQuery(tabelName) {
    debugger
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
      
       console.log(typeof(tabelName))
       debugger
   if(typeof(tabelName) == "object")
   {
    ipcRenderer.send('selectItemDate', tabelName);
   }
    else{
        ipcRenderer.send('selectItem', tabelName);
    }
       
        
    })
    
}   