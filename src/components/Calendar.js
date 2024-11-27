import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showDialog, setShowDialog] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0); 
  const [todayDate, setTodayDate] = useState(() => {
    const storedToday = localStorage.getItem('todayDate');
    return storedToday ? parseInt(storedToday, 10) : new Date().getDate();
  });
  const [selectedDate, setSelectedDate] = useState(null); // Lưu trữ ngày được chọn
  const [showExerciseDialog, setShowExerciseDialog] = useState(false); // Kiểm tra dialog thêm bài tập
  const [showChooseExerciseDialog, setShowChooseExerciseDialog] = useState(false); // Kiểm tra dialog chọn loại bài tập
  const [selectedExerciseType, setSelectedExerciseType] = useState(null); // Lưu trữ loại bài tập được chọn

  useEffect(() => {
    localStorage.setItem('todayDate', todayDate);
  }, [todayDate]);

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const dayNames = [
    "CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"
  ];

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
        const dayFromPreviousMonth = getDaysInPreviousMonth(prevMonth, prevYear) + i + 1;
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
      setCurrentWeek(Math.floor(getDaysInMonth(currentMonth, currentYear) / 7) - 1);
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

  const handleExerciseSubmit = () => {
    openChooseExerciseDialog(); // Mở dialog chọn loại bài tập
    closeExerciseDialog();
  };

  const handleChooseExerciseSubmit = () => {
    // Logic to handle the selected exercise type
    alert(`Bạn đã chọn loại bài tập: ${selectedExerciseType}`);
    closeChooseExerciseDialog();
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onClick={handleTodayClick}
        >
          Hôm nay
        </button>
        <div className="flex items-center">
          <button className="px-2" onClick={goToPreviousWeek}>
            &lt; 
          </button>
          <span className="mx-2 cursor-pointer" onClick={openDialog}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button className="px-2" onClick={goToNextWeek}>
             &gt;
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-4" onClick={openExerciseDialog}>
            New Exercise
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 text-center">
        <div className="col-span-1"></div>
        {dayNames.map((dayName, index) => (
          <div
            key={index}
            className={`${
              todayDate === (index + 1) ? 'text-blue- 500' : ''
            }`}
          >
            {dayName}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 gap-2 mt-2">
        <div className="col-span-1 text-right pr-2">
          {Array.from({ length: 23 }, (_, i) => (
            <div key={i} className="h-8">
              {i + 1}:00
            </div>
          ))}
        </div>
        <div className="col-span-7 grid grid-cols-7 gap-2">
          {(() => {
            const days = getDaysOfCurrentWeek(currentMonth, currentYear, currentWeek);

            return days.map((day, index) => (
              <div
                key={`day-${index}`}
                className={`text-center ${day === todayDate ? 'text-blue-500' : ''}`}
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
            <h2 className="text-lg font-bold mb-4">Chọn ngày</h2>
            <div className="mb-4">
              <label className="block mb-2">Tháng:</label>
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
              <label className="block mb-2">Năm:</label>
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
                Hủy
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
                Chọn
              </button> 
            </div>
          </div>
        </div>
      )}

      {showExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Thêm bài tập mới</h2>
            <div className="mb-4">
              <label className="block mb-2">Ngày:</label>
              <input
                className="w-full border px-2 py-1"
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Giờ:</label>
              <input
                className="w-full border px-2 py-1"
                type="time"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeExerciseDialog}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleExerciseSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showChooseExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Chọn loại bài tập</h2>
            <div className="mb-4">
              <label className="block mb-2">Loại bài tập:</label>
              <select
                className="w-full border px-2 py-1"
                value={selectedExerciseType}
                onChange={(e) => setSelectedExerciseType(e.target.value)}
              >
                <option value="exercise1">Work</option>
                <option value="exercise2">Hint Exercise</option>
                <option value="exercise3">Your exercise</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={closeChooseExerciseDialog}
              >
                Hủy
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleChooseExerciseSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;