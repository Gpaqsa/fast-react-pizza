import React from 'react'
import { Link, useNavigation } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Loader from './Loader';
// import Order from '../features/order/Order';

const Header = () => {  
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading'
  return (
      <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />

    </header>
  )
}

export default Header