
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

    
      <div
        className={`fixed top-0 left-0 bg-gray-700 text-white w-50 h-full p-5 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
      >
        <h2 className="text-xl font-bold mb-6 hidden lg:block">Menu</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaHome />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaInfoCircle />
              <span className="hidden lg:inline">About</span>
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaServicestack />
              <span className="hidden lg:inline">Services</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelope />
              <span className="hidden lg:inline">Contact</span>
            </Link>
          </li>
          <li>
            <Link
              to="/signform"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelope />
              <span className="hidden lg:inline">SignupForm</span>
            </Link>
          </li>
           <li>
            <Link
              to="/UseMemo"
              onClick={onClose}
              className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelope />
              <span className="hidden lg:inline">UseMemo</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
