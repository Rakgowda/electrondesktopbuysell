import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import history from '../HistroryTracker/history'
import {useSelector,useDispatch} from "react-redux"
import fetchItems from "../redux/fetchBuyResult/fetchItemAction"
import ItemTabel from "./ItemTabel"
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    divCenter: {
      display:"flex",
      justifyContent:"center",
      transform:"translateY(250px)"
    },
  }));
  

function ViewReport() {
    const classes = useStyles();
    const fetchQueryState = useSelector(state=>state.fetchreducer)
    const fetchQuery = useDispatch();
    const [tabelName,setTabelName] = useState("ItemBuy")
    // alert(insertQueryState)
    console.log(fetchQueryState)
    

    
        useEffect(() => {
          
            fetchQuery(fetchItems(tabelName));
           
            
        }, [])

       

    return(
        <div className="container-fluid">
        <Header></Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <br></br>
        <br></br>
        <br></br>
        {fetchQueryState.fetchSuccessFully.length>0?(
          <ItemTabel tabelData={fetchQueryState.fetchSuccessFully} tabelName={tabelName}></ItemTabel>
        ):(
          <div className={classes.divCenter}>
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
    )
}


export default ViewReport;
