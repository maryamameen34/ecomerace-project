import React, { useEffect, useState } from 'react'
import Navbar from '../../layout/Navbar'
import SecondNavbar from '../../layout/SecondNavbar';
import CartDetails from '../../layout/cart/CartDetails';

const Cart = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          setActive(true);
        } else {
          setActive(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup function
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
  return (
    <div>
      <CartDetails />
    </div>
  )
}

export default Cart