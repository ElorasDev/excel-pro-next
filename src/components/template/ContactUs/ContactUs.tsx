"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import FAQItem from "@/components/atoms/FAQItem/FAQItem";
import FAQSection from "@/components/organisms/FAQSection/FAQSection";
import ContactInfoSection from "@/components/organisms/ContactInfoSection/ContactInfoSection";

// Dynamically load the map component with SSR disabled
// This is crucial to prevent the "window is not defined" error
const DynamicLeafletMap = dynamic(
  () => import("@/components/atoms/LeafletMap/LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center rounded-xl">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const ContactUs = () => {
  const position: [number, number] = [43.90065543881494, -79.39804313547427];

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What age groups do you accept at Excel Pro Academy?",
      answer:
        "We welcome players from ages 6 to 18. Our programs are tailored to suit each age group's skills and development needs.",
    },
    {
      id: 2,
      question: "Do I need prior football experience to join the academy?",
      answer:
        "No prior experience is necessary. We welcome players of all skill levels, from beginners to advanced, and our coaches will help develop your skills accordingly.",
    },
    {
      id: 3,
      question: "How can I register for a training program or tournament?",
      answer:
        "You can register through our online portal on the website, visit our facility during office hours, or contact our registration team via phone or email.",
    },
    {
      id: 4,
      question: "Are the coaches certified and experienced?",
      answer:
        "Yes, all our coaches hold relevant certifications from recognized football associations and have extensive experience in coaching youth football at various levels.",
    },
    {
      id: 5,
      question: "What equipment do I need to bring for training sessions?",
      answer:
        "Players should bring football boots, shin guards, water bottle, and comfortable training attire. Training bibs and balls are provided by the academy.",
    },
  ];

  return (
    <section className="bg-white overflow-hidden">
      <motion.div
        className="bg-[#FFF3F2] bg-[url('/images/other/tech-bg.png')] bg-cover bg-center px-4 sm:px-6 lg:px-8 pt-8 pb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center text-sm text-gray-500 my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-red-500 font-medium">Contact Us</span>
          </motion.div>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <motion.span
              className="inline-block px-3 py-1 bg-red-100 text-red-500 text-sm font-medium rounded-xl mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Contact
            </motion.span>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Stay in touch with us
            </motion.h1>
          </motion.div>
        </div>

        {/* Contact Information Cards */}
       <ContactInfoSection />
      </motion.div>

      {/* Leaflet Map Section - The map will be displayed here */}
      <motion.div
        className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg mt-[-60px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="h-[400px] w-full rounded-xl overflow-hidden">
          {/* Use the dynamic component that disables SSR */}
          <DynamicLeafletMap position={position} />
        </div>
      </motion.div>

      {/* FAQ Section */}
      <FAQSection data={faqData} />

    </section>
  );
};

export default ContactUs;
