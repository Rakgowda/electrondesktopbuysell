import React from 'react';
import './App.css';
import { Switch, Route,Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import HomePage from './component/HomePage'
import store from './redux/store';

import AddItem from "./component/AddItem"
import history from './HistroryTracker/history';
import SummaryScreen from "./component/SummaryScreen"
import ViewReport from "./component/ViewReport"
import PdfGenerator from "./component/pdfGenerator"
import PDFFile from "./component/PDFFile"
import PDFregerate from "./component/PDFregerate"
function App() {
  return (
    <Provider store={store}>
    <Router history={history}>
  
   
  
    <Switch>
   

   <Route exact path="/" component={HomePage}>
   </Route>
   <Route exact path="/addItem" component={AddItem}>
   </Route>
   <Route exact path="/summary" component={SummaryScreen}>
   </Route>
   <Route exact path="/viewReport" component={ViewReport}></Route>
   <Route exact path="/invoicegenerator" component={PdfGenerator}></Route>
   <Route exact path="/viewgenerator" component={PDFFile}></Route>
   <Route exact path="/pdfregenerate" component={PDFregerate}></Route>


   
   </Switch>
    </Router>
    </Provider>
  );
}

export default App;
