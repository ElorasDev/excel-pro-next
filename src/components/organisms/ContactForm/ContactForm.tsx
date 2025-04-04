"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
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
    alert("Message sent!");
  };
  
  return (
    <div className="flex flex-col md:flex-row rounded-lg overflow-hidden max-w-6xl mx-auto px-5">
      {/* Left side - Image */}
      <div className="relative w-full md:w-1/2 h-80 md:h-auto my-2">
        <div className="absolute top-4 left-4 z-20">
          <div className="p-2">
            <Image 
              src="/images/logo/excelpro_sec.png" 
              alt="Logo" 
              width={56} 
              height={56}
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full h-full relative">
          <Image
            src="/images/person/get_in_touch.png"
            alt="Coaches"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          {/* Overlay for shadow effect */}
          <div className="absolute inset-0 bg-black opacity-30 rounded-xl pointer-events-none"></div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Get in touch</h2>
        <p className="text-gray-600 mb-6">Our friendly team would love to hear from you.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
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
          
          {/* Email Field */}
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
          
          {/* Subject Field */}
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
          
          {/* Message Field */}
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
          
          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full font-medium rounded-md"
          >
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
