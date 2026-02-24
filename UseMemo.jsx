import React, { useState, useMemo } from "react";

function UseMemo() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [count, setCount] = useState(0);

  // ✅ useMemo lagaya
  const evenNumbers = useMemo(() => {
    console.log("Filtering even numbers...");
    return numbers.filter((num) => num % 2 === 0);
  }, [numbers]); // sirf jab numbers change honge tab chalega

  return (
    <div style={{ padding: "20px" }}>
      <h2>Even Numbers: {evenNumbers.join(", ")}</h2>
      <button
className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-transform duration-200"
onClick={() => setCount(count + 1)}
>
🔁 Re-render ({count})
</button>


<button
onClick={() => setNumbers([...numbers, numbers.length + 1])}
className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-transform duration-200"
>
➕ Add Number
</button>
    </div>
  );
}

export default UseMemo;
