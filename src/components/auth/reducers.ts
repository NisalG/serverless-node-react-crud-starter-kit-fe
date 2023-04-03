import { AuthState, AuthAction } from "./interfaces";

// const authReducer = (state: AuthState, action: AuthAction) => {
export const authReducer: React.Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      // Store the token in sessionStorage
      sessionStorage.setItem("authToken", action.payload);
      console.log(
        "isLoggedIn is now true in LOGIN_SUCCESS. uthToken is:",
        action.payload
      );
      return {
        ...state,
        authToken: action.payload,
        error: null,
        isLoading: false,
        isLoggedIn: true,
      };
    case "LOGIN_FAILURE":
      sessionStorage.removeItem("authToken");
      return { ...state, error: action.payload, isLoading: false };
    case "LOGOUT":
      // Remove the token from sessionStorage
      sessionStorage.removeItem("authToken");
      return {
        ...state,
        authToken: null,
        error: null,
        isLoading: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
