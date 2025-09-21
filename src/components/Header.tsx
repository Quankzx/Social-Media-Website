import React from 'react';

import ThemeSwitcher from './ThemeSwitcher';

const Header = () => (
  <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
    <div className="flex items-center gap-4">
      <img src="/logo192.png" alt="Logo" className="w-10 h-10" />
      <span className="font-bold text-xl">Social Portal</span>
    </div>
    <div className="flex items-center gap-4">
      <input type="text" placeholder="Tìm kiếm..." className="border rounded px-2 py-1" />
      <button className="relative">
        <span className="material-icons text-gray-600">notifications</span>
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">2</span>
      </button>
      <img src="https://i.pravatar.cc/40?img=8" alt="User" className="rounded-full w-8 h-8" />
      <ThemeSwitcher />
    </div>
  </header>
);

export default Header;
