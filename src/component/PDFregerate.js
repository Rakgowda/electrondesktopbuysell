import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import Header from "./Header"
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import {useSelector,useDispatch} from "react-redux"


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



function PDFregerate(params) {
   
  

  const [openSuccess, setOpenSuccess] = React.useState(false);

  
    const classes = useStyles();
    const [invoiceData,setInvoiceData] = useState(params.location.state)
   

   console.log(invoiceData)
    

     function generatePDF(){

        let total = invoiceData.quantity * invoiceData.price;
        const doc = new jsPDF({
            orientation: 'p',
 format: 'a4',
 putOnlyUsedFonts:true,
 floatPrecision: 16
        });
        var elementHTML = document.querySelector("#taxinvoicebody");
        var elementHandler = {
            '#ignorePDF': function (element, renderer) {
              return true;
            }
          };
        // //   doc.cellAddPage();
        // //   doc.getTextDimensions("hello")
        
        // doc.html(elementHTML, {
        //     callback: function (doc) {
        //       doc.save("two-by-four.pdf");
        //     },
        //     x: 1,
        //     y: 1
        //  })
        doc.setFontSize(25)
        doc.setFont('courier','bold')
        doc.text(100, 20, 'Invoice')

// doc.setFont('courier')
doc.setFontSize(15)
doc.setFont('courier','normal')
doc.text(20, 30, 'Invoice Number : ')
doc.setFont('courier','bold')
doc.text(80, 30, invoiceData.Invoice)
doc.setFont('courier','normal')
doc.text(20, 40, 'Invoice Date : ')
doc.setFont('courier','bold')
doc.text(80, 40, invoiceData.date)
doc.setFont('courier','bold')
doc.text(20, 55, 'From :')
doc.setFont('courier','normal')
doc.text(20, 65, 'Rakshith, Halaguru,Malavalli,Pin:571421')
doc.setFont('courier','bold')
doc.text(20, 75, 'To :')
doc.setFont('courier','normal')
doc.text(20, 85, invoiceData.CustomerName +" ," + invoiceData.Cddress +". Phone : "+invoiceData.Cphone)
doc.setLineWidth(.5)
doc.line(0, 90, 210, 90)
       
        

 autoTable(doc,{ html: '#table',
 startY:100});
 doc.setFont('courier','bold')
 doc.setLineWidth(.5)
doc.line(0, 120, 210, 120)
doc.setFont('courier','normal')
doc.text(100,130,"Grand Total : ")
doc.setFont('courier','bold')
doc.text(150,130,""+total)
doc.setFontSize(10)
doc.text(160,200,"Authorize Signature")

doc.setLineWidth(.5)
doc.line(0, 230, 210, 230)
doc.setFont('courier','bold')
doc.text(20,210,"Term and Instruction");
doc.setFont('courier','normal')
doc.text(20,215,"Once customers make a purchase, they will not be able to return that item "+"\n"+
"for a replacement or refund. All sales final policies are typically applied "+"\n"+"to clearance sale items.");

doc.save("two-by-four.pdf");
          

                   
        
      
     }

    let back = invoiceData.back?"/"+invoiceData.back:"/viewReport";
    
    return(
        <React.Fragment>
            <div className="container-fluid">
        <Header></Header>
            <button className="btn btn-primary" type="button" onClick={() => history.push(back)} >Back</button>
        
        <br></br>
        <br></br>
        <br></br>


        <div id="taxinvoicebody">
    
      
        <h2 className="text-center"> Tax Invoice</h2>
        <div style={{display:"flex"}}>

            <div>
    <p>Invoice Number : <b>{invoiceData.Invoice}</b></p>
    <p>Invoice Date : <b> {invoiceData.date} </b></p>
                
            </div>

        </div>
        <hr style={{border:"2px solid black"}}></hr>
        <div style={{display:"flex","text-transform": "uppercase"}}>
            <div>
                <h4>Customer Address : </h4>
                <p>{invoiceData.CustomerName}</p>
        <p>{invoiceData.Cddress}</p>
        <p>Phone : {invoiceData.Cphone}</p>
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


    <div className="text-center"> 
        <button className="btn btn-primary" type="button" style={{margin:"10px"}} onClick = {generatePDF}>Generate PDF</button>
        </div>
 
    

       
        <br></br>
        <br></br>
        <br></br>
        </div>
       
        </div>
        </React.Fragment>
     
    )
}


export default PDFregerate;
