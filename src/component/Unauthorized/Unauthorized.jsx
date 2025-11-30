import React, { memo } from "react";
import { ShieldAlert, Home } from "lucide-react";

// Define the two brand color variables
const PRIMARY_COLOR = "#A7003C"; // Rich Reddish-Maroon (Used for Warning/Accent)
const SECONDARY_COLOR = "#AB50FF"; // Vibrant Violet/Purple (Used for CTA Button)

/**
 * 403 Unauthorized Page
 * - Clean, optimized, and accessible with a light theme.
 */
const Unauthorized = () => {
  const year = new Date().getFullYear();

  return (
    // MODIFICATION: Changed background to white and main text color to dark gray
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-4 font-sans">
      {/* Main Card */}
      <div
        // MODIFICATION: Changed card background to a soft white/gray and removed redundant shadow accent color
        className="max-w-xl w-full p-8 md:p-12 bg-gray-50 rounded-2xl border transition-transform duration-500 transform hover:scale-[1.01] shadow-xl 
                   animate-fade-in"
        // Use Primary Color for card border
        style={{ 
            borderColor: `${PRIMARY_COLOR}50`, 
            border: `2px solid ${PRIMARY_COLOR}50` 
        }}
      >
        <div className="text-center">
          {/* Icon Section */}
          <div className="flex justify-center mb-8 relative">
            <div 
              className="p-6 rounded-full border-4 shadow-xl transform transition-transform duration-500 hover:scale-105 relative"
              // Primary Color for icon background and border/shadow accents
              style={{
                backgroundColor: PRIMARY_COLOR,
                borderColor: `${PRIMARY_COLOR}B0`,
                boxShadow: `0 10px 15px -3px ${PRIMARY_COLOR}60, 0 4px 6px -4px ${PRIMARY_COLOR}60`
              }}
            >
              <ShieldAlert
                className="w-16 h-16 text-white animate-pulse"
                aria-label="Access denied"
              />
              {/* Animated Ring */}
              <span 
                className="absolute inset-0 rounded-full opacity-75 animate-ping-slow"
                // Primary Color for the ping animation
                style={{ backgroundColor: PRIMARY_COLOR }}
              ></span>
            </div>
          </div>

          {/* Titles */}
          <h1 
            // MODIFICATION: Using dark text that contrasts well with the light background
            className="text-6xl font-extrabold mb-2 tracking-tight drop-shadow-lg"
            style={{ color: '#D9534F' }} // Light Red/Maroon for the error code
          >
            403
          </h1>
          <h2 
            // MODIFICATION: Using dark gray text
            className="text-2xl md:text-4xl font-bold mb-4 text-gray-900" 
          >
            Access Denied
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
            You don’t have permission to view this page. Please ensure you’re logged in
            with the correct role or contact your administrator for access.
          </p>

          {/* Home Button */}
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3 rounded-full shadow-lg border-2 border-transparent transition-all duration-300 
                       transform hover:scale-[1.05] active:scale-95 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-offset-white" // MODIFICATION: focus ring offset is now white
            // Secondary Color for the CTA button and shadow
            style={{ 
                backgroundColor: SECONDARY_COLOR, 
                boxShadow: `0 10px 15px -3px ${SECONDARY_COLOR}50` 
            }}
          >
            <Home className="w-5 h-5" />
            Go Back Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm opacity-90">
        © {year} Rice Agency Ltd.
      </footer>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out;
          }
          @keyframes ping-slow {
            0% {
              transform: scale(0.9);
              opacity: 0.8;
            }
            100% {
              transform: scale(2.0);
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}
      </style>
    </div>
  );
};

export default memo(Unauthorized);