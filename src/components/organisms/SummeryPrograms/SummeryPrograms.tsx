"use client";

import { NextPage } from "next";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import ProgramCard from "@/components/molecules/ProgramCard/ProgramCard";
import { Button } from "@/components/atoms/Button/Button";
import { programs } from "./data";
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";

type ScheduleItem = {
  day: string;
  start: string;
  end: string;
};

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

  const getScheduleSchema = (ageGroup: string) => {
    if (ageGroup.includes("U5") || ageGroup.includes("U8")) {
      return [
        { day: "Monday", start: "T17:00", end: "T18:30" },
        { day: "Wednesday", start: "T17:00", end: "T18:30" },
      ];
    }
    if (ageGroup.includes("U13") || ageGroup.includes("U14")) {
      return [
        { day: "Monday", start: "T18:30", end: "T20:00" },
        { day: "Wednesday", start: "T18:30", end: "T20:00" },
      ];
    }
    return [
      { day: "Monday", start: "T17:00", end: "T18:30" },
      { day: "Wednesday", start: "T17:00", end: "T18:30" },
    ];
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Excel Pro Academy Soccer Programs",
    itemListElement: programs.map((program, index) => {
      let schedule: ScheduleItem[] = [];
      if (program.ageGroup === "U5 – U8" || program.ageGroup === "U9 – U12") {
        schedule = [
          { day: "Monday", start: "T17:00", end: "T18:30" },
          { day: "Wednesday", start: "T17:00", end: "T18:30" },
        ];
      } else if (program.ageGroup === "U13 – U14") {
        schedule = [
          { day: "Monday", start: "T18:30", end: "T20:00" },
          { day: "Wednesday", start: "T18:30", end: "T20:00" },
        ];
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: `Soccer Training - ${program.ageGroup}`,
          description: `Soccer training program for ${program.ageGroup} age group with ${program.schedule} and ${program.gameInfo}`,
          url: `https://excelproso.com/program/${program.ageGroup
            .toLowerCase()
            .replace(/\s+/g, "-")}`,

          provider: {
            "@type": "Organization",
            name: "Excel Pro Academy",
            sameAs: "https://excelproso.com",
          },

          offers: {
            "@type": "Offer",
            price: "350",
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            url: `https://excelproso.com/program/${program.ageGroup
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
            validFrom: new Date().toISOString(),
          },

          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "OnSite",
            startDate: "2024-09-01",
            endDate: "2025-06-01",
            location: {
              "@type": "Place",
              name: "Excel Pro Academy Soccer Field",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Soccer Lane",
                addressLocality: "Toronto",
                addressRegion: "ON",
                postalCode: "M1M 1M1",
                addressCountry: "CA",
              },
            },
            courseSchedule: schedule.map((sch) => ({
              "@type": "Schedule",
              repeatFrequency: "Weekly",
              byDay: sch.day,
              startTime: sch.start,
              endTime: sch.end,
              repeatCount: "36"
            })),
          },
        },
      };
    }),
  };

  return (
    <>
      <Head>
        <title>Soccer Programs | Excel Pro Academy</title>
        <meta
          name="description"
          content="Professional soccer training for kids in Toronto. Join Excel Pro Academy now!"
        />
      </Head>

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
        <Script
          id="jsonld-all-programs"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
                  content={`https://excelproso.com/program/${program.ageGroup
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                />
                
                {/* Added provider */}
                <div
                  itemProp="provider"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <meta
                    itemProp="name"
                    content="Excel Pro Academy"
                  />
                  <meta
                    itemProp="sameAs"
                    content="https://excelproso.com"
                  />
                </div>
                
                {/* Added offers */}
                <div
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta
                    itemProp="price"
                    content="350"
                  />
                  <meta
                    itemProp="priceCurrency"
                    content="CAD"
                  />
                  <meta
                    itemProp="availability"
                    content="https://schema.org/InStock"
                  />
                  <meta
                    itemProp="url"
                    content={`https://excelproso.com/program/${program.ageGroup
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  />
                </div>

                <div
                  itemProp="hasCourseInstance"
                  itemScope
                  itemType="https://schema.org/CourseInstance"
                >
                  <meta itemProp="courseMode" content="OnSite" />
                  {getScheduleSchema(program.ageGroup).map((schedule, i) => (
                    <div
                      key={i}
                      itemProp="courseSchedule"
                      itemScope
                      itemType="https://schema.org/Schedule"
                    >
                      <meta
                        itemProp="repeatFrequency"
                        content="Weekly"
                      />
                      <meta
                        itemProp="repeatCount"
                        content="36"
                      />
                      <meta
                        itemProp="byDay"
                        content={schedule.day}
                      />
                      <meta itemProp="startTime" content={schedule.start} />
                      <meta itemProp="endTime" content={schedule.end} />
                    </div>
                  ))}
                </div>

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
      </motion.section>
    </>
  );
};

export default SummeryPrograms;