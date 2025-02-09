import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader'
import { Children } from 'react'

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className=" h-screen grid grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}
      <Header />

      <div className='overflow-scroll'>
        <main className='max-w-full mx-auto px-4 py-2 sm:px-6 lg:px-8 h-full'>
          <Children />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout