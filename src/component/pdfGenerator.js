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
import add from '../images/plus.svg'
import del from '../images/trash.svg'
import ItemInvoice from "./itemgenerateinvoice"
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
      },
      divflex:{
  margin: "30px"
      },
      fleximg:{
        marginBottom:"auto",
        marginTop:"auto"
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
    const [countItemlength,setCountitemlength]= useState([0]);
    const [flagforAdd,setFlagforAdd] = useState(true) 
    const [pin,SetPin]=useState()




    // alert(insertQueryState)
    console.log(fetchQueryState)

    
    

    
        useEffect(() => {
          
            fetchQuery(fetchItems(tabelName));
           
            
        }, [])

        

        
        
  
 
  function onChangeInValidation(event)
  {

   let quantity = document.querySelector("#itemaddinvoice").childNodes;

   for (var i = 0; i < quantity.length-1; i++) {
    
     if(quantity[i].style.display != "none" && quantity[i].querySelector("#quantity").value == "" || quantity[i].querySelector("#price").value == "" )
     {
      setFormValidate(false);
      return ;
     }
   }

    if( document.querySelector("#customeraddr").value !="" &&
        document.querySelector("#custpin").value !="" &&
        document.querySelector("#custphone").value !="")
        {
            setFormValidate(true)
        }
        else{
          setFormValidate(false)
         

        }

     

      

  }


  function submitPDF() {
    let data ={}
    data.item=[]
    let ite = document.querySelector("#itemaddinvoice").childNodes;

    for (var i = 0; i < ite.length-1; i++) {
     
      if(ite[i].style.display != "none")
      {
        data.item.push({quantity:ite[i].querySelector("#quantity").value,price:ite[i].querySelector("#price").value,item:ite[i].querySelector("#selectItem").innerText})
      }
    }
    data.customerName = document.querySelector("#customerName").value ;
    
    data.custormerAddress =document.querySelector("#customeraddr").value ;
    data.pin =document.querySelector("#custpin").value ;
    data.phone =document.querySelector("#custphone").value ;

console.log(data)
    history.push({
      pathname: '/viewgenerator',
state: data
})
  }
function countVisibleItem()
{let visible = 0;
  let chil = document.querySelector("#itemaddinvoice").childNodes;
  for (let index = 0; index < document.querySelector("#itemaddinvoice").childElementCount; index++) {
    if(chil[index].style.display != "none")
    {
        visible++;
    }
    
  }
  return visible;
}
  function increment() {

    let l = countItemlength.length;
    let r = Math.floor(Math.random() * 1000000)
    setCountitemlength([...countItemlength,r]);
    if(countVisibleItem() >= fetchQueryState.fetchSuccessFully.length )
    {
      setFlagforAdd(false)
    }
    else{
      setFlagforAdd(true)
    }

    onChangeInValidation()
  }

  function deleteFormitem(i){
    let l = countItemlength.length;
    console.log(i)
    debugger
    if(l>1){
      let c = countItemlength.filter((e)=>(e !== i));
      
      
      document.querySelector("#formitem"+i).style.display="none";
      
      if(countVisibleItem() > fetchQueryState.fetchSuccessFully.length )
      {
        setFlagforAdd(false)
      }
      else{
        setFlagforAdd(true)
      }
    }
    onChangeInValidation()
  }

  
 
    return(
        
        
<div className="container-fluid">
        <Header></Header>
        <button className="btn btn-primary" type="button" onClick={() => history.push("/")} >Back</button>
        <h2 className="text-center">Generate Invoice</h2>
        <br></br>
        <hr style={{borderRadius:"10px"}}></hr>
        <h2>Billing to : </h2>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <div className="form-group row" >
          
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
        <input type="number"  className="form-control" min="5" placeholder="Enter Customer pincode"  id="custpin" onChange={onChangeInValidation}></input>
            
            </div>
            
          </div>
          <div className="form-group row">
          
          <div className="col-xs-4">
          
         
            <label htmlFor="comment">Customer Phone:</label>
        <input type="number" pattern="[0-9]" className="form-control" maxLength="10" placeholder="Enter Customer phone number"  id="custphone" onChange={onChangeInValidation}></input>
            
            </div>
            
          </div>
          </div>
        <hr style={{borderRadius:"10px"}}></hr>

        <h2>Add Item : </h2>
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}} id="itemaddinvoice">
        {
          countItemlength.map((e,i)=>(
        <div className={classes.divflex} id={"formitem"+e}> 

<img src={del} width="20px" height="20px" style={{margin:"auto",display:"flex"}} onClick={()=>deleteFormitem(e)}></img>

<ItemInvoice itemlist={fetchQueryState.fetchSuccessFully} onChangeInValidation={()=>onChangeInValidation()}> </ItemInvoice>

</div>

          ))
        }
    
       <div className={classes.fleximg}>
         {
         flagforAdd && fetchQueryState.fetchSuccessFully.length!=1 ?(<img src={add} style={{width:"50px",height:"50px"}} onClick={()=>increment()}></img>):""}
       
       </div>
        </div>
     
        <div className="text-center"> 
        <button className="btn btn-primary" disabled={!formValidate} type="button" onClick={submitPDF}>Submit</button>
        </div>
       

     
</div> 

          
     
    )
}


export default PdfGenerator;
