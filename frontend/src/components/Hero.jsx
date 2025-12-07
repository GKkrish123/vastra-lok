import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-[90vh]">

      {/* Full image covering the entire area */}
      <img
        src={assets.hero_img}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Text overlay */}
      <div className="absolute left-5 sm:left-10 top-1/2 -translate-y-1/2 
                      text-white max-w-[80%] sm:max-w-[45%] space-y-4 z-10">

        <h2 className="font-medium text-base sm:text-lg tracking-wide">
          HANDLOOM SAREE COLLECTION
        </h2>

        <h1 className="prata-regular text-3xl sm:text-5xl lg:text-6xl leading-snug">
          Timeless Saree Elegance
        </h1>

        <Link 
          to="/collection" 
          className="font-semibold text-base sm:text-lg hover:underline"
        >
          Shop Now →
        </Link>

      </div>

      {/* Optional gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>

    </div>
  );
};

export default HeroCarousel;
