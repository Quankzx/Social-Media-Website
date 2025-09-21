import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => (
  <header className="w-full bg-white shadow-lg border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/logo192.png" alt="Logo" className="w-10 h-10 rounded" />
        <h1 className="text-heading-2">Social Portal</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="input w-64"
          />
        </div>
        <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500">
          <span className="material-icons text-gray-600">notifications</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
        </button>
        <img src="https://i.pravatar.cc/40?img=8" alt="User" className="rounded-full w-8 h-8 border-2 border-gray-200" />
        <ThemeSwitcher />
      </div>
    </div>
  </header>
);

export default Header;
