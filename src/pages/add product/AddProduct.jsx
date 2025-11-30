import React, { useState } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const AddProductForm = React.memo(() => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);

  // Common styles for inputs and labels
  const inputClass = "w-full border rounded-xl p-3 bg-white shadow-inner focus:outline-none focus:ring-2 transition";
  const labelClass = "block font-bold mb-1 text-gray-800 text-sm";
  
  // Custom focus style derived from Secondary Color
  const focusStyle = {
    '--tw-ring-color': SECONDARY_COLOR,
    borderColor: PRIMARY_COLOR + '40',
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const form = e.target;

  const productData = {
    name: form.name.value.trim(),
    category: form.category.value.trim(),
    details: form.details.value.trim(),
    price: parseFloat(form.price.value),
    quality: form.quality.value,
  };

  try {
    const res = await axiosSecure.post("/products", productData);
    console.log("✅ Product Added:", res.data);

    // SUCCESS ALERT
    Swal.fire({
      title: "পণ্য যুক্ত হয়েছে",
      text: "আপনার পণ্য যুক্ত হয়েছে",
      icon: "success",
      draggable: true,
      confirmButtonColor: "#3085d6",
    });

    form.reset();

  } catch (error) {
    console.error("❌ Error adding product:", error);

    // ERROR ALERT
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "আপনার পণ্য যুক্ত হয়নি, আবার চেষ্টা করুন",
      confirmButtonColor: "#d33",
    });

  } finally {
    setIsLoading(false);
  }
};

  return (
    <div 
      className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-2xl border-t-4"
      style={{ borderColor: PRIMARY_COLOR }}
    >
      {/* Title - Primary Color */}
      <h2 
        className="text-3xl font-extrabold mb-8 text-center"
        style={{ color: PRIMARY_COLOR }}
      >
        Add New Product 🛍️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Product Name */}
        <div>
          <label className={labelClass}>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className={inputClass}
            style={focusStyle}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelClass}>Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Rice, Sugar, Oil"
            className={inputClass}
            style={focusStyle}
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className={labelClass}>Details</label>
          <textarea
            name="details"
            rows="3"
            placeholder="Enter product details..."
            className={inputClass}
            style={focusStyle}
            required
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className={labelClass}>Price (BDT)</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className={inputClass}
            style={focusStyle}
            required
          />
        </div>

        {/* Quality */}
        <div>
          <label className={labelClass}>Quality</label>
          <select
            name="quality"
            className={inputClass}
            style={focusStyle}
            required
          >
            <option value="">Select Quality</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Submit Button - Secondary Color */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white py-3 px-4 rounded-xl font-extrabold text-lg transition shadow-xl mt-8 duration-300 
          hover:brightness-110 active:scale-[0.98] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          style={{ backgroundColor: SECONDARY_COLOR }}
        >
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
});

export default AddProductForm;