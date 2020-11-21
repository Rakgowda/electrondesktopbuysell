import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color:"white",
      textAlign:"center"
    },
    navbar :{
        backgroundColor:"DodgerBlue",
        height:"60px",
        marginBottom:"30px"

    }
  }));



function Header() {
    const classes = useStyles();
    
    return(
        
        <nav className="navbar" className={classes.navbar}>
  <h1 className={classes.title}>RGKV presents</h1>
</nav>
     
    )
}


export default Header;
