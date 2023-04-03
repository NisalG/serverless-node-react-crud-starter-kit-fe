import { createContext, useContext, useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import { AuthContextType, AuthProviderProps, AuthState } from "./interfaces";
import { authReducer } from "./reducers";

// Define the initial state
const initialAuthState: AuthState = {
  authToken: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
};

export const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isLoggedIn,
  setIsLoggedIn
}) => {
  const [authState, dispatch] = useReducer(
    logger(authReducer),
    initialAuthState
  );

  // console.log("authToken in AuthProvider:", initialAuthState.authToken);
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken") ?? "";
    if (authToken) {
      dispatch({ type: "LOGIN_SUCCESS", payload: authToken });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
    return () => {
      /**
       * In this particular case, since there are no asynchronous operations or subscriptions
       * being used in the effect, the cleanup function is not strictly necessary.
       * For example: unsubscribe from any subscriptions, cancel any pending requests, etc.
       *  */
    };
  }, [setIsLoggedIn]);
  
  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
