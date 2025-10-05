
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hook/UseAxiosSecure";

const ProductDetailsPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`http://localhost:5000/products/${productID}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  if (loading)
    return <div className="p-10 text-center text-violet-700 font-bold">Loading...</div>;

  if (!product)
    return <div className="p-10 text-center text-red-600">Product not found!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Product Info */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Images */}
        <div className="flex-1">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-80 object-cover rounded-2xl border-4 border-violet-500"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-violet-700 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-2">Price: <span className="font-bold text-xl text-violet-700">৳{product.price}</span></p>
            <p className="text-gray-600 text-lg mb-2">Category: {product.category || "-"}</p>
            <p className="text-gray-600 text-lg mb-2">Quality: {product.quality || "-"}</p>
            <p className="text-gray-600 text-lg mb-2">Description: {product.description || "No description available."}</p>
          </div>

          <button className="mt-6 w-full bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition">
            The product only for showcase
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
