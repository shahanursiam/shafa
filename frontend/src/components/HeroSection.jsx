import React from "react";
import Carousel from "./Carousel";
import hero1 from "../../assets/hero1.jpeg";
import hero2 from "../../assets/hero2.png";
import hero3 from "../../assets/hero3.png";

const HeroSection = () => {
  const images = [
    { src: hero1, alt: "1" },
    { src: hero2, alt: "2" },
    { src: hero3, alt: "3" },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 flex flex-col lg:flex-row border-gray-300 bg-white relative transition-all">
      {/* Sidebar categories */}
      <div className="w-full lg:w-1/4 py-10">
        <ul className="font-semibold text-lg md:border-r border-gray-300 px-10 flex flex-row flex-wrap gap-4 md:flex-col items-center md:items-start justify-center md:justify-start">
          <li><a href="#">Woman's Fashion</a></li>
          <li><a href="#">Men's Fashion</a></li>
          <li><a href="#">Electronics</a></li>
          <li><a href="#">Home & Garden</a></li>
          <li><a href="#">Health & Beauty</a></li>
          <li><a href="#">Toys & Sports</a></li>
          <li><a href="#">Automotive</a></li>
        </ul>
      </div>

      {/* Carousel */}
      <div className="w-full lg:w-3/4 flex items-center justify-center ">
        <Carousel images={images} autoPlay={true} interval={4000} />
      </div>
    </div>
  );
};

export default HeroSection;
