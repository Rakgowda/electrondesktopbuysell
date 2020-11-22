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

        function callTabelDATA(data)
        {
          fetchQuery(fetchItems(data));
          setTabelName(data)

        }

       

    return(
        <div className="container-fluid">
        <Header></Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center" style={{display:"flex",justifyContent:"center"}}> 
     <button className="btn btn-primary" type="button" onClick = {()=>callTabelDATA("ItemBuy")} style={{margin:"10px"}}>Buy</button>
     <button className="btn btn-danger" type="button" style={{margin:"10px"}} onClick={()=>callTabelDATA("ItemSell")}>Sell</button>

     </div>
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
