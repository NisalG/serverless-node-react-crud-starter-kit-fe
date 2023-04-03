import { createContext, useContext, useReducer } from "react";
import { initialState, itemReducer } from "./reducers";
import { ItemState, ItemAction } from "./interfaces";
import logger from "use-reducer-logger";

// Define the context
export const ItemContext = createContext<{
  state: ItemState;
  dispatch: React.Dispatch<ItemAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the provider component
export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(logger(itemReducer), initialState);

  return (
    <ItemContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};

// Define a custom hook to consume the context
export const useItemContext = () => useContext(ItemContext);
