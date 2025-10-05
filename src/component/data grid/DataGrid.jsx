import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";


const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const axiosSecure = useAxiosSecure()

  // Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosSecure.get("http://localhost:5000/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    const matchesName = n.customerName.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = searchDate ? n.date === searchDate : true;
    return matchesName && matchesDate;
  });

  return (
    <div className="mx-auto">
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Notifications</h2>

        {/* Search inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by customer name..."
            className="input input-bordered w-full md:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered w-full md:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full">
            <thead className="bg-[#7F22FE] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Customer ID</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((n, index) => (
                  <tr
                    key={n._id}
                    className={`hover:bg-purple-50 transition ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3">{n.customerName}</td>
                    <td className="px-4 py-3">{n.customerID}</td>
                    <td className="px-4 py-3">{n.message}</td>
                    <td className="px-4 py-3">{n.date}</td>
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

export default NotificationsTable;
