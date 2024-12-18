import { IoMdNotifications } from "react-icons/io";
import React, { useState } from "react";
import "./Calendar.module.css";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false); // Đóng profile nếu đang mở
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    if (showNotifications) setShowNotifications(false); // Đóng notifications nếu đang mở
  };

  return (
    <div>
      <div className="relative">
        {/* Header */}
        <div className="flex justify-end items-center p-8 border-b pr-10">
          <div className="flex items-center">
            <div
              className="cursor-pointer flex items-center"
              onClick={toggleNotifications}
            >
              <IoMdNotifications
                className="svg-big pr-4"
                style={{ fontSize: "50px", color: "#000000" }}
              />
            </div>
            <div className="w-10 h-10 cursor-pointer" onClick={toggleProfile}>
              <img
                src="/user1.png"
                alt="User Profile"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Notifications Popup */}
        {showNotifications && (
          <div
            className="absolute right-0 top-16 w-96 bg-white shadow-lg rounded-lg p-4 z-50"
            id="notification"
            style={{
              maxHeight: "550px",
              overflowY: "auto",
              width: "450px",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold leading-6 text-gray-800">
                Notifications
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
              {/* Notification Item */}
              <div className="w-full p-3 mt-4 bg-blue-100 rounded flex items-center">
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
                  <p className="text-sm leading-none">
                    リマインダー:
                    今日は次の場所でトレーニングセッションがあります{" "}
                    <span className="text-indigo-700">5:00 PM</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    装備を忘れずにお持ちください!
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-yellow-100 rounded flex items-center">
                <div className="w-8 h-8 border rounded-full border-yellow-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.33333C8.17681 1.33333 8.34638 1.40357 8.4714 1.52859C8.59642 1.65361 8.66666 1.82318 8.66666 2V8.66666H14C14.1768 8.66666 14.3464 8.7369 14.4714 8.86192C14.5964 8.98694 14.6667 9.15651 14.6667 9.33333C14.6667 9.51014 14.5964 9.67971 14.4714 9.80473C14.3464 9.92976 14.1768 10 14 10H8C7.82318 10 7.65361 9.92976 7.52859 9.80473C7.40357 9.67971 7.33333 9.51014 7.33333 9.33333V2C7.33333 1.82318 7.40357 1.65361 7.52859 1.52859C7.65361 1.40357 7.82318 1.33333 8 1.33333ZM8 14C8.17681 14 8.34638 14.0702 8.4714 14.1953C8.59642 14.3203 8.66666 14.4899 8.66666 14.6667C8.66666 14.8435 8.59642 15.0131 8.4714 15.1381C8.34638 15.2631 8.17681 15.3333 8 15.3333C7.82318 15.3333 7.65361 15.2631 7.52859 15.1381C7.40357 15.0131 7.33333 14.8435 7.33333 14.6667C7.33333 14.4899 7.40357 14.3203 7.52859 14.1953C7.65361 14.0702 7.82318 14 8 14Z"
                      fill="#F59E0B"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    システムメンテナンスの予定日時t{" "}
                    <span className="text-indigo-700">12:00 AM</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    作業内容を保存してください。
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-purple-100 rounded flex items-center">
                <div className="w-8 h-8 border rounded-full border-purple-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.33333C8.17681 1.33333 8.34638 1.40357 8.4714 1.52859C8.59642 1.65361 8.66666 1.82318 8.66666 2V8.66666H14C14.1768 8.66666 14.3464 8.7369 14.4714 8.86192C14.5964 8.98694 14.6667 9.15651 14.6667 9.33333C14.6667 9.51014 14.5964 9.67971 14.4714 9.80473C14.3464 9.92976 14.1768 10 14 10H8C7.82318 10 7.65361 9.92976 7.52859 9.80473C7.40357 9.67971 7.33333 9.51014 7.33333 9.33333V2C7.33333 1.82318 7.40357 1.65361 7.52859 1.52859C7.65361 1.40357 7.82318 1.33333 8 1.33333ZM8 14C8.17681 14 8.34638 14.0702 8.4714 14.1953C8.59642 14.3203 8.66666 14.4899 8.66666 14.6667C8.66666 14.8435 8.59642 15.0131 8.4714 15.1381C8.34638 15.2631 8.17681 15.3333 8 15.3333C7.82318 15.3333 7.65361 15.2631 7.52859 15.1381C7.40357 15.0131 7.33333 14.8435 7.33333 14.6667C7.33333 14.4899 7.40357 14.3203 7.52859 14.1953C7.65361 14.0702 7.82318 14 8 14Z"
                      fill="#8B5CF6"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    新機能リリース:{" "}
                    <span className="text-indigo-700">ダークモード</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    設定で試してみてください。
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-green-100 rounded flex items-center">
                <div className="w-8 h-8 border rounded-full border-green-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                      fill="#047857"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    タスク <span className="text-indigo-700">#12345</span>{" "}
                    完了しました
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    ちょうど今
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-orange-100 rounded flex items-center">
                <div className="w-8 h-8 border rounded-full border-orange-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.33333C8.17681 1.33333 8.34638 1.40357 8.4714 1.52859C8.59642 1.65361 8.66666 1.82318 8.66666 2V8.66666H14C14.1768 8.66666 14.3464 8.7369 14.4714 8.86192C14.5964 8.98694 14.6667 9.15651 14.6667 9.33333C14.6667 9.51014 14.5964 9.67971 14.4714 9.80473C14.3464 9.92976 14.1768 10 14 10H8C7.82318 10 7.65361 9.92976 7.52859 9.80473C7.40357 9.67971 7.33333 9.51014 7.33333 9.33333V2C7.33333 1.82318 7.40357 1.65361 7.52859 1.52859C7.65361 1.40357 7.82318 1.33333 8 1.33333ZM8 14C8.17681 14 8.34638 14.0702 8.4714 14.1953C8.59642 14.3203 8.66666 14.4899 8.66666 14.6667C8.66666 14.8435 8.59642 15.0131 8.4714 15.1381C8.34638 15.2631 8.17681 15.3333 8 15.3333C7.82318 15.3333 7.65361 15.2631 7.52859 15.1381C7.40357 15.0131 7.33333 14.8435 7.33333 14.6667C7.33333 14.4899 7.40357 14.3203 7.52859 14.1953C7.65361 14.0702 7.82318 14 8 14Z"
                      fill="#F97316"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    リマインダー: 会議の開始時間は{" "}
                    <span className="text-indigo-700">30分</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    遅れないように！
                  </p>
                </div>
              </div>
              <h2 className="text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600">
                昨日
              </h2>
              <div className="w-full p-3 mt-6 bg-white rounded flex">
                <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                      fill="#4338CA"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    <span className="text-indigo-700">サラ</span>スレッドに投稿:{" "}
                    <span className="text-indigo-700">
                      アップデートが失敗しました
                    </span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    2時間前
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-white rounded flex">
                <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99992 1.33333C8.17673 1.33333 8.3463 1.40357 8.47132 1.52859C8.59635 1.65361 8.66659 1.82318 8.66659 1.99999V3.99999C8.66659 4.17681 8.59635 4.34638 8.47132 4.4714C8.3463 4.59642 8.17673 4.66666 7.99992 4.66666C7.82311 4.66666 7.65354 4.59642 7.52851 4.4714C7.40349 4.34638 7.33325 4.17681 7.33325 3.99999V1.99999C7.33325 1.82318 7.40349 1.65361 7.52851 1.52859C7.65354 1.40357 7.82311 1.33333 7.99992 1.33333ZM7.99992 11.3333C8.17673 11.3333 8.3463 11.4036 8.47132 11.5286C8.59635 11.6536 8.66659 11.8232 8.66659 12V14C8.66659 14.1768 8.59635 14.3464 8.47132 14.4714C8.3463 14.5964 8.17673 14.6667 7.99992 14.6667C7.82311 14.6667 7.65354 14.5964 7.52851 14.4714C7.40349 14.3464 7.33325 14.1768 7.33325 14V12C7.33325 11.8232 7.40349 11.6536 7.52851 11.5286C7.65354 11.4036 7.82311 11.3333 7.99992 11.3333ZM14.6666 8C14.6666 8.17681 14.5963 8.34638 14.4713 8.4714C14.3463 8.59642 14.1767 8.66666 13.9999 8.66666H11.9999C11.8231 8.66666 11.6535 8.59642 11.5285 8.4714C11.4035 8.34638 11.3333 8.17681 11.3333 8C11.3333 7.82318 11.4035 7.65361 11.5285 7.52859C11.6535 7.40357 11.8231 7.33333 11.9999 7.33333H13.9999C14.1767 7.33333 14.3463 7.40357 14.4713 7.52859C14.5963 7.65361 14.6666 7.82318 14.6666 8ZM4.66659 8C4.66659 8.17681 4.59635 8.34638 4.47132 8.4714C4.3463 8.59642 4.17673 8.66666 3.99992 8.66666H1.99992C1.82311 8.66666 1.65354 8.59642 1.52851 8.4714C1.40349 8.34638 1.33325 8.17681 1.33325 8C1.33325 7.82318 1.40349 7.65361 1.52851 7.52859C1.65354 7.40357 1.82311 7.33333 1.99992 7.33333H3.99992C4.17673 7.33333 4.3463 7.40357 4.47132 7.52859C4.59635 7.65361 4.66659 7.82318 4.66659 8ZM12.7139 12.714C12.5889 12.839 12.4194 12.9092 12.2426 12.9092C12.0658 12.9092 11.8963 12.839 11.7713 12.714L10.3573 11.3C10.2358 11.1743 10.1686 11.0059 10.1701 10.8311C10.1717 10.6563 10.2418 10.4891 10.3654 10.3654C10.489 10.2418 10.6562 10.1717 10.831 10.1702C11.0058 10.1687 11.1742 10.2359 11.2999 10.3573L12.7139 11.7707C12.7759 11.8326 12.8251 11.9061 12.8586 11.987C12.8922 12.068 12.9094 12.1547 12.9094 12.2423C12.9094 12.3299 12.8922 12.4167 12.8586 12.4976C12.8251 12.5786 12.7759 12.6521 12.7139 12.714ZM5.64259 5.64266C5.51757 5.76764 5.34803 5.83785 5.17125 5.83785C4.99448 5.83785 4.82494 5.76764 4.69992 5.64266L3.28659 4.22933C3.16149 4.10432 3.09118 3.93474 3.09112 3.7579C3.09105 3.58105 3.16125 3.41142 3.28625 3.28633C3.41126 3.16123 3.58084 3.09092 3.75768 3.09086C3.93453 3.0908 4.10416 3.16099 4.22925 3.28599L5.64259 4.7C5.76757 4.82501 5.83778 4.99455 5.83778 5.17133C5.83778 5.3481 5.76757 5.51764 5.64259 5.64266ZM3.28659 12.714C3.1616 12.589 3.09139 12.4194 3.09139 12.2427C3.09139 12.0659 3.1616 11.8963 3.28659 11.7713L4.70059 10.3573C4.76208 10.2937 4.83565 10.2429 4.91698 10.2079C4.99832 10.173 5.0858 10.1546 5.17432 10.1538C5.26284 10.1531 5.35062 10.1699 5.43256 10.2034C5.51449 10.237 5.58892 10.2865 5.65152 10.3491C5.71411 10.4117 5.76361 10.4861 5.79713 10.568C5.83065 10.65 5.84752 10.7377 5.84675 10.8263C5.84598 10.9148 5.82759 11.0023 5.79265 11.0836C5.75771 11.1649 5.70693 11.2385 5.64325 11.3L4.22992 12.714C4.168 12.776 4.09448 12.8252 4.01355 12.8587C3.93261 12.8923 3.84586 12.9095 3.75825 12.9095C3.67064 12.9095 3.58389 12.8923 3.50296 12.8587C3.42203 12.8252 3.3485 12.776 3.28659 12.714ZM10.3573 5.64266C10.2323 5.51764 10.1621 5.3481 10.1621 5.17133C10.1621 4.99455 10.2323 4.82501 10.3573 4.7L11.7706 3.28599C11.8956 3.1609 12.0652 3.09059 12.242 3.09053C12.4189 3.09046 12.5885 3.16066 12.7136 3.28566C12.8387 3.41067 12.909 3.58025 12.9091 3.75709C12.9091 3.93394 12.8389 4.10357 12.7139 4.22866L11.2999 5.64266C11.1749 5.76764 11.0054 5.83785 10.8286 5.83785C10.6518 5.83785 10.4823 5.76764 10.3573 5.64266Z"
                      fill="#F59E0B"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    注文の発送が遅れています
                    <span className="text-indigo-700"> #25551</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    2時間前
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-white rounded flex">
                <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z"
                      fill="#EF4444"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm leading-none">
                    <span className="text-indigo-700">James Doe</span>
                    お気に入りに追加
                    <span className="text-indigo-700">アイテム</span>
                  </p>
                  <p className="text-xs leading-3 pt-1 text-gray-500">
                    2時間前
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-8 bg-green-100 rounded flex items-center">
                <div className="w-8 h-8 border rounded-full border-green-200 flex flex-shrink-0 items-center justify-center">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                      fill="#047857"
                    />
                  </svg>
                </div>
                <div className="pl-3 w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-none text-green-700">
                      デザインスプリント完了
                    </p>
                    <p className="text-xs leading-3 underline cursor-pointer text-green-700">
                      ビュー
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justiyf-between">
                <hr className="w-full" />
                <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
                  今のところはこれで終わりです :)
                </p>
                <hr className="w-full" />
              </div>
            </div>
          </div>
        )}

        {/* Profile Popup */}
        {showProfile && (
          <div className="absolute right-0 top-16 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <p className="text-xl font-semibold leading-6 text-gray-800">
              ユーザープロフィール
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">名前: John Doe</p>
              <p className="text-sm text-gray-600">
                メール: john.doe@example.com
              </p>
              <button
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => alert("Profile Settings")}
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
