import React from 'react'
import Button from "../../ui/Button";
import { useDispatch } from 'react-redux';
import {deleteItem} from "../cart/cartSlice"
const DeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch()
  return (
    <Button type='small' onClick={()=>dispatch(deleteItem(pizzaId))}>Delete</Button>
  )
}

export default DeleteItem