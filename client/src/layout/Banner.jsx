import React from 'react'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='mx-10  mt-3 hidden md:flex lg:flex bg-indigo-100 h-6 items-center justify-between rounded-md text-xs'>
      <div className='flex items-center ml-3 pt-1'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      <div className='h-3 w-0.5 bg-black'></div>
      <div className='flex items-center pt-1'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      <div className='h-3 w-0.5 bg-black'></div>
      <div className='flex items-center pt-1'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      <div className='h-3 w-0.5 bg-black'></div>
      <div className='flex items-center pt-1'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      <div className='h-3 w-0.5 bg-black'></div>
      <div className='flex items-center pt-1'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      <div className='h-3 w-0.5 bg-black'></div>
      <div className='flex items-center pt-1 mr-3'>
        <AiFillSafetyCertificate />
        <Link className='text-xs ml-1'>Safe Payment</Link>
      </div>
      
    </div>
  )
}

export default Banner
