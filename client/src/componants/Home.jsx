import React, { useState, useEffect } from 'react';
import Sliders from "../layout/Sliders";
import Cards from "../layout/Cards";
import CategoryGrid from "../layout/Categories.jsx";
import Navbar from '../layout/Navbar';
import SecondNavbar from '../layout/SecondNavbar';
import Banner from '../layout/Banner.jsx';
import ProductList from '../pages/products/Products.jsx';
import HomeProductList from '../pages/products/HomeProducts.jsx';

const Home = () => {
 

  return (
    <div>
      <Sliders />
      <Banner />
      <Cards />
      <HomeProductList />
      {/* <CategoryGrid /> */}
    </div>
  );
}

export default Home;
