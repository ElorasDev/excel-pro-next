"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { motion, useInView  } from "framer-motion"; // اضافه کردن framer-motion برای انیمیشن‌ها
import ProgramCard from "@/components/molecules/ProgramCard/ProgramCard";
import { Button } from "@/components/atoms/Button/Button";
import { programs } from "./data";
import { useRef } from "react";

const SummeryPrograms: NextPage = () => {
  const router = useRouter();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      className="py-12 px-4 max-w-7xl mx-auto"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} 
      variants={sectionVariants}
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-md lg:text-4xl md:text-2xl sm:text-md font-bold text-gray-900">
          Our programs
        </h2>
        {/* Button for navigating to all programs page */}
        <Button
          variant="white"
          className="rounded-xl font-normal flex items-center mx-2"
          onClick={() => router.push("/programs")}
        >
          View all programs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Button>
      </div>

      {/* Grid layout for displaying multiple program cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        {programs.map((program, index) => (
          <motion.div key={index} variants={cardVariants}>
            <ProgramCard
              ageGroup={program.ageGroup}
              backgroundClass={program.backgroundClass}
              textColorClass={program.textColorClass}
              schedule={program.schedule}
              gameInfo={program.gameInfo}
              tag={program.tag}
              imageSrc={program.imageSrc}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SummeryPrograms;
