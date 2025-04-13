"use client";
import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { matchdayData } from "./data";
import MatchCard from "@/components/molecules/MatchCard/MatchCard";
import { Search, Calendar, List } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import MatchCalendar from "../MatchCalendar/MatchCalendar";
import AnimatedCard from "@/components/atoms/AnimatedCard/AnimatedCard";

const MatchdaySchedule: NextPage = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [calendarMode, setCalendarMode] = useState(false);
  const router = useRouter();

  // Age group filter options
  const ageGroups = [
    { id: "all", label: "View all" },
    { id: "u7-12", label: "U7 - 12" },
    { id: "u13-14", label: "U13 - 14" },
    { id: "u15-17", label: "U15 - 17" },
  ];

  // Filter matches based on selected age group and search query
  const filteredMatches = matchdayData.filter((match) => {
    // Filter by age group
    if (selectedAgeGroup !== "all") {
      if (selectedAgeGroup === "u7-12" && !match.ageGroup.includes("U7 - U12"))
        return false;
      if (
        selectedAgeGroup === "u13-14" &&
        !match.ageGroup.includes("U13 - U14")
      )
        return false;
      if (
        selectedAgeGroup === "u15-17" &&
        !match.ageGroup.includes("U15 - U17")
      )
        return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        match.teams.some((team) => team.toLowerCase().includes(query)) ||
        match.location.toLowerCase().includes(query) ||
        match.address.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const toggleCalendarMode = () => {
    setCalendarMode(!calendarMode);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter Section */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedAgeGroup(group.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedAgeGroup === group.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search teams, location, or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            onClick={toggleCalendarMode}
            className="flex items-center justify-center gap-2 rounded-lg"
          >
            {calendarMode ? (
              <>
                <List className="h-5 w-5" />
                <span>Show list mode</span>
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5" />
                <span>Show calendar mode</span>
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Matches Section */}
      <section className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {filteredMatches.length === 0 ? (
            <motion.div
              key="no-matches"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10"
            >
              <p className="text-lg text-gray-500">
                No matches found. Try adjusting your filters.
              </p>
            </motion.div>
          ) : calendarMode ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <MatchCalendar
                selectedAgeGroup={selectedAgeGroup}
                searchQuery={searchQuery}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              {filteredMatches.map((match) => (
                <AnimatedCard key={match.id}>
                  <div className="my-10 mx-5">
                    <MatchCard
                      ageGroup={match.ageGroup}
                      location={match.location}
                      teams={match.teams}
                      date={match.date}
                      address={match.address}
                      id={match.id}
                    />
                  </div>
                </AnimatedCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Us Section */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          Have questions about the schedule or need to report a change? Get in
          touch with our team.
        </p>
        <Button
          className="rounded-lg"
          onClick={() => router.push("contact-us")}
        >
          Contact Support
        </Button>
      </section>
    </div>
  );
};

export default MatchdaySchedule;
