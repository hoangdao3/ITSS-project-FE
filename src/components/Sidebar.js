import React, { useEffect } from "react";
import { FaCalendarAlt, FaListUl } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = window.confirm("本当にログアウトしますか?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("このページにアクセスするにはログインする必要があります.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="overflow-hidden bg-gray-100 w-74 h-full p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <div className="w-12 h-12">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className="ml-4 text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/home")}
          >
            運動カレンダー
          </span>
        </div>
        <nav>
          <ul>
            <li className="mb-4 flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
              <FaCalendarAlt className="text-xl" />
              <a href="/home" className="ml-2 text-xl">
                カレンダー
              </a>
            </li>
            <li className="mb-4 flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
              <FaListUl className="text-xl" />
              <a href="/list-exercises" className="ml-2 text-xl">
                練習リスト
              </a>
            </li>
            <li className="mb-4 flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
              <MdSupportAgent className="text-xl" />
              <a href="/support" className="ml-2 text-xl">
                相談する
              </a>
            </li>
            <li className="mb-4 flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
              <IoSettingsOutline className="text-xl" />
              <a href="/setting" className="ml-2 text-xl">
                設定
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center transition duration-200"
      >
        <IoIosLogOut className="text-xl" />
        <span className="ml-2 text-xl">ログアウト</span>
      </button>
    </div>
  );
};

export default Sidebar;
