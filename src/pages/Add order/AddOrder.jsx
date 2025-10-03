import React, { useEffect, useState } from "react";
import axios from "axios";

const AddOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers from customerCollection
        const customerRes = await axios.get("http://localhost:5000/customers");
        setCustomers(customerRes.data);

        const productRes = await axios.get("http://localhost:5000/products");
        setProducts(productRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = () => {
    if (!selectedProduct) return;

    const product = products.find((p) => p.productID === parseInt(selectedProduct));
    if (!product) return;

    // Avoid duplicates
    if (addedProducts.some((p) => p.productId === product.productID)) return;

    setAddedProducts([...addedProducts, { productId: product.productID, productName: product.name }]);
    setSelectedProduct("");
  };

  const handleRemoveProduct = (id) => {
    setAddedProducts(addedProducts.filter((p) => p.productId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || addedProducts.length === 0) {
      alert("Select customer and at least one product.");
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
      images: selectedCustomer.images || [],
    };

    try {
      // Insert into orders collection
      await axios.post("http://localhost:5000/orders", orderData);

      // Update lastOrder in customerCollection
      await axios.put(`http://localhost:5000/customers/lastOrder/${selectedCustomer.customerID}`, {
        lastOrder: addedProducts.map((p) => ({ ...p, orderDate: today })),
      });

      alert("✅ Order added and lastOrder updated!");
      e.target.reset();
      setSelectedCustomer(null);
      setAddedProducts([]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add order.");
    }
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
            required
            value={selectedCustomer?.customerID || ""}
            onChange={(e) => {
              const customer = customers.find((c) => c.customerID === parseInt(e.target.value));
              setSelectedCustomer(customer);
            }}
          >
            <option value="" disabled>-- Choose Customer --</option>
            {customers.map((c) => (
              <option key={c._id} value={c.customerID}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Order Date (Today) */}
        <div>
          <label className="block font-medium mb-1">Order Date (Today)</label>
          <input
            type="text"
            value={today}
            readOnly
            className="w-full border rounded-lg p-2 bg-gray-100"
          />
        </div>

        {/* Add Products */}
        <div>
          <label className="block font-medium mb-1">Select Product</label>
          <div className="flex gap-2">
            <select
              className="flex-1 border rounded-lg p-2"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="" disabled>-- Choose Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p.productID}>{p.name}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-500 px-3 rounded-lg text-white hover:bg-green-600"
            >
              Add
            </button>
          </div>

          {/* Display Added Products */}
          {addedProducts.length > 0 && (
            <ul className="mt-2 border p-2 rounded-lg bg-gray-50 max-h-32 overflow-auto">
              {addedProducts.map((p) => (
                <li key={p.productId} className="flex justify-between items-center py-1">
                  <span>{p.productName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(p.productId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Future Order Date */}
        <div>
          <label className="block font-medium mb-1">Future Order Date</label>
          <input type="date" name="futureOrderDate" className="w-full border rounded-lg p-2" />
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
