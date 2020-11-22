import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color:"white",
      textAlign:"left",
      marginLeft:"10px"
    },
    navbar :{
        backgroundColor:"DodgerBlue",
        height:"60px",
        marginBottom:"30px"

    },
    li:{
      float:"left",
      padding: "16px",
      color:"white",
      height:"60px",

      '&:hover': {
        "background-color": "#004486"
      }
    }
  }));


  function navigate(link) {
    history.push({
      pathname: link
})
  }



function Header() {
    const classes = useStyles();
    
    return(
        
        <div className="navbar" className={classes.navbar}>
  
  <div style={{display:"flex",position:"absolute"}}>
    <ul style={{listStyle:"none"}}>
      <li className={classes.li} onClick={()=>navigate("/")}><a>Home</a></li>
      <li className={classes.li} onClick={()=>navigate("/addItem")}><a >Add Item</a> </li>
      <li className={classes.li} onClick={()=>navigate("/viewReport")}><a >View Report</a> </li>
      <li className={classes.li} onClick={()=>navigate("/invoicegenerator")}><a >Invoice generator</a> </li>
    </ul>
  </div>
  
</div>
     
    )
}


export default Header;
