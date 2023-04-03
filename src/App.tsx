import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ItemProvider } from "./components/item/ItemContext";
import { StoreProvider } from "./components/store/StoreContext";
import {
  // BrowserRouter,
  // HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useRoutes,
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "./components/auth/AuthContext";
import { routes } from "./routes";
import { CartProvider } from "./components/cart/CartContext";
// import Home from "./components/home/home";
// import List from "./components/item/List";
// import Store from "./components/store/Store";
// import LoginForm from "./components/auth/LoginForm";
// import Edit from "./components/item/Edit";
// import Cart from "./components/cart/cart";
// import Add from "./components/item/Add";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 1rem;
  & > * {
    margin: 0 0.5rem;
  }
`;

// const RouteNotFoundOrAccessible = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background-color: #ff5733;
// `;

const App: React.FC = () => {
  // const { authState, dispatch } = useContext(AuthContext); //no need to do this since we have already used a custom hook for this and get as below

  const { authState, dispatch } = useAuthContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("authState in App", authState);

  // const [authToken, setAuthToken] = useState(authState.authToken || "");

  // useEffect(() => {
  //   const authToken = sessionStorage.getItem("authToken")
  //     ? String(sessionStorage.getItem("authToken"))
  //     : "";
  //   setAuthToken(authToken);
  //   // console.log("authToken in App useEffect:", authToken);
  // }, []);

  // useEffect(() => {
  //   setAuthToken(authState.authToken || "");
  // }, [authState.authToken]);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken") ?? "";
    if (authToken) {
      dispatch({ type: "LOGIN_SUCCESS", payload: authToken });
      /**
       * This approach ensures that a re-render is not triggered unnecessarily, especially
       * if isLoggedIn is already set to the value you try to set.
       */
      // setIsLoggedIn((prevValue) => true); //Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
      setIsLoggedIn(true);
    } else {
      // setIsLoggedIn((prevValue) => false); //Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
      setIsLoggedIn(false);
    }

    return () => {
      /**
       * In this particular case, since there are no asynchronous operations or subscriptions
       * being used in the effect, the cleanup function is not strictly necessary.
       * For example: unsubscribe from any subscriptions, cancel any pending requests, etc.
       *  */
    };
  }, [dispatch]);

  // const isAuthenticated = (token: string): boolean => {
  //   console.log("token in isAuthenticated", token);
  //   if (token && token.length !== 0) {
  //     console.log("true");
  //     return true;
  //   } else {
  //     console.log("false");
  //     return false;
  //   }
  // };

  const isAuthenticated = (): boolean => {
    return isLoggedIn && authState.isLoggedIn;
  };

  // console.log("authToken in App:", authToken);
  // console.log("isAuthenticated in App:", isAuthenticated(authToken));

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    /**
     * This approach ensures that a re-render is not triggered unnecessarily, especially
     * if isLoggedIn is already set to the value you try to set.
     */
    setIsLoggedIn((prevValue) => false);
  };

  // interface PrivateRouteProps {
  //   path: string;
  //   element: React.ReactNode;
  // }

  // const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  //   // const { authState } = useContext(AuthContext);

  //   // console.log("authState in routes:", authState);
  //   // console.log("authState.isLoggedIn in routes:", authState.isLoggedIn);

  //   const isAuthenticated = sessionStorage.getItem("token");

  //   return isAuthenticated ? (
  //     <Route path={path} element={element} />
  //   ) : (
  //     <Navigate to="/login" replace />
  //   );
  // };

  // const routes = [
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginForm />,
  //   },
  //   {
  //     path: "/items",
  //     element: <PrivateRoute path={"/item-list"} element={<List />} />,
  //   },
  //   {
  //     path: "/item/add",
  //     element: <PrivateRoute path={"/item-list"} element={<Add />} />,
  //   },
  //   {
  //     path: "/item/:id/edit",
  //     element: (
  //       <PrivateRoute
  //         path={"/item-list"}
  //         element={<Edit itemId={null} onClose={() => {}} />}
  //       />
  //     ),
  //   },
  //   {
  //     path: "/store",
  //     element: <PrivateRoute path={"/item-list"} element={<Store />} />,
  //   },
  //   {
  //     path: "/cart",
  //     element: <PrivateRoute path={"/item-list"} element={<Cart />} />,
  //   },
  //   {
  //     path: "*",
  //     element: (
  //       <RouteNotFoundOrAccessible>
  //         404 - Not Found or You do not have permission.
  //       </RouteNotFoundOrAccessible>
  //     ),
  //   },
  // ];

  /*
      useRoutes is a hook provided by React Router that allows you to define your routes as an object, which can make your code more concise and easier to read.
    */
  const routing = useRoutes(routes);

  // const AppWrapper = () => {
  return (
    <AuthProvider isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
      <ItemProvider>
        <StoreProvider>
          <CartProvider>
            {/* <BrowserRouter> */}
            <Nav>
              <Link to="/">Home</Link>
              {/* {isAuthenticated() ? ( */}
              <>
                <Link to="/items">Item List</Link>
                <Link to="/store">Store</Link>
                <Link to="/cart">Cart</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
              {/* ) : ( */}
              <Link to="/login">Login</Link>
              {/* )} */}
            </Nav>
            {routing}
            {/* </BrowserRouter> */}
          </CartProvider>
        </StoreProvider>
      </ItemProvider>
    </AuthProvider>
  );
  // };
  // return (
  //   <HashRouter>
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         {isAuthenticated() ? (
  //           <>
  //             <li>
  //               <Link to="/items">Item List</Link>
  //             </li>
  //             <li>
  //               <button onClick={handleLogout}>Logout</button>
  //             </li>
  //           </>
  //         ) : (
  //           <li>
  //             <Link to="/login">Login</Link>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>
  //     <Routes>
  //       <Route path="/" Component={Home} />
  //       <Route path="/items" Component={ItemList} />
  //       <Route path="/store" Component={Store} />
  //       <Route path="/login" Component={LoginForm} />
  //     </Routes>

  //     <Router />
  //   </HashRouter>
  // );
};

export default App;

// export default AppWrapper;
