import React, { useRef, useState } from 'react'
import image2 from "../assets/images/cards/image1.jpg"
import image3 from "../assets/images/cards/image2.jpg"
import image4 from "../assets/images/cards/image3.jpg"
import image1 from "../assets/images/cards/image4.jpg"
import image5 from "../assets/images/cards/electronice1.jpg"
import image6 from "../assets/images/cards/electronics.jpg"
import image7 from "../assets/images/cards/electronics2.jpg"
import image8 from "../assets/images/cards/electronics3.jpg"
import image9 from "../assets/images/cards/health&beauty.jpg"
import image10 from "../assets/images/cards/health&beauty1.jpg"
import image11 from "../assets/images/cards/health1.jpg"
import image12 from "../assets/images/cards/health2.jpg"
import image13 from "../assets/images/cards/glasses.jpg"
import image14 from "../assets/images/cards/shows.jpg"
import image15 from "../assets/images/cards/valute.jpg"
import image16 from "../assets/images/cards/menassets.jpg"
import image17 from "../assets/images/cards/furn4.jpg"
import image18 from "../assets/images/cards/furn1.jpg"
import image19 from "../assets/images/cards/furn2.jpg"
import image20 from "../assets/images/cards/furn3.jpg"
import image21 from "../assets/images/cards/air.jpg"
import image22 from "../assets/images/cards/vacume.jpg"
import image23 from "../assets/images/cards/coffie.avif"
import image24 from "../assets/images/cards/app.jpg"


const Cards = () => {
  return (
    <>
      <div className=" grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 space-y-4 p-8 w-full h-auto">
        <div className="h-auto   border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 px-4">New Arrivals | Watches & Jewelry</p>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image1} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Women's Jewelery</p>
            </div>
            <div className='w-1/2'>
              <img src={image2} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Watches</p>
            </div>
          </div>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image3} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Women's Watches</p>
            </div>
            <div className='w-1/2'>
              <img src={image4} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Accessories</p>
            </div>
          </div>
        </div>
        <div className="h-auto   border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 px-4">New Arrivals | Watches & Jewelry</p>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image1} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Women's Jewelery</p>
            </div>
            <div className='w-1/2'>
              <img src={image2} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Watches</p>
            </div>
          </div>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image3} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Women's Watches</p>
            </div>
            <div className='w-1/2'>
              <img src={image4} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Accessories</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 mb-10 px-4">Upto 30% off Electronics</p>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'> 
              <img src={image5} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Smart Watches</p>
            </div>
            <div className='w-1/2'>
              <img src={image6} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Televisions</p>
            </div>
          </div>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image7} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Cameras</p>
            </div>
            <div className='w-1/2'>
              <img src={image8} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Head Phones</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4 ">
          <p className="text-lg font-bold pt-3 px-4">Health & beauty | Up to 50% off</p>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image9} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Beauty & Parfumes</p>
            </div>
            <div className='w-1/2'>
              <img src={image10} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Grooming gadgets</p>
            </div>
          </div>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image11} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Personal Care</p>
            </div>
            <div className='w-1/2'>
              <img src={image12} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Nutrition & supplements</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 px-4">Just landed for men | Wide Selection</p>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image13} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Glasses</p>
            </div>
            <div className="w-1/2">
              <img src={image14} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Jokers</p>
            </div>
          </div>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image15} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Women's Watches</p>
            </div>
            <div className="w-1/2">
              <img src={image16} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Men's Accessories</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 px-4">Get your furniture assembled for AED 1*</p>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image17} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Recliners & bean bags</p>
            </div>
            <div className="w-1/2">
              <img src={image18} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Shoe racks</p>
            </div>
          </div>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image19} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">TV tables & units</p>
            </div>
            <div className="w-1/2">
              <img src={image20} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Coffee & end tables</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4">
          <p className="text-lg font-bold pt-3 px-4">0% installments* | Up to 30% off Appliances</p>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image21} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Air fryers</p>
            </div>
            <div className="w-1/2">
              <img src={image22} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Vacuum cleaners</p>
            </div>
          </div>
          <div className="flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className="w-1/2">
              <img src={image23} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Coffee machines</p>
            </div>
            <div className="w-1/2">
              <img src={image24} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Appliances store</p>
            </div>
          </div>
        </div>
        <div className=" h-auto border shadow-md mx-3 bg-[#f1f1f1] pb-4 ">
          <p className="text-lg font-bold pt-3 px-4">Health & beauty | Up to 50% off</p>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image9} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Beauty & Parfumes</p>
            </div>
            <div className='w-1/2'>
              <img src={image10} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Grooming gadgets</p>
            </div>
          </div>
          <div className=" flex mt-3 gap-4  sm:mx-3 pl-3 pr-3">
            <div className='w-1/2'>
              <img src={image11} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Personal Care</p>
            </div>
            <div className='w-1/2'>
              <img src={image12} className="w-full h-24 m-auto" />
              <p className="text-[10px] text-center pt-3 px-3">Nutrition & supplements</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Cards