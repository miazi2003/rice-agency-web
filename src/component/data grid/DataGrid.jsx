import React, { useState } from "react";

const EmployeesTable = () => {
  // Example array of data
  const employeesData = [
    { id: 1, name: "Cy Ganderton", job: "Quality Control Specialist", color: "Blue", date: "2025-09-20" },
    { id: 2, name: "Hart Hagerty", job: "Desktop Support Technician", color: "Purple", date: "2025-09-22" },
    { id: 3, name: "Brice Swyre", job: "Tax Accountant", color: "Red", date: "2025-09-25" },
    { id: 4, name: "Jane Doe", job: "Software Engineer", color: "Green", date: "2025-09-28" },
  ];

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Filter logic
  const filteredEmployees = employeesData.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = searchDate ? emp.date === searchDate : true;
    return matchesName && matchesDate;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Upcoming orders</h2>

        {/* Search inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            className="input input-bordered w-full md:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered w-full md:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-green-400"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Job</th>
                <th className="px-4 py-2">Favorite Color</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className={`hover:bg-green-50 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-600">{emp.id}</td>
                    <td className="px-4 py-3">{emp.name}</td>
                    <td className="px-4 py-3">{emp.job}</td>
                    <td className="px-4 py-3">{emp.color}</td>
                    <td className="px-4 py-3">{emp.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    ❌ No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesTable;
