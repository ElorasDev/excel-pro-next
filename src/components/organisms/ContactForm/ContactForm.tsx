"use client";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import FloatingLabelInput from "../FloatingLabelInput/FloatingLabelInput";
import { Button } from "@/components/atoms/Button/Button";
import FloatingLabelTextarea from "@/components/molecules/FloatingLabelTextarea/FloatingLabelTextarea";

// Define form data type
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define focus state type
interface FocusState {
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
}

const ContactForm = () => {
  // Manage focus state for input fields
  const [focused, setFocused] = useState<FocusState>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  
  // Manage form data state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  // State for form submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ref for section and in-view detection
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Handle focus event
  const handleFocus = (field: keyof FocusState): void => {
    setFocused({ ...focused, [field]: true });
  };
  
  // Handle blur event
  const handleBlur = (field: keyof FocusState): void => {
    if (!formData[field]) {
      setFocused({ ...focused, [field]: false });
    }
  };
  
  // Handle input change event
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
    
    // Show success animation
    setIsSubmitted(true);
    
    // Reset form after animation
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFocused({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
    }, 2500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const formContainerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  // Success message animation
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.3, 
        ease: "easeIn" 
      }
    }
  };
  
  return (
    <motion.div 
      ref={sectionRef}
      className="flex flex-col md:flex-row rounded-lg overflow-hidden max-w-6xl mx-auto px-5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Left side - Image */}
      <motion.div 
        className="relative w-full md:w-1/2 h-80 md:h-auto my-2"
        variants={imageVariants}
      >
        <motion.div 
          className="absolute top-4 left-4 z-20"
          variants={logoVariants}
        >
          <div className="p-2">
            <Image 
              src="/images/logo/excelpro_sec.png" 
              alt="Logo" 
              width={56} 
              height={56}
              className="object-contain"
            />
          </div>
        </motion.div>
        <div className="w-full h-full relative">
          <Image
            src="/images/person/get_in_touch.png"
            alt="Coaches"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          {/* Overlay for shadow effect */}
          <motion.div 
            className="absolute inset-0 bg-black opacity-30 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Right side - Form */}
      <motion.div 
        className="w-full md:w-1/2 p-8 bg-white"
        variants={formContainerVariants}
      >
        <motion.h2 
          className="text-3xl font-bold mb-2 text-gray-800"
          variants={itemVariants}
        >
          Get in touch
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-6"
          variants={itemVariants}
        >
          Our friendly team would love to hear from you.
        </motion.p>
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-80"
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank you!</h3>
              <p className="text-gray-600 text-center">Your message has been sent successfully. We will contact you shortly.</p>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              key="form"
            >
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <FloatingLabelInput
                  id="name"
                  name="name"
                  label="Your name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  placeholder="Example: James Born"
                  isFocused={focused.name}
                />
              </motion.div>
              
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <FloatingLabelInput
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  placeholder="Example: test@gmail.com"
                  isFocused={focused.email}
                />
              </motion.div>
              
              {/* Subject Field */}
              <motion.div variants={itemVariants}>
                <FloatingLabelInput
                  id="subject"
                  name="subject"
                  label="Subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={() => handleBlur("subject")}
                  placeholder="Example: Report"
                  isFocused={focused.subject}
                />
              </motion.div>
              
              {/* Message Field */}
              <motion.div variants={itemVariants}>
                <FloatingLabelTextarea
                  id="message"
                  name="message"
                  label="Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  isFocused={focused.message}
                />
              </motion.div>
              
              {/* Submit Button */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full font-medium rounded-md"
                >
                  Send message
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;