import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";

const TopBar = ({ toggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-gray-600 text-white w-full shadow-md fixed top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Menu Button for Small Screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white focus:outline-none mr-4"
        >
          <FaBars />
        </button>

        {/* Logo or Title */}
        <div className={`font-bold text-2xl transition-all duration-300 ${searchOpen ? "hidden" : "block"}`}>
          Shopping Site
        </div>

        {/* Search Bar */}
        {searchOpen ? (
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:bg-gray-600"
              placeholder="Search…"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="text-white focus:outline-none"
          >
            <FaSearch />
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
