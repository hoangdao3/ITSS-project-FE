import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import router
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Login from "./components/login/login.js";
import Register from "./components/login/register.js";
import ForgotPassword from "./components/login/changepass.js";
import MemberSupport from "./components/support/index.js";
import LisExercises from "./components/exercises/index.js";
import SettingPage from "./components/setting/index.js";
import Calendar2 from "./components/calendar2";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra trạng thái đăng nhập

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected routes - Require login */}
        <Route
          path="/calen2"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Calendar2 />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/support"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <MemberSupport />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/list-exercises"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <LisExercises />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/setting"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <SettingPage />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Calendar2 />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
