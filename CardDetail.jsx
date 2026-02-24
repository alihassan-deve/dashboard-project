// src/pages/CardDetail.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";


const CardDetail = ({ setCartCount }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const card = location.state;

  const price = 164999;
  const total = price * quantity;


  if (!card) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">❌ Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
        >
          🔙 Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white hover:bg-gray-900 text-lg px-6 py-2 rounded-full shadow-md transition"
      >
        ⬅ Back
      </button>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Image */}
        <div className="flex justify-center items-center">
          <div className="border border-gray-300 rounded-2xl p-4 bg-gray-50 shadow-inner">
            <img
              src={card.image}
              alt={card.title}
              className="w-80 h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">{card.title}</h2>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 mr-1" />
              ))}
              <span className="text-gray-600 ml-2">(120 reviews)</span>
            </div>
            <p className="text-gray-700 text-lg mb-6">{card.description}</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              PKR {price.toLocaleString()}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-semibold text-lg">Quantity:</span>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-300 rounded-lg text-xl font-bold"
            >
              -
            </button>
            <span className="text-xl font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-300 rounded-lg text-xl font-bold"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {/* ✅ Add to Cart: no modal, directly update count */}
            {/* <button
              onClick={() => setCartCount((prev) => prev + quantity)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-3 rounded-xl shadow-md transition"
            >
              🛒 Add to Cart
            </button> */}

            {/* Buy Now (modal abhi rakha hai) */}
            <button
              onClick={() => setIsBuyNowModalOpen(true)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-xl shadow-md transition"
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Only Buy Now Modal (Add to Cart ka popup hata diya hai) */}
      {isBuyNowModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={() => setIsBuyNowModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 md:p-8 w-full max-w-md shadow-xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
              Checkout
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Review your order before confirming.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-gray-600">Product:</span>
                <span className="text-gray-800">{card.title}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-gray-600">Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-gray-600">Price (each):</span>
                <span>PKR {price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-blue-600 mt-3">
                <span>Total:</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                ✅ Confirm
              </button>
              <button
                onClick={() => {
                  setQuantity(1);
                  setIsBuyNowModalOpen(false);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
              >
                🗑 Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
