"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button/Button";
import { matchdayData } from "../MatchdaySchedule/data";


type CalendarMatch = {
  id: string;
  date: Date;
  ageGroup: string;
  time: string;
  teams: string[];
};

interface CalendarViewProps {
  selectedAgeGroup: string;
  searchQuery: string;
}

const MatchCalendar: NextPage<CalendarViewProps> = ({
  selectedAgeGroup,
  searchQuery,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // مارس 2025
  const [processedMatches, setProcessedMatches] = useState<CalendarMatch[]>([]);
  const [calendarDays, setCalendarDays] = useState<Array<{ day: number; isCurrentMonth: boolean; matches: CalendarMatch[] }>>([]);

  // پردازش مسابقات و فیلتر کردن آنها
  useEffect(() => {
    console.log("پردازش مسابقات...");
    console.log("تعداد کل مسابقات:", matchdayData.length);
    
    // فیلتر کردن مسابقات بر اساس گروه سنی و جستجو
    const filtered = matchdayData.filter((match) => {
      // فیلتر بر اساس گروه سنی
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

      // فیلتر بر اساس عبارت جستجو
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
    
    console.log("تعداد مسابقات پس از فیلتر:", filtered.length);

    // تبدیل داده‌های مسابقات به فرمت مورد نیاز تقویم
    const processed = filtered.map((match) => {
      try {
        // تجزیه تاریخ با قالب "DD/MM/YY HH:MM AM/PM"
        const dateParts = match.date.split(" ");
        const dateStr = dateParts[0]; // بخش تاریخ (DD/MM/YY)
        
        // تبدیل تاریخ
        const [day, month, year] = dateStr.split("/").map(Number);
        
        // ساخت شیء Date (توجه: ماه‌ها از 0 شروع می‌شوند)
        const fullYear = 2000 + year; // تبدیل 25 به 2025
        const dateObj = new Date(fullYear, month - 1, day);
        
        // گرفتن بخش زمان اگر وجود دارد
        let timeStr = "";
        if (dateParts.length > 1) {
          // بررسی قالب زمان
          const timeMatch = match.date.match(/(\d+:\d+\s*[AP]M)/i);
          timeStr = timeMatch ? timeMatch[1] : "";
        }
        
        console.log(`مسابقه ${match.id}: تاریخ=${dateObj.toDateString()}, زمان=${timeStr}`);
        
        return {
          id: match.id.toString(),
          date: dateObj,
          ageGroup: match.ageGroup,
          time: timeStr,
          teams: match.teams
        };
      } catch (error) {
        console.error(`خطا در پردازش تاریخ برای مسابقه ${match.id}:`, error);
        return null;
      }
    }).filter(Boolean) as CalendarMatch[];
    
    console.log("تعداد مسابقات پس از پردازش:", processed.length);
    setProcessedMatches(processed);
  }, [selectedAgeGroup, searchQuery]);

  // ساخت روزهای تقویم
  useEffect(() => {
    console.log("ساخت روزهای تقویم...");
    const days = generateCalendar();
    setCalendarDays(days);
  }, [currentMonth, processedMatches]);

  // توابع مربوط به ناوبری
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // تولید ساختار تقویم
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    console.log(`ساخت تقویم برای ${month + 1}/${year}`);
    
    // روز اول ماه در هفته (0 = یکشنبه، 6 = شنبه)
    const firstDay = new Date(year, month, 1).getDay();
    
    // آخرین روز ماه
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // آخرین روز ماه قبل
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    const daysArray: Array<{ day: number; isCurrentMonth: boolean; matches: CalendarMatch[] }> = [];
    
    // روزهای ماه قبل که در هفته اول نمایش داده می‌شوند
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDay - firstDay + i + 1;
      
      // فیلتر مسابقات مربوط به این روز
      const dayMatches = processedMatches.filter(match => 
        match.date.getDate() === day && 
        match.date.getMonth() === month - 1 && 
        match.date.getFullYear() === year
      );
      
      daysArray.push({ day, isCurrentMonth: false, matches: dayMatches });
    }
    
    // روزهای ماه جاری
    for (let i = 1; i <= lastDay; i++) {
      // فیلتر مسابقات مربوط به این روز
      const dayMatches = processedMatches.filter(match => {
        const matchDate = match.date;
        const isMatch = 
          matchDate.getDate() === i && 
          matchDate.getMonth() === month && 
          matchDate.getFullYear() === year;
          
        if (isMatch) {
          console.log(`مسابقه برای روز ${i} یافت شد:`, match.teams.join(" vs "));
        }
        
        return isMatch;
      });
      
      if (dayMatches.length > 0) {
        console.log(`برای روز ${i}، ${dayMatches.length} مسابقه یافت شد`);
      }
      
      daysArray.push({ day: i, isCurrentMonth: true, matches: dayMatches });
    }
    
    // روزهای ماه بعد برای تکمیل آخرین هفته
    const remainingCells = 42 - daysArray.length; // همیشه 6 ردیف نمایش بده (6 * 7 = 42)
    for (let i = 1; i <= remainingCells; i++) {
      // فیلتر مسابقات مربوط به این روز
      const dayMatches = processedMatches.filter(match => 
        match.date.getDate() === i && 
        match.date.getMonth() === month + 1 && 
        match.date.getFullYear() === year
      );
      
      daysArray.push({ day: i, isCurrentMonth: false, matches: dayMatches });
    }
    
    return daysArray;
  };

  // فرمت ماه و سال
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // گروه‌بندی روزها به هفته‌ها
  const weeks: Array<Array<typeof calendarDays[0]>> = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // برای اهداف رفع اشکال
  console.log("ماه جاری:", currentMonth.toDateString());
  console.log("تعداد مسابقات پردازش شده:", processedMatches.length);
  console.log("تعداد کل روزهای تقویم:", calendarDays.length);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-2xl font-bold">{formatMonthYear(currentMonth)}</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            onClick={goToNextMonth}
            className="p-2 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center py-2 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
            {week.map((dayData, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`relative h-32 p-1 border-r last:border-r-0 ${
                  dayData.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-right p-1">{dayData.day}</div>
                
                {/* Match indicators */}
                <div className="mt-1 space-y-1">
                  {dayData.matches.map((match) => {
                    // Determine color based on age group
                    let bgColor = "bg-gray-500";
                    const textColor = "text-white";
                    
                    if (match.ageGroup.includes("U7 - U12")) {
                      bgColor = "bg-indigo-900";
                    } else if (match.ageGroup.includes("U13 - U14")) {
                      bgColor = "bg-orange-500";
                    } else if (match.ageGroup.includes("U15 - U17")) {
                      bgColor = "bg-red-500";
                    }
                    
                    return (
                      <div
                        key={match.id}
                        className={`${bgColor} ${textColor} rounded p-1 text-xs leading-tight overflow-hidden`}
                      >
                        <div className="font-medium">
                          {match.ageGroup.split(' - ')[0]} Match
                        </div>
                        <div>{match.time}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Debug info - can be removed in production */}
      {processedMatches.length === 0 && (
        <div className="p-4 text-red-500 bg-red-50">
          هشدار: هیچ مسابقه‌ای برای نمایش یافت نشد. لطفاً داده‌های ورودی را بررسی کنید.
        </div>
      )}
    </div>
  );
};

export default MatchCalendar;