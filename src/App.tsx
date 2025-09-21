import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SlideMenu from './components/SlideMenu';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardOverview from './modules/Dashboard/DashboardOverview';
import AccountDashboard from './modules/Account/AccountDashboard';
import ContentDashboard from './modules/Content/ContentDashboard';
import ReportDashboard from './modules/Report/ReportDashboard';
import TeamworkDashboard from './modules/Teamwork/TeamworkDashboard';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './modules/Auth/LoginForm';
import RegisterForm from './modules/Auth/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useTranslation } from './i18n';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [active, setActive] = useState(() => {
    try {
      const p = window.location.pathname.replace(/^\//, '');
      return p || 'dashboard';
    } catch (e) {
      return 'dashboard';
    }
  });

  // Slide menu items
  const breadcrumbItems = [
    { label: t('menu.dashboard'), href: '/dashboard', badge: '' },
    { label: t('menu.account'), href: '/account', badge: '4' },
    { label: t('menu.content'), href: '/content', badge: '12' },
    { label: t('menu.report'), href: '/report', badge: '' },
    { label: t('menu.teamwork'), href: '/teamwork', badge: '3' },
  ];

  const handleSelect = (href: string) => {
    const path = href;
    const id = path.replace(/^\//, '');
    navigate(path);
    setActive(id || 'dashboard');
    setSidebarOpen(false);
  };

  useEffect(() => {
    const p = location.pathname.replace(/^\//, '') || 'dashboard';
    setActive(p);
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          
          <div className="flex min-h-[calc(100vh-4rem)]">
            <SlideMenu 
              items={breadcrumbItems} 
              onSelect={handleSelect} 
              active={active}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            
            <div className={`flex-1 flex flex-col transition-all duration-300 md:ml-72`}>
              <main className="flex-1">
                <div className="p-4 sm:p-6 lg:p-8 min-h-full">
                  <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="/dashboard" element={<DashboardOverview />} />
                    <Route path="/account" element={<div className="card"><h2 className="text-heading-2 mb-4">{t('menu.account')}</h2><AccountDashboard/></div>} />
                    <Route path="/content" element={
                      <ProtectedRoute>
                        <div className="card"><h2 className="text-heading-2 mb-4">{t('menu.content')}</h2><ContentDashboard/></div>
                      </ProtectedRoute>
                    } />
                    <Route path="/report" element={<div className="card"><h2 className="text-heading-2 mb-4">{t('menu.report')}</h2><ReportDashboard/></div>} />
                    <Route path="/teamwork" element={<div className="card"><h2 className="text-heading-2 mb-4">{t('menu.teamwork')}</h2><TeamworkDashboard/></div>} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                  </Routes>
                </div>
              </main>
              
              <Footer />
            </div>
          </div>
        </div>
    </ErrorBoundary>
  )
}

export default App;
