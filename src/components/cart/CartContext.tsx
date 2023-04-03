import { createContext, useContext, useReducer } from "react";
import logger from "use-reducer-logger";
import { CartState, CartAction } from "./interfaces";
import cartReducer from "./reducers";

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

// Define the context
export const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  cartState: initialCartState,
  cartDispatch: () => null,
});

// Define the provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartState, cartDispatch] = useReducer(logger(cartReducer), initialCartState);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Define a custom hook to consume the context
export const useCartContext = () => useContext(CartContext);
