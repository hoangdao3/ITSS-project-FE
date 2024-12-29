// LisExercises.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LisExercises = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("data_exercises.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.exercises);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleExerciseClick = (exerciseId) => {
    navigate(`/list-exercises/id=${exerciseId}`);
  };

  return (
    <div className="flex flex-col p-8 pl-20 pr-20 justify-center">
      <div className="p-6 bg-gray-100 rounded-tl-3xl rounded-tr-3xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">演習のリスト</h1>
      </div>
      <div className="font-[sans-serif] overflow-hidden">
        <table className="min-w-full bg-gray-100 table-fixed">
          <thead className="whitespace-nowrap">
            <tr>
              <th className="w-1/2 p-4 text-left text-sm font-semibold text-black border-b border-gray-200">
                名前
              </th>
              <th className="w-1/4 p-4 text-left text-sm font-semibold text-black border-b border-gray-200">
                時間
              </th>
              <th className="w-1/4 p-4 text-left text-sm font-semibold text-black border-b border-gray-200">
                レベル
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className={item.id % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}
              >
                <td className="w-1/2 p-4 text-sm border-b border-gray-200">
                  <div className="flex items-center">
                    <button
                      className="text-sm text-blue-500 hover:underline cursor-pointer text-left"
                      onClick={() => handleExerciseClick(item.id)}
                    >
                      {item.title}
                    </button>
                  </div>
                </td>
                <td className="w-1/4 p-4 text-sm text-black border-b border-gray-200">
                  {item.duration}
                </td>
                <td className="w-1/4 p-4 text-sm text-black border-b border-gray-200">
                  {item.level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-8 bg-gray-100 rounded-bl-3xl rounded-br-3xl">
        <div className="pr-8">
          <ul className="flex space-x-2 justify-end mt-3 font-[sans-serif]">
            <li
              className={`flex items-center justify-center shrink-0 ${
                currentPage === 1 ? "bg-gray-200" : "cursor-pointer"
              } w-9 h-9 rounded-md`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-300"
                viewBox="0 0 55.753 55.753"
              >
                <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
              </svg>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md ${
                  currentPage === index + 1 ? "bg-blue-100" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
            <li
              className={`flex items-center justify-center shrink-0 ${
                currentPage === totalPages ? "bg-gray-200" : "cursor-pointer"
              } w-9 h-9 rounded-md`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-500 rotate-180"
                viewBox="0 0 55.753 55.753"
              >
                <path d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z" />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LisExercises;