"use client";
import { useState } from "react";
import Slider from "../Slider/Slider";
import RezaCard from "../../molecules/RezaCard/RezaCard";
import IndicatorDots from "../../molecules/IndicatorDots/IndicatorDots";

const Billboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 3;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:space-x-6 w-full h-[500px] relative">
        <Slider currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
        <RezaCard />
      </div>
        <div className="flex justify-center">
            <IndicatorDots
            slideCount={slideCount}
            currentSlide={currentSlide}
            goToSlide={setCurrentSlide}
            />
        </div>
    </div>
  );
};

export default Billboard;
