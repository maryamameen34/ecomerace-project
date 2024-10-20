import React from 'react';
import image1 from '../assets/images/categories/1.avif'
// Define a list of categories with their respective icons and labels
const categories = [
  { label: "Business Services", icon: image1 },
  { label: "Apparel & Accessories", icon: "path-to-icon/apparel-accessories.svg" },
  { label: "Home & Garden", icon: "path-to-icon/home-garden.svg" },
  { label: "Industrial Machinery", icon: "path-to-icon/industrial-machinery.svg" },
  { label: "Shoes & Accessories", icon: "path-to-icon/shoes-accessories.svg" },
  { label: "Packaging & Printing", icon: "path-to-icon/packaging-printing.svg" },
  { label: "Furniture", icon: "path-to-icon/furniture.svg" },
  { label: "Environment", icon: "path-to-icon/environment.svg" },
  { label: "Consumer Electronics", icon: "path-to-icon/consumer-electronics.svg" },
  { label: "Sports & Entertainment", icon: "path-to-icon/sports-entertainment.svg" },
  { label: "Beauty", icon: "path-to-icon/beauty.svg" },
  { label: "Mother, Kids & Toys", icon: "path-to-icon/mother-kids-toys.svg" },
  { label: "Jewelry, Eyewear", icon: "path-to-icon/jewelry-eyewear.svg" },
  { label: "Tools & Hardware", icon: "path-to-icon/tools-hardware.svg" },
];

const CategoryGrid = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {categories.map((category, index) => (
        <div key={index} className="flex duration-500 flex-col items-center m-4 p-2 rounded-full w-24 h-24 border-2 border-gray-300 hover:border-orange-400 hover:shadow-lg cursor-pointer">
          <img src={category.icon} alt={category.label} className="w-10 h-10 rounded-full mb-2" />
          <span className="text-center text-[10px]">{category.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
