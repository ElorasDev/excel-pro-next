"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { NextPage } from "next";
import Slide from "../../molecules/Slide/Slide";
import ArrowButton from "../../atoms/ArrowButton/ArrowButton";


// types
import { sliderData } from "./data";


// Defining types for props received by the Slider component
interface SliderProps {
  currentSlide: number; // The index of the current active slide
  setCurrentSlide: Dispatch<SetStateAction<number>>; // Function to update the current slide index
}

const Slider: NextPage<SliderProps> = ({ currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    // Auto-slide functionality with interval
    const interval = setInterval(() => {
      // Move to the next slide, and loop back to the first one when the end is reached
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 7000); // Change slide every 7 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [setCurrentSlide]); // Depend on setCurrentSlide to trigger effect on updates

  return (
    <div className="relative w-full md:w-3/4 h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        // Dynamic transform property to slide between slides based on currentSlide index
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Mapping over sliderData and rendering Slide components for each item */}
        {sliderData.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>

      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
        {/* Left arrow button to go to the previous slide */}
        <ArrowButton
          direction="left"
          onClick={() =>
            // Move to the previous slide and loop back to the last one
            setCurrentSlide((prev: number) => (prev - 1 + sliderData.length) % sliderData.length)
          }
        />
        {/* Right arrow button to go to the next slide */}
        <ArrowButton
          direction="right"
          onClick={() =>
            // Move to the next slide and loop back to the first one
            setCurrentSlide((prev) => (prev + 1) % sliderData.length)
          }
        />
      </div>
    </div>
  );
};

export default Slider;
