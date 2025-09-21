import React from 'react';
import { useAppStore } from '../store';
import { useTranslation } from '../i18n';

const ThemeSwitcher: React.FC = () => {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const { t } = useTranslation()

  React.useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button
      className="px-3 py-1 rounded border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      onClick={toggle}
    >
      {theme === 'dark' ? t('theme.light') : t('theme.dark')}
    </button>
  );
};

export default ThemeSwitcher;
