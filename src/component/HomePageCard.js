import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardDemo from "./CardDemo"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    flexContainer: {
        "display": "flex",
        "justify-content": "center",
        "background-color": "DodgerBlue",
    },
    flexContainerChild:{
        "background-color": "#f1f1f1",
        
        "margin": "10px",
        "text-align": "center",
        "line-height": "75px",
        "font-size": "30px"
    }
  }));



function HomePageCard() {
    const classes = useStyles();
    
    return(
        
     
        <div className={classes.flexContainer}>
        <div className={classes.flexContainerChild}><CardDemo title="Add Item" imageName="AddItem"></CardDemo></div>
        <div className={classes.flexContainerChild}><CardDemo  title="View Report" imageName="Report"></CardDemo></div>
        <div className={classes.flexContainerChild}><CardDemo title="Invoice Generator" imageName="Invoice"></CardDemo></div>  
      </div>
  
     
    )
}


export default HomePageCard;
