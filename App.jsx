import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import SignupForm from "./pages/SignupForm";
import Contact from "./pages/Contact";
import CardDetail from "./pages/CardDetail";
import { CounterProvider } from "./Context/CounterContext";

import { ThemeProvider } from "./Context/ThemeContext"; // ✅ correct import
import UseMemo from "./pages/UseMemo";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    
    <ThemeProvider>
        
      {/* ✅ Wrap entire app inside ThemeProvider */}
      <Router>
  <div className="h-screen flex flex-col  min-h-screen  transition-all duration-300">
    <div className="h-16 flex-shrink-0">
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        cartCount={cartCount}
      />
    </div>
     <CounterProvider>
    <App />
  </CounterProvider>
   

    <div className="flex flex-1 overflow-hidden">
    
      <div
        className={`fixed lg:static top-16 left-0 z-50 w-48 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto  p-4 sm:p-6 transition-all duration-300">
        
        <Routes>
          {/* 👇 Wrap only Home in ThemeProvider */}
          <Route
            path="/"
            element={
              <ThemeProvider>
                <Home />
              </ThemeProvider>
              
            }
          />
          
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signform" element={<SignupForm />} />
          <Route path="/usememo" element={<UseMemo />}/>
          <Route
            path="/card/:id"
            element={<CardDetail setCartCount={setCartCount} />}
          />
        </Routes>
      </div>
    </div>
  </div>
  
</Router>

    </ThemeProvider>
    
  );
};

export default App;
