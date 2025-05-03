"use client";

import { NextPage } from "next";
import { motion, useInView } from "framer-motion";
import ProgramCard from "@/components/molecules/ProgramCard/ProgramCard";
import { Button } from "@/components/atoms/Button/Button";
import { programs } from "./data";
import { useRef } from "react";
import Link from "next/link";

const SummeryPrograms: NextPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const displayedPrograms = programs.slice(0, 3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  };

  return (
    <>
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="py-12 px-4 max-w-7xl mx-auto"
        aria-labelledby="programs-heading"
        lang="en"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <div className="flex justify-between items-center mb-10">
          <h2
            id="programs-heading"
            className="text-md lg:text-4xl md:text-2xl sm:text-md font-bold text-gray-900"
            itemProp="name"
          >
            Our Programs
          </h2>

          <Link href="/program" passHref legacyBehavior>
            <a
              aria-label="View all soccer training programs"
              title="View all Excel Pro Academy soccer programs"
              className="inline-block"
            >
              <Button
                variant="white"
                className="rounded-xl font-normal flex items-center mx-2"
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
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </a>
          </Link>
        </div>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {displayedPrograms.map((program, index) => (
            <motion.li
              key={index}
              variants={cardVariants}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={`${index + 1}`} />
              <div
                itemProp="item"
                itemScope
                itemType="https://schema.org/Course"
              >
                <meta
                  itemProp="name"
                  content={`Soccer Training - ${program.ageGroup}`}
                />
                <meta
                  itemProp="description"
                  content={`Soccer training program for ${program.ageGroup} age group with ${program.schedule} and ${program.gameInfo}`}
                />
                <meta
                  itemProp="url"
                  content={`https://yourdomain.com/program/${program.ageGroup
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                />
                <ProgramCard
                  ageGroup={program.ageGroup}
                  backgroundClass={program.backgroundClass}
                  textColorClass={program.textColorClass}
                  schedule={program.schedule}
                  gameInfo={program.gameInfo}
                  tag={program.tag}
                  imageSrc={program.imageSrc}
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="sr-only">
          <h3>Excel Pro Academy Soccer Programs</h3>
          <p>
            Excel Pro Academy offers professional soccer training programs for
            different age groups. Our structured programs include regular
            training sessions and competitive games to develop young
            players&apos; skills, teamwork, and athletic performance.
          </p>
          <ul>
            {displayedPrograms.map((program, index) => (
              <li key={`seo-${index}`}>
                <h4>{program.ageGroup} Soccer Program</h4>
                <p>Training schedule: {program.schedule}</p>
                <p>Game information: {program.gameInfo}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </>
  );
};

export default SummeryPrograms;
