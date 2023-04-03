import { ItemState, ItemAction } from "./interfaces";

// Define the initial state
export const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

// Define the reducer function
export const itemReducer = (state: ItemState, action: ItemAction) => {
  switch (action.type) {
    case 'GET_ITEMS_REQUEST':
    case 'ADD_ITEM_REQUEST':
    case 'UPDATE_ITEM_REQUEST':
    case 'DELETE_ITEM_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_ITEM_SUCCESS':
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_ITEM_SUCCESS':
      const updatedItem = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    case 'DELETE_ITEM_SUCCESS':
      const deletedItemId = action.payload;
      const remainingItems = state.items.filter(
        (item) => item.id !== deletedItemId
      );
      return {
        ...state,
        items: remainingItems,
        loading: false,
        error: null,
      };
    case 'GET_ITEMS_FAILURE':
    case 'ADD_ITEM_FAILURE':
    case 'UPDATE_ITEM_FAILURE':
    case 'DELETE_ITEM_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
