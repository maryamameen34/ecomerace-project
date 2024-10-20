import { Link } from "react-router-dom";
import React from 'react'

const dropdownvisible = ({setDropdownVisible}) => {
  return (
    <div className="sm:hidden bg-gray-200 px-4 py-2 shadow-lg">
    <ul>
      {[
        { text: 'Login Here', link: '/login' },
        { text: 'Register', link: '/register' },
        { text: 'Your Payments', link: '/payments' },
        { text: 'Your Orders', link: '/orders' },
        { text: 'Login as Buyer', link: '/buyer/login' },
        { text: 'Register Buyer', link: '/buyer/register' },
        { text: 'Login as Seller', link: '/seller/login' },
        { text: 'Register Seller', link: '/seller/register' },
        { text: 'Your Wish List', link: '/wishlist' },
        { text: 'Your Message Center', link: '/messages' },
      ].map((item, index) => (
        <li key={index} className="pb-2">
          <Link to={item.link} className="block text-gray-800" onClick={() => setDropdownVisible(false)}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default dropdownvisible