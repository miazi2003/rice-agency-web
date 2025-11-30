import React, { useEffect, useState, memo } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/UseAxiosSecure";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const ProductDetailsPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosSecure.get(`/products/${productID}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axiosSecure, productID]);

  // --- Loading State ---
  if (loading)
    return (
      <div className="p-10 text-center text-xl font-bold" style={{ color: PRIMARY_COLOR }}>
        Loading Product Details... ⏳
      </div>
    );

  // --- Not Found State ---
  if (!product)
    return (
      <div className="p-10 text-center text-xl font-medium text-red-600">
        Product with ID "{productID}" not found! ❌
      </div>
    );

  // --- Main Product Details UI ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div 
        // Removed flex-row classes and width settings to let the content fill the card
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10"
        style={{ borderTop: `6px solid ${PRIMARY_COLOR}` }}
      >
        
        {/* Product Details Section - Now full width */}
        <div className="space-y-5">
          {/* Product Name - Primary Color */}
          <h1 
            className="text-3xl lg:text-4xl font-extrabold pb-2 border-b"
            style={{ color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
          >
            {product.name}
          </h1>

          <div className="space-y-3 text-gray-700 text-lg">
            
            {/* Price - Secondary Color Accent */}
            <p className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-800">Price:</span>{" "}
              <span className="text-xl font-extrabold" style={{ color: SECONDARY_COLOR }}>
                ৳{product.price ?? "N/A"}
              </span>
            </p>

            {/* Category */}
            <p className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-800">Category:</span>{" "}
              <span className="text-gray-600">{product.category || "N/A"}</span>
            </p>
            
            {/* Quality */}
            <p className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="font-semibold text-gray-800">Quality:</span>{" "}
              <span className="text-gray-600">{product.quality || "N/A"}</span>
            </p>
          </div>

          {/* Description */}
          <div className="pt-4">
             <h3 className="font-bold text-xl mb-2" style={{ color: PRIMARY_COLOR }}>
                Product Description:
             </h3>
             <p className="text-gray-700 leading-relaxed text-base italic">
                {product.description || "No detailed description available for this item."}
             </p>
          </div>

          {/* Button - Secondary Color for Attention */}
          <button
            type="button"
            disabled
            className="mt-6 w-full text-white py-3 rounded-xl shadow-lg cursor-not-allowed font-bold text-lg opacity-90 transition duration-300"
            style={{ backgroundColor: SECONDARY_COLOR }}
          >
            This product is for showcase only 💎
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetailsPage);