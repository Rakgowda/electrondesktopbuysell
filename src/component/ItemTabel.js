import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';



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
  

function ItemTable(params) {
    const classes = useStyles();
    let tabledata = params.tabelData;
    let trclass = params.tabelName =="ItemBuy"?classes.iemBuy:classes.iemSold
    // alert(tabledata.length)

    return(
        <div className="container-fluid">

<table class="table table-striped text-center">
    <thead>
      <tr>
        <th>ItemName</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>

        <th>Last Updated</th>

      </tr>
    </thead>
    <tbody className="text-center">
        {tabledata.map(e=>{
           let item = JSON.parse(e);
           return(
            <tr className={trclass}>
            <td>{item["itemName"]}</td>
            <td>{item["quantity"]}</td>
            <td>{item["price"]}</td>
            <td>{item["price"]*item["quantity"]}</td>

            <td>{item["date"]}</td>

          </tr>
           )
        })}
      
      
    </tbody>
  </table>
        
        
        </div>
    )
}


export default ItemTable;
