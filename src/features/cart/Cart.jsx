import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearCart, getCartData } from '../cart/cartSlice';
import EmptyCart from './EmptyCart';

// import { getOrder } from '../../server/apiRestaurant';



function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCartData) 
  const dispatch = useDispatch();

  const onClearCart = () => {
    dispatch(clearCart());
  }

  if(cart.length===0) return <EmptyCart/>

  return (
    <div className='px-4 py-3 flex flex-col justify-between h-full grow'>
      {/* <Link to="/menu" >&larr; Back to menu</Link> */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='divide-y divide-stone-200 border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}/>
        ))}

      </ul>
      <div className=' mt-6 flex justify-between space-x-2'>
        <Button to="/order/new" type='primary'>Order pizzas</Button>
        <Button type="secondary"  onClick={onClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}


// export async function loader(){
//   const cart = await getOrder();
//   return cart;
// }
export default Cart;
