import * as insertitem from "./insertItemDataType";


const initialState = {
  insertLoading: true,
  insertSuccessFully: "",
  inserterr: null,
  end: false, 
};

const Insertreducer = (state = initialState, action) => {
  switch (action.type) {
    case insertitem.INSERTITEMDATA:
      return {
        ...state,
        end: true
      };
    case insertitem.INSETITEM_FETCH_END:
      return {
        ...state,
        insertLoading: true
      };

    case insertitem.INSETITEM_SUCCESS:
      
      return {
        ...state,
        insertLoading: false,
        insertSuccessFully: action.payload,
        inserterr: ""
      };

    case insertitem.INSETITEM_FETCH_ERR:
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

export default Insertreducer;
