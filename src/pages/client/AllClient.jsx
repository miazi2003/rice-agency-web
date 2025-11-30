import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Assuming you are using react-router-dom
import useAxiosSecure from "../../hook/UseAxiosSecure";
import add_customer from "../../assets/user-app.png"

import Swal from "sweetalert2";
// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const CustomersPage = () => {
  const axiosSecure = useAxiosSecure();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axiosSecure.get("/customers");
        setCustomers(res.data || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [axiosSecure]);



const handleDelete = async (customerID) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/customers/${customerID}`);
        console.log(res.data)
        // Remove from UI
        setCustomers((prev) => prev.filter((c) => c.customerID !== customerID));

        Swal.fire({
          title: "Deleted!",
          text: "Customer deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete customer.",
          icon: "error",
        });
      }
    }
  });
};



  // --- Loading State (Branded) ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold animate-pulse" style={{ color: PRIMARY_COLOR }}>
          Loading customer data... 👤
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium text-xl">{error}</p>
      </div>
    );
  }

  // --- Main Customer Grid ---
  return (
    <div className="p-6 md:p-8">
     <div className="w-full flex justify-between">
       <h1 className="text-3xl font-extrabold mb-8" style={{ color: PRIMARY_COLOR }}>
        All Customers 👥
      </h1>

      <div className="form_button">
       <Link to={"/addCustomer"}>
        <button title="Add New Customer" className="btn p-4 border-0 uppercase" style={{ backgroundColor: SECONDARY_COLOR }}>
          <img src={add_customer} className="w-5 h-5" alt=""  />
        </button>
       </Link>
      </div>

     </div>

      {customers.length === 0 ? (
        // --- Empty State (Branded) ---
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white p-10 rounded-xl shadow-lg">
            <p className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                No Customers Found
            </p>
            <p className="text-gray-600 mb-6">
                Ready to expand your reach? Add your first customer!
            </p>
            <Link
                to="/addCustomer" // Assuming this is the route for adding a customer
                className="mt-4 px-8 py-3 text-white rounded-full font-bold transition shadow-md hover:shadow-lg hover:scale-[1.03] transform"
                style={{ backgroundColor: SECONDARY_COLOR }}
            >
                ➕ Add New Customer
            </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {customers.map((customer) => (
            <div
              key={customer.customerID || customer.id}
              className="bg-white relative rounded-2xl shadow-xl border-t-4 p-6 transition duration-300 transform hover:scale-[1.003] hover:shadow-2xl"
              style={{ borderColor: SECONDARY_COLOR + '60' }} // Subtle border accent
            >
              <button onClick={()=>{handleDelete(customer.customerID)}} className="px-2 rounded-full bg-red-600 text-white absolute -top-2 right-0" style={{ backgroundColor: SECONDARY_COLOR }}>
                X
              </button>
              {/* Customer Info */}
           
               <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                {customer.customerName || "Unknown Customer"}
              </h2>

            
            
              
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-semibold">ID:</span> {customer.customerID || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">📞 Phone:</span> {customer.phone || 'N/A'}
                </p>
                <p className="line-clamp-2">
                  <span className="font-semibold">📍 Address:</span> {customer.address || "No address provided"}
                </p>
                <p className="text-xs italic pt-2">
                    Joined: {new Date(customer.joinDate).toLocaleDateString()}
                </p>
              </div>

              {/* View Button - Secondary Color */}
              <Link
                to={`/customer/${customer.customerID}`}
                className="block mt-6"
              >
                <button 
                  className="w-full text-white py-2.5 rounded-xl font-bold transition hover:brightness-110 shadow-md"
                  style={{ backgroundColor: SECONDARY_COLOR }}
                >
                  View Order History
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;