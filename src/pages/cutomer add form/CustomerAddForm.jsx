import React, { useState } from "react";
// import SquareImageUploader from "../components/SquareImageUploader"; // update path accordingly

const CustomerAddForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [imageList, setImageList] = useState([]);
//   const [resetKey, setResetKey] = useState(Date.now()); // for resetting uploader if needed

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      name,
      address,
      phone,
      image: imageList[0] || "", // just take the first uploaded image
    };

    console.log("Customer Data:", newCustomer);
    // TODO: send newCustomer to backend API

    // Reset form
    setName("");
    setAddress("");
    setPhone("");
    setImageList([]);
    // setResetKey(Date.now());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-violet-700 mb-6 text-center">
          Add New Customer
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter customer name"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter address"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter phone number"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Profile Image</label>
          {/* <SquareImageUploader
            onUpload={(urls) => setImageList(urls)}
            clearKey={resetKey}
          /> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerAddForm;
