// 📁 src/Components/Counter.jsx
import React from "react";
import { useCounter } from "../Context/CounterContext";

const Counter = () => {
  const { count, increment, decrement, reset } = useCounter(); // context se data

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {count}</h1>
      <button onClick={increment}>➕ Increment</button>
      <button onClick={decrement} style={{ marginLeft: "10px" }}>
        ➖ Decrement
      </button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        🔄 Reset
      </button>
    </div>
  );
};

export default Counter;
