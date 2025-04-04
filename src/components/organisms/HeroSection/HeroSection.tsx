"use client";
import { useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { Button } from "../../atoms/Button/Button";
import AvatarGroup from "../../molecules/AvatarGroup/AvatarGroup";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection: NextPage = () => {
  const members = [
    { src: "/images/person/avatars/Avatar1.png", alt: "Member 1" },
    { src: "/images/person/avatars/Avatar2.png", alt: "Member 2" },
    { src: "/images/person/avatars/Avatar3.png", alt: "Member 3" },
    { src: "/images/person/avatars/Avatar4.png", alt: "Member 4" },
    { src: "/images/person/avatars/Avatar5.png", alt: "Member 5" },
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="relative bg-white p-6 rounded-lg shadow-sm w-full max-w-6xl mx-auto overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Background image for larger screens */}
      <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
        <Image
          src="/images/other/training.png"
          width={500}
          height={400}
          alt="Soccer training"
          className="w-full h-full object-cover rounded-r-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      </div>

      <motion.div className="relative z-10 flex flex-col gap-4 md:w-3/4">
        <motion.h1 className="text-3xl md:text-4xl font-bold text-gray-900" variants={itemVariants}>
          Excel Pro Academy, Where Champions Are Made!
        </motion.h1>

        <motion.p className="text-gray-600 mt-2 md:max-w-lg" variants={itemVariants}>
          Train with the best, compete at the highest level, and unlock your full potential with Excel Pro Academy.
        </motion.p>

        <motion.div className="flex items-center gap-4 mt-2 flex-wrap" variants={itemVariants}>
          <Button variant="white" className="rounded-xl">View programs</Button>
          <Button variant="primary" className="rounded-xl">Join now</Button>
          <AvatarGroup members={members} extraCount={500} />
        </motion.div>
      </motion.div>

      <motion.div className="mt-6 md:hidden rounded-lg overflow-hidden" variants={itemVariants}>
        <Image
          src="/images/other/training.png"
          width={400}
          height={200}
          alt="Soccer training"
          className="w-full h-48 object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
