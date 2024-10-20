import React, { useState } from "react";
import BG from "../assets/images/image6.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = ({toggleSignIn , toggleBRegister , toggleForgotPassword}) => {

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  // Handler for toggling password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8000/api/login-user", {
            email,
            password,
        }, {withCredentials: true});
        if (response.status === 200) {
            alert("Login Successfully!!");
            setTimeout(() => {
                window.location.reload(true);
            }, 3000);
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
        } else {
            alert("An error occurred. Please try again.");
        }
    }
};

  return (
    <div className="animation z-20 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-5 border-gray-400 border-2 rounded-lg shadow-lg relative w-full max-w-md mx-4 transform transition-transform duration-500 ease-in-out scale-100">
      <div className="flex justify-between items-center">
        <p className="font-semibold mx-auto  text-lg">
          Register/Sign in
        </p>
        <button className="animation text-black" onClick={toggleSignIn}>
          ✕
        </button>
      </div>
      <p className="text-xs bg-green-100 mt-1 rounded-md mx-auto text-green-800 w-full text-center">
        Your information is protected
      </p>
      <form className=" h-auto text-xs  rounded-r-md p-10 shadow-md m-auto"  onSubmit={handleSubmit}>
        <div className="mx-3 mb-2 mt-5">
          <label htmlFor="email" className="text-slate-800 font-medium">
            Email:
          </label>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
            />
          </div>
        </div>
        <div className="mx-3 mb-2 mt-8">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-slate-800 font-medium">
              Password:
            </label>
            <Link to={""} onClick={toggleForgotPassword} className="text-blue-500 hover:text-black text-xs">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w-full border border-gray-300 rounded-sm focus:border-blue-500 transition-all focus:outline-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mx-3 my-4">
          <button
            className="w-[100%] rounded-md bg-blue-500 text-white p-2 font-medium"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="mx-3 flex">
        <p>New Here?</p> <Link to={""} className="text-indigo-600 hover:underline ml-1" onClick={toggleBRegister}> Register Now</Link>
      </div>
      </form>
    
    </div>
    </div>
  );
};

export default Login;
