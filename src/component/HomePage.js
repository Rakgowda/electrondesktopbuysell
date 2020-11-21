import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import HomePageCard from "./HomePageCard"


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
  }));



function HomePage() {
    const classes = useStyles();
    
    return(
        <div className="container-fluid">
        <React.Fragment>
            <Header></Header>
            <HomePageCard></HomePageCard>
        </React.Fragment>
        </div>
    )
}


export default HomePage;
