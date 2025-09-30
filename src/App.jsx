import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
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
  switch (user.role) {
    case 'ict':
      dashboardContent = <UserManagement />;
      break;
    case 'hr':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">HR Dashboard: Manage employees, payroll, welfare, and more.</div>;
      break;
    case 'logistics':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">Logistics Dashboard: Manage fleets, fuel, journey, and drivers.</div>;
      break;
    case 'operations':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">Operations Dashboard: Manage catering, supplies, vendors, and licenses.</div>;
      break;
    case 'business':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">Business Development Dashboard: Manage business activities.</div>;
      break;
    case 'qhsse':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">QHSSE Dashboard: Safety, security, quality, and access control.</div>;
      break;
    case 'project':
      dashboardContent = <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100">Project Management Dashboard: Manage projects and contracts.</div>;
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
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Accounting</h3>
              <p className="text-blue-100">Manage your financial operations</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Customers</h3>
              <p className="text-green-100">Track customer relationships</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Reports</h3>
              <p className="text-purple-100">Generate financial reports</p>
            </div>
          </div>
        </div>
      );
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