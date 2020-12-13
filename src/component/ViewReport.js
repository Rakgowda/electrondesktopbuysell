import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import history from '../HistroryTracker/history'
import {useSelector,useDispatch} from "react-redux"
import fetchItems from "../redux/fetchBuyResult/fetchItemAction"
import ItemTabel from "./ItemTabel"
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import NoData from '../images/no data.svg'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
var moment = require('moment');

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
    noData:{
      width: "30%",
    display: "flex",
    "justify-content": "center",
    "margin": "auto",
    "padding-top": "20px"
    }
  }));
  

function ViewReport() {
    const classes = useStyles();
    const fetchQueryState = useSelector(state=>state.fetchreducer)
    const fetchQuery = useDispatch();
    const [tabelName,setTabelName] = useState("ItemBuyDetail")
    // alert(insertQueryState)
    const [selectedDate, setSelectedDate] = React.useState(moment().format("YYYY-MM-DD").toString());

    const handleDateChange = (date) => {
      setSelectedDate(date);
      document.querySelector("#buy").innerText = "Buy Date Search";
      document.querySelector("#sell").innerText = "Sell Date Search";
      document.querySelector("#itemlist").innerText = "Item List Date Search";

  
    };   
    const [selectedToDate, setSelectedToDate] = React.useState(moment().format("YYYY-MM-DD").toString());
  
    const handleToDateChange = (date) => {
      setSelectedToDate(date);
      document.querySelector("#buy").innerText = "Buy Date Search";
      document.querySelector("#sell").innerText = "Sell Date Search";
      document.querySelector("#itemlist").innerText = "Item List Date Search";

    };
    console.log(fetchQueryState)
    

    
        useEffect(() => {
          
            fetchQuery(fetchItems({"data":tabelName,from:moment().format("YYYY-MM-DD").toString(),to:moment().format("YYYY-MM-DD").toString()}));
           
            
        }, [])

        function callTabelDATA(data)
        {
          console.log(moment(selectedDate).format("YYYY-MM-DD").toString())
          console.log(moment(selectedToDate).format("YYYY-MM-DD").toString())
          fetchQuery(fetchItems({"data":data,"from":moment(selectedDate).format("YYYY-MM-DD").toString(),"to":moment(selectedToDate).format("YYYY-MM-DD").toString()}));
          setTabelName(data)
          document.querySelector("#buy").innerText = "Buy";
          document.querySelector("#sell").innerText = "Sell";
          document.querySelector("#itemlist").innerText = "Item List";

        }

        // alert(moment().format("YYYY-MM-DD").toString())
       


    return(
        <div className="container-fluid">
        <Header></Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <br></br>
        <br></br>
        <br></br>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="center">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="fromdate"
          label="From"
          value={selectedDate}
          onChange={handleDateChange}
          style={{margin:"10px"}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="todate"
          label="To"
          value={selectedToDate}
          style={{margin:"10px"}}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
        <div className="text-center" style={{display:"flex",justifyContent:"center"}}> 
     <button className="btn btn-primary" type="button" id="buy" onClick = {()=>callTabelDATA("ItemBuyDetail")} style={{margin:"10px"}}>Buy</button>
     <button className="btn btn-danger" type="button" id="sell" style={{margin:"10px"}} onClick={()=>callTabelDATA("ItemSell")}>Sell</button>
     <button className="btn btn-warning" type="button" id="itemlist" onClick = {()=>callTabelDATA("ItemBuy")} style={{margin:"10px"}}>Item List</button>
      
     </div>
        {fetchQueryState.fetchSuccessFully.length>0?(
          <ItemTabel tabelData={fetchQueryState.fetchSuccessFully} tabelName={tabelName}></ItemTabel>
        ):fetchQueryState.fetchLoading == true?(
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
        ):(
          <img src={NoData} className={classes.noData}></img>
        )}
        
        </div>
    )
}


export default ViewReport;
