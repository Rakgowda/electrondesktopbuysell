import * as insertitem from "./sellinsertItemDataType";


const initialState = {
  insertLoading: true,
  insertSuccessFully: "",
  inserterr: null,
  end: false, 
};

const InsertSellreducer = (state = initialState, action) => {
  switch (action.type) {
    case insertitem.INSERTSELLITEMDATA:
      return {
        ...state,
        insertLoading: true,
  insertSuccessFully: "",
  inserterr: null,
        end: true
      };
    case insertitem.INSERTSELLITEM_FETCH_END:
      return {
        ...state,
        insertLoading: true
      };

    case insertitem.INSERTSELLITEM_SUCCESS:
      
      return {
        ...state,
        insertLoading: false,
        insertSuccessFully: action.payload,
        inserterr: ""
      };

    case insertitem.INSERTSELLITEM_FETCH_ERR:
      debugger
      return {
        ...state,
        insertLoading: false,
        insertSuccessFully: "",
        inserterr: action.payload
      };

    default:
      return state;
  }
};

export default InsertSellreducer;
