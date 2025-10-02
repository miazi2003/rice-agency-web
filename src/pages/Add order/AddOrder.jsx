import React, { useState } from "react";

const AddOrderForm = () => {
  // Demo customers
  const customers = [
    { id: 1, name: "Yeasin Miazi", mobile: "017XXXXXXXX", lastOrder: "2025-09-20" },
    { id: 2, name: "Tanvina Khandokar", mobile: "018XXXXXXXX", lastOrder: "2025-09-15" },
    { id: 3, name: "Rahim Uddin", mobile: "016XXXXXXXX", lastOrder: "2025-08-28" },
  ];

  // Demo products
  const products = [
    { id: 101, name: "Laptop" },
    { id: 102, name: "Smartphone" },
    { id: 103, name: "Headphone" },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [futureOrderDate, setFutureOrderDate] = useState("");

  const handleCustomerChange = (e) => {
    const customerId = parseInt(e.target.value);
    const customer = customers.find((c) => c.id === customerId);
    setSelectedCustomer(customer);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    const orderData = {
      customerId: selectedCustomer?.id,
      customerName: selectedCustomer?.name,
      mobile: selectedCustomer?.mobile,
      lastOrder: selectedCustomer?.lastOrder,
      productId: selectedProduct,
      orderDate: today, // Auto-set current date
      futureOrderDate: futureOrderDate || null, // User-set future date
    };

    console.log("Order Submitted:", orderData);
    alert(`✅ Order Added on ${today}! Check console for details.`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Customer Dropdown */}
        <div>
          <label className="block font-medium mb-1">Select Customer</label>
          <select
            className="w-full border rounded-lg p-2"
            onChange={handleCustomerChange}
            defaultValue=""
            required
          >
            <option value="" disabled>
              -- Choose Customer --
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Auto-filled Customer Info */}
        {selectedCustomer && (
          <>
            <div>
              <label className="block font-medium mb-1">Mobile</label>
              <input
                type="text"
                value={selectedCustomer.mobile}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Last Order Date</label>
              <input
                type="text"
                value={selectedCustomer.lastOrder}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>
          </>
        )}

        {/* Product Dropdown */}
        <div>
          <label className="block font-medium mb-1">Select Product</label>
          <select
            className="w-full border rounded-lg p-2"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Choose Product --
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Current Date (auto-filled, readonly) */}
        <div>
          <label className="block font-medium mb-1">Order Date (Today)</label>
          <input
            type="text"
            value={new Date().toISOString().split("T")[0]}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Future Order Date (manual input) */}
        <div>
          <label className="block font-medium mb-1">Future Order Date</label>
          <input
            type="date"
            value={futureOrderDate}
            onChange={(e) => setFutureOrderDate(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#7F22FE] hover:bg-purple-200 text-white hover:text-black py-2 px-4 rounded-lg font-semibold"
        >
          Add Order
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;
