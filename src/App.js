import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import router
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Login from "./components/login/login.js";
import Register from "./components/login/register.js";
import ForgotPassword from "./components/login/changepass.js";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/home"
        element={
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <Calendar />
            </div>
          </div>
        }
      />
    </Routes>
  </Router>
);

export default App;
