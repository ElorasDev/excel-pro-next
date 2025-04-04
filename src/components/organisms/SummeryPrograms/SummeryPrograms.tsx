"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";


/// ProgramCard Component (Reusable molecule-level component for displaying program details)
import ProgramCard from "@/components/molecules/ProgramCard/ProgramCard";
import { Button } from "@/components/atoms/Button/Button";
import { programs } from "./data";

const SummeryPrograms: NextPage = () => {
  const router = useRouter();

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <ProgramCard
            key={index}
            ageGroup={program.ageGroup}
            backgroundClass={program.backgroundClass}
            textColorClass={program.textColorClass}
            schedule={program.schedule}
            gameInfo={program.gameInfo}
            tag={program.tag}
            imageSrc={program.imageSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default SummeryPrograms;