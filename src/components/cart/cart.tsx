import { CartContext } from "./CartContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import MockAdapter from "axios-mock-adapter";
import { addAuthTokenToHeaders } from "../auth/AuthService";
import { useContext } from "react";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const CartInfo = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItemInner = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`;

const Name = styled.div`
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
`;

const Description = styled.div`
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
`;

const Price = styled.div`
  font-weight: bold;
  color: #888;
  padding-left: 10px;
  padding-right: 10px;
`;

const CartForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 0.5rem;
`;

const Error = styled(ErrorMessage)`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const validationSchema = Yup.object().shape({
  billNo: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  totalAmount: Yup.number().required("Required"),
});

// const mock = new MockAdapter(axios);
// mock.onPost('/api/products').reply(200, { id: 1, name: 'Item 1', description: 'Description 1' });

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Cart: React.FC = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/cart`,
        { cart: values },
        {
          headers: addAuthTokenToHeaders({}),
        }
      )
      .then(() => {
        setSubmitting(false);
        cartDispatch({ type: "CLEAR_CART" });
        navigate("/items");
      });
  };

  return (
    <AppContainer>
      <h1>Cart</h1>
      <ul>
        {cartState.items.map((item: Item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{" "}
            <button
              onClick={() =>
                cartDispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            >
              Remove
            </button>
            <Label htmlFor={`quantity-${item.id}`}>Quantity:</Label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              // value={item.price}
              onChange={(e) =>
                cartDispatch({
                  type: "UPDATE_QUANTITY",
                  payload: { id: item.id, price: Number(e.target.value) },
                })
              }
            />
          </li>
        ))}
      </ul>
      <div>Total: ${cartState.totalAmount}</div>
      <Formik
        initialValues={{ billNo: "", customerName: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <CartForm>
            <Label htmlFor="billNo">Bill No:</Label>
            <Field type="text" name="billNo" />
            {/* <ErrorMessage name="billNo" /> */}
            {errors.billNo && touched.billNo && (
              <Error name="billNo">
                {(errorMessage: string) => (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </Error>
            )}
            <Label htmlFor="customerName">Customer Name:</Label>
            <Field type="text" name="customerName" />
            {/* <ErrorMessage name="customerName" /> */}
            {errors.customerName && touched.customerName && (
              <Error name="customerName">
                {(errorMessage: string) => (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}
              </Error>
            )}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </CartForm>
        )}
      </Formik>
    </AppContainer>
  );
};

export default Cart;
