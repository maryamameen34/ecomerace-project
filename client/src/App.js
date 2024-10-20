import "./assets/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./componants/Home.jsx";
import ActivateAccount from "./componants/ActivateAccount.jsx";
import SecondNavbar from "./layout/SecondNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadLoggedinUser } from "./redux/actions/user.js";
import store from "./redux/store";
import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import Messages from "./pages/Messages.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import ResetPassword from "./pages/authentication/index.js";
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx";

import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./pages/payment/Payment.jsx";
import ProtectedRoute from "./Routes/ProductiveRoutes.jsx";
import SellerDashboard from "./pages/dashboard/SellerDashboard.jsx";
import MaybeShow from "./Routes/MaybeShow.jsx";
import Blockend from "./pages/blocked/Blockend.jsx";
import Checkout from "./componants/checkout/Checkout.jsx";
import Success from "./componants/payment/Success.jsx";

function App() {
  useEffect(() => {
    store.dispatch(loadLoggedinUser());
  }, []);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="m-0 p-0">
      <BrowserRouter>
        <MaybeShow>
          <div
            className={`w-full navbar-transition ${
              active ? "navbar-shadow fixed top-0 left-0 z-10" : ""
            }`}
          >
            <Navbar />
          </div>
          <SecondNavbar />
        </MaybeShow>
        <Routes>
          <Route path={""} element={<Home />} />
          <Route path={"/blocked"} element={<Blockend />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/messages"} element={<Messages />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path={"/admin-dashboard/*"} element={<AdminDashboard />} />
          <Route path={"/seller-dashboard/*"} element={<SellerDashboard />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/success"} element={<Success />} />
          <Route
            path={"/activation/:activation_token"}
            element={<ActivateAccount />}
          />

          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
