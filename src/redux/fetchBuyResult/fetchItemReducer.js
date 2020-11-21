import * as fetchitem from "./fetchItemDataType";


const initialState = {
  fetchLoading: true,
  fetchSuccessFully:[],
  fetcherr: null,
  
};

const fetchreducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchitem.FETCHITEMDATA:
      return {
        ...state
      };

    case fetchitem.FETCHITEM_SUCCESS:
      // alert(action.payload.length)
      console.log(action.payload)
      return {
        ...state,
        fetchLoading: false,
        fetchSuccessFully: action.payload,
        fetcherr: ""
      };

    case fetchitem.FETCHITEM_FETCH_ERR:
      return {
        ...state,
        fetchLoading: false,
        fetchSuccessFully: [],
        fetcherr: action.payload
      };

    default:
      return state;
  }
};

export default fetchreducer;
