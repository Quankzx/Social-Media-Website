import React from "react";
import { useTranslation } from "../i18n";

interface MenuItem {
  label: string;
  href: string;
  badge?: string;
}

const SlideMenu = ({
  items,
  onSelect,
  active,
  isOpen,
  onClose,
}: {
  items: MenuItem[];
  onSelect?: (href: string) => void;
  active?: string;
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const { t } = useTranslation();

  const handleClick = (it: MenuItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) onSelect(it.href);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay - only show when menu is open on mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={onClose}></div>}
      
      <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-800 shadow-xl z-40 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t("app.title")}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t("menu.dashboard")}</p>
            </div>
            {items.map((it, idx) => {
              const id = it.href.replace(/^\//, "").replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={idx}
                  href={it.href}
                  onClick={handleClick(it)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    isActive
                      ? "bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 font-medium"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="font-medium">{it.label}</span>
                  {it.badge && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 rounded-full">
                      {it.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Nguy?n Van A</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SlideMenu;
