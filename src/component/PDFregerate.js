import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import history from '../HistroryTracker/history'
import Header from "./Header"
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import {useSelector,useDispatch} from "react-redux"
import fetchAddreducer from "../redux/fromaddress/fetchFromaddressAction"


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
    const fetchAddState = useSelector(state=>state.fetchAddreducer)
    const fetchAddQuery = useDispatch();
    useEffect(() => {
          
        fetchAddQuery(fetchAddreducer("select",{}));
        
       
        
    }, [])

   console.log(fetchAddState)
    

     function generatePDF(){

      let fromadd = fetchAddState.fetchSuccessFully[0].CustomerName +","+fetchAddState.fetchSuccessFully[0].Cddress+". PIN : "+
      fetchAddState.fetchSuccessFully[0].Cpin +". Phone : "+fetchAddState.fetchSuccessFully[0].Cphone
        let total = 0;
        for (var i = 0; i < invoiceData.item.length; i++) {
          let price =  invoiceData.item[i].quantity * invoiceData.item[i].price;
          total+= price +(price*(invoiceData.item[i].gst/100));
        }
        const doc = new jsPDF({
            orientation: 'p',
 format: 'a4',
 putOnlyUsedFonts:true,
 floatPrecision: 16,
 unit:"mm"
        });
        var elementHTML = document.querySelector("#taxinvoicebody");
        var elementHandler = {
            '#ignorePDF': function (element, renderer) {
              return true;
            }
          };
        // //   doc.cellAddPage();
        // //   doc.getTextDimensions("hello")

       
      //   doc.html(elementHTML,{
      //     onrendered: {
      //       scale: .5 // default is window.devicePixelRatio
      //   },
      //   callback: function () {
      //     doc.save("two-by-four.pdf");
      //   },
      //   x:0,
      //   y:0
      // })
        

        
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
doc.setFontSize(10)
doc.text(20, 65, fromadd)
doc.setFontSize(15)
doc.setFont('courier','bold')
doc.text(20, 75, 'To :')
doc.setFont('courier','normal')
doc.setFontSize(10)
doc.text(20, 85, invoiceData.CustomerName +" ," + invoiceData.Cddress +". Phone : "+invoiceData.Cphone)
doc.setFontSize(15)
doc.setLineWidth(.5)
doc.line(0, 90, 210, 90)
       
        
// doc.line(0, 115, 210, 115)

 autoTable(doc,{ html: '#table',
 startY:100});
 let t = 0;
 let extraheight = document.querySelector("#table").querySelectorAll("tr").length*6;
 doc.setFont('courier','bold')
 doc.setLineWidth(.5)
doc.line(0, 130+extraheight, 210, 130+extraheight)
doc.setFont('courier','normal')
doc.text(100,150+extraheight,"Grand Total : ")
doc.setFont('courier','bold')
doc.text(150,150+extraheight,""+total)
doc.setFontSize(10)
doc.text(160,180+extraheight,"Authorize Signature")

doc.setLineWidth(.5)
doc.line(0, 210+extraheight, 210, 210+extraheight)
doc.setFont('courier','bold')
doc.text(20,190+extraheight,"Term and Instruction");
doc.setFont('courier','normal')
doc.text(20,195+extraheight,"Once customers make a purchase, they will not be able to return that item "+"\n"+
"for a replacement or refund. All sales final policies are typically applied "+"\n"+"to clearance sale items.");

doc.save(invoiceData.Invoice+".pdf");
          

                   
        
      
     }

    let back = invoiceData.back?"/"+invoiceData.back:"/viewReport";
    function total(){
      let t = 0;
      for (var i = 0; i < invoiceData.item.length; i++) {
        let price = invoiceData.item[i].quantity * invoiceData.item[i].price;
        t+= price+(price*(invoiceData.item[i].gst/100));
      }
       return t;
    }
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
    {
        invoiceData.item != undefined ?invoiceData.item.map(e=>(
          <tr>
    <td key={"invoice1"}>{e.item}</td>
    <td key={"quantity1"}>{e.quantity}</td>

    <td key={"price1"}>{e.price}</td>
    <td key={"gst1"} key={"invoice"}>{e.gst}%</td>
    <td key={"total1"}>{(e.price * e.quantity)+((e.price * e.quantity)*(e.gst/100))}</td>


      </tr>
        )):""
      }
      
      
    </tbody>
  </table>

  <h2 style={{textAlign:"right",marginRight:"50px"}}>Total : <span>
  {
        invoiceData.item != undefined ?total():""}
  
    </span></h2>
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
