import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import history from '../HistroryTracker/history'
import insertItems from "../redux/insertItem/insertItemAction"
import {useSelector,useDispatch} from "react-redux"
import tick from "../images/tick.svg"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    cardDiv: {
      display:"flex",
      justifyContent:"center"
    },
  }));
  

function SummaryScreen(params) {
    const classes = useStyles();
    const insertQueryState = useSelector(state=>state.itemInsertReducer)
    const insertQuery = useDispatch();
    // alert(insertQueryState)
    console.log(insertQueryState)
    

    
        useEffect(() => {
          
            insertQuery(insertItems(params.location.state));
           
            
        }, [])
    
    
    
  
   
    console.log(params.location.state)

    return(
        <React.Fragment>
          <div className="container-fluid">
<Header>

</Header>
<button className="btn btn-primary" type="button" onClick={() => history.push("/addItem")} >Back</button>
          {insertQueryState.insertSuccessFully !=""?(<div>
            <div class="card" style={{width:"300px",margin:"auto",top:"200px"}}>
    <div class="card-body">
      <h4 class="card-title text-center">Summary screen</h4>
      <div className={classes.cardDiv}>
      <img src={tick} class="center" width="50px" height="50px"></img>
      </div>
      <p class="card-text text-center"> {insertQueryState.insertSuccessFully }</p>
      
    </div>
  </div>
             
          </div>):(
            <div>
              <div class="spinner-grow text-muted"></div>
            <div class="spinner-grow text-primary"></div>
            <div class="spinner-grow text-success"></div>
            <div class="spinner-grow text-info"></div>
            <div class="spinner-grow text-warning"></div>
            <div class="spinner-grow text-danger"></div>
            <div class="spinner-grow text-secondary"></div>
            <div class="spinner-grow text-dark"></div>
            <div class="spinner-grow text-light"></div>
            </div>
          )}
        
          </div>
        </React.Fragment>
    )
}


export default SummaryScreen;
