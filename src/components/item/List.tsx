import { useState } from "react";
import { useItemContext } from "./ItemContext";
import axios from "axios";
import styled from "styled-components";
// import MockAdapter from "axios-mock-adapter";
import { Link, useNavigate } from "react-router-dom";
import { addAuthTokenToHeaders } from "../auth/AuthService";
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  button {
    margin: 0 1rem;
  }
`;

// const mock = new MockAdapter(axios);

// mock.onGet("/api/items").reply(200, [
//   { id: 1, name: "Item 1", description: 'Description 1', price: 2 },
//   { id: 2, name: "Item 2", description: 'Description 2', price: 5 },
// ]);

const ItemList: React.FC = () => {
  const { state, dispatch } = useItemContext();
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/item/${id}/edit`);
  };

  const handleDelete = (itemId: number) => {
    /**
     * This approach ensures that a re-render is not triggered unnecessarily, especially
     * if setDeleteItemId is already set to the value you try to set.
     */
    setDeleteItemId((prevId) => itemId);
  };

  // mock.onDelete('/api/items').reply(200, {
  //   message: 'Item deleted successfully'
  // });

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      dispatch({
        type: "DELETE_ITEM_REQUEST",
      });

      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/products/${deleteItemId}`,
          {
            headers: addAuthTokenToHeaders({}),
          }
        );
        dispatch({ type: "DELETE_ITEM_SUCCESS", payload: deleteItemId });
        /**
         * This approach ensures that a re-render is not triggered unnecessarily, especially
         * if setDeleteItemId is already set to the value you try to set.
         */
        setDeleteItemId((prevId) => null);
        navigate("/items");
      } catch (error: any) {
        dispatch({ type: "DELETE_ITEM_FAILURE", payload: error.message });
      }
    }
  };

  const handleCancelDelete = () => {
    /**
     * This approach ensures that a re-render is not triggered unnecessarily, especially
     * if setDeleteItemId is already set to the value you try to set.
     */
    setDeleteItemId((prevId) => null);
  };

  useFetchAllItems({
    requestDispatchType: "GET_ITEMS_REQUEST",
    successDispatchType: "GET_ITEMS_SUCCESS",
    failureDispatchType: "GET_ITEMS_FAILURE",
    apiUrl: process.env.REACT_APP_API_URL ?? '',
    dispatch,
  });

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  console.log("state in List:", state);

  return (
    <AppContainer>
      <Title>
        Items List(For Admin)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/item/add">Add Item</Link>
      </Title>
      <List>
        {state.items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></Item>
        ))}
      </List>

      {deleteItemId && (
        <Modal>
          <ModalContent>
            <ModalTitle>Are you sure you want to delete this item?</ModalTitle>
            <ModalButtons>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
};

export default ItemList;
