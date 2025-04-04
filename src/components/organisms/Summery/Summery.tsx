"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';

const Summary = () => {
  // Refs for sections in view
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // State for counter values
  const [studentCount, setStudentCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [coachesCount, setCoachesCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);

  // Target values for counters
  const targets = {
    students: 500,
    experience: 18,
    coaches: 5,
    awards: 10
  };

  // Counter animation effect
  useEffect(() => {
    if (isInView) {
      // Animation duration in ms
      const duration = 4000;
      // Update interval (smoother with smaller values)
      const interval = 30;
      // Steps for each counter
      const studentsStep = targets.students / (duration / interval);
      const experienceStep = targets.experience / (duration / interval);
      const coachesStep = targets.coaches / (duration / interval);
      const awardsStep = targets.awards / (duration / interval);

      const timer = setInterval(() => {
        setStudentCount(prev => {
          const next = prev + studentsStep;
          return next >= targets.students ? targets.students : next;
        });
        
        setExperienceCount(prev => {
          const next = prev + experienceStep;
          return next >= targets.experience ? targets.experience : next;
        });
        
        setCoachesCount(prev => {
          const next = prev + coachesStep;
          return next >= targets.coaches ? targets.coaches : next;
        });
        
        setAwardsCount(prev => {
          const next = prev + awardsStep;
          return next >= targets.awards ? targets.awards : next;
        });
      }, interval);

      // Clear the interval when all counters reach their targets
      const cleanup = setTimeout(() => {
        clearInterval(timer);
        // Set final values to ensure accuracy
        setStudentCount(targets.students);
        setExperienceCount(targets.experience);
        setCoachesCount(targets.coaches);
        setAwardsCount(targets.awards);
      }, duration);

      return () => {
        clearInterval(timer);
        clearTimeout(cleanup);
      };
    }
  }, [isInView]);

  // Variants for smoother animations with longer durations
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: "easeOut",
        staggerChildren: 0.2 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  // Format the counter values with a plus sign
  const formatCount = (count:number, isInteger = true) => {
    return `+${isInteger ? Math.floor(count) : count.toFixed(1)}`;
  };

  return (
    <motion.div
      ref={sectionRef}
      className="lg:p-28 py-8 px-4 w-full bg-[#F9F9F9]"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="mb-12">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          variants={itemVariants}
        >
          About Excel Pro Academy
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          Excel Pro is the largest Iranian-Based soccer academy in Toronto, managed by former Persepolis Fc player, Reza Abedian. At Excel Pro Soccer Academy, we have been training youths from age 6 all the way to 18 years old.
        </motion.p>
        <motion.div
          variants={itemVariants}
        >
          <Link href="/about" className="inline-flex items-center text-gray-700 hover:text-primary text-lg font-semibold transition-all duration-300 justify-center group">
            Learn more 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        <motion.div variants={iconVariants}>
          <PrimaryIcon 
            number={formatCount(studentCount)} 
            text="Student" 
            variant="dark"
            icon="/icons/football_player.png" 
          />
        </motion.div>
        
        <motion.div variants={iconVariants}>
          <PrimaryIcon
            number={formatCount(experienceCount)} 
            text="Years of experience"
            variant="dark"
            width={150}
            height={150}
            icon="/icons/trophy.png" 
          />
        </motion.div>
        
        <motion.div variants={iconVariants}>
          <PrimaryIcon
            number={formatCount(coachesCount)} 
            text="Coaches"
            variant="dark" 
            icon="/icons/Coaches.png" 
          />
        </motion.div>
        
        <motion.div variants={iconVariants}>
          <PrimaryIcon
            number={formatCount(awardsCount)} 
            text="Awards"
            variant="dark" 
            icon="/icons/cup.png" 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Summary;