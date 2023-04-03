import { StoreAction, StoreState } from './interfaces';

// Define the initial state
export const initialState: StoreState = {
  items: [],
  loading: false,
  error: null,
};

// Define the reducer function
export const storeReducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case 'GET_ITEMS_REQUEST_STORE':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ITEMS_SUCCESS_STORE':
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_ITEMS_FAILURE_STORE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
