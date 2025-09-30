import React from "react";

const CustomersPage = () => {
  // Example customer data (replace with API call)
  const customers = [
    { id: 1, name: "John Doe", address: "123 Main St, NY", image: "https://via.placeholder.com/150?text=John" },
    { id: 2, name: "Jane Smith", address: "456 Elm St, CA", image: "https://via.placeholder.com/150?text=Jane" },
    { id: 3, name: "Michael Brown", address: "789 Oak St, TX", image: "https://via.placeholder.com/150?text=Michael" },
    { id: 4, name: "Emily Johnson", address: "321 Pine St, FL", image: "https://via.placeholder.com/150?text=Emily" },
    { id: 5, name: "David Wilson", address: "654 Maple St, IL", image: "https://via.placeholder.com/150?text=David" },
    { id: 6, name: "Olivia Davis", address: "987 Cedar St, WA", image: "https://via.placeholder.com/150?text=Olivia" },
    { id: 7, name: "Daniel Lee", address: "135 Spruce St, CO", image: "https://via.placeholder.com/150?text=Daniel" },
    { id: 8, name: "Sophia Martinez", address: "246 Birch St, GA", image: "https://via.placeholder.com/150?text=Sophia" },
    { id: 9, name: "James Anderson", address: "357 Walnut St, NV", image: "https://via.placeholder.com/150?text=James" },
    { id: 10, name: "Mia Thomas", address: "468 Chestnut St, OH", image: "https://via.placeholder.com/150?text=Mia" },
    { id: 11, name: "William Jackson", address: "579 Poplar St, AZ", image: "https://via.placeholder.com/150?text=William" },
    { id: 12, name: "Ava White", address: "680 Fir St, MI", image: "https://via.placeholder.com/150?text=Ava" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">All Customers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-102 overflow-hidden"
          >
            {/* Customer Image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Customer Info */}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">{customer.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{customer.address}</p>

              {/* View Button */}
              <div className="mt-4">
                <button className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
