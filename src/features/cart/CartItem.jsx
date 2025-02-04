import React from 'react';
import { formatCurrency } from "../../utilities/helpers";
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  
  return (
    <li className="flex justify-between items-center py-4 sm:justify-between" key={pizzaId}>
      <p className='mb-1 sm:mb-0'> 
        {quantity} &times; {name}
      </p>
      <div className='flex items-center justify-between space-x-2 text-sm font-bold sm:gap-6'>
        <p>{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;