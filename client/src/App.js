import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import React from "react";
import Calendar from "./components/Calendar";
import { Navbar } from "./components/Navbar";
import "./styles/App.css";
import Login from "./components/Login";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
