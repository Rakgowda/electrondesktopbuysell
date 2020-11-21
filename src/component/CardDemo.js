import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddItem from '../images/add.svg'
import Report from '../images/report.svg'
import Invoice from '../images/utilities.svg'
// import sendAsync from '../messgaeController/render'
import history from '../HistroryTracker/history'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    images:{
      width:"200px",
      margin:"20px"
    },
    cardAction:{
      backgroundColor:"DodgerBlue",
      display:"flex",
      height:"50px",
      display:"block",
      textAlign:"center",
      verticalAlign:"center",
      lineHeight:"50px",
      color:"white",
      '&:hover': {
        backgroundColor:"black",
        color:"DodgerBlue",
        
     }

    },
    button:{
     
      fontSize:"20px",
      
      
      


    },
  });

function CardDemo(params) {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const bull = <span className={classes.bullet}>•</span>;

  //   function send(data) {
     
  //     debugger
  //     sendAsync(data).then((result) => setResponses([...responses, result]));
  // }

    let imageSrc = params.title =="Add Item"?AddItem:params.title =="View Report"?Report:Invoice;
    let historyData = params.title =="Add Item"?"/addItem":params.title =="View Report"?"/viewReport":"/invoicegenerator";

  
    return(
        <Card className={classes.root}>
        <CardContent>
          
          <Typography variant="h5" component="h2">
           {params.title}
          </Typography>
          <img src = {imageSrc} className={classes.images}></img>
        </CardContent>
        <div className={classes.cardAction} onClick={() => history.push(historyData)}>
          <p className={classes.button} >Go</p>
        </div>
      </Card>
     
    )
}


export default CardDemo;
