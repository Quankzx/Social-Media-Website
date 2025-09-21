
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import DashboardOverview from './modules/Dashboard/DashboardOverview';
import AccountDashboard from './modules/Account/AccountDashboard';
import ContentDashboard from './modules/Content/ContentDashboard';
import ReportDashboard from './modules/Report/ReportDashboard';
import TeamworkDashboard from './modules/Teamwork/TeamworkDashboard';



function App() {
  // Demo breadcrumb
  const breadcrumbItems = [
    { label: 'Dashboard', href: '#' },
    { label: 'Tài khoản', href: '#account' },
    { label: 'Nội dung', href: '#content' },
    { label: 'Báo cáo', href: '#report' },
    { label: 'Teamwork', href: '#teamwork' },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg flex flex-col p-4">
          <h1 className="text-2xl font-bold mb-8">Social Portal</h1>
          <nav className="flex flex-col gap-4">
            <a href="#account" className="hover:text-blue-600">Tài khoản</a>
            <a href="#content" className="hover:text-blue-600">Nội dung</a>
            <a href="#report" className="hover:text-blue-600">Báo cáo</a>
            <a href="#teamwork" className="hover:text-blue-600">Teamwork</a>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8">
          <Breadcrumb items={breadcrumbItems} />
          <section id="dashboard">
            <DashboardOverview />
          </section>
          <section id="account" className="mt-8">
            <AccountDashboard />
          </section>
          <section id="content" className="mt-8">
            <ContentDashboard />
          </section>
          <section id="report" className="mt-8">
            <ReportDashboard />
          </section>
          <section id="teamwork" className="mt-8">
            <TeamworkDashboard />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
