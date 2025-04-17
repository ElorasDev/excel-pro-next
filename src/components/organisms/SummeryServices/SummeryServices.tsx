"use client";
import { useRef, Fragment } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import PrimaryIcon from '@/components/atoms/Icons/primaryIcons/PrimaryIcon';
import { services } from './data';

const SummeryServices = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="bg-secondary p-4 text-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={titleVariants}
    >
      <motion.h2
        className="text-md font-semibold text-primary my-3"
        variants={titleVariants}
      >
        Our Services
      </motion.h2>
      <motion.h2
        className="text-2xl font-bold text-white my-5"
        variants={titleVariants}
      >
        Excel Pro Academy Services
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 justify-items-center mt-4 lg:mt-10 md:mt-8">
        {services.map((service, index) => (
          <Fragment key={index}>
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <PrimaryIcon 
                icon={`/icons/${service.title}.png`}
                text={service.title}
                variant="light"
                className="w-[64px] h-[64px]"
                fontWeight="bold"
                width={35}
                height={35}
              />
            </motion.div>
          </Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default SummeryServices;
