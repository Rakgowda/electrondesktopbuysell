import * as fetchitem from "./fetchSellItemDataType";
import axios from "axios";
import fetchItemQuery from '../../messgaeController/fetchItem'
const electron = window.require('electron');
const { ipcRenderer } = electron;

export const fetchRequest = () => {
  return {
    type: fetchitem.FETCHITEMDATA
  };
};

export const fetchSucess = data => {
  return {
    type: fetchitem.FETCHITEM_SUCCESS,
    payload: data
  };
};

export const fetchErr = data => {
  
  return {
    type: fetchitem.FETCHITEM_FETCH_ERR,
    payload: data
  };
};


const fetchSellItems = (tabelName) => {
  return dispatch => {
    // alert("hellow")
    dispatch(fetchRequest());
  //  alert(sql)

   
  fetchItemQuery(tabelName).then( r=>{
     console.log(r);
     console.log(r[0]);
     let rr = [];
     Object.values(r).forEach(element => {
       console.log(element)
       rr.push(JSON.stringify(element))
     });

     dispatch(fetchSucess(rr));
   }
   
   ).catch(e=>{
    fetchErr(e);
   })
    
      
  };
};


export default fetchSellItems;
