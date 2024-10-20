import React, { useState, useEffect } from 'react';
import image from "./../assets/images/sliders/4.jpg";
import image1 from "./../assets/images/sliders/4.jpg";
import image2 from "../assets/images/sliders/2.png";
import image3 from "../assets/images/sliders/3.png";
import image4 from "../assets/images/sliders/4.jpg";
import image5 from "../assets/images/sliders/5.jpg";
import image6 from "../assets/images/sliders/6.png";
import image7 from "../assets/images/sliders/7.jpg";
import image8 from "../assets/images/sliders/image8.png";
import image9 from "../assets/images/sliders/8.png";

const Sliders = () => {
    const sliders = [
        { url: image },
        { url: image1 },
        { url: image2 },
        { url: image3 },
        { url: image4 },
        { url: image5 },
        { url: image6 },
        { url: image7 },
        { url: image8 },
        { url: image9 }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === sliders.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [sliders.length]);

    return (
        <div className="h-[350px] w-auto m-auto py-1 px-4 relative group">
            <div
                style={{
                    backgroundImage: `url(${sliders[currentIndex].url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
                className="slider w-full h-full rounded-md duration-500"
            >
            </div>

            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliders.map((_, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Sliders;
