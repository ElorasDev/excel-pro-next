"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FiSliders, FiX, FiSearch, FiFileText, FiFile } from "react-icons/fi";
import FilterModal from "@/components/molecules/FilterModal/FilterModal";
import { getAllPayments } from "@/services/getAllPayments";

// Payment interface based on the controller response
interface Payment {
  amount: number;
  currency: string;
  status: "succeeded" | "pending" | "failed";
  phone_number: string;
  fullname: string;
  userEmail: string;
  subscriptionPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

const Payment: NextPage = () => {
  // State for filters
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // State for filter modal
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // State for all payments from database
  const [allPayments, setAllPayments] = useState<Payment[]>([]);

  // State for filtered payments (what we'll actually display)
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  // Mobile filters toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get token from cookies
  const savedToken = Cookies.get("auth_token")!;

  // Fetch payments from database on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const payments = await getAllPayments(savedToken);
        setAllPayments(payments);
        setFilteredPayments(payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [savedToken]);

  // Function to remove a filter
  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  // Function to apply filters to payment data
  const applyFilters = (filters: string[]) => {
    setActiveFilters(filters);
  };

  // Format date to localized string
  const formatDate = (date: Date | string): string => {
    if (!date) return "";
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  // Format currency (assuming USD)
  const formatCurrency = (amount: number): string => {
    return `${amount.toFixed(2)}`;
  };

  // Export to CSV
  const exportToCSV = () => {
    if (allPayments.length === 0) {
      alert("No data to export");
      return;
    }

    // CSV header
    const headers = [
      "Amount",
      "Currency",
      "Status",
      "phone_number",
      "User Name",
      "User Email",
      "Subscription Plan",
      "Created At",
      "Updated At",
    ];

    // Process each payment to create CSV rows
    const csvRows = allPayments.map((payment) => {
      return [
        payment.amount,
        payment.currency,
        payment.status,
        `"${payment.phone_number.replace(/"/g, '""')}"`, // Escape quotes
        `"${payment.fullname.replace(/"/g, '""')}"`,
        `"${payment.userEmail.replace(/"/g, '""')}"`,
        payment.subscriptionPlan,
        formatDate(payment.createdAt),
        formatDate(payment.updatedAt),
      ].join(",");
    });

    // Combine header and rows
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set up download
    link.href = url;
    link.setAttribute("download", "payment_data.csv");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export to Excel
  const exportToExcel = () => {
    if (allPayments.length === 0) {
      alert("No data to export");
      return;
    }

    // Create Excel XML content
    let excelContent =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
    excelContent +=
      "<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Payment Data</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>";
    excelContent += "<body><table>";

    // Add headers
    excelContent += "<tr>";
    const headers = [
      "Amount",
      "Currency",
      "Status",
      "phone_number",
      "User Name",
      "User Email",
      "Subscription Plan",
      "Created At",
      "Updated At",
    ];

    headers.forEach((header) => {
      excelContent += `<th>${header}</th>`;
    });
    excelContent += "</tr>";

    // Add data rows
    allPayments.forEach((payment) => {
      excelContent += "<tr>";

      // Add each payment field as a cell
      excelContent += `<td>${payment.amount}</td>`;
      excelContent += `<td>${payment.currency}</td>`;
      excelContent += `<td>${payment.status}</td>`;
      excelContent += `<td>${payment.phone_number}</td>`;
      excelContent += `<td>${payment.fullname}</td>`;
      excelContent += `<td>${payment.userEmail}</td>`;
      excelContent += `<td>${payment.subscriptionPlan}</td>`;
      excelContent += `<td>${formatDate(payment.createdAt)}</td>`;
      excelContent += `<td>${formatDate(payment.updatedAt)}</td>`;

      excelContent += "</tr>";
    });

    // Close table and document
    excelContent += "</table></body></html>";

    // Create blob with proper Excel MIME type
    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set up download
    link.href = url;
    link.setAttribute("download", "payment_data.xls");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Effect to filter payments when activeFilters or searchQuery changes
  useEffect(() => {
    if (allPayments.length === 0) return;

    // Always start with the original payment list
    let newFilteredPayments = [...allPayments];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      newFilteredPayments = newFilteredPayments.filter(
        (payment) =>
          payment.fullname.toLowerCase().includes(query) ||
          payment.userEmail.toLowerCase().includes(query) ||
          payment.phone_number.toLowerCase().includes(query)
      );
    }

    // Apply active filters
    if (activeFilters.length > 0) {
      // Status filters
      if (activeFilters.includes("Succeeded")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.status === "succeeded"
        );
      } else if (activeFilters.includes("Pending")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.status === "pending"
        );
      } else if (activeFilters.includes("Failed")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.status === "failed"
        );
      }

      // Subscription plan filters
      if (activeFilters.includes("Premium")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.subscriptionPlan === "Premium"
        );
      } else if (activeFilters.includes("Standard")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.subscriptionPlan === "Standard"
        );
      } else if (activeFilters.includes("Basic")) {
        newFilteredPayments = newFilteredPayments.filter(
          (payment) => payment.subscriptionPlan === "Basic"
        );
      }

      // Sort filters
      if (activeFilters.includes("Newest")) {
        newFilteredPayments = newFilteredPayments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (activeFilters.includes("Oldest")) {
        newFilteredPayments = newFilteredPayments.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (activeFilters.includes("Highest Amount")) {
        newFilteredPayments = newFilteredPayments.sort(
          (a, b) => b.amount - a.amount
        );
      } else if (activeFilters.includes("Lowest Amount")) {
        newFilteredPayments = newFilteredPayments.sort(
          (a, b) => a.amount - b.amount
        );
      }
    }

    // Update the filtered payments state
    setFilteredPayments(newFilteredPayments);
  }, [activeFilters, searchQuery, allPayments]);

  // CSS class for status badge
  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "succeeded":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white min-h-screen rounded-lg">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Payments</h1>
          <p className="text-gray-500 text-sm md:text-base">
            Track and manage all payment transactions
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-4 flex flex-col md:flex-row md:justify-between gap-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center justify-center rounded-lg border border-gray-200 px-4 w-full py-2"
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
            className="flex items-center bg-white border border-gray-200 rounded-lg px-3 md:px-4 py-1 md:py-2 text-sm md:text-base"
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
              placeholder="Search by name or email"
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

      {/* Payments Table with vertical scroll */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2">Loading payments...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div className="overflow-y-auto max-h-80">
                <table className="w-full min-w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                        Customer
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                        Amount
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                        Plan
                      </th>
                      <th className="text-left py-4 px-6 font-medium text-gray-600 whitespace-nowrap">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 mr-2 md:mr-3 flex items-center justify-center text-white">
                                {payment.fullname.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-sm md:text-base">
                                  {payment.fullname}
                                </div>
                                <div className="text-gray-500 text-xs md:text-sm">
                                  {payment.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm md:text-base font-medium">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${getStatusBadgeClass(
                                payment.status
                              )}`}
                            >
                              {payment.status.charAt(0).toUpperCase() +
                                payment.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                                payment.subscriptionPlan === "Premium"
                                  ? "bg-purple-100 text-purple-800"
                                  : payment.subscriptionPlan === "Standard"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {payment.subscriptionPlan}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-sm md:text-base text-gray-500">
                            {formatDate(payment.createdAt)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500"
                        >
                          No payments found matching the selected filters or
                          search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            <div className="p-3 md:p-4 border-t border-gray-200 text-gray-500 text-xs md:text-sm">
              Showing {filteredPayments.length} results
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

export default Payment;
