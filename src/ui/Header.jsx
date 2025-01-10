import React from 'react'
import { Link, useNavigation } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Loader from './Loader';
import Username from "../features/user/Username";
// import Order from '../features/order/Order';

const Header = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <header className="bg-yellow-400 uppercase px-4 py-3  border-b border-stone-300 flex justify-between items-center sm:px-6">
      <Link to="/" className="uppercase tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header