import * as iteminsert from "./insertItemDataType";
import axios from "axios";
import addItemQuery from '../../messgaeController/render'
const electron = window.require('electron');
const { ipcRenderer } = electron;
export const insertRequest = () => {
  return {
    type: iteminsert.INSERTITEMDATA
  };
};

export const end = () => {
  return {
    type: iteminsert.INSETITEM_FETCH_END
  };
};

export const insertSucess = data => {
  
  return {
    type: iteminsert.INSETITEM_SUCCESS,
    payload: data
  };
};

export const insertError = errData => {
  return {
    type: iteminsert.INSETITEM_FETCH_ERR,
    payload: errData
  };
};

const insertItems = (sql) => {
  return dispatch => {
    // alert("hellow")
    dispatch(insertRequest());
  //  alert(sql)

   
   addItemQuery(sql).then( r=>{
     console.log(r);
     dispatch(insertSucess(r));
   }
   
   ).catch(e=>{
    insertError(e);
   })
    
      
  };
};


export default insertItems;
