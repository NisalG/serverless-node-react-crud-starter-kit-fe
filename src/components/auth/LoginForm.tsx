import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { useAuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FieldContainer = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled(Field)`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { dispatch } = useAuthContext();

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setFieldError }: any
  ) => {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        values
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.access_token,
      });
      navigate(`/items`);
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      setFieldError("email", "Invalid email or password");
      setSubmitting(false);
    }
  };

  return (
    <AppContainer>
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormContainer>
          <Form>
            <FieldContainer>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" />
              <ErrorMessageStyled name="email" component="div" />
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" />
              <ErrorMessageStyled name="password" component="div" />
            </FieldContainer>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Log In"}
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
    </AppContainer>
  );
};

export default LoginForm;
