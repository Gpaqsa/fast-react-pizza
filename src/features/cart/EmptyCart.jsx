import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <>
          <Link to='/menu' className="text-blue-500 hover:underline mb-4">&larr; Back to menu</Link>
            
            <div className="flex flex-col items-center justify-center h-full text-center">
            <p className='text-red-500 text-2xl font-semibold'>Your cart is still empty. Start adding some pizza :)</p>
            </div>
      </>
  );
}

export default EmptyCart;