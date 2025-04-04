"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import IndicatorDot from '../../atoms/IndicatorDot/IndicatorDot';
import ArrowButton from '@/components/atoms/ArrowButton/ArrowButton';

// data
import { testimonials } from './data';

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#121212] mb-10">Testimonial</h2>
        
        {/* Mobile layout (stacked) */}
        <div className="block md:hidden rounded-2xl overflow-hidden shadow-lg">
          {/* Image section on top for mobile */}
          <div className="w-full h-48 relative">
            <Image
              src={currentTestimonial.image_index}
              alt="Academy testimonial"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center object-top" 
              priority
            />
          </div>
          
          {/* Testimonial content below for mobile */}
          <div className="w-full bg-white p-6 flex flex-col z-10 relative min-h-[250px]">
            {/* Quotation marks background */}
            <div className="absolute top-6 left-6 opacity-40 scale-75 pointer-events-none">
              <svg width="219" height="172" viewBox="0 0 219 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path opacity="0.3" d="M14.6468 81.3625V81.3654C14.6468 86.6835 18.8957 90.9324 24.2138 90.9324H80.4335V166.25H5.11594V81.3654C5.11594 42.4979 34.326 10.3116 71.8874 5.59208V15.1819C56.8496 17.3803 42.9536 24.6443 32.5443 35.8468C21.0497 48.2174 14.6566 64.4759 14.6468 81.3625ZM213.876 90.9324V166.25H138.559V81.3654C138.559 42.4969 167.772 10.3052 205.419 5.59062V15.1726C173.004 19.8435 148.09 47.7017 148.09 81.3654C148.09 86.6835 152.339 90.9324 157.657 90.9324H213.876Z" stroke="#FC0D1C" strokeWidth="10.2319"/>
                </g>
              </svg>
            </div>
            
            {/* Main content area */}
            <div className="relative z-10 flex-1 mb-6">
              <div className="overflow-auto max-h-[120px]">
                <p className="text-base text-gray-700">{currentTestimonial.text}</p>
              </div>
            </div>
            
            {/* User info area */}
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <Image 
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#121212]">{currentTestimonial.name}</h3>
                <p className="text-xs text-gray-500">{currentTestimonial.location}</p>
              </div>
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <IndicatorDot 
                    key={index}
                    bgActiveColor="bg-black"
                    isActive={index === currentIndex}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3">
                <ArrowButton 
                  direction="left"
                  onClick={handlePrevious}
                  variant="gray"
                />
                <ArrowButton
                  direction="right"
                  onClick={handleNext}
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop layout (side-by-side) */}
        <div className="hidden md:flex rounded-2xl overflow-hidden shadow-lg">
          {/* Left side - Testimonial content section */}
          <div className="w-3/5 bg-white p-8 lg:p-12 flex flex-col justify-between z-10 relative">
            {/* Quotation marks background (light red/pink) */}
            <div className="absolute top-12 left-12 opacity-40 pointer-events-none">
              <svg width="219" height="172" viewBox="0 0 219 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path opacity="0.3" d="M14.6468 81.3625V81.3654C14.6468 86.6835 18.8957 90.9324 24.2138 90.9324H80.4335V166.25H5.11594V81.3654C5.11594 42.4979 34.326 10.3116 71.8874 5.59208V15.1819C56.8496 17.3803 42.9536 24.6443 32.5443 35.8468C21.0497 48.2174 14.6566 64.4759 14.6468 81.3625ZM213.876 90.9324V166.25H138.559V81.3654C138.559 42.4969 167.772 10.3052 205.419 5.59062V15.1726C173.004 19.8435 148.09 47.7017 148.09 81.3654C148.09 86.6835 152.339 90.9324 157.657 90.9324H213.876Z" stroke="#FC0D1C" strokeWidth="10.2319"/>
                </g>
              </svg>
            </div>
            
            {/* Main content with fixed height */}
            <div className="min-h-[300px] flex flex-col">
              {/* Testimonial text */}
              <div className="relative z-10 mb-8 flex-grow overflow-auto">
                <p className="text-lg text-gray-700">{currentTestimonial.text}</p>
              </div>
              
              {/* User information */}
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <Image 
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#121212]">{currentTestimonial.name}</h3>
                  <p className="text-sm text-gray-500">{currentTestimonial.location}</p>
                </div>
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <IndicatorDot 
                      key={index}
                      bgActiveColor="bg-black"
                      isActive={index === currentIndex}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <ArrowButton 
                    direction="left"
                    onClick={handlePrevious}
                    variant="gray"
                  />
                  <ArrowButton
                    direction="right"
                    onClick={handleNext}
                    variant="primary"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Image section */}
          <div className="w-2/5 relative">
            <Image
              src={currentTestimonial.image_index}
              alt="Academy testimonial"
              fill
              sizes="(max-width: 1024px) 40vw, 30vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;