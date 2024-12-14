import React, { useState, useEffect } from "react";
import "./Calendar.module.css";
import { Navigate } from "react-router-dom";

const Calendar = () => {


  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showDialog, setShowDialog] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [todayDate, setTodayDate] = useState(() => {
    const storedToday = localStorage.getItem("todayDate");
    return storedToday ? parseInt(storedToday, 10) : new Date().getDate();
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [showChooseExerciseDialog, setShowChooseExerciseDialog] =
    useState(false);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [showHintExerciseDialog, setShowHintExerciseDialog] = useState(false);
  const [hintExerciseContent, setHintExerciseContent] = useState("");
  const [showYourExerciseDialog, setShowYourExerciseDialog] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exerciseNote, setExerciseNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    localStorage.setItem("todayDate", todayDate);
  }, [todayDate]);
  
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const dayNames = ["CN", "Th 2 ", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const [showWorkDialog, setShowWorkDialog] = useState(false); // Kiểm tra dialog thêm work
  const [workDescription, setWorkDescription] = useState(""); // Lưu trữ mô tả của work
  const [workNote, setWorkNote] = useState(""); // Lưu trữ ghi chú của work

  const openWorkDialog = () => setShowWorkDialog(true);
  const closeWorkDialog = () => setShowWorkDialog(false);

  const handleWorkSubmit = () => {
    alert(`Work Description: ${workDescription}\nWork Note: ${workNote}`);
    closeWorkDialog();
    setWorkDescription("");
    setWorkNote("");
  };

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  const updateDate = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setCurrentWeek(0);
    closeDialog();
  };

  const getFirstDayOfMonth = (month, year) => {
    const date = new Date(year, month, 1);
    return date.getDay();
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const getDaysInPreviousMonth = (month, year) => {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    return getDaysInMonth(prevMonth, prevYear);
  };

  const getDaysOfCurrentWeek = (month, year, weekIndex) => {
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;

    let days = [];
    const firstDayOfWeek = weekIndex * 7 - firstDay;

    for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
      if (i >= 0 && i < daysInMonth) {
        days.push(i + 1);
      } else if (i < 0) {
        const dayFromPreviousMonth =
          getDaysInPreviousMonth(prevMonth, prevYear) + i + 1;
        days.push(dayFromPreviousMonth);
      } else {
        const dayFromNextMonth = i - daysInMonth + 1;
        days.push(dayFromNextMonth);
      }
    }
    return days;
  };

  const goToNextWeek = () => setCurrentWeek((prev) => prev + 1);
  const goToPreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek((prev) => prev - 1);
    } else if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
      setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
      setCurrentWeek(
        Math.floor(getDaysInMonth(currentMonth, currentYear) / 7) - 1
      );
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setTodayDate(today.getDate());
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const todayDate = today.getDate();

    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);

    const firstDayOfMonth = getFirstDayOfMonth(todayMonth, todayYear);
    const daysInMonth = getDaysInMonth(todayMonth, todayYear);
    const weekIndex = Math.floor((todayDate + firstDayOfMonth - 1) / 7);

    setCurrentWeek(weekIndex);
  };

  const openExerciseDialog = () => setShowExerciseDialog(true);
  const closeExerciseDialog = () => setShowExerciseDialog(false);
  const openChooseExerciseDialog = () => setShowChooseExerciseDialog(true);
  const closeChooseExerciseDialog = () => setShowChooseExerciseDialog(false);
  const openYourExerciseDialog = () => setShowYourExerciseDialog(true);
  const closeYourExerciseDialog = () => setShowYourExerciseDialog(false);

  const handleExerciseSubmit = () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      alert("完全な開始日時と終了日時を選択してください。");
      return;
    }

    openChooseExerciseDialog();
    closeExerciseDialog();
  };

  const handleChooseExerciseSubmit = () => {
    if (selectedExerciseType === "練習1") {
      openWorkDialog();
    } else if (selectedExerciseType === "練習2") {
      const exerciseHints = [
        "ヒント 1: 正しいキーワードを使用することを忘れないでください。",
        "ヒント2: 詳細についてはドキュメントを確認してください.",
      ];
      const randomHintIndex = Math.floor(Math.random() * exerciseHints.length);
      setHintExerciseContent(exerciseHints[randomHintIndex]);

      setShowHintExerciseDialog(true);
    } else if (selectedExerciseType === "練習3") {
      openYourExerciseDialog();
    } else {
      alert(`エクササイズの種類を選択しました: ${selectedExerciseType}`);
    }
    closeChooseExerciseDialog();
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4 pl-8 pr-5">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={handleTodayClick}
        >
          今日
        </button>
        <div>
          <button className="px-2" onClick={goToPreviousWeek}>
            &lt;
          </button>
          <span className="mx-2 cursor-pointer" onClick={openDialog}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button className="px-2" onClick={goToNextWeek}>
            &gt;
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-4"
            onClick={openExerciseDialog}
          >
            新しいエクササイズ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 text-center">
        <div className="col-span-1"></div>
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            className={`${todayDate === index + 1 ? "text-blue-500" : ""}`}
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 gap-2 mt-2">
        <div className="col-span-1 text-center pr-2 pt-8">
          {Array.from({ length: 23 }, (_, i) => (
            <div key={i} className="h-8">
              {i + 1}:00
            </div>
          ))}
        </div>
        <div className="col-span-7 grid grid-cols-7 gap-2">
          {(() => {
            const days = getDaysOfCurrentWeek(
              currentMonth,
              currentYear,
              currentWeek
            );

            return days.map((day, index) => (
              <div
                key={`day-${index}`}
                className={`text-center ${
                  day === todayDate ? "text-blue-500" : ""
                }`}
              >
                {day ? day : ""}
              </div>
            ));
          })()}
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">日付を選択してください</h2>
            <div className="mb-4">
              <label className="block mb-2">月:</label>
              <select
                className="w-full border px-2 py-1"
                defaultValue={currentMonth}
                id="month-select"
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">年:</label>
              <input
                className="w-full border px-2 py-1"
                type="number"
                defaultValue={currentYear}
                id="year-input"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeDialog}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  updateDate(
                    parseInt(document.getElementById("month-select").value),
                    parseInt(document.getElementById("year-input").value)
                  )
                }
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">新しい演習を追加する</h2>

            {/* Ngày giờ bắt đầu */}
            <div className="mb-4">
              <label className="block mb-2">開始日:</label>
              <input
                className="w-full border px-2 py-1"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">開始時間:</label>
              <input
                className="w-full border px-2 py-1"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            {/* Ngày giờ kết thúc */}
            <div className="mb-4">
              <label className="block mb-2">終了日:</label>
              <input
                className="w-full border px-2 py-1"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">終了時刻:</label>
              <input
                className="w-full border px-2 py-1"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeExerciseDialog}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExerciseSubmit}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showWorkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">作業を追加する</h2>
            <div className="mb-4">
              <label className="block mb-2">説明する:</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={4}
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Ghi chú:</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={2}
                value={workNote}
                onChange={(e) => setWorkNote(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeWorkDialog}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleWorkSubmit}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
      {showChooseExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">エクササイズの種類を選択してください</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                className="bg-gray-200 px-2 py-2 rounded"
                onClick={() => {
                  closeChooseExerciseDialog();

                  setSelectedExerciseType("exercise1");
                  openWorkDialog();

                  setShowWorkDialog(true);
                }}
              >
                仕事
              </button>
              <button
                className="bg-gray-200 px-2 py-2 rounded"
                onClick={() => {
                  setSelectedExerciseType("exercise2");
                  const exerciseHints = [
                    "Hint 1: Remember to use the correct keywords.",
                    "Hint 2: Check the documentation for more information.",
                  ];
                  const randomHintIndex = Math.floor(
                    Math.random() * exerciseHints.length
                  );
                  closeChooseExerciseDialog();
                  setHintExerciseContent(exerciseHints[randomHintIndex]);
                  setShowHintExerciseDialog(true);
                }}
              >
                ヒント練習
              </button>
              <button
                className="bg-gray-200 px-2 py-2 rounded"
                onClick={() => {
                  closeChooseExerciseDialog();
                  setSelectedExerciseType("exercise3");
                  openYourExerciseDialog();
                }}
              >
               あなたのエクササイズ
              </button>
            </div>
          </div>
        </div>
      )}

      {showYourExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">あなたのエクササイズ</h2>
            <div className="mb-4">
              <label className="block mb-2">エクササイズ名:</label>
              <input
                className="w-full border px-2 py-1"
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">説明する：</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={4}
                value={exerciseDescription}
                onChange={(e) => setExerciseDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">注記:</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={2}
                value={exerciseNote}
                onChange={(e) => setExerciseNote(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeYourExerciseDialog}
              >
                近い
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  alert(
                    `Tên bài tập: ${exerciseName}\nMô tả: ${exerciseDescription}\nGhi chú: ${exerciseNote}`
                  );
                  closeYourExerciseDialog();
                  setExerciseName("");
                  setExerciseDescription("");
                  setExerciseNote("");
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {showHintExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
            ヒント練習
            </h2>
            <p className="text-gray-700 mb-6">{hintExerciseContent}</p>
            <div className="flex justify-center">
              <button
                className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => setShowHintExerciseDialog(false)}
              >
                近い
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
