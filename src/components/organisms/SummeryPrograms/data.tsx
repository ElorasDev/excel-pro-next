import { ProgramType } from "./types";

  
  
  // Programs data for displaying in ProgramCard components
  export const programs:ProgramType[] = [
    {
      ageGroup: "U7 – U12",
      backgroundClass: "bg-gray-100",
      textColorClass: "text-gray-900",
      schedule: ["Wednesdays at 5Pm", "Sunday at 1Pm"],
      gameInfo: "Games: TBD",
      tag: {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        ),
        text: "Popular",
        className: "text-gray-800",
      },
      imageSrc: "/images/programs/u7-12.png",
    },
    {
      ageGroup: "U13 – U14",
      backgroundClass: "bg-blue-50",
      textColorClass: "text-gray-900",
      schedule: ["Wednesdays at 5Pm", "Sunday at 1Pm"],
      gameInfo: "Games: TBD",
      tag: {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
          </svg>
        ),
        text: "Off",
        className: "text-gray-800",
      },
      imageSrc: "/images/programs/u13-14.png",
    },
    {
      ageGroup: "U15 – U17",
      backgroundClass: "bg-black",
      textColorClass: "text-white",
      schedule: ["Wednesdays at 5Pm", "Sunday at 1Pm"],
      gameInfo: "Games: TBD",
      tag: {
        icon: null,
        text: "",
        className: "text-white",
      },
      imageSrc: "/images/programs/u15-17.png",
    },
  ];