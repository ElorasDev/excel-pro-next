import { ProgramType } from "../SummeryPrograms/types";

export const programs: ProgramType[] = [
  {
    ageGroup: "U5 – U8",
    title: "Mini Kickers (Ages 5-8)",
    backgroundClass: "bg-green-50",
    textColorClass: "text-gray-900",
    schedule: ["Monday at 5PM - 6:30PM", "Wednesday at 5PM - 6:30PM"],
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
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ),
      text: "New",
      className: "text-green-800",
    },
    imageSrc: "/images/programs/u7-12.png",
    team_image: "/images/person/team/u5-u8.webp",
    description:
      "Our youngest athletes are introduced to the beautiful game in a fun and energetic environment. Sessions focus on basic ball control, coordination, teamwork, and building confidence through play-based learning. Training frequency: 2 x per week",
    programOutline: {
      description:
        "Young players train in a nurturing environment with coaches specialized in early childhood development and soccer fundamentals.",
      additionalDetails:
        "The U5-U8 Introduction Program focuses on building coordination, basic soccer skills, and social development through play. Sessions are structured with short, engaging activities to maintain attention and maximize enjoyment.",
    },
    playerUniformsEquipment:
      "At Excel Pro Soccer Academy, all players will receive full uniform upon registration. Uniforms consist of a jersey, shorts, and pair of socks. This uniform is to be worn at each session. All players are to bring their own shoes and shin pads. Running shoes are acceptable for this age group. Please note that shin pads are mandatory during all games and training sessions!",
  },
  {
    ageGroup: "U9 – U12",
    title: "Foundation Phase (Ages 9-12)",
    backgroundClass: "bg-gray-100",
    textColorClass: "text-gray-900",
    schedule: ["Monday at 5PM - 6:30PM", "Wednesday at 5PM - 6:30PM"],
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
    imageSrc: "/images/programs/u13-14.png",
    team_image: "/images/person/team/u9-u12.webp",
    description:
      "As players grow, we emphasize technical skill development, tactical understanding, and physical fitness. This stage builds the foundation for more competitive play, with a focus on ball mastery, passing, and movement. Training frequency: 2–3x per week, optional weekend games",
    programOutline: {
      description:
        "All players train throughout the year under the supervision of Reza Abedian and other passionate and experienced coaches who are looking to bring the best out of these young soccer players.",
      additionalDetails:
        "The U8-U12 Competitive Program at Excel Pro Soccer Academy is an opportunity for players to grow in technique and strive for excellence in the beautiful game. At the end of each practice, coaches pick their player of the day to create a fun competitive environment. Every year during Summer and Fall/Winter season a number of players from the program are selected to play at the North York Association League!",
    },
    playerUniformsEquipment:
      "At Excel Pro Soccer Academy, all players will receive full uniform upon registration. Uniforms consist of a jersey, shorts, and pair of socks. This uniform is to be worn at each session. Game day uniforms are separately given upon being selected for the team which includes players jersey number! All players are to bring their own shoes and shin pads. Running shoes are not acceptable. Please note that shin pads are mandatory during all games and training sessions!",
  },
  {
    ageGroup: "U13 – U14",
    title: "Competitive Phase (Ages 13-14)",
    backgroundClass: "bg-blue-50",
    textColorClass: "text-gray-900",
    schedule: ["Monday at 6:30PM - 8PM", "Wednesday at 6:30PM - 8PM"],
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
    imageSrc: "/images/programs/u15-17.png",
    team_image: "/images/person/team/u7.webp",
    description:
      "Our competitive teams train with high intensity and are introduced to position-specific tactics, match strategies, and mental strength training. Players compete in regional leagues and tournaments across Toronto and the GTA. Training frequency: 2-3x per week + regular matches",
    programOutline: {
      description:
        "All players train throughout the year under the supervision of Reza Abedian and other passionate and experienced coaches who are looking to bring the best out of these competitive soccer players.",
      additionalDetails:
        "Our competitive program offers high-intensity training with focus on position-specific tactics, match strategies, and mental strength development. Players participate in regional leagues and tournaments across Toronto and the GTA, gaining valuable competitive experience. The program is designed to challenge players and elevate their skills to meet the demands of competitive play while building teamwork and resilience.",
    },
    playerUniformsEquipment:
      "At Excel Pro Soccer Academy, all players will receive full uniform upon registration. Uniforms consist of a jersey, shorts, and pair of socks. This uniform is to be worn at each training session. Game day uniforms are separately provided upon team selection and include the player's jersey number! All players must bring their own cleats and shin pads. Running shoes are not acceptable for competitive play. Please note that shin pads are mandatory during all games and training sessions! Players are also encouraged to bring their own water bottles and weather-appropriate gear for all training sessions and matches.",
  },
  {
    ageGroup: "U15 – U18",
    title: "High Performance (Ages 15-18)",
    backgroundClass: "bg-black",
    textColorClass: "text-white",
    schedule: ["Monday at 6:30PM - 8PM", "Wednesday at 6:30PM - 8PM"],
    gameInfo: "Games: TBD",
    tag: {
      icon: null,
      text: "",
      className: "text-white",
    },
    imageSrc: "/images/programs/u15-18.png",
    team_image: "/images/person/team/u13-u14.jpeg",
    description:
      "This program is designed for serious players aiming to play at a high level, including university, college, and semi-professional opportunities. We focus on advanced tactical systems, strength & conditioning, video analysis, and exposure to top-level competitions. Training frequency: 3x per week + league play + showcases",
    programOutline: {
      description:
        "Elite players train intensively throughout the year under the direct supervision of Reza Abedian and our team of professional coaches with experience at the highest levels of the game.",
      additionalDetails:
        "The Elite Development Program at Excel Pro Soccer Academy is designed for serious players with aspirations to compete at university, college, and semi-professional levels. Our comprehensive approach includes advanced tactical systems, dedicated strength and conditioning sessions, regular video analysis, and exposure to top-level competitions and showcases. Players receive personalized development plans and regular performance assessments to track progress toward their long-term goals. Our connections with university programs and professional clubs provide pathways for talented players to advance their careers.",
    },
    playerUniformsEquipment:
      "At Excel Pro Soccer Academy, elite program players receive a premium uniform kit upon registration. The training kit includes multiple jerseys, shorts, socks, and a tracksuit for travel. Game day uniforms are professionally designed with player numbers and are required for all competitive matches. Players must provide their own high-quality cleats appropriate for different playing surfaces and professional-grade shin guards. Additional required equipment includes proper goalkeeper gear for keepers, personalized water bottles, and appropriate weather gear. Players may also receive access to team-specific training equipment and recovery tools. All uniform and equipment standards must be strictly maintained to represent the academy at showcase events and high-level competitions.",
  },
];