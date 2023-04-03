// Define the shape of the state object
export type AuthState = {
  authToken: string | null;
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

// Define the shape of the action object
export type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: string }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

export interface AuthContextType {
  authState: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  initialAuthState?: AuthState;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}
