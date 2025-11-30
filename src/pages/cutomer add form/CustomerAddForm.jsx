import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../hook/UseAxiosSecure";
import Swal from "sweetalert2";

// Brand colors
const PRIMARY_COLOR = "#A7003C"; // Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const AddCustomerForm = () => {
  const axiosSecure = useAxiosSecure();

  // form loading / error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // products for dropdown
  const [products, setProducts] = useState([]);

  // Option C states:
  // selectedProducts => array of productIDs (numbers) (will be saved as IDs)
  const [selectedProducts, setSelectedProducts] = useState([]);
  // recommendedProducts => array of objects { productId, productName }
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // UI helpers
  const [selectedProductId, setSelectedProductId] = useState("");

  const inputClass =
    "w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 outline-none transition";
  const labelClass = "block text-sm font-bold text-gray-700 mb-1";

  const inputFocusStyle = {
    "--tw-ring-color": SECONDARY_COLOR,
    borderColor: PRIMARY_COLOR + "40",
  };

  // fetch products once
  useEffect(() => {
    let mounted = true;
    axiosSecure
      .get("/products")
      .then((res) => {
        if (mounted) setProducts(res.data || []);
      })
      .catch((err) => {
        console.error("Product Load Error:", err);
      });
    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

  // Add product (single-select + Add button) — keeps both arrays in sync
  const handleAddProduct = useCallback(() => {
    if (!selectedProductId) return;

    const product = products.find(
      (p) => p.productID === parseInt(selectedProductId, 10)
    );
    if (!product) return;

    // Prevent duplicates by productID
    setSelectedProducts((prevIds) => {
      if (prevIds.includes(product.productID)) return prevIds;
      return [...prevIds, product.productID];
    });

    setRecommendedProducts((prevObjs) => {
      if (prevObjs.some((o) => o.productId === product.productID)) return prevObjs;
      return [...prevObjs, { productId: product.productID, productName: product.name }];
    });

    // reset dropdown
    setSelectedProductId("");
  }, [selectedProductId, products]);

  // Remove product (keeps both arrays in sync)
  const handleRemoveProduct = useCallback((productId) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    setRecommendedProducts((prev) => prev.filter((p) => p.productId !== productId));
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const form = e.target;

  try {
    // Get all existing customers to compute next customerID
    const { data: existingCustomers } = await axiosSecure.get("/customers");

    let nextId = 1;
    if (Array.isArray(existingCustomers) && existingCustomers.length > 0) {
      const maxId = Math.max(
        ...existingCustomers.map((c) => c.customerID || 0)
      );
      nextId = maxId + 1;
    }

    // Build payload (Option C)
    const newCustomer = {
      customerID: nextId,
      customerName: form.name.value.trim(),
      phone: form.phone.value.trim(),
      altPhone: form.altPhone.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      houseNumber: form.houseNumber.value.trim(),
      roadNumber: form.roadNumber.value.trim(),
      blockNumber: form.blockNumber.value.trim(),
      address: form.address.value.trim(),
      joinDate: form.joinDate.value,

      selectedProducts, // array of IDs
      recommendedProducts, // array of objects
    };

    // POST to backend
    const res = await axiosSecure.post("/customers", newCustomer);
    console.log("Customer added:", res.data);

    // ✅ SUCCESS SWEET ALERT
    Swal.fire({
      title: "Customer Added!",
      text: `গ্রাহক সফলভাবে যুক্ত হয়েছে! গ্রাহক আইডি: ${nextId}`,
      icon: "success",
      draggable: true,
      confirmButtonColor: "#3085d6",
    });

    // reset form + states
    form.reset();
    setSelectedProducts([]);
    setRecommendedProducts([]);
    setSelectedProductId("");

  } catch (err) {
    console.error("Add customer error:", err);

    // Set local error
    setError("গ্রাহক যুক্ত করতে ব্যর্থ হয়েছে, আবার চেষ্টা করুন।");

    // ❌ ERROR SWEET ALERT
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "গ্রাহক যুক্ত করতে সমস্যা হয়েছে!",
      footer: '<a href="#">Why do I have this issue?</a>',
      confirmButtonColor: "#d33",
    });

  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border-t-4"
      style={{ borderColor: PRIMARY_COLOR }}
    >
      <h2
        className="text-3xl font-extrabold mb-8 text-center"
        style={{ color: PRIMARY_COLOR }}
      >
        নতুন গ্রাহক যোগ করুন 🧑‍🤝‍🧑
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl text-center mb-4">
          <p className="font-semibold text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* নাম */}
          <div>
            <label className={labelClass}>নাম</label>
            <input
              type="text"
              name="name"
              placeholder="গ্রাহকের নাম লিখুন"
              className={inputClass}
              style={inputFocusStyle}
              required
            />
          </div>

          {/* ফোন নাম্বার */}
          <div>
            <label className={labelClass}>ফোন নাম্বার</label>
            <input
              type="tel"
              name="phone"
              placeholder="০১৭xxxxxxxx"
              className={inputClass}
              style={inputFocusStyle}
              required
            />
          </div>

          {/* বিকল্প নাম্বার */}
          <div>
            <label className={labelClass}>বিকল্প নাম্বার</label>
            <input
              type="tel"
              name="altPhone"
              placeholder="বিকল্প ফোন নাম্বার লিখুন"
              className={inputClass}
              style={inputFocusStyle}
            />
          </div>

          {/* Whatsapp নাম্বার */}
          <div>
            <label className={labelClass}>Whatsapp নাম্বার</label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="Whatsapp নাম্বার লিখুন"
              className={inputClass}
              style={inputFocusStyle}
            />
          </div>

          {/* বাড়ি নাম্বার */}
          <div>
            <label className={labelClass}>বাড়ি নাম্বার</label>
            <input
              type="text"
              name="houseNumber"
              placeholder="বাড়ি নাম্বার লিখুন"
              className={inputClass}
              style={inputFocusStyle}
            />
          </div>

          {/* রোড নাম্বার */}
          <div>
            <label className={labelClass}>রোড নাম্বার</label>
            <input
              type="text"
              name="roadNumber"
              placeholder="রোড নাম্বার লিখুন"
              className={inputClass}
              style={inputFocusStyle}
            />
          </div>

          {/* ব্লক নাম্বার */}
          <div>
            <label className={labelClass}>ব্লক নাম্বার</label>
            <input
              type="text"
              name="blockNumber"
              placeholder="ব্লক নাম্বার লিখুন"
              className={inputClass}
              style={inputFocusStyle}
            />
          </div>
        </div>

        {/* বিস্তারিত ঠিকানা */}
        <div>
          <label className={labelClass}>বিস্তারিত ঠিকানা</label>
          <textarea
            name="address"
            placeholder="সম্পূর্ণ ঠিকানা লিখুন"
            className={`${inputClass} resize-none`}
            style={inputFocusStyle}
            rows="3"
            required
          ></textarea>
        </div>

        {/* যোগদানের তারিখ */}
        <div>
          <label className={labelClass}>যোগদানের তারিখ</label>
          <input
            type="date"
            name="joinDate"
            className={inputClass}
            style={inputFocusStyle}
            required
          />
        </div>

        {/* Recommended Product Section (Add like AddOrderForm) */}
        <div>
          <label className={labelClass}>প্রস্তাবিত পণ্য নির্বাচন করুন</label>

          <div className="flex gap-3">
            <select
              className={inputClass + " flex-1"}
              style={inputFocusStyle}
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">-- একটি পণ্য নির্বাচন করুন --</option>
              {products.map((product) => (
                <option key={product.productID} value={product.productID}>
                  {product.productID} — {product.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddProduct}
              className="px-5 rounded-xl font-bold text-white"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Add
            </button>
          </div>

          {/* Show Added Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div
              className="mt-4 p-3 rounded-xl max-h-40 overflow-y-auto shadow-inner"
              style={{
                backgroundColor: "#F9F9F9",
                border: `1px solid ${PRIMARY_COLOR}20`,
              }}
            >
              <ul className="divide-y divide-gray-200">
                {recommendedProducts.map((p) => (
                  <li
                    key={p.productId}
                    className="flex justify-between items-center py-2 text-gray-800 text-sm"
                  >
                    <span className="font-medium">{p.productName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.productId)}
                      className="text-red-500 font-semibold text-xs hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-extrabold text-white rounded-xl text-lg transition shadow-lg mt-8 duration-300 hover:brightness-110 active:scale-[0.99] ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{
            backgroundColor: SECONDARY_COLOR,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "গ্রাহক যোগ করা হচ্ছে..." : "গ্রাহক যোগ করুন"}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
