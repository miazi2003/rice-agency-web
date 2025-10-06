import React from "react";
// Removed: import { Link } from "react-router-dom"; // Link is replaced with <a> tag
import { ShieldAlert, Home } from "lucide-react";

/**
 * Eye-Catching Unauthorized (403 Forbidden) Page
 * Uses a dark theme, strong shadows, and subtle animation for visual impact.
 */
const Unauthorized = () => {
  return (
    // Background: Dark gradient for drama, min-h-screen to ensure full coverage
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      {/* Container Card with dramatic styling and animation */}
      <div 
        className="max-w-xl w-full p-8 md:p-12 bg-gray-800 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-red-900/50 
                   transform hover:scale-[1.01] border border-red-700/30 animate-fade-in"
      >
        <div className="text-center">
          {/* Icon Area: High contrast and alert styling */}
          <div className="flex justify-center mb-8">
            <div className="relative p-6 bg-red-800 rounded-full shadow-red-500/50 shadow-xl border-4 border-red-500/70 transform transition-transform duration-500 hover:scale-105">
              <ShieldAlert className="w-16 h-16 text-white animate-pulse" />
              {/* Pulsing red ring for extra emphasis */}
              <span className="absolute top-0 right-0 bottom-0 left-0 m-auto inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping-slow"></span>
            </div>
          </div>

          {/* Main Title: Large, bold, and high-contrast */}
          <h1 className="text-6xl font-extrabold text-red-400 mb-4 tracking-tighter drop-shadow-lg">
            403
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Access Denied
          </h2>

          {/* Description: Clear and helpful message */}
          <p className="text-gray-300 mb-8 max-w-sm mx-auto">
            It looks like you don’t have the necessary permissions to view this resource.
            <br className="hidden sm:block" />
            Please ensure you are logged in with the correct role or contact your administrator.
          </p>

          {/* Action Button: Eye-catching color scheme - Changed Link to <a> */}
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#4d6b57] hover:bg-[#3d5545] text-white font-semibold 
                       px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[#4d6b57]/40 
                       transform hover:scale-[1.05] active:scale-95 border-2 border-transparent hover:border-white/50"
          >
            <Home className="w-5 h-5" />
            Go Back Home
          </a>
        </div>
      </div>

      {/* Footer (subtle) */}
      <footer className="mt-12 text-gray-500 text-sm opacity-70">
        © {new Date().getFullYear()} Your Company Name
      </footer>
      
      {/* Custom Keyframes for animation - Changed <style jsx="true"> to <style> */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out;
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

export default Unauthorized;
