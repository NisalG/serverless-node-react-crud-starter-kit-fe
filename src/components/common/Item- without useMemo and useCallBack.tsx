// import { useEffect, useState } from "react";
// import { useItemContext } from "./ItemContext";
// import axios from "axios";
import styled from "styled-components";
// import MockAdapter from "axios-mock-adapter";
// import { Link, useNavigate } from "react-router-dom";
// import { addAuthTokenToHeaders } from "../auth/AuthService";
import { Item as ItemType } from "./interfaces";

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

const Links = styled.div`
  display: flex;
`;

const LinkButton = styled.button`
  background-color: #eee;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const EditLink = styled(LinkButton)`
  background-color: #0077cc;
  color: #fff;
`;

const DeleteLink = styled(LinkButton)`
  background-color: #cc0000;
  color: #fff;
`;

const AddToCartButton = styled(LinkButton)`
  background-color: #008000;
  color: #fff;
`;

// type ItemProps = {
//   key: number,
//   item: ItemType;
//   handleEdit: (id: number) => void;
//   handleDelete: (id: number) => void;
// };

// type EditDeleteProps = {
//   handleEdit: (id: number) => void;
//   handleDelete: (id: number) => void;
// };

// type AddToCartProps = {
//   handleAddToCart: (id: number) => void;
// };

// type ItemProps = {
//   item: ItemType;
// } & (EditDeleteProps | AddToCartProps);

interface ItemProps {
  item: ItemType;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  handleAddToCart?: (item: ItemType) => void;
}

// const Item: React.FC<ItemProps> = ({ key, item, handleEdit, handleDelete }) => {
const Item: React.FC<ItemProps> = ({
  item,
  handleEdit,
  handleDelete,
  handleAddToCart,
}) => {
  return (
    <ListItem key={item.id}>
      <ListItemInner>
        <Name>{item.name}</Name>
        <Description>{item.description}</Description>
        <Price>{item.price}</Price>
        <Links>
          {handleEdit && handleDelete && (
            <>
              <EditLink onClick={() => handleEdit(item.id)}>Edit</EditLink>
              <DeleteLink onClick={() => handleDelete(item.id)}>
                Delete
              </DeleteLink>
            </>
          )}
          {handleAddToCart && (
            <AddToCartButton onClick={() => handleAddToCart(item)}>
              Add to Cart
            </AddToCartButton>
          )}
        </Links>
      </ListItemInner>
    </ListItem>
  );
};

export default Item;
