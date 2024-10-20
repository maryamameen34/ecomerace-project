import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAngleDown,
  FaAngleUp,
  FaTasks,
  FaStore,
  FaUsers,
  FaBox,
  FaShippingFast,
  FaDollarSign,
  FaBriefcase,
} from "react-icons/fa";
import { HiOutlineClipboardList, HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/user";

const Sidebar = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const dispatch = useDispatch();

  const handleMenuClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="sidebar w-64 min-h-screen overflow-auto bg-white shadow-lg border-r-2 overflow-y-auto">
      {/* Admin Panel Header */}
      <Link to="/">
        <div className="text-center py-6 bg-gray-400">Admin Panel</div>
      </Link>

      {/* Sidebar Links */}
      <ul className="space-y-3 ml-4 mt-4">
        <li>
          <Link
            to="/admin-dashboard"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <MdOutlineDashboard className="mr-2" />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Vendors Section */}
        <li>
          <button
            onClick={() => handleMenuClick(0)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaStore className="mr-2" />
              Vendors
            </span>
            {openMenuIndex === 0 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 0 && (
            <ul className="pl-8 space-y-2 py-1 text-medium ">
              <li>
                <Link to="/admin-dashboard/vendors/all" className="block py-1">
                  All Vendors
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/vendor/create" className="block py-1">
                  Add New Vendor
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-dashboard/vendor/get-my-vendors"
                  className="block py-1"
                >
                  My Vendors
                </Link>
              </li>
              
              <li>
                <Link to="/admin-dashboard/vendors/pending" className="block py-1">
                  Pending Approvals
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Products Section */}
        <li>
          <button
            onClick={() => handleMenuClick(1)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaBox className="mr-2" />
              Products
            </span>
            {openMenuIndex === 1 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 1 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/products/all" className="block  py-1">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/products/add" className="block  py-1">
                  Add New Product
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Category Section */}
        <li>
          <button
            onClick={() => handleMenuClick(7)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaBox className="mr-2" />
              Categories
            </span>
            {openMenuIndex === 7 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 7 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/products/categories-list" className="block  py-1">
                  All Categories Lists
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/products/categories" className="block  py-1">
                  Add Category
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/products/categories/fetch-main" className="block  py-1">
                  Main  Categories
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Orders Section */}
        <li>
          <button
            onClick={() => handleMenuClick(2)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaShippingFast className="mr-2" />
              Orders
            </span>
            {openMenuIndex === 2 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 2 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/orders/all" className="block  py-1">
                  All Orders
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/orders/pending" className="block  py-1">
                  Pending Orders
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/orders/shipped" className="block  py-1">
                  Shipped Orders
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Users Section */}
        <li>
          <button
            onClick={() => handleMenuClick(3)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaUsers className="mr-2" />
              Users
            </span>
            {openMenuIndex === 3 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 3 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/users/all" className="block  py-1">
                  All Users
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/users/vendors" className="block  py-1">
                  Vendor Users
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/users/customers" className="block  py-1">
                  Customer Users
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Payments Section */}
        <li>
          <button
            onClick={() => handleMenuClick(4)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaDollarSign className="mr-2" />
              Payments
            </span>
            {openMenuIndex === 4 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 4 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/payments/all" className="block  py-1">
                  All Payments
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/payments/all" className="block  py-1">
                  All Payments
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/payments/pending" className="block  py-1">
                  Pending Payments
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/payments/approved" className="block  py-1">
                  Approved Payments
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/payments/refunds" className="block  py-1">
                  Refunds
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Reports Section */}
        <li>
          <button
            onClick={() => handleMenuClick(5)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <HiOutlineDocumentReport className="mr-2" />
              Reports
            </span>
            {openMenuIndex === 5 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 5 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/reports/sales" className="block  py-1">
                  Sales Reports
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/reports/vendors" className="block  py-1">
                  Vendor Reports
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/reports/products" className="block  py-1">
                  Product Reports
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/reports/customers" className="block py-1">
                  Customer Reports
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Settings Section */}
        <li>
          <button
            onClick={() => handleMenuClick(6)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-300"
          >
            <span className="flex items-center">
              <FaTasks className="mr-2" />
              Settings
            </span>
            {openMenuIndex === 6 ? <FaAngleUp /> : <FaAngleDown />}
          </button>
          {openMenuIndex === 6 && (
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/admin-dashboard/settings/general" className="block  py-1">
                  General Settings
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/settings/account" className="block  py-1">
                  Account Settings
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/settings/payments" className="block  py-1">
                  Payment Settings
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/settings/notifications" className="block  py-1">
                  Notification Settings
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard/settings/shipping" className="block  py-1">
                  Shipping Settings
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Logout Section */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-300 w-full"
          >
            <AiOutlineLogout className="mr-2" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

