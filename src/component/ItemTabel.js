import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import TextField from '@material-ui/core/TextField';
import { getJSON } from 'jquery';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    iemBuy: {
      color:"blue",
      
    },
    iemSold: {
        color:"red",
        
      },
      iemList:{
        color:"#ffc107",

      }
      ,
      paper: {
        position: 'absolute',
        "min-width": 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        padding:"10px"
      },
  }));
  function searchdate(){
    console.log(document.querySelector("#fromdate").value)
    console.log(document.querySelector("#todate").value)
    
  }
  function myFunction() {
    

    var input, filter, table, tr, td, i, txtValue,ltd;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    ltd = table.getElementsByTagName("td");
    for (i = 0; i < tr.length; i++) {
      
      for(let j=0;j<tr[i].getElementsByTagName("td").length;j++)
      {
        td = tr[i].getElementsByTagName("td")[j];
        debugger
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          }
        }  
      }
      
           
    }
  }

function ItemTable(params) {
    const classes = useStyles();
    let tabledata = params.tabelData;
    let trclass = params.tabelName =="ItemBuy" ? classes.iemList :  params.tabelName =="ItemBuyDetail" ?classes.iemBuy:classes.iemSold
    // alert(tabledata.length)

    function reGeneratePDF(data) {  
      data.item = JSON.parse(data.item);
      console.log(data)
      history.push({
        pathname: '/pdfregenerate',
  state: data
  })
    }

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [dataitem, setDataitem] = React.useState({});
    const body=()=>{
return (
  <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Item Detail</h2>
    <table class="table table-striped text-center">
<thead>
<tr>
  <th>Item</th>
  <th>Price</th>
  <th>Quantity</th>
  <th>Total</th>
</tr>
</thead>
<tbody>

  {Object.keys(dataitem).map(e=>{
    console.log(dataitem[e]["itemname"])
    return (<tr>
      <td>{dataitem[e]["itemname"] || dataitem[e]["item"]}</td>
      <td>{dataitem[e]["quantity"]}</td>
      <td>{dataitem[e]["price"]}</td>
      <td>{dataitem[e]["price"]*dataitem[e]["quantity"]}</td>
    
    </tr>)
  })}


</tbody>
</table>
    
  </div>
)
    }
    const handleOpen = (e) => {
     
      console.log(JSON.parse(e))
      setDataitem(JSON.parse(e))
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    return(
        <div className="container-fluid">

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
          <div style={{display:"flex",justifyContent:"center"}}>
        <div >
          <TextField id="myInput" label="Search" onChange={()=>myFunction()} placeholder="Search" title="Search anything" />

        </div>
        {/* <div style={{transform: "translateY(10px)"}}>
        <a href="#demo" class="btn btn-primary" data-toggle="collapse">Advance Search</a>
  <div id="demo" class="collapse" style={{height:"200px",width:"200px"}}>

  <div class="form-group">
      <label for="usr">From Date:</label>
      <input type="date" class="form-control" id="fromdate" name="fromdate" />
    </div>
    <div class="form-group">
      <label for="usr">To Date:</label>
      <input type="date" class="form-control" id="todate" name="todate" />
    </div>
    

    <button className="btn btn-primary" type="button" onClick={()=>searchdate()}>Search</button>

  
  </div>
        </div> */}
          </div>
<br></br>
<br></br>
<table class="table table-striped text-center" id="myTable">

    <thead>
      <tr>
        {params.tabelName=="ItemBuy"?(
          <React.Fragment>
          <th>ItemName</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        <th>Last Updated</th>
        </React.Fragment>
        ):params.tabelName=="ItemBuyDetail"?(
        <React.Fragment>
          <th>Number of item</th>

          <th>Customer Name</th>
        
        <th>Invoice Number</th>
        <th>Last Updated</th>
        <th>View Detail</th>

        </React.Fragment>
        ):(
          <React.Fragment>
          <th>Number of item</th>

          <th>Customer Name</th>
        
        <th>Invoice Number</th>
        <th>Last Updated</th>
        <th>Invoice Generate</th>
        <th>View Detail</th>


        </React.Fragment>
        )}
        
      </tr>
    </thead>
    <tbody className="text-center">
        {tabledata.map(e=>{
           let item = JSON.parse(e);
           
            if(params.tabelName=="ItemBuy")
            {
              
             return(
               <tr className={trclass}>
               <td>{item["itemName"]}</td>
               <td>{item["quantity"]}</td>
               <td>{item["price"]}</td>
               <td>{item["price"]*item["quantity"]}</td>
   
               <td>{item["date"]}</td>
   
             </tr>
              )
            }
            else if(params.tabelName=="ItemBuyDetail")
            {
              return(
                <tr className={trclass}>
               
                <td>{item["item"]?item["item"].split("}").length - 2:""}</td>
                <td>{item["CustomerName"]}</td>
               
                <td>{item["Invoice"]}</td>
  
    
                <td>{item["date"]}</td>
  
                <td><button className="btn btn-primary" type="button" onClick={()=>handleOpen(item.item)}>View Detail</button></td>
    
              </tr>
               )
    
             
            }
            else{
             
              return(
               <tr className={trclass}>
              
               <td>{item["item"]?item["item"].split("}").length - 1:""}</td>
               <td>{item["CustomerName"]}</td>
              
               <td>{item["Invoice"]}</td>
 
   
               <td>{item["date"]}</td>
               <td><button className="btn btn-primary" type="button" onClick={()=>reGeneratePDF(item)}>Regenerate Invoice</button></td>
               <td><button className="btn btn-primary" type="button" onClick={()=>handleOpen(item.item)}>View Detail</button></td>
 
   
             </tr>
              )
            
           }
          
        })}
      
      
    </tbody>
  </table>
        
        
        </div>
    )
}


export default ItemTable;
