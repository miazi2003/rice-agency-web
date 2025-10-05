
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const CustomerDetailsPage = () => {
  const { customerID } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
  // Helper to format date in Bangladesh timezone
  const formatBDDate = (dateString) => {
    if (!dateString) return "-";
    // If dateString is already YYYY-MM-DD, return it directly
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Fetch single customer by customerID
        const customerRes = await axiosSecure.get(`http://localhost:5000/customers/${customerID}`);
        setCustomer(customerRes.data);

        // Fetch orders for this customer (backend should filter by customerID)
        const ordersRes = await axiosSecure.get(`http://localhost:5000/orders/customer/${customerID}`);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerID]);

  if (loading)
    return <div className="p-10 text-center text-violet-700 font-bold">Loading...</div>;

  if (!customer)
    return <div className="p-10 text-center text-red-600">Customer not found!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Customer Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={customer.images?.[0] || "https://via.placeholder.com/150"}
          alt={customer.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-violet-500"
        />
        <div>
          <h2 className="text-2xl font-semibold text-violet-700">{customer.name}</h2>
          <p className="text-gray-600">📍 Address: {customer.address}</p>
          <p className="text-gray-600">📞 Phone: {customer.mobile}</p>
          <p className="text-gray-600">🗓 Join Date: {formatBDDate(customer.joinDate)}</p>
        </div>
      </div>

      {/* Customer Orders */}
      <h3 className="text-2xl font-bold text-violet-700 mb-4">All Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found for this customer.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 border-t-4 border-violet-500"
            >
                

                {order.futureOrderDate && (
                    <p className="text-gray-500 text-sm">
                      OrderDate :  {formatBDDate(order.orderDate)}
                    </p>
                   
                  )}
              {order.products?.map((prod, idx) => (
                <div key={idx} className="mb-2">
                  <h4 className="font-semibold text-lg text-gray-800">{prod.productName}</h4>
                  {/* <p className="text-gray-500 text-sm mt-1">
                    🗓 Ordered on: {formatBDDate(prod.orderDate)}
                  </p>
                  {prod.futureOrderDate && (
                    <p className="text-gray-500 text-sm">
                      ⏳ Future Order: {formatBDDate(prod.futureOrderDate)}
                    </p>
                  )} */}
                </div>
              ))}
              {order.images?.[0] && (
                <img
                  src={order.images[0]}
                  alt="product"
                  className="w-full h-40 object-cover rounded-lg mt-2"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsPage;
