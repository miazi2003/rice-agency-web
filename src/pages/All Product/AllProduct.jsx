import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Assuming you are using react-router-dom
import useAxiosSecure from "../../hook/UseAxiosSecure";
import add_product from "../../assets/add.png"

import Swal from "sweetalert2";
// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);




  const handleDelete = async (productID) => {
   Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
     showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!"
   }).then(async (result) => {
     if (result.isConfirmed) {
       try {
         const res = await axiosSecure.delete(`/products/${productID}`);
         console.log(res.data)
         // Remove from UI
         setProducts((prev) => prev.filter((c) => c.productID !== productID));

         Swal.fire({
           title: "Deleted!",
           text: "Customer deleted successfully.",
           icon: "success",
           confirmButtonColor: "#3085d6",
         });

       } catch (error) {
         console.error("Delete failed:", error);
         Swal.fire({
           title: "Error!",
           text: "Failed to delete customer.",
           icon: "error",
         });
       }
     }
   });



};

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold" style={{ color: PRIMARY_COLOR }}>
          Loading products... ⏳
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  // --- Empty State (Branded) ---
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-10 rounded-xl m-4 shadow-lg">
        <p className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
          No Products Found 😔
        </p>
        <p className="text-gray-600 mb-6">
          It looks like the product list is empty. Start by adding a new item.
        </p>
        <Link
          to="/addProduct" // Use the correct route based on your layout
          className="mt-4 px-8 py-3 text-white rounded-full font-bold transition shadow-md hover:shadow-lg hover:scale-[1.03] transform"
          style={{ backgroundColor: SECONDARY_COLOR }}
        >
          ➕ Add New Product
        </Link>
      </div>
    );
  }

  // --- Main Product Grid (Branded) ---
  return (
    <div className="p-6 md:p-8">
     <div className="w-full flex justify-between ">
       <h1 className="text-3xl font-extrabold mb-10 text-center" style={{ color: PRIMARY_COLOR }}>
        Available Products 📦
      </h1>

      <div className="add_product">
<Link to={"/addProduct"}>
        <button className="btn p-4 border-0" style={{backgroundColor : PRIMARY_COLOR}} title="Add New Product">
          <img src={add_product} className="w-5 h-5" alt=""  />
        </button>
        </Link>
      </div>
     </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.productID || product._id}
            className="bg-white rounded-2xl shadow-xl relative transition duration-300 transform hover:scale-[1.003] hover:shadow-2xl p-6 border-t-4"
            style={{ borderColor: PRIMARY_COLOR + 'A0' }} // Subtle border accent
          >
           
            {/* Name */}
            <h2 className="font-extrabold text-xl text-gray-900 truncate mb-1">
              {product.name}
            </h2>

             <button onClick={()=>{handleDelete(product.productID)}} className="px-2 rounded-full bg-red-600 text-white absolute -top-2 right-0" style={{ backgroundColor: SECONDARY_COLOR }}>
                X
              </button>
            
            {/* Price - Secondary Color */}
            <p className="font-extrabold text-2xl mt-1" style={{ color: SECONDARY_COLOR }}>
              ৳{product.price}
            </p>
            
            <div className="mt-3 text-sm space-y-1">
                {/* Category */}
                <p className="text-gray-600">
                    Category: <span className="font-semibold text-gray-700">{product.category}</span>
                </p>
                {/* Quality */}
                <p className="text-gray-600">
                    Quality: <span className="font-semibold" style={{ color: getQualityColor(product.quality) }}>{product.quality}</span>
                </p>
            </div>

            {/* View Details Button - Primary Color */}
            <div className="mt-6">
              <Link to={`/products/${product.productID || product._id}`}>
                <button 
                  className="w-full text-white py-2.5 rounded-xl font-bold transition hover:brightness-110 shadow-md"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to color the quality text for visual distinction
const getQualityColor = (quality) => {
    switch (quality) {
        case 'High':
            return '#10B981'; // Tailwind emerald-500
        case 'Medium':
            return '#F59E0B'; // Tailwind amber-500
        case 'Low':
            return '#EF4444'; // Tailwind red-500
        default:
            return '#6B7280'; // Gray
    }
};

export default ProductsPage;