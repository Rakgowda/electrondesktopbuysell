import itemInsertReducer from './insertItem/insertItemReducer'
import fetchreducer from "./fetchBuyResult/fetchItemReducer"
import InsertSellreducer from "./sellItem/sellinsertItemReducer"
import fetchAddreducer from "./fromaddress/fetchFromaddressReducer"

// import CovidRecoveredreducer from "./covidrecovered/covidRecoveredReducer"
// import globalreducer from "./globalTracking/globalTrackingReducer"

import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    itemInsertReducer:itemInsertReducer,
    fetchreducer:fetchreducer,
    InsertSellreducer:InsertSellreducer,
    fetchAddreducer:fetchAddreducer
    
    })

export default rootReducer
