import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Calendar from './components/Calendar';

const App = () => (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Header />
            <Calendar />
        </div>
    </div>
);

export default App;
