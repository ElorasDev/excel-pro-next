"use client";

// import { Button } from "@/components/atoms/Button/Button";
import { useState, useEffect } from "react";
import {
  FiSliders,
  FiX,
  FiSearch,
  FiMenu,
  FiFileText,
  FiFile
} from "react-icons/fi";
import FilterModal from "@/components/molecules/FilterModal/FilterModal";
import { getAllUsers } from "@/services/getAllUsers";

// Complete User interface based on your database schema
interface User {
  id: number;
  fullname: string;
  age: number;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  isTemporary?: boolean;
  parent_name: string;
  phone_number: string;
  email: string;
  program: string;
  current_skill_level: 'Beginner' | 'intermediate' | 'Advanced';
  player_positions?: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Striker';
  custom_position?: string;
  session_goals: string;
  available_days: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  preferred_time: 'Morning' | 'Afternoon' | 'Evening';
  medical_conditions: string;
  comments: string;
  liability_waiver: boolean;
  cancellation_policy: boolean;
  stripeCustomerId?: string;
  activePlan?: string;
  currentSubscriptionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Simplified interface for the table display
type Player = Pick<User, 'id' | 'fullname' | 'phone_number' | 'gender' | 'age' | 'activePlan'>;

const Overview = () => {
  // State for filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // State for filter modal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // State for all users from database (complete user data)
  const [allUsers, setAllUsers] = useState<User[]>([]);
  
  // State for original player data (simplified view for the table)
  const [originalPlayers, setOriginalPlayers] = useState<Player[]>([]);
  
  // State for filtered players (what we'll actually display)
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from database on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await getAllUsers();
        setAllUsers(users);
        
        // Create simplified player objects for the table view
        const simplifiedPlayers = users.map((user: User) => ({
          id: user.id,
          fullname: user.fullname,
          phone_number: user.phone_number,
          gender: user.gender,
          age: user.age,
          activePlan: user.activePlan || 'No Plan'
        }));
        
        setOriginalPlayers(simplifiedPlayers);
        setFilteredPlayers(simplifiedPlayers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // State for mobile menu and mobile filters
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  // Function to remove a filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  // Function to apply filters to players data
  const applyFilters = (filters: string[]) => {
    setActiveFilters(filters);
  };

  // Function to convert date object to string
  const formatDate = (date: Date | undefined | null): string => {
    if (!date) return '';
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  // Function to convert boolean to "Yes"/"No"
  const formatBoolean = (value: boolean | undefined): string => {
    if (value === undefined) return '';
    return value ? 'Yes' : 'No';
  };

  // Function to properly export to CSV
  const exportToCSV = () => {
    if (allUsers.length === 0) {
      alert('No data to export');
      return;
    }
    
    // CSV header with all user fields
    const headers = [
      'ID', 'Full Name', 'Age', 'Gender', 'Temporary', 'Parent Name',
      'Phone Number', 'Email', 'Program', 'Skill Level', 'Player Position',
      'Custom Position', 'Session Goals', 'Available Days', 'Preferred Time',
      'Medical Conditions', 'Comments', 'Liability Waiver', 'Cancellation Policy',
      'Stripe Customer ID', 'Active Plan', 'Subscription End Date', 'Created At', 'Updated At'
    ];
    
    // Process each user to create CSV rows
    const csvRows = allUsers.map(user => {
      return [
        user.id,
        `"${user.fullname.replace(/"/g, '""')}"`, // Escape quotes
        user.age,
        user.gender,
        formatBoolean(user.isTemporary),
        `"${user.parent_name.replace(/"/g, '""')}"`,
        `"${user.phone_number.replace(/"/g, '""')}"`,
        `"${user.email.replace(/"/g, '""')}"`,
        `"${user.program.replace(/"/g, '""')}"`,
        user.current_skill_level,
        user.player_positions || '',
        user.custom_position ? `"${user.custom_position.replace(/"/g, '""')}"` : '',
        `"${user.session_goals.replace(/"/g, '""')}"`,
        user.available_days,
        user.preferred_time,
        `"${user.medical_conditions.replace(/"/g, '""')}"`,
        `"${user.comments.replace(/"/g, '""')}"`,
        formatBoolean(user.liability_waiver),
        formatBoolean(user.cancellation_policy),
        user.stripeCustomerId || '',
        user.activePlan || '',
        formatDate(user.currentSubscriptionEndDate),
        formatDate(user.createdAt),
        formatDate(user.updatedAt)
      ].join(',');
    });
    
    // Combine header and rows
    const csvContent = [
      headers.join(','),
      ...csvRows
    ].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download
    link.href = url;
    link.setAttribute('download', 'players_data.csv');
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to properly export to Excel
  const exportToExcel = () => {
    if (allUsers.length === 0) {
      alert('No data to export');
      return;
    }
    
    // Create Excel XML content
    let excelContent = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    excelContent += '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Players Data</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';
    excelContent += '<body><table>';
    
    // Add headers
    excelContent += '<tr>';
    const headers = [
      'ID', 'Full Name', 'Age', 'Gender', 'Temporary', 'Parent Name',
      'Phone Number', 'Email', 'Program', 'Skill Level', 'Player Position',
      'Custom Position', 'Session Goals', 'Available Days', 'Preferred Time',
      'Medical Conditions', 'Comments', 'Liability Waiver', 'Cancellation Policy',
      'Stripe Customer ID', 'Active Plan', 'Subscription End Date', 'Created At', 'Updated At'
    ];
    
    headers.forEach(header => {
      excelContent += `<th>${header}</th>`;
    });
    excelContent += '</tr>';
    
    // Add data rows
    allUsers.forEach(user => {
      excelContent += '<tr>';
      
      // Add each user field as a cell
      excelContent += `<td>${user.id}</td>`;
      excelContent += `<td>${user.fullname}</td>`;
      excelContent += `<td>${user.age}</td>`;
      excelContent += `<td>${user.gender}</td>`;
      excelContent += `<td>${formatBoolean(user.isTemporary)}</td>`;
      excelContent += `<td>${user.parent_name}</td>`;
      excelContent += `<td>${user.phone_number}</td>`;
      excelContent += `<td>${user.email}</td>`;
      excelContent += `<td>${user.program}</td>`;
      excelContent += `<td>${user.current_skill_level}</td>`;
      excelContent += `<td>${user.player_positions || ''}</td>`;
      excelContent += `<td>${user.custom_position || ''}</td>`;
      excelContent += `<td>${user.session_goals}</td>`;
      excelContent += `<td>${user.available_days}</td>`;
      excelContent += `<td>${user.preferred_time}</td>`;
      excelContent += `<td>${user.medical_conditions}</td>`;
      excelContent += `<td>${user.comments}</td>`;
      excelContent += `<td>${formatBoolean(user.liability_waiver)}</td>`;
      excelContent += `<td>${formatBoolean(user.cancellation_policy)}</td>`;
      excelContent += `<td>${user.stripeCustomerId || ''}</td>`;
      excelContent += `<td>${user.activePlan || ''}</td>`;
      excelContent += `<td>${formatDate(user.currentSubscriptionEndDate)}</td>`;
      excelContent += `<td>${formatDate(user.createdAt)}</td>`;
      excelContent += `<td>${formatDate(user.updatedAt)}</td>`;
      
      excelContent += '</tr>';
    });
    
    // Close table and document
    excelContent += '</table></body></html>';
    
    // Create blob with proper Excel MIME type
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up download
    link.href = url;
    link.setAttribute('download', 'players_data.xls');
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Effect to filter players when activeFilters or searchQuery changes
  // This is where the main fix happens
  useEffect(() => {
    if (originalPlayers.length === 0) return;
    
    // Always start with the original player list
    let newFilteredPlayers = [...originalPlayers];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      newFilteredPlayers = newFilteredPlayers.filter(
        (player) =>
          player.fullname.toLowerCase().includes(query) ||
          player.phone_number.includes(query)
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      // Age group filters
      if (activeFilters.includes("U7-U12")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.age >= 7 && player.age <= 12
        );
      } else if (activeFilters.includes("U13-U15")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.age >= 13 && player.age <= 15
        );
      } else if (activeFilters.includes("U16-U18")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.age >= 16 && player.age <= 18
        );
      } else if (activeFilters.includes("18+")) {
        newFilteredPlayers = newFilteredPlayers.filter((player) => player.age > 18);
      }

      // Gender filters
      if (activeFilters.includes("Male")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.gender === "Male"
        );
      } else if (activeFilters.includes("Female")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.gender === "Female"
        );
      }

      // Plan filters - added new filter for activePlan
      if (activeFilters.includes("Premium")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.activePlan === "Premium"
        );
      } else if (activeFilters.includes("Standard")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.activePlan === "Standard"
        );
      } else if (activeFilters.includes("Basic")) {
        newFilteredPlayers = newFilteredPlayers.filter(
          (player) => player.activePlan === "Basic"
        );
      }

      // Sort filters
      if (activeFilters.includes("Newest")) {
        newFilteredPlayers = newFilteredPlayers.sort((a, b) => b.id - a.id);
      } else if (activeFilters.includes("Oldest")) {
        newFilteredPlayers = newFilteredPlayers.sort((a, b) => a.id - b.id);
      } else if (activeFilters.includes("A-Z")) {
        newFilteredPlayers = newFilteredPlayers.sort((a, b) =>
          a.fullname.localeCompare(b.fullname)
        );
      } else if (activeFilters.includes("Z-A")) {
        newFilteredPlayers = newFilteredPlayers.sort((a, b) =>
          b.fullname.localeCompare(a.fullname)
        );
      }
    }

    // Update the filtered players state
    setFilteredPlayers(newFilteredPlayers);
  }, [activeFilters, searchQuery, originalPlayers]);

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen rounded-lg">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome, Reza</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Track, and manage your players
          </p>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 w-full"
          >
            <FiMenu className="mr-2" size={18} />
            <span>Menu</span>
          </button>
        </div>

        {/* Action Buttons */}
        {/* <div
          className={`flex flex-col sm:flex-row gap-2 ${
            mobileMenuOpen ? "block" : "hidden sm:flex"
          }`}
        >
          <Button className="rounded-lg">
            <span>Add admin</span>
          </Button>
          <Button className="rounded-lg bg-white border border-gray-300 hover:bg-gray-200 text-gray-700">
            <span className="mr-2">👤</span>
            <span>Player of the month</span>
          </Button>
        </div> */}
      </div>

      {/* Filters & Search */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between gap-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center justify-center rounded-lg border border-gray-200 px-4 w-full"
          >
            <FiSliders className="mr-2" size={16} />
            <span>
              Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div
          className={`flex flex-wrap gap-2 ${
            mobileFiltersOpen ? "block" : "hidden md:flex"
          }`}
        >
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm md:text-base"
            >
              <span>{filter}</span>
              <button
                className="ml-2 text-gray-500"
                onClick={() => removeFilter(filter)}
              >
                <FiX size={16} />
              </button>
            </div>
          ))}
          <button
            className="flex items-center bg-white border border-gray-200 rounded-lg px-3 md:px-4 md:py-2 text-sm md:text-base"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <FiSliders className="mr-2" size={16} />
            <span>More filters</span>
          </button>
        </div>

        {/* Search and Export Section */}
        <div className="flex flex-col gap-2 w-full md:w-64">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full"
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex-1"
            >
              <FiFileText className="mr-1" size={16} />
              CSV
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex-1"
            >
              <FiFile className="mr-1" size={16} />
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Players Table with vertical scroll */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading players...</span>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto max-h-80">
              <table className="w-full min-w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap w-2/5">
                      Player
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap w-1/6">
                      Gender
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap w-1/6">
                      Age
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap w-1/6">
                      Active Plan
                    </th>
                    <th className="py-4 px-6 whitespace-nowrap w-1/6"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <tr key={player.id} className="border-b border-gray-200">
                        <td className="py-4 px-6 whitespace-nowrap w-2/5">
                          <div className="flex items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 mr-2 md:mr-3 flex items-center justify-center text-white">
                              {player.fullname.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-sm md:text-base">
                                {player.fullname}
                              </div>
                              <div className="text-gray-500 text-xs md:text-sm">
                                {player.phone_number}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm md:text-base w-1/6">
                          {player.gender}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm md:text-base w-1/6">
                          {player.age}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap w-1/6">
                          <span
                            className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                              player.activePlan === "Premium"
                                ? "bg-purple-100 text-purple-800"
                                : player.activePlan === "Standard"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {player.activePlan}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No players found matching the selected filters or search
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer */}
            <div className="p-3 md:p-4 border-t border-gray-200 text-gray-500 text-xs md:text-sm">
              Showing {filteredPlayers.length} results
            </div>
          </>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeFilters={activeFilters}
        onApplyFilters={applyFilters}
      />
    </div>
  );
};

export default Overview;