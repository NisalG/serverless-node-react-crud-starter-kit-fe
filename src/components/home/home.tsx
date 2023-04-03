import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;
  line-height: 1.5;
  max-width: 50%;
`;

const Home = () => {
  return (
    <AppContainer>
    <HomeWrapper>
      <Title> React Shopping Cart App with CRUD and Authentication</Title>
      <h2>Tech Stack: </h2>
        <ul>
            <li>React Hooks (useReducer + useContext to handle complex state logic)</li>
            <li>Styled components</li>
            <li>Axios</li>
            <li>UseEffect cleanup functionality with Axios CancelToken</li>
            <li></li>
        </ul>
      <Description>
        Feel free to customize it and make it your own.
      </Description>
    </HomeWrapper>
    </AppContainer>
  );
};

export default Home;
