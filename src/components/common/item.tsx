/**
 * In this code, we have used useCallback to memoize the handleEdit, handleDelete, 
 * and handleAddToCart functions to prevent unnecessary re-renders. We have also 
 * used useMemo to memoize the links variable, which contains the links for 
 * editing, deleting, and adding to cart.
 * Note that we have also updated the Links component to render the links 
 * variable that we have memoized using useMemo.
 */

import { useMemo, useCallback } from "react";
import styled from "styled-components";
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

interface ItemProps {
  item: ItemType;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
  handleAddToCart?: (item: ItemType) => void;
}

const Item: React.FC<ItemProps> = ({
  item,
  handleEdit,
  handleDelete,
  handleAddToCart,
}) => {
  const handleEditCallback = useCallback(() => {
    if (handleEdit) {
      handleEdit(item.id);
    }
  }, [handleEdit, item.id]);

  const handleDeleteCallback = useCallback(() => {
    if (handleDelete) {
      handleDelete(item.id);
    }
  }, [handleDelete, item.id]);

  const handleAddToCartCallback = useCallback(() => {
    if (handleAddToCart) {
      handleAddToCart(item);
    }
  }, [handleAddToCart, item]);

  const links = useMemo(() => {
    if (handleEdit && handleDelete) {
      return (
        <>
          <EditLink onClick={handleEditCallback}>Edit</EditLink>
          <DeleteLink onClick={handleDeleteCallback}>Delete</DeleteLink>
        </>
      );
    }
    if (handleAddToCart) {
      return (
        <AddToCartButton onClick={handleAddToCartCallback}>
          Add to Cart
        </AddToCartButton>
      );
    }
    return null;
  }, [
    handleEdit,
    handleDelete,
    handleAddToCart,
    handleEditCallback,
    handleDeleteCallback,
    handleAddToCartCallback,
  ]);

  return (
    <ListItem key={item.id}>
      <ListItemInner>
        <Name>{item.name}</Name>
        <Description>{item.description}</Description>
        <Price>{item.price}</Price>
        <Links>{links}</Links>
      </ListItemInner>
    </ListItem>
  );
};

export default Item;
