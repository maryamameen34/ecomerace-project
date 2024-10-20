import React, { useEffect, useRef, useState } from "react";
import { RiGlobalLine, RiSecurePaymentFill } from "react-icons/ri";

import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import ReactFlagsSelect from "react-flags-select";
import { countryNames } from "../data/countryNames";
import { locationData } from "../data/provincewithcities";
import { GrLanguage, GrOrderedList, GrSearch } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa6";
import Login from "../componants/Login";
import ForgotPassword from '../componants/ForgotPassword'
import SignUpBuyer from "../componants/SignUp";
import { FaAngleRight } from "react-icons/fa6";
import { AiOutlineLogin } from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import ShowOverLay from "./ShowOverLay";
import Header from '../layout/Header'
import dropdownvisible from '../layout/dropdownvisible'


const Navbar = () => {
  const [selectedCountry, setSelectedCountry] = useState("PK"); // Default to Pakistan
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [show, setShow] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // State to manage overlay visibility
  const [showRegister, setShowRegister] = useState(false); // State to manage overlay visibility
  const [showSignin, setShowSignin] = useState(false);
  const [showForgotPassword, setForgotPassword] = useState(false)
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };


  // Function to handle country selection
  const handleSelectCountry = (code) => {
    setSelectedCountry(code);
    setSelectedProvince("");
    setSelectedCity("");
  };

  // Function to handle province selection
  const handleSelectProvince = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity(""); // Reset city selection
  };

  // Function to handle city selection
  const handleSelectCity = (e) => {
    setSelectedCity(e.target.value);
  };

  // Function to toggle overlay visibility
  const toggleOverlay = () => {
    setShowOverlay((prevShow) => !prevShow);
  };

  // Function to toggle signin visibility
  const toggleSignIn = () => {
    setForgotPassword(false)
    setDropdownVisible(false)
    setShowRegister(false)
    setShowSignin((prevShow) => !prevShow);
  };

  // Function to toggle forgot password visibility
  const toggleForgotPassword = () => {
    setDropdownVisible(false)
    setShowSignin(false)
    setForgotPassword((prevShow) => !prevShow);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevShow) => !prevShow);
  };

  // Function to toggle buyer Register visibility

  const toggleBRegister = () => {
    setDropdownVisible(false)
    setShowSignin(false)
    setForgotPassword(false)
    setShowRegister((prevShow) => !prevShow);
  };
  // Function to toggle buyer login visibility


  return (
    <div>
      <div className={`w-[100%] h-16`}>
        <Header
          selectedCountry={selectedCountry}
          toggleOverlay={toggleOverlay}
          setDropdownVisible={setDropdownVisible}
          dropdownRef={dropdownRef}
          toggleDropdown={toggleDropdown}
          isDropdownVisible={isDropdownVisible}
          toggleBRegister={toggleBRegister}
          toggleSignIn={toggleSignIn}
        />
      </div>

      {isDropdownVisible && (
        <dropdownvisible
          setDropdownVisible={setDropdownVisible}
        />
      )}

      {/* Overlay */}
      {showOverlay && (
        <ShowOverLay
          toggleOverlay={toggleOverlay}
          selectedCity={selectedCity}
          selectedCountry={selectedCountry}
          selectedProvince={selectedProvince}
          handleSelectCountry={handleSelectCountry}
          handleSelectProvince={handleSelectProvince}
          handleSelectCity={handleSelectCity}
        />
      )}

      {/* Overlay */}
      {showSignin && (
        <Login toggleSignIn={toggleSignIn} toggleBRegister={toggleBRegister} toggleForgotPassword={toggleForgotPassword} />
      )}

      {/* Overlay */}
      {showRegister && (
        <SignUpBuyer toggleBRegister={toggleBRegister} toggleBuyerLogin={toggleSignIn}  />
      )}

      {
        showForgotPassword && (
          <ForgotPassword toggleForgotPassword={toggleForgotPassword} toggleBuyerLogin={toggleSignIn} />
        )
      }
    </div>
  );
};

export default Navbar;