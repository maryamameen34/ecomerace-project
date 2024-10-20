import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaRegUser,
  FaAngleRight,
  FaShoppingCart,
  FaAngleDown,
  FaRegCircleUser,
} from "react-icons/fa";
import { GrOrderedList, GrSearch } from "react-icons/gr";
import {
  AiOutlineLogin,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { IoMdNotifications } from "react-icons/io";
import { logoutUser } from "../redux/actions/user";
import { loadWishlist } from "../redux/actions/wishlist";
import { loadCartItems } from "../redux/actions/cart";
import { fetchProductsAction } from "../redux/actions/product";

const Header = ({
  toggleSignIn,
  toggleDropdown,
  isDropdownVisible,
  toggleBRegister,
}) => {
  const cartItems = useSelector((state) => state.cart.cartItems) || []; // Initialize safely
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user);
  const wishlist =
    useSelector((state) => state.wishlist?.wishlist?.products) || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishListCount] = useState(0);

  useEffect(() => {
    dispatch(loadWishlist());
    dispatch(loadCartItems());
    dispatch(fetchProductsAction());
  }, [dispatch]);

  useEffect(() => {
    setCartCount(cartItems.length); // Safe access now
    setWishListCount(wishlist.length); // Safe access now
  }, [cartItems, wishlist]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    if (term) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/search?query=${term}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const filteredProducts = await response.json();
        setSearchData(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setSearchData([]);
      }
    } else {
      setSearchData([]);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <nav
      className={`relative flex flex-wrap items-center justify-between p-4 bg-white text-gray-700 shadow-md ${
        active ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <p className="text-lg font-extrabold text-gray-600">Shopping Site</p>
      </div>

      {isSearchVisible && (
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          searchData={searchData}
          setIsSearchVisible={setIsSearchVisible}
        />
      )}

      <div className="flex items-center gap-4">
        <UserProfile
          user={user}
          toggleDropdown={toggleDropdown}
          isDropdownVisible={isDropdownVisible}
          toggleSignIn={toggleSignIn}
          toggleBRegister={toggleBRegister}
          handleLogout={handleLogout}
        />
        <Link to="/cart" className="relative">
          <FaShoppingCart size={20} className="text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <Link to="/wishlist" className="relative">
          <FaHeart size={20} className="text-gray-700" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
        <button onClick={toggleSearchBar} className="text-gray-500 ">
          <GrSearch className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

const SearchBar = ({
  searchTerm,
  handleSearchChange,
  searchData,
  setIsSearchVisible,
}) => (
  <div className="absolute top-[60px] transform -translate-x-1/2 w-2/3 md:w-1/2 sm:left-[65%] md:left-[75%] left-[65%] bg-white shadow-md border border-[#3957db] rounded-md p-2 mt-1 z-[100]">
    <form method="get" className="flex w-full">
      <input
        type="search"
        className="w-full px-4 py-1 border border-[#3957db] rounded-l-md focus:outline-none"
        placeholder="Search Here."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded-r-md"
      >
        <GrSearch className="text-lg" />
      </button>
    </form>

    {searchData.length > 0 ? (
      <SearchResults searchData={searchData} />
    ) : (
      <p>No results found</p>
    )}
  </div>
);

const SearchResults = ({ searchData }) => (
  <div className="absolute min-h-[30vh] w-full md:max-h-[50vh] max-h-[30vh] overflow-y-scroll border border-gray-200 bg-slate-50 shadow-md z-10 mt-2 p-4">
    {searchData.map((product, index) => (
      <Link key={index} to={`/product/${product.title.replace(/\s+/g, "-")}`}>
        <div className="w-full flex gap-x-3 items-start py-3">
          <img
            src={`http://localhost:8000/${product.main_image.replace(
              /\\/g,
              "/"
            )}`}
            alt={product.title}
            className="w-12 h-12 object-cover rounded-sm shadow-lg transition-transform transform hover:scale-105"
          />
          <h1 className="text-sm">{product.title}</h1>
        </div>
      </Link>
    ))}
  </div>
);

const UserProfile = ({
  user,
  toggleDropdown,
  isDropdownVisible,
  toggleSignIn,
  toggleBRegister,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    if (user && user.role == "admin") {
      navigate("/admin-dashboard");
    } else if (user && user.role == "seller") {
      navigate("/seller-dashboard");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {user ? (
        <>
          <img
            src={`http://localhost:8000${user.profile_pic.replace(/\\/g, "/")}`}
            alt={user.email}
            className="w-8 h-8 rounded-[50%] ml-5 cursor-pointer align-center object-cover"
            onClick={toggleDropdown}
          />
          {isDropdownVisible && (
            <DropdownMenu
              user={user}
              handleLogout={handleLogout}
              handleDashboardClick={handleDashboardClick}
            />
          )}
        </>
      ) : (
        <GuestUser
          toggleSignIn={toggleSignIn}
          toggleBRegister={toggleBRegister}
          toggleDropdown={toggleDropdown}
          isDropdownVisible={isDropdownVisible}
        />
      )}
    </div>
  );
};

const DropdownMenu = ({ user, handleLogout, handleDashboardClick }) => (
  <div className="absolute right-0 w-48 top-[40px] bg-white border border-gray-200 shadow-md rounded-md z-10">
    <button
      onClick={handleDashboardClick}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      <div className="flex items-center">
        <AiOutlineUser className="mr-2" />
        <span>Profile</span>
      </div>
    </button>
    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center">
        <GrOrderedList className="mr-2" />
        <span>My Orders</span>
      </div>
    </Link>
    <Link to="/messages" className="block px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center">
        <AiOutlineMessage className="mr-2" />
        <span>Messages</span>
      </div>
    </Link>
    <Link to="/notifications" className="block px-4 py-2 hover:bg-gray-100">
      <div className="flex items-center">
        <IoMdNotifications className="mr-2" />
        <span>Notifications</span>
      </div>
    </Link>
    <button
      onClick={handleLogout}
      className="w-full flex items-center text-left px-4 py-2 hover:bg-gray-100"
    >
      <RiSecurePaymentFill className="mr-2" />
      Logout
    </button>
  </div>
);

const GuestUser = ({ toggleSignIn, toggleBRegister }) => (
  <div className="flex gap-2">
    <div>
      <p
        className="text-sm cursor-pointer hidden md:block"
        onClick={toggleSignIn}
      >
        Hello, signin
      </p>
      <div className=" md:flex sm:flex flex-col items-start">
        <p
          className="text-sm cursor-pointer flex items-center"
          onClick={toggleSignIn}
        >
          Accounts & Lists <FaAngleDown />
        </p>
      </div>
    </div>
  </div>
);

export default Header;
