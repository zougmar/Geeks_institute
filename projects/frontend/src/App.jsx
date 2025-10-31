import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import NavbarNew from "./components/NavbarNew";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Assessment from "./components/Assessment";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavbarNew />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Features />
              <Testimonials />
              <Pricing />
              <CallToAction />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
