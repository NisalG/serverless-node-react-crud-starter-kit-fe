import { useItemContext } from "./ItemContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import MockAdapter from "axios-mock-adapter";
import { addAuthTokenToHeaders } from "../auth/AuthService";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const EditForm = styled(Form)`
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

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});

interface EditProps {
  itemId: number | null;
  onClose: () => void;
}

// const mock = new MockAdapter(axios);
// mock.onPut('/api/items').reply(200, { id: 1, name: 'Item 11', description: 'Description 11' });

const Edit: React.FC<EditProps> = ({ onClose }) => {
  const { state, dispatch } = useItemContext();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: 0,
  });
  let { id } = useParams();
  const navigate = useNavigate();
  /**
   * Added React.RefObject<HTMLInputElement> to match the type of the input elements 
   * they are referring to. This should resolve the "Property 'focus' does not exist 
   * on type 'never'" error.
   */
  const nameRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    const item = state.items.find((item) => item.id === Number(id));

    if (item) {
      /**
       * prevValues is the previous state of initialValues, and the spread operator (...) is 
       * used to create a new object with the previous values and the updated values for name,
       *  description, and price. This will help prevent unnecessary renders caused by setting 
       * the state to an identical object.
       */
      setInitialValues(prevValues => ({
        ...prevValues,
        name: item.name,
        description: item.description,
        price: item.price,
      }));
    }

    return () => {
      /**
       * In this particular case, since there are no asynchronous operations or subscriptions
       * being used in the effect, the cleanup function is not strictly necessary.
       * For example: unsubscribe from any subscriptions, cancel any pending requests, etc.
       *  */
    };
  }, [id, state.items]);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    price: number;
  }) => {
    dispatch({
      type: "EDIT_ITEM_REQUEST",
    });

    try {
      const result = {
        title: values.name,
        description: values.description,
        price: Number(values.price),
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`,
        {
          ...result,
        },
        {
          headers: addAuthTokenToHeaders({}),
        }
      );

      dispatch({ type: "EDIT_ITEM_SUCCESS", payload: response.data });
      navigate("/items");
    } catch (error: any) {
      dispatch({ type: "EDIT_ITEM_FAILURE", payload: error.message });
    }
  };

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  return (
    <>
      <AppContainer>
        <Link to="/items">Go Back To Item List</Link>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          // onSubmit={(values, { resetForm }) => {
          //   handleSubmit(values);
          //   resetForm();
          //   onClose();
          // }}
          onSubmit={(values) => {
            handleSubmit(values);
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <EditForm>
              <h2>Edit Item</h2>
              <Label htmlFor="name">Name:</Label>
              <Field type="text" id="name" name="name" innerRef={nameRef} />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Label htmlFor="description">Description:</Label>
              <Field type="text" id="description" name="description" />
              {errors.description && touched.description && (
                <Error name="description">
                  {(errorMessage: string) => (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </Error>
              )}
              <Label htmlFor="price">Price:</Label>
              <Field type="text" id="price" name="price" />
              {errors.price && touched.price && (
                <Error name="price">
                  {(errorMessage: string) => (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </Error>
              )}
              <Button type="submit">Edit Item</Button>
            </EditForm>
          )}
        </Formik>
      </AppContainer>
    </>
  );
};

export default Edit;
