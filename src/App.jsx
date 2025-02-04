import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../src/ui/Home.jsx";
import Error from '../src/ui/Error.jsx'
import Menu, {loader as menuLoader} from "../src/features/menu/Menu.jsx";
import Cart from "../src/features/cart/Cart.jsx";
import { RouterProvider } from "react-router-dom";
import CreateOrder, {action as createOrderAction} from "../src/features/order/CreateOrder.jsx";
import Order from "../src/features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import { loader as orderLoader } from "./features/order/Order.jsx";
import {action as updateOrderAction} from './features/order/UpdateOrder'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new", element: <CreateOrder />,
        action: createOrderAction,
       },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
