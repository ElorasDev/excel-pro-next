"use client"
import { motion } from "framer-motion";
import { Button } from "../Button/Button";

const FixedRegisterButton = () => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <Button 
        className="text-white font-medium rounded-full shadow-lg flex items-center transform hover:scale-105"
      >
        <span>Register for this program</span>
        <svg 
          className="w-5 h-5 ml-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Button>
    </motion.div>
  );
};

export default FixedRegisterButton;