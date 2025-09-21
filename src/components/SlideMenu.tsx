import React, { useState } from 'react';
import { Home, Users, FileText, BarChart3, UserCheck, X, ChevronRight } from 'lucide-react';
import Tooltip from './Tooltip';

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

const menuIcons = {
  'dashboard': <Home className="w-5 h-5" />,
  'account': <Users className="w-5 h-5" />,
  'content': <FileText className="w-5 h-5" />,
  'report': <BarChart3 className="w-5 h-5" />,
  'teamwork': <UserCheck className="w-5 h-5" />,
};

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
  const [localOpen, setLocalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : localOpen;
  const setOpen = onClose ? (value: boolean) => !value && onClose() : setLocalOpen;

  const handleClick = (it: MenuItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) onSelect(it.href);
    if (onClose) onClose();
    else setLocalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white shadow-xl transform transition-transform duration-300 z-40 border-r border-gray-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 overflow-y-auto scrollbar-thin`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <div className="flex-1 px-4 py-6 pb-24">
            <nav className="space-y-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SP</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Social Portal</h3>
                    <p className="text-xs text-gray-500">Dashboard</p>
                  </div>
                </div>
                <button 
                  onClick={() => setOpen(false)} 
                  aria-label="Close menu" 
                  className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 md:hidden transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {items.map((it, idx) => {
                const id = it.href.replace('#', '');
                const isActive = active === id;
                const icon = menuIcons[id as keyof typeof menuIcons];
                
                return (
                  <Tooltip key={idx} content={`Chuyển đến ${it.label}`} position="right">
                    <a
                      href={it.href}
                      onClick={handleClick(it)}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${
                        isActive 
                          ? 'bg-red-50 text-red-700 font-medium shadow-sm border border-red-100' 
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                          {icon}
                        </div>
                        <span className="font-medium">{it.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {it.badge && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                            {it.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-red-600 rotate-90' : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                      </div>
                    </a>
                  </Tooltip>
                );
              })}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                alt="User" 
                className="w-8 h-8 rounded-full border-2 border-white" 
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Nguyễn Văn A</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm mt-16"
          aria-hidden
        />
      )}
    </>
  );
};

export default SlideMenu;
