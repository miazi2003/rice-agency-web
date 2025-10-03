import React, { useState } from "react";
import axios from "axios";
//import SquareImageUploader from "./SquareImageUploader"; // adjust path if needed

const AddCustomerForm = () => {
  const [imageList, setImageList] = useState([]);
 // const [resetKey, setResetKey] = useState(0); // for clearing uploader after submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // if (imageList.length === 0) {
    //   alert("Please upload at least one image!");
    //   return;
    // }

    const newCustomer = {
      name: form.name.value,
      address: form.address.value,
      phone: form.phone.value,
      joinDate: form.joinDate.value,
      images: imageList, // use URLs from uploader
    };

    try {
      const res = await axios.post("http://localhost:5000/customers", newCustomer);
      console.log("✅ Customer added:", res.data);
      alert("Customer added successfully!");
      
      form.reset(); // clear form fields
      setImageList([]); // clear uploader
      //setResetKey(prev => prev + 1); // reset uploader component if needed
    } catch (error) {
      console.error("❌ Error adding customer:", error);
      alert("Failed to add customer!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter customer name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Join Date */}
        <div>
          <label className="block text-sm font-medium">Join Date</label>
          <input
            type="date"
            name="joinDate"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image Uploader */}
        {/* <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <SquareImageUploader
            onUpload={(urls) => setImageList(urls)}
            clearKey={resetKey} // resets uploader on submit
          />
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          className="btn w-full bg-purple-700 text-white hover:bg-purple-300 hover:text-black"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
