import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const axiosSecure = useAxiosSecure();

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
    <>
    
    <div className=" sm:px-4 ">
      {/* Card container */}
      <div className="bg-white rounded-2xl shadow-lg p-4  border border-gray-200 lg:w-full ">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">
          Notifications
        </h2>

        {/* Search inputs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="🔍 Search by customer name..."
            className="input input-bordered w-full sm:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered w-full sm:w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>
    </div>
    
       {/* Table wrapper for horizontal scroll */}
      <div className="overflow-x-auto w-full md:p-8 px-0 py-2 rounded-2xl">
        <h1 className="text-center p-4 bg-black text-white">Upcoming Orders</h1>
 {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((n, index) => (
                    <div
                      key={n._id}
                      className={`hover:bg-purple-50 transition ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } flex lg:flex-row flex-col w-full h-auto justify-around p-4 border-b`}
                    >
 
                      <div className="flex lg:flex-row flex-col gap-4 md:w-1/2 w-full p-2">
                        <span className="">{n.customerID}</span>
                        <p className="font-bold ">{n.customerName}</p>
                      </div>

                      <div className="flex lg:flex-row flex-col gap-4 lg:w-1/2 w-full p-2">
                         <p className="">{n.message}</p>
                      <p className="">{n.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      ❌ No results found
                    </td>
                  </tr>
                )}


</div>
    
    </>




  );
};

export default NotificationsTable;
