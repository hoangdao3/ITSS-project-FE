import React from 'react';

const Sidebar = () => (
    <div className="bg-gray-100 w-64 h-screen p-4 flex flex-col justify-between">
        <div>
            <div className="flex items-center mb-8">
                <div className="bg-blue-500 p-4 rounded-full">
                    <i className="fas fa-calendar-alt text-3xl text-white"></i>
                </div>
                <span className="ml-4 text-4xl font-bold">運動カレンダー</span>
            </div>
            <nav>
                <ul>
                    <li className="mb-4 flex items-center">
                        <i className="fas fa-calendar-alt text-xl"></i>
                        <span className="ml-2 text-xl">Calendar</span>
                    </li>
                    <li className="mb-4 flex items-center">
                        <i className="fas fa-dumbbell text-xl"></i>
                        <span className="ml-2 text-xl">List Of Exercises</span>
                    </li>
                    <li className="mb-4 flex items-center">
                        <i className="fas fa-comments text-xl"></i>
                        <span className="ml-2 text-xl">Consults</span>
                    </li>
                    <li className="mb-4 flex items-center">
                        <i className="fas fa-cog text-xl"></i>
                        <span className="ml-2 text-xl">Settings</span>
                    </li>
                </ul>
            </nav>
        </div>
        <button className="bg-gray-500 text-white py-2 px-4 rounded flex items-center">
            <i className="fas fa-sign-out-alt"></i>
            <span className="ml-2 text-xl">Logout</span>
        </button>
    </div>
);

export default Sidebar;
