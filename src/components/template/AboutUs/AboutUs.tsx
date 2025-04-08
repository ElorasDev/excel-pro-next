"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@/components/atoms/Button/Button';
import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';

const TeamGallery = () => {
  const teamImages = [
    { id: 1, src: "/images/teams/team-coaching-1.jpg", alt: "Coach with young players in red uniforms" },
    { id: 2, src: "/images/teams/team-black-1.jpg", alt: "Team in black uniforms" },
    { id: 3, src: "/images/teams/team-blue-1.jpg", alt: "Youth team in blue uniforms" },
    { id: 4, src: "/images/teams/team-yellow-1.jpg", alt: "Youth team in yellow uniforms" },
    { id: 5, src: "/images/teams/team-blue-2.jpg", alt: "Youth team in blue uniforms second image" },
    { id: 6, src: "/images/teams/team-yellow-2.jpg", alt: "Youth team in yellow uniforms second image" },
    { id: 7, src: "/images/teams/team-coaching-2.jpg", alt: "Coach with young players second image" },
    { id: 8, src: "/images/teams/team-black-2.jpg", alt: "Team in black uniforms second image" }
  ];

  return (
    <section className="bg-white">
      {/* Header Section */}
      <motion.div 
        className="bg-[#FFF3F2] bg-[url('/images/other/tech-bg.png')] bg-cover bg-center px-4 md:px-8 pt-8 py-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center text-sm text-gray-500 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-red-500 font-medium">About Us</span>
          </motion.div>

          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 bg-red-100 text-red-500 text-sm font-medium rounded-xl mb-4">
              Programs
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Learn more about us</h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Slider */}
      <div className="w-full py-8 relative overflow-hidden -mt-[150px]">
        <div className="relative z-10">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-24 md:w-32 lg:w-48 z-10 bg-gradient-to-r from-white/70 to-transparent"></div>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1024: { slidesPerView: 4, spaceBetween: 16 },
              }}
              navigation={false}
              pagination={false}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              speed={800}
              className="team-swiper py-4"
            >
              {[...teamImages, ...teamImages].slice(0, 12).map((image, index) => (
                <SwiperSlide key={`top-${index}`}>
                  <div className="rounded-lg overflow-hidden shadow-md h-60 md:h-64">
                    <div className="relative h-full w-full">
                      <Image 
                        src="/images/person/team/u7.png"
                        alt={image.alt} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute right-0 top-0 h-full w-24 md:w-32 lg:w-48 z-10 bg-gradient-to-l from-white/70 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          
          {/* Left side with animated image and cards */}
          <div className="w-full md:w-1/2 relative pl-0 md:-ml-8">
        <div className="relative w-full">

      {/* Top white card */}
      <div className="absolute -top-10 left-0 right-20 h-24 bg-gray-50 rounded-3xl z-0"></div>

      <div className="absolute top-0 bottom-20 -right-6 w-24 h-full bg-gray-50 rounded-3xl z-0"></div>

      {/* Main image */}
      <div className="relative w-full z-10">
              <Image
              src="/images/person/team/u7.png"
              alt="Excel Pro Soccer Team"
              width={629}
              height={445}
              className="rounded-r-3xl w-full h-auto"
              />
        </div>
      </div>
    </div>

          {/* Right side text */}
          <div className="w-full md:w-1/2 mx-4">
            <h2 className="text-red-500 font-bold uppercase mb-4">ABOUT US</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">WELCOME TO Excel Pro Soccer</h3>
            <div className="text-gray-700 space-y-4">
              <p>
                Excel Pro is the largest Iranian-Based soccer academy in Toronto, managed by former Persepolis FC player, Reza Abedian. At Excel Pro Soccer Academy, we have been training youths from age 8 all the way to 18 years old.
              </p>
              <p>
                Excel Pro Soccer Academy is a soccer school based in Toronto. Reza Abedian is the founder and Head Coach at the Excel Pro Soccer Academy with a long and recognized professional soccer experience. Founded in 2010, it is now considered to be one of the best in Canada and offers personalised trained which is tailored to each of its players individual needs.
              </p>
            </div>
            <Button className="mt-8 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
              ENTER A SOCCER WORLD
            </Button>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <div>
          <PrimaryIcon 
                      number="+10" 
            text="Student" 
            variant="dark"
            icon="/icons/football_player.png" 
          />
        </div>
        
        <div>
          <PrimaryIcon
                      number="+10" 
            text="Years of experience"
            variant="dark"
            width={150}
            height={150}
            icon="/icons/trophy.png" 
          />
        </div>
        
        <div>
          <PrimaryIcon
            number="+10" 
            text="Coaches"
            variant="dark" 
            icon="/icons/Coaches.png" 
          />
        </div>
        </div>
    </section>
  );
};

export default TeamGallery;
