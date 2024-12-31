import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Calendar2 = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showExerciseDialog, setShowExerciseDialog] = useState(false);
  const [showChooseExerciseDialog, setShowChooseExerciseDialog] = useState(false);
  const [showHintExerciseDialog, setShowHintExerciseDialog] = useState(false);
  const [showYourExerciseDialog, setShowYourExerciseDialog] = useState(false);
  const [showWorkDialog, setShowWorkDialog] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseType, setSelectedExerciseType] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [workNote, setWorkNote] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exerciseNote, setExerciseNote] = useState("");
  const [hintExerciseContent, setHintExerciseContent] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const monthNames = [
    "1月","2月","3月","4月","5月","6月",
    "7月","8月","9月","10月","11月","12月"
    ];
  const exerciseHints = [
    "腕立て伏せ 50回",
    "懸垂 10回",
    "ジョギング 10分",
    "スクワット 30回",
    "デッドリフト 15回",
    "プランク 1分",
    "ランジ 片足20回",
    "バーピー 15回",
    "マウンテンクライマー 30秒",
    "ジャンピングジャック 1分",
    "レッグレイズ 20回",
    "トライセプスディップ 15回",
    "バイシクルクランチ 20回",
    "ロシアンツイスト 30回",
    "ケトルベルスイング 15回",
    "ボックスジャンプ 10回",
    "サイドプランク 片側30秒",
    "グルートブリッジ 20回",
    "ハイニーズ 1分",
    "ウォールシット 1分",
    "ダンベルロー 片手15回",
    "チェストプレス 15回",
    "ショルダープレス 15回",
    "バイセップカール 15回",
    "トライセプスエクステンション 15回",
    "カーフレイズ 20回",
    "サイドランジ 片足15回",
    "プランクジャック 30秒",
    "フラッターキック 30秒",
    "T-腕立て伏せ 10回",
    "スモースクワット 20回",
    "パイク腕立て伏せ 10回",
    "クマ歩き 30秒",
    "ジャンプスクワット 15回",
    "ラテラルレイズ 15回",
    "リバースクランチ 20回",
    "メディスンボールスラム 15回",
    "スケーター 30秒",
    "ウォール腕立て伏せ 15回",
    "スタビリティボールパス 15回",
    "片足デッドリフト 片足10回",
    "クラブウォーク 30秒",
    "ヒップスラスト 20回",
    "ダンベルフライ 15回",
    "プランクから腕立て伏せ 10回",
    "サイドレッグレイズ 片足15回",
    "インチワーム 10回",
    "ひざつき腕立て伏せ 15回",
    "タックジャンプ 10回",
    "ライイングレッグカール 15回",
    "シーテッドロー 15回",
    "ケーブルクロスオーバー 15回",
    "スレッジハンマー 15回",
    "縄跳び 5分"
  ];

  const exerciseTypeMap = {
    'WORK': '仕事',
    'HINT': 'ヒント練習',
    'YOUR': 'あなたのエクササイズ'
  };

  const dayNames = ["日","月","火","水","秋","金","土"];

  useEffect(() => {
    fetchExercises();
  }, [currentMonth, currentYear]);

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/exercises/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const isStartTimeBeforeEndTime = (startDate, startTime, endDate, endTime) => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    return start < end;
  };
  const renderExerciseDetails = (exercise) => {
    const commonDetails = (
      <>
        <p><strong>タイプ:</strong> {exerciseTypeMap[exercise.type]}</p>
        <p><strong>開始時間:</strong> {new Date(exercise.startTime).toLocaleString()}</p>
        <p><strong>終了時間:</strong> {new Date(exercise.endTime).toLocaleString()}</p>
      </>
    );

    switch (exercise.type) {
      case 'WORK':
        return (
          <>
            {commonDetails}
            <div className="mt-4">
              <p><strong>作業説明：</strong></p>
              <p className="mt-2 p-2 bg-gray-50 rounded">{exercise.description}</p>
              {exercise.note && (
                <>
                  <p className="mt-4"><strong>注意事項：</strong></p>
                  <p className="mt-2 p-2 bg-gray-50 rounded">{exercise.note}</p>
                </>
              )}
            </div>
          </>
        );
      
      case 'HINT':
        return (
          <>
            {commonDetails}
            <div className="mt-4">
              <p><strong>提案された運動：</strong></p>
              <p className="mt-2 p-2 bg-gray-50 rounded">{exercise.description}</p>
            </div>
          </>
        );
      
      case 'YOUR':
        const [exerciseName, exerciseDesc] = exercise.description.split(': ');
        return (
          <>
            {commonDetails}
            <div className="mt-4">
              <p><strong>演習名：</strong></p>
              <p className="mt-2 p-2 bg-gray-50 rounded">{exerciseName}</p>
              
              <p className="mt-4"><strong>説明：</strong></p>
              <p className="mt-2 p-2 bg-gray-50 rounded">{exerciseDesc}</p>
              
              {exercise.note && (
                <>
                  <p className="mt-4"><strong>注意事項：</strong></p>
                  <p className="mt-2 p-2 bg-gray-50 rounded">{exercise.note}</p>
                </>
              )}
            </div>
          </>
        );
      
      default:
        return commonDetails;
    }
  };
  const ExerciseDetailDialog = ({ exercise, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[32rem] max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b">
            {exerciseTypeMap[exercise.type]}の詳細
          </h2>
          
          <div className="space-y-4">
            {renderExerciseDetails(exercise)}
          </div>

          <div className="mt-6 pt-4 border-t flex justify-end">
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition duration-200"
              onClick={onClose}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExerciseIndicators = (date) => {
    const dayExercises = getExercisesForDate(date);
    return (
      <div className="flex flex-col gap-1 w-full mx-auto">
        <div className="max-h-24 overflow-y-auto">
          {dayExercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className={`${getExerciseColor(exercise.type)} p-1 text-xs rounded mb-1 truncate w-full text-center cursor-pointer`}
              title={`${exercise.description} (${new Date(exercise.startTime).toLocaleTimeString()} - ${new Date(exercise.endTime).toLocaleTimeString()})`}
              onClick={() => handleExerciseClick(exercise)}
            >
              {exercise.description.substring(0, 15)}...
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatDateTime = (date, time) => {
    const formattedDate = date;
    const formattedTime = time + ':00';
    return `${formattedDate}T${formattedTime}`;
  };

  const handleWorkSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const workoutData = {
        startTime: formatDateTime(startDate, startTime),
        endTime: formatDateTime(endDate, endTime),
        exerciseType: "WORK",
        description: workDescription,
        note: workNote
      };

      await axios.post("http://localhost:8080/api/exercises", workoutData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowWorkDialog(false);
      resetFormFields();
      fetchExercises();
    } catch (error) {
      console.error("作業演習の作成中にエラーが発生しました:", error);
      alert("作業演習の作成に失敗しました");
    }
  };

  const handleHintExerciseSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const hintData = {
        startTime: formatDateTime(startDate, startTime),
        endTime: formatDateTime(endDate, endTime),
        exerciseType: "HINT",
        description: hintExerciseContent,
        note: ""
      };

      await axios.post("http://localhost:8080/api/exercises", hintData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowHintExerciseDialog(false);
      resetFormFields();
      fetchExercises();
    } catch (error) {
      console.error("ヒント演習の作成中にエラーが発生しました:", error);
      alert("ヒント演習の作成に失敗しました");
    }
  };

  const handleYourExerciseSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const yourExerciseData = {
        startTime: formatDateTime(startDate, startTime),
        endTime: formatDateTime(endDate, endTime),
        exerciseType: "YOUR",
        description: `${exerciseName}: ${exerciseDescription}`,
        note: exerciseNote
      };

      await axios.post("http://localhost:8080/api/exercises", yourExerciseData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowYourExerciseDialog(false);
      resetFormFields();
      fetchExercises();
    } catch (error) {
      console.error("演習の作成中にエラーが発生しました:", error);
      alert("エクササイズを作成できませんでした");
    }
  };

  const resetFormFields = () => {
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setWorkDescription("");
    setWorkNote("");
    setExerciseName("");
    setExerciseDescription("");
    setExerciseNote("");
    setHintExerciseContent("");
  };

  const getExerciseColor = (type) => {
    switch (type) {
      case 'WORK':
        return 'bg-green-200';
      case 'HINT':
        return 'bg-yellow-200';
      case 'YOUR':
        return 'bg-blue-200';
      default:
        return '';
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
  };

  const getExercisesForDate = (date) => {
    return exercises.filter(exercise => {
      const exerciseDate = new Date(exercise.startTime);
      return (
        exerciseDate.getDate() === date &&
        exerciseDate.getMonth() === currentMonth &&
        exerciseDate.getFullYear() === currentYear
      );
    });
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
  
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDay = getDaysInMonth(currentMonth - 1, currentYear) - firstDay + i + 1;
      days.push(
        <td key={`prev-${i}`} className="border p-1 h-20 bg-gray-50"> 
          <div className="flex flex-col h-24"> 
            <div className="text-sm text-gray-400">{prevMonthDay}</div>
          </div>
        </td>
      );
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentDay = isToday(day);
      days.push(
        <td key={day} className={`border p-1 h-20 ${isCurrentDay ? 'bg-blue-50' : ''}`}> 
          <div className="flex flex-col h-24"> 
            <div className={`text-sm ${isCurrentDay ? 'font-bold text-blue-600' : ''}`}>
              {day}
            </div>
            <div className="w-full">
              {renderExerciseIndicators(day)}
            </div>
          </div>
        </td>
      );
    }
  
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const nextMonthDays = totalCells - (firstDay + daysInMonth);
  
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <td key={`next-${i}`} className="border p-1 h-20 bg-gray-50">
          <div className="flex flex-col h-24">
            <div className="text-sm text-gray-400">{i}</div>
          </div>
        </td>
      );
    }
  
    const rows = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(<tr key={i}>{days.slice(i, i + 7)}</tr>);
    }
  
    return rows;
  };
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const DateTimeInputs = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2">開始日:</label>
        <input
          type="date"
          className="w-full border px-2 py-1"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">開始時間:</label>
        <input
          type="time"
          className="w-full border px-2 py-1"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">終了日:</label>
        <input
          type="date"
          className="w-full border px-2 py-1"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">終了時間:</label>
        <input
          type="time"
          className="w-full border px-2 py-1"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
    </>
  );

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-200 h-[100vh] flex flex-col">
      <div className="wrapper bg-white rounded shadow w-full flex-1 overflow-auto">
        <div className="header flex justify-between border-b p-4">
          <span className="text-xl font-bold">
            {`${monthNames[currentMonth]} ${currentYear}`}
          </span>
          <div className="buttons">
            <button
              className="p-2 mx-1 hover:bg-gray-100 rounded"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <button
              className="p-2 mx-1 hover:bg-gray-100 rounded"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600"
              onClick={() => setShowExerciseDialog(true)}
            >
              新しいエクササイズを追加
            </button>
          </div>
        </div>

        <table className="w-full table-fixed">
          <thead>
            <tr>
              {dayNames.map((day, index) => (
                <th key={index} className="w-1/7 p-2 border-r h-10 bg-gray-50">
                  <span className="text-gray-600">{day}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderDays()}
          </tbody>
        </table>
      </div>

      {showExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">新しいエクササイズを追加</h2>
            <DateTimeInputs />
            <div className="flex justify-between">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setShowExerciseDialog(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (!startDate || !startTime || !endDate || !endTime) {
                    alert("日付と時刻のフィールドをすべて入力してください。");
                    return;
                  }

                  if (!isStartTimeBeforeEndTime(startDate, startTime, endDate, endTime)) {
                    alert("開始時間は終了時間より前である必要があります。");
                    return;
                  }

                  setShowChooseExerciseDialog(true);
                  setShowExerciseDialog(false);
                }}
              >
                次
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
              <button className="bg-gray-200 px-2 py-2 rounded" onClick={() => {
                setSelectedExerciseType("exercise1");
                setShowWorkDialog(true);
                setShowChooseExerciseDialog(false);
              }}>
                仕事
              </button>
              <button className="bg-gray-200 px-2 py-2 rounded" onClick={() => {
                setSelectedExerciseType("exercise2");
                const randomHintIndex = Math.floor(Math.random() * exerciseHints.length);
                setHintExerciseContent(exerciseHints[randomHintIndex]);
                setShowHintExerciseDialog(true);
                setShowChooseExerciseDialog(false);
              }}>
                ヒント練習
              </button>
              <button className="bg-gray-200 px-2 py-2 rounded" onClick={() => {
                setSelectedExerciseType("exercise3");
                setShowYourExerciseDialog(true);
                setShowChooseExerciseDialog(false);
              }}>
                あなたのエクササイズ
              </button>
            </div>
          </div>
        </div>
      )}

      {showWorkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">作業演習を追加する</h2>
            <div className="mb-4">
              <label className="block mb-2">説明：</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={4}
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">注意事項:</label>
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
                onClick={() => setShowWorkDialog(false)}
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

      {showYourExerciseDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">あなたのエクササイズ</h2>
            <div className="mb-4">
              <label className="block mb-2">演習名:</label>
              <input
                className="w-full border px-2 py-1"
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">説明:</label>
              <textarea
                className="w-full border px-2 py-1 resize-none"
                rows={4}
                value={exerciseDescription}
                onChange={(e) => setExerciseDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">注意事項:</label>
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
                onClick={() => setShowYourExerciseDialog(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleYourExerciseSubmit}
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
            <h2 className="text-xl font-semibold mb-4 text-center">ヒント演習</h2>
            <p className="text-gray-700 mb-6">{hintExerciseContent}</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                onClick={() => setShowHintExerciseDialog(false)}
              >
                キャンセル
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={handleHintExerciseSubmit}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
     {selectedExercise && (
        <ExerciseDetailDialog 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)} 
        />
      )}
    </div>
  );
};

export default Calendar2;