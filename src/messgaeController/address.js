const electron = window.require('electron');
const { ipcRenderer } = electron;

var d =0;
export default function fromadress(type,address) {
    
    return new Promise((resolve,reject) => {
        ipcRenderer.once('fromadressfetchsuccessfully', (_, arg) => {
            // console.log(arg)
            resolve(arg)
            
            // resolve(arg);
        });
        ipcRenderer.once('fromadresserrorInsert', (_, arg) => {
            debugger;
            console.log(arg)
            // alert(arg)
            reject(arg);
            
        });
      
       console.log(address)
       console.log(type)

       if(type=="select"){
       ipcRenderer.send('selectfromaddress', address);

       }
       else{
       ipcRenderer.send('fromaddress', address);

       }
        
        
    })
    
}   