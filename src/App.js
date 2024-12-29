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
import ExerciseDetail from "./components/DetailExercise.js";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra trạng thái đăng nhập

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

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
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <Calendar2 />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <MemberSupport />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/list-exercises"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <LisExercises />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/list-exercises/id=:id"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <ExerciseDetail />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <SettingPage />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <Calendar2 />
                  </div>
                </div>
              }
            />
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;