import React, { useReducer } from "react";

// 🎯 Step 1: Initial State
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// 🎯 Step 2: Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const SignupForm = () => {
  // 🎯 Step 3: useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // 🎯 Step 4: Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    console.log("Signup Successful:", state);
    alert(`Signup Successful ✅\nName: ${state.name}\nEmail: ${state.email}`);

    dispatch({ type: "RESET" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup Form</h2>
        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={(e) =>
            dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value })
          }
          className="w-full p-2 border rounded mb-4"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
