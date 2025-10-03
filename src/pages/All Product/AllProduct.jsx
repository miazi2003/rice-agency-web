import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products , setProducts] = useState([])
  // const products = [
  //   { id: 1, name: "Wireless Headphones", price: 99.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+1" },
  //   { id: 2, name: "Smart Watch", price: 149.99, quality: "Medium", image: "https://via.placeholder.com/300x300?text=Product+2" },
  //   { id: 3, name: "Gaming Keyboard", price: 79.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+3" },
  //   { id: 4, name: "Bluetooth Speaker", price: 49.99, quality: "Medium", image: "https://via.placeholder.com/300x300?text=Product+4" },
  //   { id: 5, name: "Laptop Stand", price: 39.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+5" },
  //   { id: 6, name: "Phone Case", price: 19.99, quality: "Low", image: "https://via.placeholder.com/300x300?text=Product+6" },
  //   { id: 7, name: "Desk Lamp", price: 29.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+7" },
  //   { id: 8, name: "Backpack", price: 59.99, quality: "Medium", image: "https://via.placeholder.com/300x300?text=Product+8" },
  //   { id: 9, name: "Notebook", price: 9.99, quality: "Low", image: "https://via.placeholder.com/300x300?text=Product+9" },
  //   { id: 10, name: "Sunglasses", price: 79.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+10" },
  //   { id: 11, name: "Coffee Mug", price: 14.99, quality: "Medium", image: "https://via.placeholder.com/300x300?text=Product+11" },
  //   { id: 12, name: "Wireless Mouse", price: 39.99, quality: "High", image: "https://via.placeholder.com/300x300?text=Product+12" },
  // ];

  useEffect(()=>{
const fetchProducts = async() =>{
  const res = await axios.get("http://localhost:5000/products")
  console.log(res.data)
setProducts(res.data)
}

fetchProducts()
  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-violet-700 mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition transform hover:scale-102 overflow-hidden"
          >
            {/* Product Image */}
            <div className="overflow-hidden rounded-t-3xl">
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
              <p className="text-violet-700 font-bold text-xl mt-1">৳{product.price}</p>
              <p className="text-gray-500 text-sm mt-1">Category: {product.category}</p>
              <p className="text-gray-500 text-sm mt-1">Quality: {product.quality}</p>

              {/* View Button */}
              <div className="mt-4">
                <button className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
