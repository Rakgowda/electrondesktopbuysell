import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import history from '../HistroryTracker/history'
import AddItemForm from './AddItemForm'


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
  

function AddItem() {
    const classes = useStyles();
    const [openSuccess, setOpenSuccess] = React.useState(false);

    return(
        <div className="container-fluid">
        <Header>

        </Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <AddItemForm></AddItemForm>
        
        </div>
    )
}


export default AddItem;
