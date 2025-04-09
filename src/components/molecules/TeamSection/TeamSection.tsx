"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Type definition for a team member
type TeamMember = {
  id: string;
  name: string;
  position: string;
  imageSrc: string;
  imageAlt: string;
};

interface TeamSectionProps {
  teamMembers?: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  // Default team members if none are provided
  const defaultTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Reza Abedian",
      position: "Owner & coach of Excel Pro Academy",
      imageSrc: "/images/person/avatars/abedian_avatar.png",
      imageAlt: "Reza Abedian"
    },
    {
      id: "2",
      name: "John Doe",
      position: "Head coach of Excel Pro Academy",
      imageSrc: "/images/person/avatars/abedian_avatar.png",
      imageAlt: "John Doe"
    },
    {
      id: "3",
      name: "Jeff Rayan",
      position: "Assistant Coach of Excel Pro Academy",
      imageSrc: "/images/person/avatars/abedian_avatar.png",
      imageAlt: "Jeff Rayan"
    }
  ];

  // Use provided team members or fall back to default ones
  const displayTeamMembers = teamMembers || defaultTeamMembers;

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {displayTeamMembers.map((member) => (
            <div key={member.id} className="bg-gray-50 p-8 rounded-3xl text-center">
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-purple-100">
                  <Image 
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-red-500 mb-6">{member.position}</p>
              <div className="mb-6">
                <button className="border border-gray-300 rounded-md py-2 px-6 text-gray-700 hover:bg-gray-100 transition duration-200">
                  About {member.name}
                </button>
              </div>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default TeamSection;