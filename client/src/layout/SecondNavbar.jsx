import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { maincategorey } from "../data/categorey";
import axios from 'axios';
import RegisterSaller from '../componants/authentication/SellerRegister';

const SecondNavbar = () => {
  const [parentCategories, setParentCategories] = useState([]);
  const [showRegister, setShowRegister] = useState(false); 

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const toggleSellerRegister = () => {
    setShowRegister((prevShow) => !prevShow);
  };


  const fetchParentCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/parent-categories');
      setParentCategories(res.data.parentCategories);
    } catch (error) {
      console.error('Error fetching parent categories:', error);
    }
  };

  return (
    <div className="hidden md:block lg:block">
      <div className="w-full flex gap-2 items-center justify-between py-4 mt-4 bg-[#fff] text-[#333333]">
        <div>
          <ul className="text-xs flex">
            {maincategorey.map((item, index) => (
              <li className="relative group pb-3" key={index}>
                <Link to={item.link} className={`flex items-center pl-4 font-medium hover:text-indigo-500 ${item.text === "All Categories" ? "border-indigo-500" : ""}`}>
                  {item.icon && <item.icon className="mr-1 text-lg" />}
                  {item.text}
                </Link>
                {item.dropdown && (
                  <div className="absolute left-0 top-full mt-2 w-screen z-50 border border-gray-200 bg-white hidden group-hover:block">
                    <div className="flex w-full">
                      <div className="w-1/3">
                        <ul className="text-xs">
                          {parentCategories.map((dropdownItem, dropdownIndex) => (
                            <li className="py-2 px-4 hover:bg-gray-100 text-black" key={dropdownIndex}>
                              <Link to={dropdownItem.link} className="flex items-center font-medium">
                                {dropdownItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-1/3">
                        <ul className="text-xs">
                          {[
                            { text: 'Top Categories', link: '/payments' },
                            { text: 'Home Appliance', link: '/orders' },
                            { text: "Today's Deals", link: '/seller/login' },
                          ].map((dropdownItem, dropdownIndex) => (
                            <li className="py-2 px-4 hover:bg-gray-100" key={dropdownIndex}>
                              <Link to={dropdownItem.link} className="flex items-center font-medium">
                                {dropdownItem.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-1/3">
                        <ul className="text-xs">
                          {[
                            { text: 'Top Categories', link: '/payments' },
                            { text: 'New Releases', link: '/orders' },
                            { text: "Today's Deals", link: '/seller/login' },
                          ].map((dropdownItem, dropdownIndex) => (
                            <li className="py-2 px-4 hover:bg-gray-100" key={dropdownIndex}>
                              <Link to={dropdownItem.link} className="flex items-center font-medium">
                                {dropdownItem.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="text-xs font-medium pl-3 mr-3 flex">
            {[
              { text: 'Help Center', link: '/payments' },
              { text: 'Become a Supplier', onClick :  toggleSellerRegister },
            ].map((item, index) => (
              <li className="pb-3" key={index}>
                <Link to={item.link} onClick={item.onClick} className="flex items-center pl-4 font-medium hover:text-indigo-500">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showRegister && (
        <RegisterSaller toggleSellerRegister={toggleSellerRegister}  />
      )}
    </div>
  );
};

export default SecondNavbar;
