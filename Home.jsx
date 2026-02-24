import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import car from "../assets/cars.jpg";
import car1 from "../assets/car1.jpg";
import car3 from "../assets/car3.jpeg";
import car4 from "../assets/car4.avif";
import car5 from "../assets/car5.avif";
import car6 from "../assets/car6.avif";
import car7 from "../assets/car7.avif";
import bike1 from "../assets/bike.jpeg";
import bike2 from "../assets/bikee.png";
import bike3 from "../assets/bike3.jpg";
import bike4 from "../assets/bike4.jpeg";
import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

const Home = () => {
  const navigate = useNavigate();
    const { theme } = useTheme();

  // ✅ Initial Cars
  const initialCars = [
    {
      id: 1,
      title: "Toyota Corolla",
      description: "A reliable and fuel-efficient sedan, perfect for daily commutes.",
      image: car,
      price: "12000000",
      brand: "Toyota",
      color: "Black",
      category: "Car",
    },
    {
      id: 2,
      title: "Honda Civic",
      description: "Sporty design with advanced features for a smooth drive.",
      image: car1,
      price: "13000000",
      brand: "Honda",
      color: "Orange",
      category: "Car",
    },
    {
      id: 3,
      title: "Suzuki Swift",
      description: "Compact hatchback with great performance and mileage.",
      image: car3,
      price: "14000000",
      brand: "Suzuki",
      color: "Blue",
      category: "Car",
    },
    {
      id: 4,
      title: "Audi A4",
      description: "Luxury sedan with premium features and style.",
      image: car4,
      price: "4000000",
      brand: "Audi",
      color: "Blue",
      category: "Car",
    },
    {
      id: 5,
      title: "Kia Sportage",
      description: "A stylish SUV with advanced safety features.",
      image: car5,
      price: "8000000",
      brand: "Kia",
      color: "Black",
      category: "Car",
    },
    {
      id: 6,
      title: "Hyundai Elantra",
      description: "Comfortable ride with modern features.",
      image: car6,
      price: "8000000",
      brand: "Hyundai",
      color: "Black",
      category: "Car",
    },
    {
      id: 7,
      title: "BMW 3 Series",
      description: "A luxury sedan with powerful performance.",
      image: car7,
      price: "6000000",
      brand: "BMW",
      color: "White",
      category: "Car",
    },
  ];

  // ✅ Initial Bikes
  const initialBikes = [
    {
      id: 101,
      category: "Bike",
      title: "Yamaha R1",
      description: "Superbike with 1000cc engine and aggressive design.",
      brand: "Yamaha",
      color: "Red",
      image: bike1,
    },
    {
      id: 102,
      category: "Bike",
      title: "Suzuki Hayabusa",
      description: "Legendary 1300cc sports bike, known for top speed.",
      brand: "Suzuki",
      color: "Green",
      image: bike2,
    },
    {
      id: 103,
      category: "Bike",
      title: "XL Yamaha",
      description: "Superbike with 1000cc engine and aggressive design.",
      brand: "Yamaha",
      color: "Gray",
      image: bike3,
    },
    {
      id: 104,
      category: "Bike",
      title: "Suzuki OneTen",
      description: "Legendary 1300cc sports bike, known for top speed.",
      brand: "Suzuki",
      color: "White",
      image: bike4,
    },
  ];

  // ✅ States
  const [cars, setCars] = useState(initialCars);
  const [bikesData, setBikesData] = useState(initialBikes);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
   const [isCartOpen, setIsCartOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState("");
  const [deleteCardId, setDeleteCardId] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [orders, setOrders] = useState([]); 
  


  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });



 
  // ✅ LocalStorage sync
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);



  // ✅ Combine Cars + Bikes
  let filterData = [];
  if (selectedCategory === "All") {
    filterData = [...cars, ...bikesData];
  } else if (selectedCategory === "Car") {
    filterData = cars;
  } else if (selectedCategory === "Bike") {
    filterData = bikesData;
  }

  // ✅ Search Filter
  const filteredData = filterData.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.brand.toLowerCase().includes(term) ||
      item.color.toLowerCase().includes(term) ||
      (item.price && item.price.toString().includes(term))
    );
  });
const handleCheckout = () => {
  if (cartItems.length === 0) return;

  const newOrders = [...orders, ...cartItems];
  setOrders(newOrders);

  // ✅ Save to localStorage
  localStorage.setItem("orders", JSON.stringify(newOrders));

  alert("✅ Your order has been placed!");
  setCartItems([]);
  setIsCartOpen(false);

 
};
  // 🛒 Add to Cart
  const handleAddToCart = (card) => {
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === card.id);
      if (existing) {
        return prev.map((item) =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...card, quantity: 1 }];
      }
    });

    setSuccessMessage(`${card.title} added to cart successfully!`);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  // Quantity Controls
const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

const removeFromCart = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));
};


  // Edit
  const handleEdit = (card) => {
    setEditCard(card);
    setNewTitle(card.title);
    setNewDesc(card.description);
    setNewImage(card.image);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editCard.category === "Car") {
      setCars((prev) =>
        prev.map((c) =>
          c.id === editCard.id
            ? { ...c, title: newTitle, description: newDesc, image: newImage }
            : c
        )
      );
    } else if (editCard.category === "Bike") {
      setBikesData((prev) =>
        prev.map((b) =>
          b.id === editCard.id
            ? { ...b, title: newTitle, description: newDesc, image: newImage }
            : b
        )
      );
    }
    setIsOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  // Delete
  const handleDeleteClick = (id) => {
    setDeleteCardId(id);
  };

  const confirmDelete = () => {
    setCars((prev) => prev.filter((c) => c.id !== deleteCardId));
    setBikesData((prev) => prev.filter((b) => b.id !== deleteCardId));
    setDeleteCardId(null);
  };

  const cancelDelete = () => {
    setDeleteCardId(null);
  };
  

  return (
    <div  className={`p-4 shadow-md transition-all duration-300 ${
        theme === "dark" ? " text-white" : "bg-gray-700 text-white"
      }`}
    >
    
      
      {/* ✅ Success Message */}
      {successMessage && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Car Showroom</h2>
        

        {/* ✅ Search */}
        <input
          type="text"
          placeholder="Search cars or bikes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-2xl border border-gray-300 bg-gray-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-lg placeholder-gray-400"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border text-black px-3 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Car">Cars</option>
          <option value="Bike">Bikes</option>
        </select>

      <div className="relative">
  <FaShoppingCart
    onClick={() => setIsCartOpen(true)}
    className="text-3xl text-gray-600 cursor-pointer"
  />
  {cartItems.reduce((total, item) => total + item.quantity, 0) > 0 && (
    <span
      onClick={() => setIsCartOpen(true)}
      className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full cursor-pointer"
    >
      {cartItems.reduce((total, item) => total + item.quantity, 0)}
    </span>
  )}
</div>

      </div>

      <p className="text-gray-700 mb-8">Choose your favorite car or bike to see more details.</p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col items-center p-5"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  {card.category}
                </span>

                <div className="flex gap-2 justify-center flex-wrap mt-4">
                  <button
                    onClick={() => navigate(`/card/${card.id}`, { state: card })}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => handleEdit(card)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(card.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddToCart(card)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 text-lg">
            🚗 No cars or bikes found matching your search
          </p>
        )}
      </div>
      {orderMessage && (
  <p className="text-green-600 font-bold text-center mt-4">
    {orderMessage}
  </p>
)}


      {/* 🛒 Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[800px] max-h-[90vh] overflow-y-auto shadow-xl relative">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cart</h2>

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                        {item.price && (
                          <p className="text-blue-600 font-bold">
                            PKR {parseInt(item.price) * item.quantity}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="flex justify-between mt-6 text-xl font-semibold">
                <span>Total:</span>
                <span className="text-blue-600">
                  PKR{" "}
                  {cartItems.reduce(
                    (acc, item) =>
                      acc + (item.price ? parseInt(item.price) * item.quantity : 0),
                    0
                  )}
                </span>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition"
              >
                Close
              </button>
             {cartItems.length > 0 && (
  <div>
    <button
      onClick={handleCheckout}
      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
    >
      Checkout
    </button>
    {orderMessage && (
      <p className="mt-3 text-green-600 font-semibold">{orderMessage}</p>
    )}
  </div>
)}

            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter new title"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter new description"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full mb-4"
            />
            {newImage && (
              <img
                src={newImage}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirm Modal */}
      {deleteCardId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 w-96 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
