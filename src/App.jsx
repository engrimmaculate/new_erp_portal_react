import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import {
  ICTDashboard,
  HRDashboard,
  LogisticsDashboard,
  AccountsDashboard,
  OperationsDashboard,
  BusinessDashboard,
  QHSSDashboard,
  ProjectDashboard
} from './components/DashboardCards';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ...existing code...
import Sidebar from './components/SideBar';
import Header from './components/Header';
import { Toaster } from './components/ui/toaster';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return <Login />;

  // Dashboard content per user type
  let dashboardContent = null;
  if (user.role === 'admin' || user.role === 'super_admin' || user.role === 'ict') {
    dashboardContent = (
      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold mb-2 text-red-700">ICT Features</h2>
          <p className="text-gray-600 mb-4">Manage users, monitor system health, and track pending ICT requests.</p>
          <ICTDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-blue-700">HR Features</h2>
          <p className="text-gray-600 mb-4">View employee stats, payroll, and leave requests.</p>
          <HRDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-green-700">Logistics Features</h2>
          <p className="text-gray-600 mb-4">Monitor fleet size, active journeys, and fuel usage.</p>
          <LogisticsDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-purple-700">Accounts Features</h2>
          <p className="text-gray-600 mb-4">Track invoices, revenue, and vendor management.</p>
          <AccountsDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-yellow-700">Operations Features</h2>
          <p className="text-gray-600 mb-4">Manage catering orders, licenses, and vendors.</p>
          <OperationsDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-pink-700">Business Features</h2>
          <p className="text-gray-600 mb-4">View business opportunities, clients, and revenue.</p>
          <BusinessDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-teal-700">QHSSE Features</h2>
          <p className="text-gray-600 mb-4">Monitor incidents, access requests, and permits.</p>
          <QHSSDashboard />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Project Management Features</h2>
          <p className="text-gray-600 mb-4">Manage all projects, activities, costs, and reports.</p>
          <ProjectDashboard />
        </section>
      </div>
    );
  } else {
    switch (user.role) {
      case 'ict':
        dashboardContent = <ICTDashboard />;
        break;
      case 'hr':
        dashboardContent = <HRDashboard />;
        break;
      case 'logistics':
        dashboardContent = <LogisticsDashboard />;
        break;
      case 'accounts':
        dashboardContent = <AccountsDashboard />;
        break;
      case 'operations':
        dashboardContent = <OperationsDashboard />;
        break;
      case 'business':
        dashboardContent = <BusinessDashboard />;
        break;
      case 'qhsse':
        dashboardContent = <QHSSDashboard />;
        break;
      case 'project':
        dashboardContent = <ProjectDashboard />;
        break;
      default:
        dashboardContent = (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to Keves ERP
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Your enterprise resource planning system with organized navigation and powerful accounting features.
            </p>
          </div>
        );
    }
  }

  return (
    <>
      <Helmet>
        <title>Keves ERP - Enterprise Resource Planning</title>
        <meta name="description" content="Modern ERP system with organized navigation and accounting features" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex h-screen">
          <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} userType={user.role} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                {dashboardContent}
              </motion.div>
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;