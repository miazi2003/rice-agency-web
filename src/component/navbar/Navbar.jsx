import React, { useContext, memo } from "react";
import { AuthContext } from "../../context/AuthContext";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOutUser();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav 
      // Use flex container for perfect alignment and distribute space
      className="flex items-center justify-between px-4 py-3 shadow-xl text-white z-50 sticky top-0 md:px-8 lg:px-12"
      style={{ backgroundColor: PRIMARY_COLOR }}
    >
      
      {/* Navbar Start: Logo (perfectly aligned left) */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.ibb.co.com/0yyB7f1x/photo-2025-10-06-22-39-14.jpg"
            alt="Rice Agency Logo"
            className="w-10 h-10 rounded-full object-cover shadow-md"
            loading="lazy"
          />
          <span className="hidden sm:block font-extrabold text-xl tracking-wider">
            Rice Agency
          </span>
        </a>
      </div>

      {/* Navbar End: Auth Buttons (perfectly aligned right) */}
      <div className="flex items-center space-x-4">
        {/* Auth Button */}
        {user ? (
          <button
            onClick={handleLogout}
            // MODIFICATION: White background, Primary color text
            className="font-bold transition rounded-full px-6 py-2 shadow-lg hover:opacity-90 text-sm md:text-base"
            style={{ 
                backgroundColor: 'white',
                color: PRIMARY_COLOR // Text color is Primary Brand Color
            }}
          >
            Log Out 🚪
          </button>
        ) : (
          <a
            href="/login"
            // MODIFICATION: White background, Primary color text
            className="font-bold transition rounded-full px-6 py-2 shadow-lg hover:opacity-90 text-sm md:text-base"
            style={{ 
                backgroundColor: 'white',
                color: PRIMARY_COLOR // Text color is Primary Brand Color
            }}
          >
            Log In 🚀
          </a>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);