import React from "react";

const LisExercises = () => {
  return (
    <div className="">
      <div className="flex flex-col p-8 pl-20 pr-20 justify-center">
        <div className="p-6 bg-gray-100 rounded-tl-3xl rounded-tr-3xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">List of Exercises</h1>
          <div className="pr-8">
            <div class="space-y-4">
              <div>
                <select
                  id="category"
                  class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Short by</option>
                  <option value="electronics">Nowest</option>
                  <option value="clothing">Recently</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="font-[sans-serif] overflow-x-auto">
          <table class="min-w-full bg-gray-100">
            <thead class="whitespace-nowrap">
              <tr>
                <th class="p-4 pl-16 text-left text-sm font-semibold text-black  ">
                  Name
                </th>
                <th class="p-4 text-left text-sm font-semibold text-black ">
                  Time
                </th>
                <th class="p-4 text-left text-sm font-semibold text-black">
                  Calories
                </th>
              </tr>
            </thead>

            <tbody class="whitespace-nowrap">
              <tr class="odd:bg-blue-100">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_4.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Gladys Jones</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black">10 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">70 kcal</label>
                </td>
              </tr>

              <tr class="odd:bg-blue-50">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_5.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Jennie Cooper</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">15 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">100 kcal</label>
                </td>
              </tr>

              <tr class="odd:bg-blue-100">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_3.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Philip Steward</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">8 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">30 kcal</label>
                </td>
              </tr>

              <tr class="odd:bg-blue-50">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_2.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Jorge Black</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">8 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">30 kcal</label>
                </td>
              </tr>

              <tr class="odd:bg-blue-100">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_6.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Evan Flores</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">8 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">30 kcal</label>
                </td>
              </tr>
              <tr class="odd:bg-blue-50">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_4.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Gladys Jones</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">8 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">30 kcal</label>
                </td>
              </tr>
              <tr class="odd:bg-blue-100">
                <td class="p-4 text-sm  ">
                  <div class="flex items-center cursor-pointer w-max">
                    <img
                      src="https://readymadeui.com/profile_4.webp"
                      class="w-9 h-9 rounded-full shrink-0"
                    />
                    <div class="ml-4">
                      <p class="text-sm text-black">Gladys Jones</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm text-black  ">8 min</td>
                <td class="p-4  ">
                  <label class="relative cursor-pointer">30 kcal</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-gray-100 rounded-bl-3xl rounded-br-3xl">
          <div className="pr-8">
            <ul class="flex space-x-2 justify-end mt-3 font-[sans-serif]">
              <li class="flex items-center justify-center shrink-0 bg-gray-100 w-9 h-9 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 fill-gray-300"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md bg-blue-100">
                1
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                2
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                3
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                4
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                5
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                ...
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-gray-800 px-[13px] h-9 rounded-md">
                30
              </li>
              <li class="flex items-center justify-center shrink-0 cursor-pointer bg-gray-200 w-9 h-9 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 fill-gray-500 rotate-180"
                  viewBox="0 0 55.753 55.753"
                >
                  <path
                    d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                    data-original="#000000"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LisExercises;
