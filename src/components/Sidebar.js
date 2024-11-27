import React from 'react';

const Sidebar = () => (
    <div className="bg-gray-100 w-64 h-screen p-4">
        <div className="flex items-center mb-8">
            <div className="bg-blue-500 p-2 rounded-full">
                <i className="fas fa-calendar-alt text-white"></i>
            </div>
            <span className="ml-2 text-lg font-bold">運動カレンダー</span>
        </div>
        <nav>
            <ul>
                <li className="mb-4 flex items-center">
                    <i className="fas fa-calendar-alt text-lg"></i>
                    <span className="ml-2 text-lg">Calendar</span>
                </li>
                <li className="mb-4 flex items-center">
                    <i className="fas fa-dumbbell text-lg"></i>
                    <span className="ml-2 text-lg">List Of Exercises</span>
                </li>
                <li className="mb-4 flex items-center">
                    <i className="fas fa-comments text-lg"></i>
                    <span className="ml-2 text-lg">Consults</span>
                </li>
                <li className="mb-4 flex items-center">
                    <i className="fas fa-cog text-lg"></i>
                    <span className="ml-2 text-lg">Settings</span>
                </li>
            </ul>
        </nav>
        <button className="mt-auto bg-gray-500 text-white py-2 px-4 rounded flex items-center">
            <i className="fas fa-sign-out-alt"></i>
            <span className="ml-2">Logout</span>
        </button>
    </div>
);

export default Sidebar;
