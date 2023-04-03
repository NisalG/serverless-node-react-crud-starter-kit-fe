import { Navigate, Route, Routes } from "react-router-dom";

import List from "./components/item/List";
import Add from "./components/item/Add";
import Edit from "./components/item/Edit";
import LoginForm from "./components/auth/LoginForm";
import Home from "./components/home/home";
import { AuthContext } from "./components/auth/AuthContext";
import { useContext } from "react";
import styled from "styled-components";
import Cart from "./components/cart/cart";
import Store from "./components/store/Store";

const RouteNotFoundOrAccessible = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ff5733;
`;

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute = ({ path, element }: PrivateRouteProps) => {
  // const { authState } = useContext(AuthContext);

  // console.log("authState in routes:", authState);
  // console.log("authState.isLoggedIn in routes:", authState.isLoggedIn);

  const isAuthenticated = sessionStorage.getItem("authToken");

  console.log("isAuthenticated in PrivateRoute:", isAuthenticated);
  
  return isAuthenticated ? (
    <Routes>
          <Route path={path} element={element} />
    </Routes>
    // element
  ) : (
    <Navigate to="/login" replace />
  );
};

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/items",
    // element: <PrivateRoute path={"/items"} element={<List />} />,
    element: <List />,
  },
  {
    path: "/item/add",
    // element: <PrivateRoute path={"/item/add"} element={<Add />} />,
    element: <Add />,
  },
  {
    path: "/item/:id/edit",
    // element: (
    //   <PrivateRoute
    //     path={"/item/:id/edit"}
    //     element={<Edit itemId={null} onClose={() => {}} />}
    //   />
    // ),
    element: <Edit itemId={null} onClose={() => {}} />,
  },
  {
    path: "/store",
    // element: <PrivateRoute path={"/store"} element={<Store />} />,
    element: <Store />,
  },
  {
    path: "/cart",
    // element: <PrivateRoute path={"/cart"} element={<Cart />} />,
    element: <Cart />,
  },
  {
    path: "*",
    element: (
      <RouteNotFoundOrAccessible>
        404 - Not Found or You do not have permission.
      </RouteNotFoundOrAccessible>
    ),
  },
];
