import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../server/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartData, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart"
import store from "../../store"
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state)=> state.user)
  const isLoadingAddress = addressStatus === 'loading';

  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const cart = useSelector(getCartData)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;



  if(!cart.length) return <EmptyCart/>
  

  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>


      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required  className="input grow" defaultValue={username}/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40" >Phone number</label>
          <div className="grow"> 
            <input type="tel" name="phone" required
            className="input w-full"
            />
          {formErrors?.phone && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div> 

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label  className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required
            className="input w-full" disabled={isLoadingAddress} defaultValue={address}
            />
            {addressStatus === 'error' && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">{errorAddress}</p>}

          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50">
              <Button type="small" onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress())
              }} disabled={isLoadingAddress}>Get position</Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex gap-4 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="w-6 h-6 accent-yellow-400 focus:outline-none focus:first-letter:ring focus:ring-yellow-400"
            />
          
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}`: ""}/>
          {/* <button disabled={isSubmitting} type="submit" className="buttons">
            {isSubmitting ? "Placing order...." : "Order now"}
          </button> */}
          <Button disabled={isSubmitting || isLoadingAddress} type="primary"> 
            {isSubmitting ? "Placing order...." : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number";
  if (Object.keys(errors).length > 0) {
    return { status: 400, data: { errors } };
  }
  // If everything is fine, create the order
  const newOrder = await createOrder(order);
  // Do NOT overuse
  store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
