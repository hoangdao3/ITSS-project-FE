import { IoMdNotifications } from "react-icons/io";
import React, { useState, useEffect } from "react";
import "./Calendar.module.css";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [exercises, setExercises] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false);
  };

  const toggleProfile = () => {
    window.location.href = "http://localhost:3000/setting";
  };

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/exercises/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch exercises: ${response.statusText}`);
      }

      const exercises = await response.json();
      setExercises(exercises);

      const currentTime = new Date();
      const newNotifications = exercises
        .filter(exercise => {
          const startTime = new Date(exercise.startTime);
          const notificationTime = new Date(startTime.getTime() - 30 * 60 * 1000);
          return currentTime >= notificationTime && currentTime < startTime;
        })
        .map(exercise => ({
          id: exercise.id,
          message: `リマインダー: ${exercise.description} が ${new Date(exercise.startTime).toLocaleTimeString()} に始まります。`,
        }));

      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:8080/api/users/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.statusText}`);
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      alert("Failed to fetch profile data: " + error.message);
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchProfileData();
  }, []);

  return (
    <div>
      <div className="relative">
        <div className="flex justify-end items-center p-4 border-b pr-10">
          <div className="flex items-center">
            <div
              className="cursor-pointer flex items-center relative"
              onClick={toggleNotifications}
            >
              <IoMdNotifications
                className="svg-big pr-4"
                style={{ fontSize: "50px", color: "#000000" }}
              />
              {notifications.length > 0 && (
                <span
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                  style={{ top: '5px', right: '5px' }} // Điều chỉnh vị trí ở đây
                >
                  {notifications.length}
                </span>
              )}
            </div>
            <div className="w-10 h-10 cursor-pointer" onClick={toggleProfile}>
              <img
                src="/user1.png"
                alt="User  Profile"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        {showNotifications && (
          <div
            className="absolute right-0 top-16 w-96 bg-white shadow-lg rounded-lg p-4 z-50"
            id="notification"
            style={{
              maxHeight: "550px",
              overflow: "auto",
              width: "450px",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold leading-6 text-gray-800">
                通知
              </p>
              <div
                className="cursor-pointer"
                onClick={() => setShowNotifications(false)}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div key={notification.id} className="w-full p-3 mt-4 bg-blue-100 rounded flex items-center">
                    <div className="w-8 h-8 border rounded-full border-blue-200 flex items-center justify-center">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 1.33333C8.17681 1.33333 8.34638 1.40357 8.4714 1.52859C8.59642 1.65361 8.66666 1.82318 8.66666 2V8.66666H14C14.1768 8.66666 14.3464 8.7369 14.4714 8.86192C14.5964 8.98694 14.6667 9.15651 14.6667 9.33333C14.6667 9.51014 14.5964 9.67971 14.4714 9.80473C14.3464 9.92976 14.1768 10 14 10H8C7.82318 10 7.65361 9.92976 7.52859 9.80473C7.40357 9.67971 7.33333 9.51014 7.33333 9.33333V2C7.33333 1.82318 7.40357 1.65361 7.52859 1.52859C7.65361 1.40357 7.82318 1.33333 8 1.33333ZM8 14C8.17681 14 8.34638 14.0702 8.4714 14.1953C8.59642 14.3203 8.66666 14.4899 8.66666 14.6667C8.66666 14.8435 8.59642 15.0131 8.4714 15.1381C8.34638 15.2631 8.17681 15.3333 8 15.3333C7.82318 15.3333 7.65361 15.2631 7.52859 15.1381C7.40357 15.0131 7.33333 14.8435 7.33333 14.6667C7.33333 14.4899 7.40357 14.3203 7.52859 14.1953C7.65361 14.0702 7.82318 14 8 14Z"
                          fill="#3B82F6"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p className="text-sm leading-none">{notification.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">現時点では通知はありません.</p>
              )}
            </div>
          </div>
        )}

        {showProfile && (
          <div className=" absolute right-0 top-16 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <p className="text-xl font-semibold leading-6 text-gray-800">
              ユーザープロフィール
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">名前: {profileData.fullname}</p>
              <p className="text-sm text-gray-600">メール: {profileData.email}</p>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleProfile}
              >
                プロフィールを編集
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;