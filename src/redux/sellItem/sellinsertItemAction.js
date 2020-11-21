import * as iteminsert from "./sellinsertItemDataType";
import axios from "axios";
import sellItem from '../../messgaeController/sellItem'
const electron = window.require('electron');
const { ipcRenderer } = electron;
export const insertRequest = () => {
  debugger
  return {
    type: iteminsert.INSERTSELLITEMDATA
  };
};

export const end = () => {
  return {
    type: iteminsert.INSERTSELLITEM_FETCH_END
  };
};

export const insertSucess = data => {
  
  return {
    type: iteminsert.INSERTSELLITEM_SUCCESS,
    payload: data
  };
};

export const insertError = errData => {
  return {
    type: iteminsert.INSERTSELLITEM_FETCH_ERR,
    payload: errData
  };
};

const inserSellItem = (sql) => {
  return dispatch => {
    debugger
    dispatch(insertRequest());
  //  alert(sql)

   
  sellItem(sql).then( r=>{
     console.log(r);
     dispatch(insertSucess(r));
   }
   
   ).catch(e=>{
    dispatch(insertError(e));
   })
    
      
  };
};


export default inserSellItem;
