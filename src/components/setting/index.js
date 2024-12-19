import React, { useState } from "react";

const SettingPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-7">
      <div className="p-7 bg-gray-100 rounded-2xl">
        <div className="flex justify-between items-center h-full p-4">
          <div>
            <div className="flex items-center cursor-pointer w-max h-max ml-5">
              <img
                src="https://readymadeui.com/profile_4.webp"
                alt="Profile"
                className="w-24 h-24 rounded-full shrink-0"
              />
              <div className="ml-4">
                <p className="text-3xl text-black">Gladys Jones</p>
                <p className="text-lg text-gray-500 mt-0.5">
                  jennie@example.com
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-7 py-3 mr-14 rounded"
            >
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 pr-12 pl-12">
          <div className="mb-4 pr-12">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="username"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Fullname"
            />
          </div>
          <div className="mb-4 pr-10">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4 pr-12">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="password"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Username"
            />
          </div>
          <div className="mb-4 pr-10">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Phone"
            />
          </div>
          <div className="mb-4 pr-12">
            <label
              className="block text-gray-700 text-m font-bold mb-2"
              htmlFor="address"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Password"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-10 bg-gray-100 p-8 items-center rounded-2xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Notification</h1>
          <label class="relative cursor-pointer mr-24">
            <input type="checkbox" class="sr-only peer" checked />
            <div class="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
          </label>
        </div>
        <div>
          <div className="pr-8">
            <div class="space-y-4">
              <div>
                <select
                  id="category"
                  class="mt-1 block w-full py-4 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="electronics">English</option>
                  <option value="clothing">Nihongo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Dark mode</h1>
          <label class="relative cursor-pointer mr-24">
            <input type="checkbox" class="sr-only peer" />
            <div class="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
