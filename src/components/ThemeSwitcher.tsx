import React, { useState } from 'react';

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return (
    <button
      className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? 'Chế độ Sáng' : 'Chế độ Tối'}
    </button>
  );
};

export default ThemeSwitcher;
