import React, { useState } from 'react';
import { FaHome, FaComment, FaUserFriends, FaCog, FaBell, FaDotCircle, FaCommentDots, FaGripHorizontal, FaSearch, FaVideo, FaRegFileAudio, FaVoicemail, FaInbox, FaArrowLeft, FaArrowRight, FaAngleLeft } from 'react-icons/fa';
import { CiBoxList } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { IoArchiveSharp } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { GrSearch } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const usersData = [
    {
        id: 1,
        name: "Maryam",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "Good Morning",
        icon: "✔"
    },
    {
        id: 1,
        name: "Maryam",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "Good Morning",
        icon: "✔"
    },
    {
        id: 1,
        name: "Maryam",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "Good Morning",
        icon: "✔"
    },
    {
        id: 2,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "I am coming",
        icon: "✔"
    },
    {
        id: 3,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "Wait........",
        icon: "✔"
    },
    {
        id: 4,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "How are you?",
        icon: "✔"
    },
    {
        id: 5,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "How are you?",
        icon: "✔"
    },
    {
        id: 6,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "How are you?",
        icon: "✔"
    },
    {
        id: 7,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "How are you?",
        icon: "✔"
    },
    {
        id: 8,
        name: "Subha",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "How are you?",
        icon: "✔"
    },
    {
        id: 9,
        name: "Fatima Tabish",
        image: "/images.jfif",
        time: "04:50 A.M.",
        message: "Good Morning",
        icon: "✔✔"
    }
];

const Messages = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState(null);


    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts = usersData && usersData.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts);
    };

    return (
        <div className='flex  max-h-screen overflow-hidden'>
            <div className=" flex-col hidden max-w-xs:hidden lg:block md:block sm:hidden pt-6 w-16 h-screen bg-green-800 text-white shadow-lg">
                <div className="flex items-center justify-center h-16 border-b border-green-700">
                    <img
                        src="/chat.png"
                        alt="Profile"
                        className="rounded-full border w-10 border-green-600"
                    />
                </div>
                <nav className="flex flex-col mt-10">
                    {/* Navigation Icons */}
                    <div className="relative group">
                        <a href="#" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                            <CiBoxList className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="relative group">
                        <a href="#" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                            <AiOutlineMessage className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="relative group">
                        <a href="#" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                            <IoArchiveSharp className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="relative group">
                        <a href="#" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                            <GoPeople className="h-6 w-6" />
                        </a>
                    </div>
                    <div className='mt-36 border-b border-green-700'>
                        <div className="relative group">
                            <a href="/settings" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                                <IoNotifications className="h-6 w-6" />
                            </a>
                        </div>
                        <div className="relative group mb-6">
                            <a href="/settings" className="flex items-center p-4 hover:bg-green-700 transition duration-200">
                                <FaCog className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-16 border-b border-gray-700">
                        <img
                            src="/images.jfif"
                            alt="Profile"
                            className="rounded-full cursor-pointer border w-12 h-12 border-green-600 object-cover"
                        />
                    </div>
                </nav>
            </div>
            <div className=" flex-col hidden lg:block md:block sm:hidden pt-2 w-80 h-screen bg-white text-neutral-600 shadow-lg">
                <div className="h-20 border-b border-green-700">
                    <div className='flex px-5 justify-between items-center'>
                        <p className='font-bold text-2xl'>Chats</p>
                        <div className='flex space-x-1 text-lg'>
                            <FaBell />
                            <FaGripHorizontal />
                        </div>
                    </div>
                    <div className='px-4 mt-2'>
                        <div className="absolute ">
                            <form method="get" className="flex w-full">
                                {
                                    searchData && (
                                        <>
                                            <FaAngleLeft className='mt-2 pr-1' />
                                        </>
                                    )
                                }
                                <input
                                    type="search"
                                    className={`w-full p-1 focus:outline-none ${searchData && "w-[90%] p-0"}`}
                                    placeholder="Search....."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit" className={`text-black py-2 px-4 rounded-r-md ${searchData && "px-1 "} `}>
                                    <GrSearch className="text-md" />
                                </button>
                            </form>
                            {/* Search Results */}
                            {searchData && searchData.length !== 0 && (
                                <div className="absolute min-h-[38rem] w-full md:max-h-[36rem] left-[-16px] min-w-[16rem] max-h-[30vh] overflow-y-auto border border-gray-200 bg-slate-50 shadow-md z-10 mt-2 p-4">
                                    {searchData.map((i, index) => {
                                        const product_name = i.name.replace(/\s+/g, "-");
                                        return (
                                            <Link key={index} to={`/product/${product_name}`}>
                                                <div className="w-full flex items-start py-3">
                                                    <h1>{i.name}</h1>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <nav className=" mt-2 ">
                    <div>
                        <div className='px-4 opacity-60 text-gray-700 font-semibold'>
                            Recent Messages
                        </div>
                        <div className=' mt-2 overflow-y-scroll max-h-[38rem] mb-10'>
                            <div className='' >
                                {
                                    usersData.map((user, index) => (
                                        <div key={index} className="flex mt-5 px-2 cursor-pointer items-center">
                                            <img src={user.image} className='rounded-full cursor-pointer border w-10 h-10  border-green-600 object-cover' alt="" />
                                            <div className='flex flex-col justify-center ml-2 w-full'>
                                                <div className='flex justify-between items-center'>
                                                    <p className='font-bold text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap'>{user.name}</p>
                                                    <p className='text-xs mt-1'>{user.time}</p>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <p className='font-bold text-sm mt-1 overflow-hidden text-ellipsis whitespace-nowrap'>{user.message}</p>
                                                    <p className='text-xs mt-1'>{user.icon}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="flex flex-col  pt-2 w-full h-screen  bg-white text-neutral-600 shadow-lg">
                <div className="h-16 border-b border-green-700">
                    <div className='flex lg:px-8 px-3 justify-between items-center mt-3 '>
                        <div className='flex items-center space-x-3 '>
                            <FaArrowLeft className='lg:hidden md:hidden' />
                            <div>
                                <img src="/images.jfif" className='rounded-full cursor-pointer border w-10 h-10  border-green-600 object-cover' alt="" />
                            </div>
                            <div className=''>
                                <p className='lg:font-bold md:font-bold font-semibold text-xl '>Maryam Ameen</p>
                                <p className='text-xs opacity-90'>12 Members 5 online</p>
                            </div>
                        </div>
                        <div className='flex space-x-3 text-xl opacity-80'>
                            <FaVideo />
                            <FaVoicemail />
                            <FaInbox />
                        </div>
                    </div>
                </div>
                <nav className=" mt-2 overflow-y-scroll">
                    <div className='my-2 space-y-2 px-3'>
                        <div className='items-center justify-between max-w-40 ml-auto mr-4 p-2 rounded-sm text-white bg-green-600'>
                            <p className='text-sm font-medium text-start   '>Hy Morning How are you?</p>
                        </div>
                        <div className=''>
                            <p className='text-sm mt-3 font-medium text-start mr-auto max-w-40 ml-1 p-2 rounded-sm text-gray-600 bg-[#f1f1f1]'>Hy Morning How are you?</p>
                        </div>
                        <div className='items-center justify-between max-w-40 ml-auto mr-4 p-2 rounded-sm text-white bg-green-600'>
                            <p className='text-sm font-medium text-start   '>Hy Morning How are you?</p>
                        </div>
                        <div className=''>
                            <p className='text-sm mt-3 font-medium text-start mr-auto max-w-40 ml-1 p-2 rounded-sm text-gray-600 bg-[#f1f1f1]'>Hy Morning How are you?</p>
                        </div>
                        <div className='items-center justify-between max-w-40 ml-auto mr-4 p-2 rounded-sm text-white bg-green-600'>
                            <p className='text-sm font-medium text-start   '>Hy Morning How are you?</p>
                        </div>
                        <div className=''>
                            <p className='text-sm mt-3 font-medium text-start mr-auto max-w-40 ml-1 p-2 rounded-sm text-gray-600 bg-[#f1f1f1]'>Hy Morning How are you?</p>
                        </div>
                        <div className='items-center justify-between max-w-40 ml-auto mr-4 p-2 rounded-sm text-white bg-green-600'>
                            <p className='text-sm font-medium text-start   '>Hy Morning How are you?</p>
                        </div>
                        <div className=''>
                            <p className='text-sm mt-3 font-medium text-start mr-auto max-w-40 ml-1 p-2 rounded-sm text-gray-600 bg-[#f1f1f1]'>Hy Morning How are you?</p>
                        </div>
                        <div className='items-center justify-between max-w-40 ml-auto mr-4 p-2 rounded-sm text-white bg-green-600'>
                            <p className='text-sm font-medium text-start   '>Hy Morning How are you?</p>
                        </div>
                        <div className=''>
                            <p className='text-sm mt-3 font-medium text-start mr-auto max-w-40 ml-1 p-2 rounded-sm text-gray-600 bg-[#f1f1f1]'>Hy Morning How are you?</p>
                        </div>
                    </div>
                </nav>
                <div className="h-16 border-b border-green-700">
                    <div className='flex space-x-4 mb-9 lg:px-8 px-3 justify-between items-center mt-3 '>
                        <div className='flex space-x-1'>
                            <button className='p-2 rounded-full border w-10  text-center'>+</button>
                            <button className='p-2 rounded-full  w-10  text-center'>😟 </button>
                        </div>
                        <div className='w-full'>
                            <input type="text" name="" id="" placeholder='Type your messasge here....' className='border w-full py-1  px-1 font-medium text-black focus:outline-none' />
                        </div>
                        <div className=''>
                            <a href=""><FaArrowRight className='mr-7' /> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
