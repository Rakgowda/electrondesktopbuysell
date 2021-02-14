import * as fetchadd from "./fetchFromaddressDataType";
import axios from "axios";
import fromadress from '../../messgaeController/address'
const electron = window.require('electron');
const { ipcRenderer } = electron;

export const fetchRequest = () => {
  return {
    type: fetchadd.FETCHADDDATA
  };
};

export const fetchSucess = data => {
  return {
    type: fetchadd.FETCHADD_SUCCESS,
    payload: data
  };
};

export const fetchErr = data => {
  
  return {
    type: fetchadd.FETCHADD_FETCH_ERR,
    payload: data
  };
};


const fetchAdd = (queryType,item) => {
  return dispatch => {
    // alert("hellow")
    dispatch(fetchRequest());
  //  alert(sql)

  fromadress(queryType,item).then( r=>{
     console.log(r);
     dispatch(fetchSucess(r))
   }
   
   ).catch(e=>{
    fetchErr(e);
   })
    
      
  };
};


export default fetchAdd;
