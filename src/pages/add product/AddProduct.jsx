import React from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import SquareImageUploader from "../../component/Image Upload/SquareImageUpload";
 // uncomment if using uploader

const AddProductForm = () => {
  // Optional: for image uploader reset
   const [resetKey, setResetKey] = React.useState(0);
  const [imageList, setImageList] = React.useState([]);
  const axiosSecure = useAxiosSecure()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const productData = {
      name: form.name.value,
      category: form.category.value,
      details: form.details.value,
      price: parseFloat(form.price.value),
      quality: form.quality.value,
      images: imageList, // array of uploaded images
    };

    try {
      const res = await axiosSecure.post("http://localhost:5000/products", productData);
      console.log("✅ Product Added:", res.data);
      alert("Product added successfully!");
      form.reset();
      setImageList([]);
      setResetKey(prev => prev + 1); // if using uploader
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Rice, Sugar, Flour, Oil, etc."
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className="block font-medium">Details</label>
          <textarea
            name="details"
            rows="3"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price (BDT)</label>
          <input
            type="number"
            name="price"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Quality */}
        <div>
          <label className="block font-medium">Quality</label>
          <select
            name="quality"
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Quality</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Image Upload */}
        { <div>
          <label className="block font-medium mb-2">Upload Product Image</label>
          <SquareImageUploader
            onUpload={(urls) => setImageList(urls)}
            clearKey={resetKey}
          />
        </div> }

        {/* Submit */}
        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-300 hover:text-black duration-200 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
