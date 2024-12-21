import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser , FaEnvelope, FaPhone } from "react-icons/fa";

const SettingPage = () => {
  const [displayData, setDisplayData] = useState({
    fullName: "",
    username: ""
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/api/users/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`ユーザーデータの取得に失敗しました: ${response.statusText}`);
      }

      const data = await response.json();
      setDisplayData({
        fullName: data.fullname || "",
        username: data.username || ""
      });
      setFormData({
        fullName: data.fullname || "",
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || ""
      });
    } catch (error) {
      console.error("ユーザーデータを取得できませんでした", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));

    if (id === "username") {
      const regex = /^[a-zA-Z0-9]+$/; 
      if (!regex.test(value)) {
        setErrorUsername("ユーザー名に特殊文字を含めることはできません。");
      } else {
        setErrorUsername("");
      }
    }

    if (id === "phone") {
      const regex = /^[0-9]+$/; 
      if (!regex.test(value)) {
        setErrorPhone("電話番号には数字のみを含める必要があります.");
      } else {
        setErrorPhone("");
      }
    }
  };

  const handleSave = async () => {
    if (errorUsername || errorPhone) {
      alert("保存する前にエラーを修正してください.");
      return;
    }

    if (isEditing) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/api/users/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            fullname: formData.fullName,
            username: formData.username,
            phone: formData.phone
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "ユーザーデータを更新できませんでした");
        }

        setDisplayData({
          fullName: data.fullname,
          username: data.username
        });

        alert("ユーザーデータが正常に更新されました。");
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to update user data", error);
        alert("ユーザーデータの更新に失敗しました: " + error.message);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-7">
      <div className="p-7 bg-gray-100 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">設定</h1>
        <div className="flex justify-between items-center h-full p-4">
          <div className="flex items-center">
            <FaUser  className="text-4xl text-gray-600" />
            <div className="ml-4">
              <p className="text-3xl text-black">{displayData.fullName}</p>
              <p className="text-lg text-gray-500 mt-0.5">{displayData.username}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSave}
              className={`px-7 py-3 mr-14 rounded transition-colors duration-500 ${isSaved ? 'bg-green-500' : 'bg-blue-500'} text-white hover:bg-blue-600`}
            >
              {isEditing ? "保存" : "編集"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 pr-12 pl-12">
          <div className="mb-4 pr-12">
            <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="fullName">
            フルネーム
            </label>
            <div className="flex items-center border rounded">
              <FaUser  className="text-gray-400 ml-2" />
              <input
                className={`shadow appearance-none border-none rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing ? 'bg-gray-200' : 'bg-white'}`}
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="mb-4 pr-12">
            <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="username">
            ユーザー名
            </label>
            <div className="flex items-center border rounded">
              <FaUser  className="text-gray-400 ml-2" />
              <input
                className={`shadow appearance-none border-none rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing ? 'bg-gray-200' : 'bg-white'}`}
                id="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            {errorUsername && <p className="text-red-500 text-sm">{errorUsername}</p>}
          </div>

          <div className="mb-4 pr-12">
            <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="email">
            電子メール
            </label>
            <div className="flex items-center border rounded">
              <FaEnvelope className="text-gray-400 ml-2" />
              <input
                className="shadow appearance-none border-none rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                id="email"
                type="email"
                value={formData.email}
                readOnly={true}
              />
            </div>
          </div>

          <div className="mb-4 pr-10">
            <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="phone">
            電話
            </label>
            <div className="flex items-center border rounded">
              <FaPhone className="text-gray-400 ml-2" />
              <input
                className={`shadow appearance-none border-none rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEditing ? 'bg-gray-200' : 'bg-white'}`}
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
            {errorPhone && <p className="text-red-500 text-sm">{errorPhone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;