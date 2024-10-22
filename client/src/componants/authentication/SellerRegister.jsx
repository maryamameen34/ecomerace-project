import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import user from "../../assets/images/icon.gif";
import axios from "axios";

const RegisterSaller = ({ toggleSellerRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("seller");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("file", image);
    formData.append("confirm_password", cpassword);

    try {
      const response = await axios.post(
        "https://ecomerace-project-orpin.vercel.app/?vercelToolbarCode=HT2-Y0IUwsdqfeo/api/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setSuccess("User registered. Check your email for verification.");
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setCpassword("");
      setImage(null);
      setTimeout(() => {
        toggleSellerRegister(false);
      }, 5000);
    } catch (error) {
      console.error(error.message);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="animation  z-20 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 border-gray-400 border-2 rounded-lg shadow-lg relative w-full max-w-md mx-4 transform transition-transform duration-500 ease-in-out scale-100">
        <div className="flex justify-between items-center">
          <p className="font-semibold mx-auto text-lg">
            Register/Sign in as Seller
          </p>
          <button className="animation text-black" onClick={toggleSellerRegister}>
            ✕
          </button>
        </div>
        <p className="text-xs bg-green-100 mt-1 rounded-md mx-auto text-green-800 w-full text-center">
          Your information is protected
        </p>
        {error && (
          <p className="text-xs bg-red-100 mt-1 rounded-md mx-auto text-red-800 w-full text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs bg-green-100 mt-1 rounded-md mx-auto text-green-800 w-full text-center">
            {success}
          </p>
        )}
        <div className="relative flex justify-center items-end mb-7 mt-9">
          <div>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Profile"
                className="w-11 h-11 object-cover border border-gray-300 rounded-full"
              />
            ) : (
              <div className="w-11 h-11 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-500">
                <img src={user} alt="" />
              </div>
            )}
          </div>
          <div className="absolute ml-12 mb-1">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <FaCamera className="text-sm" />
            </label>
            <input
              type="file"
              name="imageUpload"
              id="imageUpload"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <form method="post" className="text-xs" onSubmit={handleSubmit}>
          <input
            type="text"
            name="role"
            id="role"
            value={role}
            hidden
            onChange={(e) => setFname(e.target.value)}
            className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
            required
          />
          <div className="flex flex-col md:flex-row mx-3 mb-2 mt-5 md:space-x-4">
            <div className="flex-1 mb-2 md:mb-0">
              <label htmlFor="fname" className="text-slate-800 font-medium">
                First Name:
              </label>
              <div>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="lname" className="text-slate-800 font-medium">
                Last Name:
              </label>
              <div>
                <input
                  type="text"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  id="lname"
                  className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mx-3 mb-2 mt-5">
            <label htmlFor="email" className="text-slate-800 font-medium">
              Email:
            </label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 w-full border border-gray-300 rounded-sm focus:shadow-md transition-all focus:border-blue-500 focus:outline-blue-500"
                required
              />
            </div>
          </div>
          <div className="mx-3 mb-2 mt-8">
            <label htmlFor="password" className="text-slate-800 font-medium">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 w-full border border-gray-300 rounded-sm focus:border-blue-500 transition-all focus:outline-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-500 text-xs"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mx-3 mb-2 mt-8">
            <label htmlFor="cpassword" className="text-slate-800 font-medium">
              Confirm Password:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                id="cpassword"
                className="p-1 w-full border border-gray-300 rounded-sm focus:border-blue-500 transition-all focus:outline-blue-500"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 text-gray-500 text-xs"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mx-3 my-4">
            <button
              className="w-full rounded-md bg-blue-500 text-white p-2 font-medium"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSaller;
