import { useContext, useEffect, useState } from "react";
import { useStoreContext } from "./StoreContext";
import axios from "axios";
import styled from "styled-components";
// import MockAdapter from "axios-mock-adapter";
// import { Link, useNavigate } from "react-router-dom";
import { addAuthTokenToHeaders } from "../auth/AuthService";
import { CartContext } from "../cart/CartContext";
import Item from "../common/Item- without useMemo and useCallBack";
import useFetchAllItems from '../common/custom-hooks/useFetchAllItems with useMemo and useCallBack-not working';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// const ListItem = styled.li`
//   margin-bottom: 1rem;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 1rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Name = styled.span`
//   font-weight: bold;
// `;

// const Description = styled.span`
//   font-weight: bold;
// `;

// const Price = styled.span`
//   font-size: 0.8rem;
//   color: #888;
// `;

// const Links = styled.div`
//   display: flex;
// `;

// const LinkButton = styled.button`
//   background-color: #eee;
//   border: none;
//   border-radius: 5px;
//   padding: 0.5rem 1rem;
//   margin-left: 1rem;
//   cursor: pointer;
// `;

// const mock = new MockAdapter(axios);
// mock.onGet("/api/items").reply(200, [
//   { id: 1, name: "Item 1", description: 'Description 1', price: 2 },
//   { id: 2, name: "Item 2", description: 'Description 2', price: 5 },
// ]);

interface ItemType {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ItemStore: React.FC = () => {
  const { state, dispatch } = useStoreContext();
  const { cartDispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (item: ItemType) => {
    console.log("handleAddToCart called");

    cartDispatch({ type: "ADD_ITEM_TO_CART", payload: item });
  };

  useFetchAllItems({
    requestDispatchType: "GET_ITEMS_REQUEST_STORE",
    successDispatchType: "GET_ITEMS_SUCCESS_STORE",
    failureDispatchType: "GET_ITEMS_FAILURE_STORE",
    apiUrl: process.env.REACT_APP_API_URL ?? '',
    dispatch,
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isScrolledToBottom) {
        /**
         * This approach ensures that a re-render is not triggered unnecessarily, especially
         * if isLoggedIn is already set to the value you try to set.
         */
        setLoading((prevValue) => true);
        setTimeout(() => {
          setLoading((prevValue) => false);
        }, 2000);
      }
    };
    window.addEventListener("scroll", handleScroll);
    /**
     * Clean up of useEffect with an anonymous function which  will remove the event listener
     * handleScroll from the window object when the component unmounts. This is done to prevent
     * any potential memory leaks and ensure that the event listener is added only once when the component mounts and removed when it is no
     * longer needed when the component unmounts.
     */
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  console.log("state in Store:", state);

  return (
    <AppContainer>
      <Title>Store</Title>
      <List>
        {state.items.map((item) => (
          // <ListItem key={item.id}>
          //   <Name>{item.name}</Name>
          //   <Description>{item.description}</Description>
          //   <Price>{item.price}</Price>
          //   <Links>
          //     <LinkButton onClick={() => handleAddToCart(item)}>
          //       Add To Cart
          //     </LinkButton>
          //   </Links>
          // </ListItem>
          <Item
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
          ></Item>
        ))}
      </List>
    </AppContainer>
  );
};

export default ItemStore;
