import * as fetchadd from "./fetchFromaddressDataType";


const initialState = {
  fetchLoading: true,
  fetchSuccessFully:[],
  fetcherr: null,
  
};

const fetchAddreducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchadd.FETCHADDDATA:
      return {
        ...state
      };

    case fetchadd.FETCHADD_SUCCESS:
      // alert(action.payload.length)
      console.log(action.payload)
      return {
        ...state,
        fetchLoading: false,
        fetchSuccessFully: action.payload,
        fetcherr: ""
      };

    case fetchadd.FETCHADD_FETCH_ERR:
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

export default fetchAddreducer;
