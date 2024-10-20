import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import TopBar from "../../componants/Topbar";
import Sidebar from "../../componants/seller/Sidebar";
import ProductUploadPage from "../products/UploadProductPage";
import Category from "../category/Categorey";
import MainCategory from "../category/MainCategory";
import FetchMainCategories from "../category/AllMainCategory";
import CategoryList from "../category/CategoryList";
import CreateForm from "../vendor/CreateVendor";
import Venders from "../vendor/Venders";
import VendorDetails from "../vendor/VendorDetails";
import PendingVendors from "../vendor/PendingVendor";
import Products from "../products/Products";
import ProductDetails from "../products/ProductDetails";
import AccountSettings from "../settings/AccountSettings";
import GetVendorByUser from "../vendor/GetVendorByUser";
import { useSelector } from "react-redux";

const MyContext = createContext();

function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility
  const values = {};
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.isBlocked == true) {
      navigate("/blocked");
    }
  }, []);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <MyContext.Provider value={values}>
        <div className="flex flex-col min-h-screen">
          {/* TopBar */}
          <div className="fixed top-0 left-0 w-full z-20">
            <TopBar toggleSidebar={toggleSidebar} />
          </div>

          <div className="flex flex-1 pt-16">
            {/* Sidebar */}
            <div
              className={`fixed top-16 left-0 h-full w-64 bg-white z-10 shadow-lg transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 `}
            >
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-0 lg:ml-64 p-5">
              <Routes>
                <Route path="products/add" element={<ProductUploadPage />} />
                <Route path="products-data" element={<Products />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="products/categories" element={<Category />} />
                <Route
                  path="products/categories/main"
                  element={<MainCategory />}
                />
                <Route path="vendor/create" element={<CreateForm />} />
                <Route
                  path="vendor/getSeller-vendors"
                  element={<GetVendorByUser />}
                />
                <Route path="vendor/:id" element={<VendorDetails />} />
                <Route
                  path="products/categories/fetch-main"
                  element={<FetchMainCategories />}
                />
                <Route
                  path="products/categories-list"
                  element={<CategoryList />}
                />
                <Route path="settings/account" element={<AccountSettings />} />
              </Routes>
            </div>
          </div>
        </div>
      </MyContext.Provider>
    </>
  );
}

export default SellerDashboard;
