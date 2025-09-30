import React, { useState } from "react";


const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: "",
    quality: "",
  });
  const [imageList, setImageList] = useState([]);
  // const [resetKey, setResetKey] = useState(0);

  // handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      images: imageList, // uploaded image URLs
    };

    console.log("Product Submitted:", productData);
    // TODO: send productData to backend via axios/fetch

    // reset form after submit
    setFormData({
      name: "",
      details: "",
      price: "",
      quality: "",
    });
    setImageList([]);
    // setResetKey((prev) => prev + 1); // clear uploader
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
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Details */}
        <div>
          <label className="block font-medium">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Quality */}
        <div>
          <label className="block font-medium">Quality</label>
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
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
        <div>
          <label className="block font-medium mb-2">Upload Product Image</label>
          {/* <SquareImageUploader
            onUpload={(urls) => setImageList(urls)}
            clearKey={resetKey}
          /> */}
        </div>

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
