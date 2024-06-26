import { CartContext } from "./CartContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import MockAdapter from "axios-mock-adapter";
import { addAuthTokenToHeaders } from "../auth/AuthService";
import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  // PaymentElement,
  Elements,
  // useStripe,
  // useElements,
} from "@stripe/react-stripe-js";

// import "./cartCheckout.css";

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

const stripePromise = loadStripe("pk_test_9aJAd1SEISkblZBZ3EGa4n4m"); // your_stripe_publishable_key

const Cart: React.FC = () => {
  const { cartState, cartDispatch } = useContext(CartContext);
  // const [clientSecret, setClientSecret] = useState("");

  // const stripe = useStripe();
  // const elements = useElements();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    // event.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/cart`,
        { cart: values },
        {
          headers: addAuthTokenToHeaders({}),
        }
      )
      .then(() => {
        // if (clientSecret) {
        //   handleStripePayment(clientSecret);
        // }

        setSubmitting(false);
        cartDispatch({ type: "CLEAR_CART" });
        navigate("/items");
      });
  };

  // const handleStripePayment = async (clientSecret: string) => {
  //   try {
  //     if (elements == null) {
  //       return;
  //     }

  //     // // Trigger form validation and wallet collection
  //     // const { error: submitError } = await elements.submit();
  //     // if (submitError) {
  //     //   // Show error to your customer
  //     //   setErrorMessage(submitError.message);
  //     //   return;
  //     // }

  //     // Create the PaymentIntent and obtain clientSecret from your server endpoint
  //     const res = await fetch("/create-intent", {
  //       method: "POST",
  //     });

  //     const { clientSecret } = await res.json();

  //     const { error } = await stripe.confirmPayment({
  //       //`Elements` instance that was used to create the Payment Element
  //       elements,
  //       clientSecret,
  //       confirmParams: {
  //         return_url: "https://example.com/order/123/complete",
  //       },
  //     });

  //     if (error) {
  //       // This point will only be reached if there is an immediate error when
  //       // confirming the payment. Show error to your customer (for example, payment
  //       // details incomplete)
  //       setErrorMessage(error.message);
  //     } else {
  //       // Your customer will be redirected to your `return_url`. For some payment
  //       // methods like iDEAL, your customer will be redirected to an intermediate
  //       // site first to authorize the payment, then redirected to the `return_url`.
  //     }
  //   } catch (error) {}
  // };

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

            {/* <PaymentElement /> */}

            <button
              type="submit"
              disabled={isSubmitting}
              // disabled={isSubmitting || !stripe || !elements}
            >
              Submit
            </button>
            {/* Show error message to your customers */}
            {errorMessage && <div>{errorMessage}</div>}
          </CartForm>
        )}
      </Formik>
      <input type="hidden" name="card-element" id="card-element" />
    </AppContainer>
  );
};


// const options = {
//   // mode: "payment",
//   // amount: 1099,
//   // currency: "usd",
//   clientSecret,
//   appearance: {
//     theme: 'stripe',
//   },
// };

const CartCheckout: React.FC = () => {
  return (
    // <Elements stripe={stripePromise} options={options}>
      <Cart />
    // </Elements>
  );
};

export default CartCheckout;
