import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import router
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Login from "./components/login/login.js";
import Register from "./components/login/register.js";
import ForgotPassword from "./components/login/changepass.js";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra trạng thái đăng nhập

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? ( // Nếu đã đăng nhập, hiển thị trang home
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Calendar />
                </div>
              </div>
            ) : ( // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Chuyển hướng đến trang đăng nhập nếu truy cập vào trang gốc */}
      </Routes>
    </Router>
  );
};

export default App;