import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import {useSelector,useDispatch} from "react-redux"
import fetchItems from "../redux/fetchBuyResult/fetchItemAction"
import ItemTabel from "./ItemTabel"
import Header from "./Header"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          }
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

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        margin:"auto"
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      divCenter:{
          
          display:"flex",
          flexDirection:"column",
          alignItems:"baseline",
          width:"50%",
          margin:"auto"
      }
    
  }));



function PdfGenerator() {
    const classes = useStyles();
    const fetchQueryState = useSelector(state=>state.fetchreducer)
    const fetchQuery = useDispatch();
    const [tabelName,setTabelName] = useState("ItemBuy")
    const [customerName,setCustomerName] = useState("")
    const [quantity,setQuantity] = useState()
    const [quantityFlag,setQuantityFlag] = useState(false)
    const [formValidate,setFormValidate] = useState(false);
    const [itemName, setItemName] = useState('');
    const [selecteditemName, setSelectedItemName] = useState({});





    // alert(insertQueryState)
    console.log(fetchQueryState)

    
    

    
        useEffect(() => {
          
            fetchQuery(fetchItems(tabelName));
           
            
        }, [])

function selectedItem(item){
    for (let index = 0; index < fetchQueryState.fetchSuccessFully.length; index++) {
              
        let it = JSON.parse(fetchQueryState.fetchSuccessFully[index]);
        

        if(it.itemName == item)
        {
            console.log(it)
             setSelectedItemName(it);
             
             if(document.getElementById("quantity"))
             {
              document.getElementById("quantity").value = it.quantity;
              document.getElementById("price").value = it.price;
             }
          
             break;

        }
         
     }
}
  
 
  function onChangeInValidation(event)
  {

    // if(event.target.id == "custpin" )
    // {
    //   debugger
    //   var n = event.target.value.toString();
    //   if(n.length > 5)
    //   {
    //       event.preventDefault()
    //   }
    // }
    
    if(document.querySelector("#customerName").value !="" && 
        document.querySelector("#quantity").value !="" &&
        document.querySelector("#price").value !="" &&
        document.querySelector("#customeraddr").value !="" &&
        document.querySelector("#custpin").value !="" &&
        document.querySelector("#custphone").value !="" &&
        itemName!="")
        {
            setFormValidate(true)
        }
        else{
          setFormValidate(false)
         

        }

     

      

  }
  const handleChange = (event) => {
    setItemName(event.target.value);
    selectedItem(event.target.value);
   
  };
  function onChangeQuantity(e){
      console.log(e.target.value.toString().includes("."))
      if(e.target.value == "")
      {
        setQuantity("")
        onChangeInValidation()
      }
      else if(!e.target.value.toString().includes("."))
      {
        setQuantity(e.target.value)
        onChangeInValidation()
      }
      
  }

  function submitPDF() {
    let data ={}
    data.customerName = document.querySelector("#customerName").value ;
    data.quantity =document.querySelector("#quantity").value ;
    data.price=document.querySelector("#price").value ;
    data.custormerAddress =document.querySelector("#customeraddr").value ;
    data.pin =document.querySelector("#custpin").value ;
    data.phone =document.querySelector("#custphone").value ;

    data.itemName = itemName;

    history.push({
      pathname: '/viewgenerator',
state: data
})
  }
 
    return(
        
        
<div className="container-fluid">
        <Header></Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <h2 className="text-center">Generate Invoice</h2>
        <br></br>
        <div className={classes.divCenter}>
       
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Item</InputLabel>
        <Select
          id="demo-simple-select"
          value={itemName}
          onChange={handleChange}
        >
             {
                fetchQueryState.fetchSuccessFully.length >0 ?fetchQueryState.fetchSuccessFully.map((e,i)=>{
                    e = JSON.parse(e);
                    if(e.quantity>0)
                    {
                      return <MenuItem key={"item"+i} value={e.itemName}>{e.itemName}</MenuItem>

                    }
                    
                }) :(
                    <MenuItem value={""}>No Data</MenuItem>
                )
            }
       
        </Select>
      </FormControl>
        
     {itemName?(
         
         
          <div className="form-horizontal" style={{margin:"auto",marginTop:"20px"}}>
          
          <div className="form-group row">
          
          <div className="col-xs-4">
          
            <label className="ex3" htmlFor="email">Customer Name: 
            
            
            </label>
            
              <input type="text" className="form-control" id={"customerName"} placeholder="Enter Customer Name"  name="customername" required onChange={onChangeInValidation}></input>
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Address:</label>
        <input className="form-control" type="text" placeholder="Enter Customer Address" id="customeraddr" onChange={onChangeInValidation}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Pin:</label>
        <input type="number" pattern="[0-9]" className="form-control" max={5} placeholder="Enter Customer pincode"  id="custpin" onChange={onChangeInValidation}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Phone:</label>
        <input type="number" pattern="[0-9]" className="form-control" maxLength="10" placeholder="Enter Customer phone number"  id="custphone" onChange={onChangeInValidation}></input>
            
            </div>
            
          </div>
          
          <div className="form-group row">
          <div className="col-xs-4">
            <label className="ex3" htmlFor="email">Quantity:</label>
            
              <input type="number"  className="form-control"
              min="1"
              step="1"
              defaultValue={selecteditemName.quantity}
               id={"quantity"} placeholder="Enter Quantity" name="quantity" onChange={onChangeQuantity}></input>
            </div>
            
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label className="ex3" htmlFor="email">Price:</label>
            
              <input type="number" step=".01" className="form-control" id={"price"} placeholder="Enter Price" name="price" defaultValue={selecteditemName.price} onChange={onChangeInValidation}></input>
            </div>
            
          </div>
        </div>
           
     ):""}
     
    </div>
    {itemName?(
        <div className="text-center"> 
        <button className="btn btn-primary" disabled={!formValidate} type="button" onClick={submitPDF}>Submit</button>
        </div>
        
    ):""}
</div> 

          
     
    )
}


export default PdfGenerator;
