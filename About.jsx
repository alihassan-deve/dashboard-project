import { useEffect, useState } from "react";

const About = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No checkout data available.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-blue-600 font-bold">
                PKR {parseInt(item.price) * item.quantity}
              </p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <h2 className="mt-6 text-xl font-semibold">
            Total: PKR{" "}
            {orders.reduce(
              (acc, item) =>
                acc + (item.price ? parseInt(item.price) * item.quantity : 0),
              0
            )}
          </h2>
        </div>
      )}
    </div>
  );
};

export default About;
