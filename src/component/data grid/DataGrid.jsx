import React, { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

// Helper function to safely slice the ID
const safeSliceID = (id) => (typeof id === 'string' ? id.slice(-6) : id || 'N/A');

// ✅ Memoized row component to prevent unnecessary re-renders
const NotificationRow = React.memo(({ n, index }) => (
  <div
    // Updated styling for modern UI and dual-color theme
    className={`hover:shadow-lg transition duration-200 border-b border-gray-100 ${
      index % 2 === 0 ? "bg-white" : "bg-gray-50"
    } flex flex-col lg:flex-row w-full h-auto p-4`}
    style={{ borderLeft: `4px solid ${SECONDARY_COLOR}` }} // Secondary color side accent
  >
    {/* Customer Info Column - 1/3 Width */}
    <div className="flex flex-col sm:flex-row gap-4 lg:w-1/3 w-full p-2 items-start lg:items-center">
      {/* FIX: Use safeSliceID for robustness */}
      <span className="text-gray-500 text-sm font-mono tracking-wider">
        ID: {safeSliceID(n.customerID)}
      </span>
      <p className="font-bold text-gray-800 text-lg">{n.customerName}</p>
    </div>

    {/* Notification Details Column - 2/3 Width */}
    <div className="flex flex-col gap-2 lg:w-2/3 w-full p-2 mt-2 lg:mt-0">
      <p className="text-gray-700">{n.message}</p>
      <p className="text-sm text-gray-500 self-end lg:self-start">
        <span className="font-semibold text-gray-600 mr-1">Date:</span>
        {/* Secondary color accent for date */}
        <span style={{ color: SECONDARY_COLOR, fontWeight: 600 }}>{n.date}</span>
      </p>
    </div>
  </div>
));

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch once on mount
  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const res = await axiosSecure.get("/notifications");
        if (isMounted) setNotifications(res.data || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    return () => (isMounted = false);
  }, [axiosSecure]);

  // ✅ Use useMemo to avoid recalculating filters unnecessarily
  const filteredNotifications = useMemo(() => {
    const lowerSearch = searchName.toLowerCase();
    return notifications.filter((n) => {
      const matchesName = n.customerName.toLowerCase().includes(lowerSearch);
      const matchesDate = searchDate ? n.date === searchDate : true;
      return matchesName && matchesDate;
    });
  }, [notifications, searchName, searchDate]);

  return (
    // Use min-h-screen and padding for a better overall page layout
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header and Search Filters Container */}
        <div 
          className="bg-white rounded-xl shadow-xl p-6 mb-8 border-t-4" 
          style={{ borderColor: PRIMARY_COLOR }} // Primary color accent border
        >
          {/* Main Heading */}
          <h2 
            className="text-2xl sm:text-3xl font-extrabold mb-5" 
            style={{ color: PRIMARY_COLOR }} // Primary color heading
          >
            <span className="mr-2">🔔</span> Customer Notifications
          </h2>

          {/* ✅ Controlled inputs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Search by customer name..."
              // MODIFICATION: Added placeholder-gray-500 class for visibility
              className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-offset-2 placeholder-gray-500" 
              // Secondary color for focus ring
              style={{ "--tw-ring-color": SECONDARY_COLOR }} 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="date"
              // MODIFICATION: Added placeholder-gray-500 class for visibility (though date inputs show value, this is good practice)
              className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:ring-2 focus:ring-offset-2 text-gray-700 placeholder-gray-500"
              // Secondary color for focus ring
              style={{ "--tw-ring-color": SECONDARY_COLOR }}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>

        {/* Table section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-6">
          {/* Table Header - Uses the Primary Brand Color */}
          <div 
            className="p-4 font-bold text-white text-lg flex flex-col lg:flex-row" 
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <div className="lg:w-1/3 p-2">Customer Info</div>
            <div className="lg:w-2/3 p-2">Message & Date</div>
          </div>
          
          {/* Notification Rows */}
          <div className="overflow-x-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n, index) => (
                <NotificationRow key={n._id || index} n={n} index={index} />
              ))
            ) : (
              <div className="text-center py-10 text-xl text-gray-600 font-medium">
                ✅ No notifications match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Export wrapped with React.memo
export default React.memo(NotificationsTable);