import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import "./Calendar.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      navigate("/login");
    }
  };
  return (
    <div className="bg-gray-100 w-74 h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <div className="w-12 h-12">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="ml-4 text-3xl font-bold">運動カレンダー</span>
        </div>
        <nav>
          <ul>
            <li className="mb-4 flex items-center cursor-pointer">
              <i className="fas fa-calendar-alt text-xl"></i>
              <FaCalendarAlt />
              <span className="ml-2 text-xl flex">Calendar</span>
            </li>
            <li className="mb-4 flex items-center cursor-pointer">
              <i className="fas fa-dumbbell text-xl"></i>
              <FaListUl />
              <span className="ml-2 text-xl">List Of Exercises</span>
            </li>
            <li className="mb-4 flex items-center cursor-pointer">
              <i className="fas fa-comments text-xl"></i>
              <MdSupportAgent />
              <span className="ml-2 text-xl">Consults</span>
            </li>
            <li className="mb-4 flex items-center cursor-pointer">
              <i className="fas fa-cog text-xl"></i>
              <IoSettingsOutline />
              <span className="ml-2 text-xl">Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-gray-500 text-white py-2 px-4 rounded flex items-center"
      >
        <IoIosLogOut />
        <span className="ml-2 text-xl">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
