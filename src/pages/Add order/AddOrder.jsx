import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const AddOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  const today = new Date().toISOString().split("T")[0];

  // ✅ Fetch customers and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, productRes] = await Promise.all([
          axiosSecure.get("/customers"),
          axiosSecure.get("/products"),
        ]);
        setCustomers(customerRes.data || []);
        setProducts(productRes.data || []);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosSecure]);

  // ✅ Add product handler (memoized)
  const handleAddProduct = useCallback(() => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.productID === parseInt(selectedProduct));
    if (!product) return;

    // Prevent duplicate additions
    setAddedProducts((prev) =>
      prev.some((p) => p.productId === product.productID)
        ? prev
        : [...prev, { productId: product.productID, productName: product.name }]
    );

    setSelectedProduct("");
  }, [selectedProduct, products]);

  // ✅ Remove product handler
  const handleRemoveProduct = useCallback(
    (id) => {
      setAddedProducts((prev) => prev.filter((p) => p.productId !== id));
    },
    [setAddedProducts]
  );

  // ✅ Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || addedProducts.length === 0) {
      alert("⚠️ Please select a customer and at least one product.");
      return;
    }

    const orderData = {
      customerID: selectedCustomer.customerID,
      customerName: selectedCustomer.name,
      address: selectedCustomer.address,
      mobile: selectedCustomer.phone,
      joinDate: selectedCustomer.joinDate,
      products: addedProducts,
      orderDate: today,
      futureOrderDate: e.target.futureOrderDate.value || null,
    };

    try {
      await axiosSecure.post("/orders", orderData);
      await axiosSecure.put(`/customers/lastOrder/${selectedCustomer.customerID}`, {
        lastOrder: addedProducts.map((p) => ({ ...p, orderDate: today })),
      });

      alert("✅ Order added successfully!");
      e.target.reset();
      setSelectedCustomer(null);
      setAddedProducts([]);
    } catch (error) {
      console.error("❌ Failed to add order:", error);
      alert("❌ Failed to add order. Please try again.");
    }
  };

  const inputClass = "w-full border rounded-xl p-3 bg-white focus:outline-none focus:ring-2 transition shadow-inner";
  const labelClass = "block font-bold mb-1 text-gray-800 text-sm";


  return (
    <div className="max-w-lg mx-auto bg-white shadow-2xl p-8 rounded-2xl border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
      
      {/* Title - Primary Color */}
      <h2 
        className="text-3xl font-extrabold mb-8 text-center" 
        style={{ color: PRIMARY_COLOR }}
      >
        Add New Order 📝
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Customer Dropdown */}
        <div>
          <label className={labelClass}>Select Customer</label>
          <select
            className={inputClass}
            style={{ 
                borderColor: PRIMARY_COLOR + '40', // Primary color hint on border
                '--tw-ring-color': SECONDARY_COLOR // Secondary color for ring
            }}
            required
            value={selectedCustomer?.customerID || ""}
            onChange={(e) => {
              const customer = customers.find((c) => c.customerID === parseInt(e.target.value));
              setSelectedCustomer(customer || null);
            }}
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((c) => (
              <option key={c._id} value={c.customerID}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Order Date (Read-only) */}
        <div>
          <label className={labelClass}>Order Date</label>
          <input
            type="text"
            value={today}
            readOnly
            // Gray background for read-only fields
            className="w-full border rounded-xl p-3 bg-gray-100 text-gray-600 cursor-not-allowed shadow-none"
            style={{ borderColor: PRIMARY_COLOR + '10' }} 
          />
        </div>

        {/* Add Products */}
        <div>
          <label className={labelClass}>Select Product</label>
          <div className="flex gap-3">
            <select
              className={inputClass + " flex-1"}
              style={{ 
                borderColor: PRIMARY_COLOR + '40', 
                '--tw-ring-color': SECONDARY_COLOR 
              }}
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">-- Choose Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p.productID}>
                  {p.name}
                </option>
              ))}
            </select>
            
            {/* Add Button - Primary Color */}
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-5 rounded-xl font-bold hover:brightness-110 transition shadow-md"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Add
            </button>
          </div>

          {/* Added Products List */}
          {addedProducts.length > 0 && (
            <div className="mt-4 p-3 rounded-xl max-h-40 overflow-y-auto shadow-inner" style={{ backgroundColor: '#F9F9F9', border: `1px solid ${PRIMARY_COLOR}20` }}>
              <ul className="divide-y divide-gray-200">
                {addedProducts.map((p) => (
                  <li
                    key={p.productId}
                    className="flex justify-between items-center py-2 text-gray-800 text-sm"
                  >
                    <span className="font-medium">{p.productName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.productId)}
                      className="text-red-500 font-semibold text-xs hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Future Order Date */}
        <div>
          <label className={labelClass}>Future Order Date (Optional)</label>
          <input
            type="date"
            name="futureOrderDate"
            className={inputClass}
            style={{ 
                borderColor: PRIMARY_COLOR + '40', 
                '--tw-ring-color': SECONDARY_COLOR 
            }}
          />
        </div>

        {/* Submit Button - Secondary Color */}
        <button
          type="submit"
          className="w-full text-white py-3 px-4 rounded-xl font-extrabold text-lg transition shadow-xl hover:brightness-110 mt-8"
          style={{ backgroundColor: SECONDARY_COLOR }}
        >
          Submit Order 🚀
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;