import './App.css';
import React from 'react';
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
  // Slide menu items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Tài khoản', href: '#account' },
    { label: 'Nội dung', href: '#content' },
    { label: 'Báo cáo', href: '#report' },
    { label: 'Teamwork', href: '#teamwork' },
  ];
  const [active, setActive] = React.useState('dashboard');

  const handleSelect = (href: string) => {
    const id = href.replace('#', '');
    setActive(id);
    // scroll to section if present
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <SlideMenu items={breadcrumbItems} onSelect={handleSelect} active={active} />
          <main className="flex-1 p-8 md:pl-64">
            <div className="mb-8">
              <h1 className="text-heading-1 mb-2">Welcome to Social Portal</h1>
              <p className="text-body">Quick access to dashboard sections via the Menu button.</p>
            </div>
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
          </main>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
