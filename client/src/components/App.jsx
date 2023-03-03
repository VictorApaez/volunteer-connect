import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import React from "react";
import Calendar from "./Calendar";
import Header from "./Navbar";
import "../styles/App.css";
import Login from "./Login";
import Feed from "./Feed/Feed";
import FormikForm from "./FormikForm";
import Dashboard from "./Dashboard/Dashboard";
import SelectDate from "./ReactCalendar.jsx/SelectDate";
import BudgetForm from "./Budget/BudgetForm";
import FormBS from "./FormBS";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootswatch/dist/lux/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/formik" element={<FormikForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/selectdate" element={<SelectDate />} />
        <Route path="/budget" element={<BudgetForm />} />
        <Route path="/formbs" element={<FormBS />} />
      </Routes>
    </div>
  );
}

export default App;
