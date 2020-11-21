import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import Header from "./Header"
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import moment from 'moment';
import {useSelector,useDispatch} from "react-redux"
import inserSellItem from "../redux/sellItem/sellinsertItemAction" 
import {insertRequest} from "../redux/sellItem/sellinsertItemAction"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import tick from "../images/tick.svg"


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
      textAlign:"center"
    },
    navbar :{
        backgroundColor:"DodgerBlue",
        height:"60px",
        marginBottom:"30px"

    },cardDiv: {
        display:"flex",
        justifyContent:"center"
      },
  }));



function PDFFile(params) {
    const [open, setOpen] = React.useState(false);
   

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    insertSellQuery(insertRequest())
  };

  const [openSuccess, setOpenSuccess] = React.useState(false);

  
    const classes = useStyles();
    console.log(params.location.state)
    const [invoiceData,setInvoiceData] = useState({})
    const [confirmFlag,setConfirmFlag] = useState(false)
    const insertSellQueryState = useSelector(state=>state.InsertSellreducer)
    const insertSellQuery = useDispatch();
    useEffect(() => {

        debugger
          
        setInvoiceData(params.location.state)
        debugger
        insertSellQuery(insertRequest())
        
         
     }, [])

     



     function toggleConfirmflag()
     {
            setConfirmFlag(!confirmFlag)
     }

     function pdfInvoiceGen()
     {


        let query = params.location.state;
        query.CustomerName = query.customerName;
        query.Cddress = query.custormerAddress + ". PIN : "+query.pin;
        query.Cphone = query.phone;
        insertSellQuery(inserSellItem(query))
        debugger;
    
        

     }

     function succussItemInser(){

        if( document.querySelector("#taxinvoicebody"))
        {
            document.querySelector("#taxinvoicebody").style.display = "none";
            document.querySelector("#successbody").hidden = false;
            const doc = new jsPDF();
 
            // //   doc.cellAddPage();
            // //   doc.getTextDimensions("hello")
            
              autoTable(doc,{ html: '#table' });
              doc.save("two-by-four.pdf");
        }
       

                   
        
      
     }

    
  
    
    return(
        <React.Fragment>
            <div className="container-fluid">
        <Header></Header>
            <button className="btn btn-primary" type="button" onClick={() => history.push("/invoicegenerator")} >Back</button>
        
        <br></br>
        <br></br>
        <br></br>


        <div id="taxinvoicebody">
       
        {insertSellQueryState.inserterr && <Snackbar open={insertSellQueryState.inserterr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {insertSellQueryState.inserterr}
        </Alert>
      </Snackbar>}
        
        {insertSellQueryState.insertSuccessFully?succussItemInser():""}
      
        <h2 className="text-center"> Tax Invoice</h2>
        <div style={{display:"flex"}}>

            <div>
    <p>Invoice Number : <b>{moment().format("DDMMYYYY").toString()}54545</b></p>
    <p>Invoice Date : <b> {moment().format("DD-MM-YYYY").toString()} </b></p>
                
            </div>

        </div>
        <hr style={{border:"2px solid black"}}></hr>
        <div style={{display:"flex","text-transform": "uppercase"}}>
            <div>
                <h4>Customer Address : </h4>
                <p>{invoiceData.customerName}</p>
        <p>{invoiceData.custormerAddress}</p>
        <p> Pin : {invoiceData.pin}</p>
        <p>Phone : {invoiceData.phone}</p>
            </div>
      
        </div>
        <table className="table table-striped text-center" id="table">
    <thead>
      <tr>
        <th>Product Name</th>
 
        <th>Quantity</th>
        <th>Price</th>
        <th>GST</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
    <td key={"invoice1"}>{invoiceData.itemName}</td>
    <td key={"quantity1"}>{invoiceData.quantity}</td>

    <td key={"price1"}>{invoiceData.price}</td>
    <td key={"gst1"} key={"invoice"}>9%</td>
    <td key={"total1"}>{(invoiceData.price * invoiceData.quantity)}</td>


      </tr>
      
    </tbody>
  </table>

  {!confirmFlag && (
    <div className="text-center"> 
        <button className="btn btn-primary" type="button" style={{margin:"10px"}} onClick = {toggleConfirmflag}>Confirm</button>
        </div>
  )}
    {confirmFlag && (
     <div className="text-center" style={{display:"flex",justifyContent:"center"}}> 
     <button className="btn btn-primary" type="button" onClick = {toggleConfirmflag} style={{margin:"10px"}}>Back</button>
     <button className="btn btn-primary" type="button" style={{margin:"10px"}} onClick={pdfInvoiceGen}>Submit</button>

     </div>
     
  )}  

       
        <br></br>
        <br></br>
        <br></br>
        </div>
        <div id="successbody" hidden={true}>
        <div class="card" style={{width:"300px",margin:"auto"}}>
    <div class="card-body">
      <h4 class="card-title text-center">Summary screen</h4>
      <div className={classes.cardDiv}>
      <img src={tick} class="center" width="50px" height="50px"></img>
      </div>
      <p class="card-text text-center"> {insertSellQueryState.insertSuccessFully }</p>
      
    </div>
  </div>
        </div>
        </div>
        </React.Fragment>
     
    )
}


export default PDFFile;
