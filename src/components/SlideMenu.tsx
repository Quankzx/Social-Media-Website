import React, { useState } from 'react';
import Tooltip from './Tooltip';

interface MenuItem {
  label: string;
  href: string;
}

const SlideMenu = ({
  items,
  onSelect,
  active,
}: {
  items: MenuItem[];
  onSelect?: (href: string) => void;
  active?: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (it: MenuItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) onSelect(it.href);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((s) => !s)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
      >
        <span className="material-icons">menu</span>
        <span className="hidden sm:inline text-body">Menu</span>
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 border-r border-gray-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-heading-3">Navigation</h3>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <span className="material-icons">close</span>
            </button>
          </div>
          <nav className="space-y-2">
            {items.map((it, idx) => {
              const id = it.href.replace('#', '');
              const isActive = active === id;
              return (
                <Tooltip key={idx} content={`Chuyển đến ${it.label}`} position="right">
                  <a
                    href={it.href}
                    onClick={handleClick(it)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500' : 'text-gray-700'
                    }`}
                  >
                    <span>{it.label}</span>
                    {isActive && <span className="text-blue-600">●</span>}
                  </a>
                </Tooltip>
              );
            })}
          </nav>
        </div>
      </div>

      {/* backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          aria-hidden
        />
      )}
    </div>
  );
};

export default SlideMenu;
