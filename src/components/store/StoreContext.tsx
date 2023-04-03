import { createContext, useContext, useReducer } from "react";
import { initialState, storeReducer } from "./reducers";
import { StoreState, StoreAction } from "./interfaces";
import logger from "use-reducer-logger";

// Define the context
export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the provider component
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(logger(storeReducer), initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Define a custom hook to consume the context
export const useStoreContext = () => useContext(StoreContext);
