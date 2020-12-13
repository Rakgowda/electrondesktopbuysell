import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import add from '../images/plus.svg'
import del from '../images/trash.svg'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import sendAsync from '../messgaeController/render'
import history from '../HistroryTracker/history'
import {useSelector,useDispatch} from "react-redux"
import fetchItems from "../redux/fetchBuyResult/fetchItemAction"
import moment from 'moment';


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
    formDiv: {
      display:"flex",
      justifyContent:"center"
    },
    flexDiv:{
      margin:"30px"
    },
    fleximg:{
      marginBottom:"auto",
      marginTop:"auto"
    }
  }));



function AddItemForm() {
    const classes = useStyles();
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

  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [tabelName,setTabelName] = useState("ItemBuyDetail");
  const fetchQueryState = useSelector(state=>state.fetchreducer)
  const fetchQuery = useDispatch();

  useEffect(() => {
          
    fetchQuery(fetchItems(tabelName));
   
    
}, [])
console.log(fetchQueryState)
  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };


    const [form,setForm] = useState([0]);
    const [formValidate,setFormValidate] = useState(false);
    const [totalForm,setTotalForm] = useState(true);
    const [inserData,setInsertData] = useState({});

    

    function onsubmitAddItem() {
      let data = 0;
      let datainser ={}
      let iteminfo ={}


      datainser.CustomerName = document.querySelector("#customerName").value ;
    
    datainser.Cddress =document.querySelector("#customeraddr").value ;
    // datainser.pin =document.querySelector("#custpin").value ;
    datainser.Cphone =document.querySelector("#custphone").value ;
      
      for (let index = 0; index < form.length; index++) {
        
        if(document.querySelector("#form"+index).style.display !="none")
        {
          let itemName = document.querySelector("#itemadd"+form[index]).value;
          let quantity = document.querySelector("#quantity"+form[index]).value;
          let price = document.querySelector("#price"+form[index]).value;
          
          // sendAsync(itemName,quantity,price);
          iteminfo[data]={"itemname":itemName,"quantity":quantity,"price":price}
          data+=1;


         

        }
       
      
      }
      let i = parseInt(fetchQueryState.fetchSuccessFully.length + 1);
        // alert(i)
        let invoice = moment().format("DDMMYYYY").toString() + i;
      datainser.Invoice = invoice;
      datainser.item = iteminfo;
      console.log(datainser)
      history.push({
        pathname: '/summary',
 state: datainser
})
    
      
    }

    function validateTotalForm(remove)
    {
      let count=0;
      if(remove)
      {
        count=-1;
      }
      form.map((e,i)=>{
        if(document.querySelector("#form"+i).style.display == "")
        {
            count+=1;
        }
       
      })

      if(count>=4)
      {
      
        setTotalForm(false);
          return ;        
      }
      else{
        setTotalForm(true);
          return ;  
      }
    }
   
    function onChangeInValidation()
    {
      
      for (let index = 0; index < form.length; index++) {
        
        
        if(document.querySelector("#form"+index).style.display !="none")
        {

          if(document.querySelector("#itemadd"+index).value !="" && 
          document.querySelector("#quantity"+index).value !="" &&
          document.querySelector("#price"+index).value !="" &&
          document.querySelector("#customeraddr").value !="" &&
        document.querySelector("#custpin").value !="" &&
        document.querySelector("#custphone").value !=""
          )
          {
            
          }
          else{
            setFormValidate(false)
            return
  
          }
        }

        setFormValidate(true)


        
      }
    }

    function removeForm(position) {
      
      let count=0;
      form.map((e,i)=>{
        if(document.querySelector("#form"+i).style.display == "")
        {
            count+=1;
        }
       
      })

      if(count<=1)
      {
        handleClick()

          return ;        
      }

      if(form.length>1)
      {
        form.map((e,i)=>{
          if(i == position)
          {
              document.querySelector("#form"+i).style.display="none";
              onChangeInValidation();
              
          }
         
        })
       
      }

      else{
        handleClick()
      };
      

      validateTotalForm(true);

    }
    
    
    return(
        <div className="container-fluid">
           <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Item can't delete
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          Item added
        </Alert>
      </Snackbar>
      <div style={{display:"flex",justifyContent:"space-around"}}>
        <div className="form-group row" >
          
          <div className="col-xs-4">
          
            <label className="ex3" htmlFor="email">Customer Name: 
            
            
            </label>
            
              <input type="text" className="form-control" id={"customerName"} placeholder="Enter Customer Name"  name="customername" required onChange={()=>onChangeInValidation()}></input>
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Address:</label>
        <input className="form-control" type="text" placeholder="Enter Customer Address" id="customeraddr" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Pin:</label>
        <input type="number"  className="form-control" min="5" placeholder="Enter Customer pincode"  id="custpin" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Phone:</label>
        <input type="number" pattern="[0-9]" className="form-control" maxLength="10" placeholder="Enter Customer phone number"  id="custphone" onChange={()=>onChangeInValidation()}></input>
            
            </div>
            
          </div>
          </div>
        <div className={classes.formDiv}>

          {
          form.map((i)=>(
            

            <div className="form-horizontal" id={"form"+i} className={classes.flexDiv} key={i}>
              <div className={classes.formDiv} >
    <img src={del} width="20px" height="20px" onClick={()=>{removeForm(i)}}></img>
    </div>
    <div className="form-group row">
    
    <div className="col-xs-4">
    
      <label className="ex3" for="email">Item Name: 
      
      
      </label>
      
        <input type="text" className="form-control" id={"itemadd"+i} placeholder="Enter Item Name" onChange={()=>onChangeInValidation()} name="itemname" required></input>
      </div>
      
    </div>
    <div className="form-group row">
    <div className="col-xs-4">
      <label className="ex3" for="email">Quantity:</label>
      
        <input type="number" className="form-control" id={"quantity"+i} placeholder="Enter Quantity" name="quantity" onChange={()=>onChangeInValidation()}></input>
      </div>
      
    </div>
    <div className="form-group row">
    <div className="col-xs-4">
      <label className="ex3" for="email">Price:</label>
      
        <input type="number" step=".01" className="form-control" id={"price"+i} placeholder="Enter Price" name="price" onChange={()=>onChangeInValidation()}></input>
      </div>
      
    </div>
  </div>
          ))}
        
    <div className={classes.flexDiv,classes.fleximg}>
      {
        totalForm?( <img src={add} onClick={() => {(setForm([...form,form.length]));setFormValidate(false);validateTotalForm()}}ick style={{width:"50px",height:"50px"}}></img>):""
   
      }
     
    </div>
  
  </div>
  <div className="text-center"> 
  <button className="btn btn-primary" disabled={!formValidate} type="button" onClick={()=>onsubmitAddItem()}>Submit</button>
  </div>
  </div>
        
    )
}


export default AddItemForm;
