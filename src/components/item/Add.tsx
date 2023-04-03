import { useItemContext } from "./ItemContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
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

const AddForm = styled(Form)`
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

// const mock = new MockAdapter(axios);
// mock.onPost('/api/products').reply(200, { id: 1, name: 'Item 1', description: 'Description 1' });

interface ItemValues {
  name: string;
  description: string;
  price: number;
}

const Add: React.FC = () => {
  const { dispatch } = useItemContext();
  const navigate = useNavigate();

  const initialValues = { name: "", description: "", price: 0 };

  const handleSubmit = async (values: ItemValues) => {
    dispatch({
      type: "ADD_ITEM_REQUEST",
    });

    try {
      const result = {
        title: values.name,
        description: values.description,
        price: Number(values.price),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        { ...result },
        {
          headers: addAuthTokenToHeaders({}),
        }
      );

      dispatch({ type: "ADD_ITEM_SUCCESS", payload: response.data });
      navigate("/items");
    } catch (error: any) {
      dispatch({ type: "ADD_ITEM_FAILURE", payload: error.message });
    }
  };

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
          // }}
          onSubmit={(values) => {
            handleSubmit(values);
            // onClose();
          }}
        >
          {({ errors, touched }) => (
            <AddForm>
              <h2>Add Item</h2>
              <Label htmlFor="name">Name:</Label>
              <Field type="text" id="name" name="name" />
              {errors.name && touched.name && (
                <Error name="name">
                  {(errorMessage: string) => (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </Error>
              )}
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
              <Button type="submit">Add Item</Button>
            </AddForm>
          )}
        </Formik>
      </AppContainer>
    </>
  );
};

export default Add;
