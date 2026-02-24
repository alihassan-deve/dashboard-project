import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 shadow-md transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"  // ✅ dark mode navbar
          : "bg-gray-100 text-gray-900" // ✅ light mode navbar
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
          <h1 className="text-xl font-bold">My Dashboard</h1>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* ✅ Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              theme === "light"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {theme === "light" ? "Dark 🌙" : "Light ☀️"}
          </button>

          <button className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold">
            Profile
          </button>
          <button className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold">
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-3">
          <button className="bg-white text-blue-600 px-3 py-2 rounded-lg font-semibold">
            Profile
          </button>
          <button className="bg-white text-blue-600 px-3 py-2 rounded-lg font-semibold">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
