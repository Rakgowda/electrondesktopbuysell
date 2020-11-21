import itemInsertReducer from './insertItem/insertItemReducer'
import fetchreducer from "./fetchBuyResult/fetchItemReducer"
import InsertSellreducer from "./sellItem/sellinsertItemReducer"

// import CovidRecoveredreducer from "./covidrecovered/covidRecoveredReducer"
// import globalreducer from "./globalTracking/globalTrackingReducer"

import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    itemInsertReducer:itemInsertReducer,
    fetchreducer:fetchreducer,
    InsertSellreducer:InsertSellreducer
    
    })

export default rootReducer
