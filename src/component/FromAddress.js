import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import {useSelector,useDispatch} from "react-redux"
import fetchAddreducer from "../redux/fromaddress/fetchFromaddressAction"



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    
  }));




function FromAddress() {
    const classes = useStyles();
    const [formValidate,SetFormValidate]=useState()
    const [submit,setSubmit]=useState(false)
    const [firstTime,setFirstTime]=useState(true)


    const fetchAddState = useSelector(state=>state.fetchAddreducer)
    const fetchAddQuery = useDispatch();
    useEffect(() => {
          
        fetchAddQuery(fetchAddreducer("select",{}));
        
       
        
    }, [])
    console.log(fetchAddState)

    if(firstTime && fetchAddState.fetchSuccessFully.length !=0 && typeof(fetchAddState.fetchSuccessFully) == "object")
    {
      setValueToField()
    }

    function setValueToField(){
    debugger
      if(fetchAddState.fetchSuccessFully.length !=0 && fetchAddState.fetchSuccessFully !=1 && fetchAddState.fetchSuccessFully !=2 )
      {
        document.querySelector("#customerName").value = fetchAddState.fetchSuccessFully[0].CustomerName 
        document.querySelector("#customeraddr").value =fetchAddState.fetchSuccessFully[0].Cddress 
    document.querySelector("#custpin").value =fetchAddState.fetchSuccessFully[0].Cpin 
    document.querySelector("#custphone").value = fetchAddState.fetchSuccessFully[0].Cphone 
    
      }
      
    }
  function onChangeInValidation(){
    setFirstTime(false)
    if(fetchAddState.fetchSuccessFully == 1)
    {
      setSubmit(false)
      fetchAddState.fetchSuccessFully = 2
    }
    // fetchAddState.fetchSuccessFully = 22;
    if( document.querySelector("#customerName").value !="" &&
        document.querySelector("#customeraddr").value !="" &&
    document.querySelector("#custpin").value !="" &&
    document.querySelector("#custphone").value !="")
    {
        SetFormValidate(true)
       
    }
    else{
        SetFormValidate(false)
       
    }
    
  }

  function submitAddress(){
        setSubmit(true)
      
        var data = {}
        data.CustomerName=document.querySelector("#customerName").value;
        data.CustomerAdd=document.querySelector("#customeraddr").value;
        data.CPin=document.querySelector("#custpin").value;
        data.CPhone=document.querySelector("#custphone").value;
        fetchAddQuery(fetchAddreducer("update",data));
       
  }
    return(
        
        <React.Fragment>
                <h2 style={{textAlign:"center"}}>From Address   </h2>
                <br></br>
            <div style={{display:"flex",justifyContent:"center"}}>
                
           <div style={{display:"flex",justifyContent:"space-around",flexDirection:"column"}}>
        <div className="form-group row" >
          
          <div className="col-xs-4">
          
            <label className="ex3" htmlFor="email">Name: 
            
            
            </label>
            
              <input type="text" className="form-control" id={"customerName"} placeholder="Enter Customer Name" name="customername" required onChange={()=>onChangeInValidation()}>
             
              </input>
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Address:</label>
        <input className="form-control" type="text" placeholder="Enter Customer Address" id="customeraddr" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Pin:</label>
        <input type="number"  className="form-control" min="5" placeholder="Enter Customer pincode"  id="custpin" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Phone:</label>
        <input type="number" pattern="[0-9]" className="form-control" maxLength="10" placeholder="Enter Customer phone number"  id="custphone" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          </div>    
          </div>
          
          <div className="text-center"> 

          {fetchAddState.fetcherr ==""?(
 <button className="btn btn-primary" id="submit" disabled={!formValidate && fetchAddState.fetchSuccessFully.length ==0} type="button" onClick={()=>submitAddress()}>
 {!submit ?"Submit":fetchAddState.fetchSuccessFully == 1?"Done":(
     <React.Fragment>
         <div className="spinner-grow spinner-grow-sm" style={{marginLeft:"2px"}}></div>
<div className="spinner-grow spinner-grow-sm" style={{marginLeft:"2px"}}></div>
 <div className="spinner-grow spinner-grow-sm" style={{marginLeft:"2px"}}></div>
 <div className="spinner-grow spinner-grow-sm" style={{marginLeft:"2px"}}></div>
     </React.Fragment>
 )}    
 </button>

          ):(
            <button className="btn btn-danger" id="submit" disabled={!formValidate && fetchAddState.fetchSuccessFully.length ==0} type="button" onClick={()=>submitAddress()}>
            Error
            </button>
       
          )}
        </div>
        </React.Fragment>
     
    )
}


export default FromAddress;
