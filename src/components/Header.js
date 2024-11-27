import React from "react";
import { IoMdNotifications } from "react-icons/io";
import "./Calendar.module.css";

const Header = () => (
  <div className="flex justify-between items-center p-4 border-b">
    <div></div>
    <div className="flex items-center">
      <i className="fas fa-bell svg-big mr-4">
        <IoMdNotifications />
      </i>
      <div className="w-10 h-10">
        <img
          src="/user1.png"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
);

export default Header;
