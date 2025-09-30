import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ChevronRight,
  Calculator,
  Users,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Building2,
  DollarSign,
  Receipt,
  Banknote,
  UserCheck,
  TrendingUp,
  BarChart3,
  Shield,
  X,
  Calendar,
  Truck
} from 'lucide-react';
import { toast } from '../components/ui/use-toast';


// Menu definitions for each user type
const menuDefinitions = {
  accounts: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Dashboard', icon: Building2, route: '/dashboard' }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Invoicing',
      icon: CreditCard,
      items: [
        { name: 'Manage Clients', icon: Users, route: '/clients' },
        { name: 'Manage Locations', icon: Building2, route: '/manage-locations' },
        { name: 'Manage Invoices', icon: Receipt, route: '/manage-invoices' },
        { name: 'Manage Services', icon: Settings, route: '/manage-services' },
        { name: 'Manage Items', icon: FileText, route: '/manage-items' },
        { name: 'Manage Vendors', icon: UserCheck, route: '/manage-vendors' },
        { name: 'Manage Reports', icon: BarChart3, route: '/manage-reports' },
      ]
    },
    {
      id: 'accounting',
      title: 'Accounting',
      icon: Calculator,
      items: [
        { name: 'Chart Of Accounts', icon: FileText, route: '/chart-of-account' },
        { name: 'Manage Accounts', icon: Settings, route: '/manage-accounts' },
        { name: 'General Ledger', icon: BarChart3, route: '/general-ledger' },
        { name: 'Journal Entry', icon: FileText, route: '/journal-entry' }
      ]
    },
    {
      id: 'receivables',
      title: 'Receivables & Payments',
      icon: CreditCard,
      items: [
        { name: 'Receivables', icon: Receipt, route: '/receivables' },
        { name: 'Receive Money', icon: DollarSign, route: '/receive-money' },
        { name: 'Banks & Checks', icon: Banknote, route: '/banks-checks' }
      ]
    },
    {
      id: 'customers',
      title: 'Customer Management',
      icon: Users,
      items: [
        { name: 'Customers', icon: UserCheck, route: '/customers' },
        { name: 'Vendors and Payments', icon: CreditCard, route: '/vendors' }
      ]
    },
    {
      id: 'payroll',
      title: 'Payroll & HR',
      icon: UserCheck,
      items: [
        { name: 'Payroll & Salaries', icon: DollarSign, route: '/payroll' }
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: TrendingUp,
      items: [
        { name: 'General Ledger Report', icon: BarChart3, route: '/ledger-report' },
        { name: 'Ledger By Account', icon: FileText, route: '/ledger-account' },
        { name: 'Trial Balance', icon: Calculator, route: '/trial-balance' }
      ]
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: Settings,
      items: [
        { name: 'Set Dollar Rate', icon: DollarSign, route: '/fx-rate' },
        { name: 'Settings', icon: Settings, route: '/settings' }
      ]
    }
  ],
  hr: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'HR Dashboard', icon: Building2, route: '/hr-dashboard' }
      ]
    },
    {
      id: 'employees',
      title: 'Employee Management',
      icon: Users,
      items: [
        { name: 'Manage Employees', icon: UserCheck, route: '/employees' },
        { name: 'Reviews', icon: BarChart3, route: '/reviews' },
        { name: 'Query', icon: FileText, route: '/query' },
        { name: 'Permissions', icon: Shield, route: '/permissions' },
        { name: 'Memo', icon: FileText, route: '/memo' },
        { name: 'Documentation', icon: FileText, route: '/documentation' }
      ]
    },
    {
      id: 'payroll',
      title: 'Payroll',
      icon: DollarSign,
      items: [
        { name: 'Allowances', icon: DollarSign, route: '/allowances' },
        { name: 'Bonuses', icon: DollarSign, route: '/bonuses' },
        { name: 'Deductions', icon: DollarSign, route: '/deductions' },
        { name: 'Coop', icon: Users, route: '/coop' },
        { name: 'Salary', icon: DollarSign, route: '/salary' }
      ]
    },
    {
      id: 'welfare',
      title: 'Welfare & Leaves',
      icon: Receipt,
      items: [
        { name: 'Welfare', icon: Receipt, route: '/welfare' },
        { name: 'Leaves Planning', icon: Calendar, route: '/leaves' },
        { name: 'Training', icon: BarChart3, route: '/training' },
        { name: 'Planning', icon: BarChart3, route: '/planning' }
      ]
    }
  ],
  logistics: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Logistics Dashboard', icon: Building2, route: '/logistics-dashboard' }
      ]
    },
    {
      id: 'fleet',
      title: 'Fleet Management',
      icon: Truck,
      items: [
        { name: 'Fleets', icon: Truck, route: '/fleets' },
        { name: 'Fuel Management', icon: DollarSign, route: '/fuel' },
        { name: 'Journey Management', icon: TrendingUp, route: '/journey' },
        { name: 'Tracking & Security', icon: Shield, route: '/tracking' },
        { name: 'Dispatchers', icon: Users, route: '/dispatchers' },
        { name: 'Drivers', icon: UserCheck, route: '/drivers' }
      ]
    }
  ],
  operations: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Operations Dashboard', icon: Building2, route: '/operations-dashboard' }
      ]
    },
    {
      id: 'business',
      title: 'Business Operations',
      icon: BarChart3,
      items: [
        { name: 'Catering', icon: FileText, route: '/catering' },
        { name: 'Supplies', icon: FileText, route: '/supplies' },
        { name: 'Vendors', icon: UserCheck, route: '/vendors' },
        { name: 'License', icon: FileText, route: '/license' }
      ]
    }
  ],
  business: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Business Dashboard', icon: Building2, route: '/business-dashboard' }
      ]
    },
    {
      id: 'management',
      title: 'Business Management',
      icon: BarChart3,
      items: [
        { name: 'Activities', icon: FileText, route: '/activities' }
      ]
    }
  ],
  qhsse: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'QHSSE Dashboard', icon: Building2, route: '/qhsse-dashboard' }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      items: [
        { name: 'Quality', icon: BarChart3, route: '/quality' },
        { name: 'Access Control', icon: Shield, route: '/access-control' },
        { name: 'Medical', icon: FileText, route: '/medical' },
        { name: 'Fitness', icon: FileText, route: '/fitness' },
        { name: 'Work Permit', icon: FileText, route: '/work-permit' },
        { name: 'WCC', icon: FileText, route: '/wcc' }
      ]
    }
  ],
  project: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Project Dashboard', icon: Building2, route: '/project-dashboard' }
      ]
    },
    {
      id: 'projects',
      title: 'Projects & Contracts',
      icon: BarChart3,
      items: [
        { name: 'Projects', icon: FileText, route: '/projects' },
        { name: 'Contracts', icon: FileText, route: '/contracts' }
      ]
    }
  ],
  ict: [
    {
      id: 'main',
      title: 'Main',
      icon: Home,
      items: [
        { name: 'Admin Dashboard', icon: Building2, route: '/admin-dashboard' }
      ]
    },
    {
      id: 'admin',
      title: 'Admin & Super Admin',
      icon: Shield,
      items: [
        { name: 'Full Access', icon: Settings, route: '/admin' }
      ]
    }
  ]
};

const Sidebar = ({ isSidebarOpen, setSidebarOpen, userType = 'accounts' }) => {
  const [expandedGroups, setExpandedGroups] = useState({ main: true });

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleMenuClick = (itemName) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `${itemName} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const menuGroups = menuDefinitions[userType] || menuDefinitions['accounts'];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" }
  };

  return (
    <>
      {/* Overlay for mobile only */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* Sidebar: always visible on desktop, toggled on mobile */}
      <motion.aside
        variants={sidebarVariants}
        initial={typeof window !== 'undefined' && window.innerWidth >= 768 ? 'open' : false}
        animate={typeof window !== 'undefined' && window.innerWidth >= 768 ? 'open' : (isSidebarOpen ? 'open' : 'closed')}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`
          fixed top-0 left-0 h-full w-80 sidebar-gradient text-white shadow-2xl border-r border-gray-200 z-40
          md:relative md:translate-x-0 md:shadow-none
          ${isSidebarOpen ? 'block' : 'hidden'} md:block
        `}
      >
        <div className="h-full flex flex-col text-white">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="assets/keves-new-logo.png" alt="Keves ERP System" className="h-10 w-auto rounded-lg bg-white p-1" />
              <div>
                {/* <h1 className="text-xl font-bold text-white">Keves</h1> */}
                <h2 className="text-sm text-gray-200">ERP System</h2>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuGroups.map((group) => (
              <div key={group.id} className="mb-4">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <group.icon className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
                    <span className="font-medium text-white group-hover:text-red-500">
                      {group.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedGroups[group.id] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedGroups[group.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mt-2 space-y-1">
                        {group.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleMenuClick(item.name)}
                            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-left group"
                          >
                            <item.icon className="w-4 h-4 text-white group-hover:text-red-500" />
                            <span className="text-sm text-white group-hover:text-red-500">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="mb-4">
                <button
                  onClick={() => toggleGroup('admin')}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
                    <span className="font-medium text-white group-hover:text-red-500">
                      Admin Panel
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedGroups['admin'] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-red-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedGroups['admin'] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mt-2 space-y-1">
                        {adminMenuGroup.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleMenuClick(item.name)}
                            className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-left group"
                          >
                            <item.icon className="w-4 h-4 text-white group-hover:text-red-500" />
                            <span className="text-sm text-white group-hover:text-red-500">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => handleMenuClick('Logout')}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 text-white group-hover:text-red-500" />
              <span className="font-medium text-white group-hover:text-red-500">
                Logout
              </span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;