import React, { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const PRIMARY_COLOR_HEX = "#A7003C";

// ===============================
// 🔹 Memoized Order Card
// ===============================
const OrderCard = memo(({ order, formatBDDate }) => (
  <div
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-l-4"
    style={{ borderColor: PRIMARY_COLOR_HEX }}
  >
    <div className="flex justify-between items-center mb-3 border-b pb-2">
      <p className="text-gray-500 text-xs font-medium uppercase">
        Order ID: {order._id?.slice(-8)}
      </p>
      <p className="text-gray-800 text-sm font-medium">
        🗓 Date: {formatBDDate(order.orderDate)}
      </p>
    </div>

    <h4 className="font-semibold text-xl mb-3" style={{ color: PRIMARY_COLOR_HEX }}>
      Products Ordered
    </h4>

    <ul className="list-disc pl-5 space-y-1">
      {order.products?.map((prod, idx) => (
        <li key={idx} className="text-gray-700 text-base">
          {prod.productName}
        </li>
      ))}
    </ul>

    {order.futureOrderDate && (
      <div className="mt-4 pt-3 border-t border-dashed">
        <p className="text-sm font-semibold text-green-700 flex items-center">
          <span className="mr-2">⏳</span> Future Order Date:{" "}
          {formatBDDate(order.futureOrderDate)}
        </p>
      </div>
    )}
  </div>
));

// ===============================
// 🔹 Recommended Product Card
// ===============================
const RecommendedProductCard = memo(({ product }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition">
    <h3 className="font-bold text-lg" style={{ color: PRIMARY_COLOR_HEX }}>
      {product.productName}
    </h3>
  </div>
));

// ===============================
// 🔹 Main Component
// ===============================
const CustomerDetailsPage = memo(() => {
  const { customerID } = useParams();
  const axiosSecure = useAxiosSecure();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [recommended, setRecommended] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Format Date
  const formatBDDate = useCallback((dateString) => {
    if (!dateString) return "-";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;

    return new Date(dateString).toLocaleDateString("en-CA", {
      timeZone: "Asia/Dhaka",
    });
  }, []);

  // Fetch data
  useEffect(() => {
    let mounted = true;

    const fetchCustomerData = async () => {
      try {
        setLoading(true);

        const [customerRes, ordersRes, recommendedRes] = await Promise.all([
          axiosSecure.get(`/customers/${customerID}`),
          axiosSecure.get(`/orders/customer/${customerID}`),
          axiosSecure.get(`/products/recommended/${customerID}`),
        ]);

        if (mounted) {
          setCustomer(customerRes.data || null);
          setOrders(ordersRes.data || []);
          setRecommended(recommendedRes.data || []);
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);

        if (mounted) {
          setCustomer(null);
          setOrders([]);
          setRecommended([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCustomerData();
    return () => (mounted = false);
  }, [axiosSecure, customerID]);

  // ------------------
  // Loading
  // ------------------
  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-2xl font-extrabold" style={{ color: PRIMARY_COLOR_HEX }}>
            Loading Customer Data...
          </p>
          <div
            className="mt-4 animate-spin h-8 w-8 rounded-full border-4 border-solid 
              border-current border-r-transparent"
            style={{ borderColor: PRIMARY_COLOR_HEX }}
          ></div>
        </div>
      </div>
    );

  // ------------------
  // Customer Not Found
  // ------------------
  if (!customer)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="p-8 bg-white rounded-xl shadow-lg border-l-4 border-red-600">
          <p className="text-xl font-bold text-red-600">
            ⚠️ Customer with ID "{customerID}" not found!
          </p>
        </div>
      </div>
    );

  // ------------------
  // MAIN UI
  // ------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">

        {/* ============================
            CUSTOMER DETAILS
        ============================ */}
        <div
          className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 mb-10 border-t-8"
          style={{ borderColor: PRIMARY_COLOR_HEX }}
        >
          <h1
            className="text-3xl sm:text-4xl font-extrabold mb-3"
            style={{ color: PRIMARY_COLOR_HEX }}
          >
            {customer.customerName}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-lg text-gray-700">
            <p><strong>📞 মূল ফোন:</strong> {customer.phone}</p>
            <p><strong>📞 বিকল্প ফোন:</strong> {customer.altPhone || "N/A"}</p>
            <p><strong>💬 WhatsApp:</strong> {customer.whatsapp || "N/A"}</p>
            <p><strong>🏠 বাড়ি নম্বর:</strong> {customer.houseNumber || "N/A"}</p>
            <p><strong>🛣 রোড নম্বর:</strong> {customer.roadNumber || "N/A"}</p>
            <p><strong>🏢 ব্লক নম্বর:</strong> {customer.blockNumber || "N/A"}</p>

            <p><strong>📍 সম্পূর্ণ ঠিকানা:</strong> {customer.address || "N/A"}</p>
            <p><strong>📅 যোগদানের তারিখ:</strong> {customer.joinDate || "N/A"}</p>
          </div>
        </div>

        {/* ============================
            RECOMMENDED PRODUCTS
        ============================ */}
        <div className="mb-10">
          <h2
            className="text-2xl font-extrabold mb-5"
            style={{ color: PRIMARY_COLOR_HEX }}
          >
            ⭐ Recommended Products
          </h2>

          {recommended.length === 0 ? (
            <p className="text-gray-500 italic">No recommended products selected.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommended.map((prod, i) => (
                <RecommendedProductCard key={i} product={prod} />
              ))}
            </div>
          )}
        </div>

        {/* ============================
            ORDER HISTORY
        ============================ */}
        <div>
          <h2
            className="text-2xl font-extrabold mb-5"
            style={{ color: PRIMARY_COLOR_HEX }}
          >
            🧾 Order History
          </h2>

          {orders.length === 0 ? (
            <p className="text-gray-500 italic">No orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} formatBDDate={formatBDDate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CustomerDetailsPage;
