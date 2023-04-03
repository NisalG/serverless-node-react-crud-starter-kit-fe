import { CartState, CartAction } from "./interfaces";

// Define the initial state
const initialCartState: CartState = {
    billNo: 1,
    items: [],
    customerName: "",
    description: "",
    totalAmount: 0,
    loading: false,
    error: null,
  };
  
// Define the reducer function
const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + action.payload.price,
      };
    case "REMOVE_ITEM":
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const updatedTotalAmount = updatedItems.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "UPDATE_QUANTITY":
      const updatedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (updatedItem) {
        updatedItem.price = action.payload.price;
      }
      const updatedTotalAmountWithQuantity = state.items.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        totalAmount: updatedTotalAmountWithQuantity,
      };
    case "CLEAR_CART":
      return initialCartState;
    default:
      return state;
  }
};
export default cartReducer;
