import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import TextField from '@material-ui/core/TextField';

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
    let trclass = params.tabelName =="ItemBuy"?classes.iemBuy:classes.iemSold
    // alert(tabledata.length)

    function reGeneratePDF(data) {  
      history.push({
        pathname: '/pdfregenerate',
  state: data
  })
    }

    return(
        <div className="container-fluid">
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
  {}
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
        ):(
          <React.Fragment>
            <th>ItemName</th>
          <th>Customer Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        <th>Invoice Number</th>
        <th>Last Updated</th>
        <th>Invoice Generate</th>

        </React.Fragment>
        )}
        
      </tr>
    </thead>
    <tbody className="text-center">
        {tabledata.map(e=>{
           let item = JSON.parse(e);
           if(item.quantity>0)
           {
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
            else{
             return(
               <tr className={trclass}>
               <td>{item["itemName"]}</td>
               <td>{item["CustomerName"]}</td>
               <td>{item["quantity"]}</td>
               <td>{item["price"]}</td>
               <td>{item["price"]*item["quantity"]}</td>
               <td>{item["Invoice"]}</td>
 
   
               <td>{item["date"]}</td>
               <td><button className="btn btn-primary" type="button" onClick={()=>reGeneratePDF(item)}>Regenerate Invoice</button></td>
 
   
             </tr>
              )
            }
           }
          
        })}
      
      
    </tbody>
  </table>
        
        
        </div>
    )
}


export default ItemTable;
