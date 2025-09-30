import React, { useState } from "react";
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
    { id: 1, name: "ERP Migration", status: "In Progress", cost: 12000, progress: 70, activities: ["Setup DB", "Migrate Users"] },
    { id: 2, name: "Fleet Upgrade", status: "Completed", cost: 8000, progress: 100, activities: ["Purchase Vehicles", "Train Drivers"] },
    { id: 3, name: "HR Portal", status: "Pending", cost: 5000, progress: 0, activities: [] },
  ]);
  const [newProject, setNewProject] = useState({ name: "", cost: "" });
  const [editingId, setEditingId] = useState(null);
  const [editProject, setEditProject] = useState({ name: "", cost: "" });

  // CRUD handlers
  const addProject = () => {
    if (!newProject.name || !newProject.cost) return;
    setProjects([
      ...projects,
      { id: Date.now(), name: newProject.name, status: "Pending", cost: Number(newProject.cost), progress: 0, activities: [] }
    ]);
    setNewProject({ name: "", cost: "" });
  };
  const deleteProject = id => setProjects(projects.filter(p => p.id !== id));
  const startEdit = p => { setEditingId(p.id); setEditProject({ name: p.name, cost: p.cost }); };
  const saveEdit = id => {
    setProjects(projects.map(p => p.id === id ? { ...p, name: editProject.name, cost: Number(editProject.cost) } : p));
    setEditingId(null);
    setEditProject({ name: "", cost: "" });
  };

  // Activity CRUD (simple add/delete)
  const addActivity = (id, activity) => {
    setProjects(projects.map(p => p.id === id ? { ...p, activities: [...p.activities, activity] } : p));
  };
  const deleteActivity = (id, idx) => {
    setProjects(projects.map(p => p.id === id ? { ...p, activities: p.activities.filter((_, i) => i !== idx) } : p));
  };

  // Cards summary
  const totalCost = projects.reduce((sum, p) => sum + p.cost, 0);
  const avgProgress = projects.length ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0;
  const allActivities = projects.flatMap(p => p.activities);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="All Projects" value={projects.length} icon={Building2} />
        <Card title="Avg Progress" value={`${avgProgress}%`} icon={TrendingUp} color="bg-blue-100" />
        <Card title="Total Cost" value={`$${totalCost}`} icon={Banknote} color="bg-green-100" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Projects & Activities</h2>
        <div className="mb-4 flex gap-2">
          <input
            className="border rounded p-2 mr-2"
            placeholder="Project Name"
            value={newProject.name}
            onChange={e => setNewProject({ ...newProject, name: e.target.value })}
          />
          <input
            className="border rounded p-2 mr-2"
            placeholder="Cost"
            type="number"
            value={newProject.cost}
            onChange={e => setNewProject({ ...newProject, cost: e.target.value })}
          />
          <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={addProject}>Add Project</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Status</th>
                <th className="p-2">Cost</th>
                <th className="p-2">Progress</th>
                <th className="p-2">Activities</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">
                    {editingId === p.id ? (
                      <input
                        className="border rounded p-1"
                        value={editProject.name}
                        onChange={e => setEditProject({ ...editProject, name: e.target.value })}
                      />
                    ) : p.name}
                  </td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2">
                    {editingId === p.id ? (
                      <input
                        className="border rounded p-1"
                        type="number"
                        value={editProject.cost}
                        onChange={e => setEditProject({ ...editProject, cost: e.target.value })}
                      />
                    ) : `$${p.cost}`}
                  </td>
                  <td className="p-2">{p.progress}%</td>
                  <td className="p-2">
                    <ul className="list-disc ml-4">
                      {p.activities.map((a, idx) => (
                        <li key={idx} className="flex items-center justify-between">
                          <span>{a}</span>
                          <button className="ml-2 text-xs text-red-500" onClick={() => deleteActivity(p.id, idx)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex gap-1">
                      <input
                        className="border rounded p-1 text-xs"
                        placeholder="Add activity"
                        value={p.newActivity || ""}
                        onChange={e => setProjects(projects.map(pr => pr.id === p.id ? { ...pr, newActivity: e.target.value } : pr))}
                      />
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => {
                          if (p.newActivity) { addActivity(p.id, p.newActivity); setProjects(projects.map(pr => pr.id === p.id ? { ...pr, newActivity: "" } : pr)); }
                        }}
                      >Add</button>
                    </div>
                  </td>
                  <td className="p-2">
                    {editingId === p.id ? (
                      <>
                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-1 text-xs" onClick={() => saveEdit(p.id)}>Save</button>
                        <button className="bg-gray-400 text-white px-2 py-1 rounded text-xs" onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1 text-xs" onClick={() => startEdit(p)}>Edit</button>
                        <button className="bg-red-600 text-white px-2 py-1 rounded text-xs" onClick={() => deleteProject(p.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Project Reports</h2>
        <ul className="list-disc ml-4">
          {projects.map(p => (
            <li key={p.id}>
              <span className="font-semibold">{p.name}:</span> Status: {p.status}, Progress: {p.progress}%, Cost: ${p.cost}, Activities: {p.activities.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
