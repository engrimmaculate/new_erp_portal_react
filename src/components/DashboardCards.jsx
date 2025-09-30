import React, { useState } from "react";
import { Fragment } from "react";
import { Card } from "./ui/Card";
import { Building2, Users, Receipt, Banknote, UserCheck, Truck, Calendar, Shield, TrendingUp, BarChart3 } from "lucide-react";

export function ICTDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Users" value={42} icon={Users} />
      <Card title="System Health" value="Good" icon={Shield} color="bg-green-100" />
      <Card title="Pending Requests" value={5} icon={Calendar} color="bg-yellow-100" />
    </div>
  );
}

export function HRDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Employees" value={120} icon={Users} />
      <Card title="Payroll Processed" value="$45,000" icon={Banknote} color="bg-blue-100" />
      <Card title="Leave Requests" value={8} icon={Calendar} color="bg-yellow-100" />
    </div>
  );
}

export function LogisticsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Fleet Size" value={18} icon={Truck} />
      <Card title="Active Journeys" value={3} icon={TrendingUp} color="bg-green-100" />
      <Card title="Fuel Usage" value="1,200L" icon={BarChart3} color="bg-blue-100" />
    </div>
  );
}

export function AccountsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Invoices" value={32} icon={Receipt} />
      <Card title="Revenue" value="$120,000" icon={Banknote} color="bg-green-100" />
      <Card title="Vendors" value={14} icon={UserCheck} color="bg-blue-100" />
    </div>
  );
}

export function OperationsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Catering Orders" value={22} icon={Building2} />
      <Card title="Active Licenses" value={7} icon={Shield} color="bg-blue-100" />
      <Card title="Vendors" value={9} icon={UserCheck} color="bg-green-100" />
    </div>
  );
}

export function BusinessDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Opportunities" value={5} icon={TrendingUp} />
      <Card title="Clients" value={21} icon={Users} color="bg-blue-100" />
      <Card title="Revenue" value="$80,000" icon={Banknote} color="bg-green-100" />
    </div>
  );
}

export function QHSSDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Incidents" value={2} icon={Shield} />
      <Card title="Access Requests" value={11} icon={Calendar} color="bg-yellow-100" />
      <Card title="Permits" value={6} icon={Receipt} color="bg-blue-100" />
    </div>
  );
}




export function ProjectDashboard() {
  // Mock data
  const [projects, setProjects] = useState([
    {
      id: 1,
      code: "PRJ-001",
      name: "ERP Migration",
      description: "Migrate legacy ERP to new platform",
      client: "Acme Corp",
      site: "Lagos",
      startDate: "2025-09-01",
      endDate: "2025-12-01",
      cost: 12000,
      revenue: 18000,
      status: "In Progress",
      progress: 70,
      activities: [
        {
          id: 101,
          name: "Setup DB",
          code: "ACT-101",
          assignee: "John Doe",
          assigner: "Jane Smith",
          startDate: "2025-09-02",
          endDate: "2025-09-10",
          progress: 100,
          status: "Completed"
        },
        {
          id: 102,
          name: "Migrate Users",
          code: "ACT-102",
          assignee: "Mary Ann",
          assigner: "Jane Smith",
          startDate: "2025-09-11",
          endDate: "2025-09-20",
          progress: 40,
          status: "In Progress"
        }
      ]
    },
    {
      id: 2,
      code: "PRJ-002",
      name: "Fleet Upgrade",
      description: "Upgrade company fleet",
      client: "Beta Ltd",
      site: "Abuja",
      startDate: "2025-08-01",
      endDate: "2025-10-01",
      cost: 8000,
      revenue: 12000,
      status: "Completed",
      progress: 100,
      activities: [
        {
          id: 201,
          name: "Purchase Vehicles",
          code: "ACT-201",
          assignee: "James Bond",
          assigner: "Moneypenny",
          startDate: "2025-08-02",
          endDate: "2025-08-15",
          progress: 100,
          status: "Completed"
        },
        {
          id: 202,
          name: "Train Drivers",
          code: "ACT-202",
          assignee: "Eve Adams",
          assigner: "Moneypenny",
          startDate: "2025-08-16",
          endDate: "2025-08-30",
          progress: 100,
          status: "Completed"
        }
      ]
    },
    {
      id: 3,
      code: "PRJ-003",
      name: "HR Portal",
      description: "Build new HR portal",
      client: "Gamma Inc",
      site: "Port Harcourt",
      startDate: "2025-10-01",
      endDate: "2026-01-01",
      cost: 5000,
      revenue: 9000,
      status: "Pending",
      progress: 0,
      activities: []
    }
  ]);

  // Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [viewActivitiesProject, setViewActivitiesProject] = useState(null);
  const [viewActivity, setViewActivity] = useState(null);

  // Cards summary
  const totalCost = projects.reduce((sum, p) => sum + p.cost, 0);
  const avgProgress = projects.length ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0;
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);

  // Modal skeletons (to be styled and implemented)
  const ProjectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        {/* TODO: Add form fields for code, name, description, client, site, dates, cost, revenue, status */}
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowProjectModal(false)}>Close</button>
      </div>
    </div>
  );

  const ActivityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Activity</h2>
        {/* TODO: Add form fields for activity details */}
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowActivityModal(false)}>Close</button>
      </div>
    </div>
  );

  const ViewActivitiesModal = ({ project }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Project Activities - {project.name}</h2>
        <table className="min-w-full text-left mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Code</th>
              <th className="p-2">Name</th>
              <th className="p-2">Assignee</th>
              <th className="p-2">Assigner</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Progress</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {project.activities.map(act => (
              <tr key={act.id}>
                <td className="p-2 font-mono">{act.code}</td>
                <td className="p-2">{act.name}</td>
                <td className="p-2">{act.assignee}</td>
                <td className="p-2">{act.assigner}</td>
                <td className="p-2">{act.startDate}</td>
                <td className="p-2">{act.endDate}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${act.progress === 100 ? 'bg-green-200 text-green-800' : act.progress > 0 ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{act.progress}%</span>
                </td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${act.status === 'Completed' ? 'bg-green-200 text-green-800' : act.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{act.status}</span>
                </td>
                <td className="p-2 flex gap-1">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                  <button className="bg-gray-400 text-white px-2 py-1 rounded text-xs">Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setViewActivitiesProject(null)}>Close</button>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="All Projects" value={projects.length} icon={Building2} />
        <Card title="Avg Progress" value={`${avgProgress}%`} icon={TrendingUp} color="bg-blue-100" />
        <Card title="Total Cost" value={`$${totalCost}`} icon={Banknote} color="bg-green-100" />
        <Card title="Total Revenue" value={`$${totalRevenue}`} icon={Banknote} color="bg-yellow-100" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Projects</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setShowProjectModal(true)}>Add Project</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Code</th>
                <th className="p-2">Name</th>
                <th className="p-2">Client</th>
                <th className="p-2">Site</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
                <th className="p-2">Cost</th>
                <th className="p-2">Revenue</th>
                <th className="p-2">Status</th>
                <th className="p-2">Progress</th>
                <th className="p-2">Activities</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2 font-mono">{p.code}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.client}</td>
                  <td className="p-2">{p.site}</td>
                  <td className="p-2">{p.startDate}</td>
                  <td className="p-2">{p.endDate}</td>
                  <td className="p-2">${p.cost}</td>
                  <td className="p-2">${p.revenue}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'Completed' ? 'bg-green-200 text-green-800' : p.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.status}</span>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${p.progress === 100 ? 'bg-green-200 text-green-800' : p.progress > 0 ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.progress}%</span>
                  </td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" onClick={() => setViewActivitiesProject(p)}>View Activities</button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => setShowActivityModal(true)}>Add Activity</button>
                  </td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1 text-xs">Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Project Reports</h2>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id} className="border rounded-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{p.name} ({p.code})</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'Completed' ? 'bg-green-200 text-green-800' : p.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                <div><span className="font-semibold">Client:</span> {p.client}</div>
                <div><span className="font-semibold">Site:</span> {p.site}</div>
                <div><span className="font-semibold">Start:</span> {p.startDate}</div>
                <div><span className="font-semibold">End:</span> {p.endDate}</div>
                <div><span className="font-semibold">Cost:</span> ${p.cost}</div>
                <div><span className="font-semibold">Revenue:</span> ${p.revenue}</div>
                <div><span className="font-semibold">Progress:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${p.progress === 100 ? 'bg-green-200 text-green-800' : p.progress > 0 ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.progress}%</span></div>
                <div><span className="font-semibold">Activities:</span> {p.activities.length}</div>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Description:</span> {p.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showProjectModal && <ProjectModal />}
      {showActivityModal && <ActivityModal />}
      {viewActivitiesProject && <ViewActivitiesModal project={viewActivitiesProject} />}
    </div>
  );
}
