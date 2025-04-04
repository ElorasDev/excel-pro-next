"use client";
import { Fragment, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';
import { services } from './data';

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // انیمیشن برای عنوان
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // انیمیشن برای کل کانتینر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  // انیمیشن برای آیکون‌ها
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 9,
        duration: 0.8
      }
    }
  };

  // انیمیشن برای تصویر دایره قرمز
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.2, rotate: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 1.2, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto bg-[#FAFAFA] p-4 text-center rounded-xl relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* دایره قرمز با انیمیشن */}
      <motion.div 
        className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32"
        variants={circleVariants}
      >
        <Image 
          src="/images/other/red-semi-circle.png"
          alt="Red semi-circle"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
      </motion.div>
      
      {/* عنوان با انیمیشن */}
      <motion.h2 
        className="text-2xl font-bold text-[#181D27] my-10 relative z-10"
        variants={titleVariants}
      >
        Why choose us?
      </motion.h2>

      {/* گرید آیکون‌ها با انیمیشن */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-8 justify-items-center mt-4 lg:mt-10 md:mt-8 relative z-10"
        variants={containerVariants}
      >
        {services.map((service, index) => (
          <Fragment key={index}>
            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.3 }
              }}
            >
              <PrimaryIcon 
                icon={`/icons/${service.title}.png`}
                text={service.title}
                variant="dark"
                className="w-[64px] h-[64px]"
                fontWeight="bold"
                width={35}
                height={35}
              />
            </motion.div>
          </Fragment>
        ))}
      </motion.div>

      {/* زیبایی‌های اضافی - حباب‌های متحرک */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isInView ? 0.3 : 0, 
          scale: isInView ? 1 : 0.5,
          transition: { duration: 1.5, delay: 0.8 }
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#0070f3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 w-16 h-16 opacity-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isInView ? 0.2 : 0, 
          scale: isInView ? 1 : 0.5,
          transition: { duration: 1.5, delay: 1 }
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#ff4081" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default WhyChooseUs;