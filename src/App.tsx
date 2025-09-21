import './App.css';
import React from 'react';
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('dashboard');

  // Slide menu items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '#dashboard', badge: '' },
    { label: 'Tài khoản', href: '#account', badge: '4' },
    { label: 'Nội dung', href: '#content', badge: '12' },
    { label: 'Báo cáo', href: '#report', badge: '' },
    { label: 'Teamwork', href: '#teamwork', badge: '3' },
  ];

  const handleSelect = (href: string) => {
    const id = href.replace('#', '');
    setActive(id);
    setSidebarOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex min-h-[calc(100vh-4rem)]">
          <SlideMenu 
            items={breadcrumbItems} 
            onSelect={handleSelect} 
            active={active}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <div className="flex-1 md:ml-72 flex flex-col transition-all duration-300">
            <main className="flex-1">
              <div className="p-4 sm:p-6 lg:p-8 min-h-full">
                {/* Render only active section content to avoid errors and switch views */}
                {active === 'dashboard' && (
                  <section id="dashboard">
                    <DashboardOverview />
                  </section>
                )}
                {active === 'account' && (
                  <section id="account" className="space-y-6">
                    <div className="card">
                      <h2 className="text-heading-2 mb-4">Tài khoản</h2>
                      <AccountDashboard />
                    </div>
                  </section>
                )}
                {active === 'content' && (
                  <section id="content" className="space-y-6">
                    <div className="card">
                      <h2 className="text-heading-2 mb-4">Nội dung</h2>
                      <ContentDashboard />
                    </div>
                  </section>
                )}
                {active === 'report' && (
                  <section id="report" className="space-y-6">
                    <div className="card">
                      <h2 className="text-heading-2 mb-4">Báo cáo</h2>
                      <ReportDashboard />
                    </div>
                  </section>
                )}
                {active === 'teamwork' && (
                  <section id="teamwork" className="space-y-6">
                    <div className="card">
                      <h2 className="text-heading-2 mb-4">Teamwork</h2>
                      <TeamworkDashboard />
                    </div>
                  </section>
                )}
              </div>
            </main>
            
            <Footer />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
