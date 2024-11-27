import React from 'react';

const Header = () => (
    <div className="flex justify-between items-center p-4 border-b">
        <div></div>
        <div className="flex items-center">
            <i className="fas fa-bell text-2xl mr-4"></i>
            <img src="https://placehold.co/40x40" alt="User profile" className="rounded-full" />
        </div>
    </div>
);

export default Header;
