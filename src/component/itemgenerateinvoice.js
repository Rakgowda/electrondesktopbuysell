import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { param } from 'jquery';




function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        margin:"auto"
      },
  }));


  function navigate(link) {
    history.push({
      pathname: link
})
  }



function ItemInvoice(params) {
    const classes = useStyles();
    const [itemName, setItemName] = useState('');
    const [selecteditemName, setSelectedItemName] = useState({});
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    
    const handleChange = (event) => {
        let r = document.querySelectorAll("#selectItem");
                    let y =[]
                    for (let index = 0; index < r.length; index++) {
                        if(r[index].innerText != "" && r[index].parentNode.parentNode.parentNode.parentNode.style.display !="none")
                        {
                            y.push(r[index].innerText)
                        }
                        
                    }
        if(!y.includes(event.target.value))
        {
            setItemName(event.target.value);
            selectedItem(event.target.value)
     
        }
        else{
            handleClick()
        }
       params.onChangeInValidation()
       
      };

      function selectedItem(item){
        for (let index = 0; index < params.itemlist.length; index++) {
                  
            let it = JSON.parse(params.itemlist[index]);
            
    
            if(it.itemName == item)
            {
                console.log(it)
                 setSelectedItemName(it);
      
            }
             
         }
    }
    return(
        
        
        <div className={classes.divCenter}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Item already selected
        </Alert>
      </Snackbar>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
        <Select
          id="selectItem"
          value={itemName}
          onChange={handleChange}
        >
             {
                
                params.itemlist.length >0 ?params.itemlist.map((e,i)=>{
                    e = JSON.parse(e);
                    
                    return <MenuItem key={"item"+i} value={e.itemName} >{e.itemName}</MenuItem>

                    
                }) :(
                    <MenuItem value={""}>No Data</MenuItem>
                )
            }
       
        </Select>
      </FormControl>
         
           <div className="form-horizontal" style={{marginLeft:"15px",marginTop:"20px"}}>
          
          
          <div className="form-group row">
          <div className="col-xs-4">
            <label className="ex3" htmlFor="email">Quantity:</label>
            
              <input type="number"  className="form-control"
              min="1"
              step="1"
              defaultValue={selecteditemName.quantity}
               id="quantity" placeholder="Enter Quantity" name="quantity" onChange={params.onChangeInValidation}></input>
            </div>
            
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label className="ex3" htmlFor="email">Price:</label>
            
              <input type="number" step=".01" className="form-control" id="price"  placeholder="Enter Price" name="price" defaultValue={selecteditemName.price} onChange={params.onChangeInValidation} ></input>
            </div>
            
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label className="ex3" htmlFor="email">GST:</label>
            
              <input type="number" step=".01" className="form-control" id="gst"  placeholder="Enter Gst" name="gst" defaultValue={selecteditemName.gst} onChange={params.onChangeInValidation} ></input>
            </div>
            
          </div>
        </div>
          
     
     
    </div>
   
    )
}


export default ItemInvoice;
