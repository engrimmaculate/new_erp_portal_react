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
  // Service Item Edit Modal
  const [showEditServiceItemModal, setShowEditServiceItemModal] = useState(false);
  const [editServiceItem, setEditServiceItem] = useState(null);

  const openEditServiceItemModal = (item) => {
    setEditServiceItem(item);
    setShowEditServiceItemModal(true);
  };

  const handleEditServiceItemInput = (e) => {
    const { name, value } = e.target;
    setEditServiceItem((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditServiceItem = () => {
    if (!selectedInvoice || !editServiceItem) return;
    setInvoices(prev => prev.map(inv =>
      inv.id === selectedInvoice.id
        ? {
            ...inv,
            service_items: inv.service_items.map(item =>
              item.id === editServiceItem.id ? { ...editServiceItem, total_amount: Number(editServiceItem.total_amount || 0) } : item
            ),
            amount: inv.service_items.map(item =>
              item.id === editServiceItem.id ? Number(editServiceItem.total_amount || 0) : Number(item.total_amount || 0)
            ).reduce((sum, amt) => sum + amt, 0)
          }
        : inv
    ));
    setShowEditServiceItemModal(false);
    setEditServiceItem(null);
  };

  const EditServiceItemModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Service Item</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); saveEditServiceItem(); }}>
          {editServiceItem && Object.keys(editServiceItem).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                name={field}
                value={editServiceItem[field]}
                onChange={handleEditServiceItemInput}
                className="border rounded p-2"
                type={field.includes('date') ? 'date' : 'text'}
                required={field !== 'keves_merge_vendors' && field !== 'nepl_months'}
              />
            </div>
          ))}
          <div className="col-span-2 flex gap-2 justify-end mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditServiceItemModal(false)}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
  // Invoice state
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);
  const [showViewInvoiceModal, setShowViewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({
    invoice_no: "",
    invoice_date: "",
    vendor_code: "",
    service_entry_no: "",
    customer_uniqueid: "",
    gl_credit_account: "",
    gl_credit_account_id: "",
    account_uniqueid: "",
    gl_debit_account: "",
    gl_debit_account_id: "",
    service_location_code: "",
    vat: "",
    tin_no: "",
    po_no: "",
    focal_person_id: "",
    service_description_id: "",
    service_location_id: "",
    signatory: "",
    client_id: "",
    client_bank_account_id: "",
    client_bank_account_id_2: "",
    bank_name: "",
    branch: "",
    account_name: "",
    account_no: "",
    sortcode: "",
    currency_type: "",
    status: "Pending",
    amount: "",
    user_id: "",
    invoice_type: "",
    billed_to: "",
    invoice_service_code: "",
    invoice_service_class: "",
    wcc: "",
    pay_advice_no: "",
    service_city: "",
    service_address: "",
    management_fees: "",
    service_state: "",
    transport_fees: "",
    service_items: []
  });
  // Service Item modal state
  const [showServiceItemModal, setShowServiceItemModal] = useState(false);
  const [serviceItemForm, setServiceItemForm] = useState({
    invoice_id: "",
    item_code: "",
    description: "",
    vehicle_no: "",
    days_worked: "",
    no_of_persons: "",
    quantity: "",
    total_qty: "",
    day_rate: "",
    keves_merge_vendors: "",
    total_amount: "",
    service_category_id: "",
    unit: "",
    rate: "",
    invoice_item_class: "",
    location_id: "",
    uom: "",
    nepl_months: "",
    days_to: "",
    days_from: ""
  });

  // Modal skeletons (to be implemented)
  const handleInvoiceInput = (e) => {
    const { name, value } = e.target;
    setInvoiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const addInvoice = () => {
    setInvoices(prev => [
      ...prev,
      {
        ...invoiceForm,
        id: Date.now(),
        service_items: [],
      }
    ]);
    setInvoiceForm({
      invoice_no: "",
      invoice_date: "",
      vendor_code: "",
      service_entry_no: "",
      customer_uniqueid: "",
      gl_credit_account: "",
      gl_credit_account_id: "",
      account_uniqueid: "",
      gl_debit_account: "",
      gl_debit_account_id: "",
      service_location_code: "",
      vat: "",
      tin_no: "",
      po_no: "",
      focal_person_id: "",
      service_description_id: "",
      service_location_id: "",
      signatory: "",
      client_id: "",
      client_bank_account_id: "",
      client_bank_account_id_2: "",
      bank_name: "",
      branch: "",
      account_name: "",
      account_no: "",
      sortcode: "",
      currency_type: "",
      status: "Pending",
      amount: "",
      user_id: "",
      invoice_type: "",
      billed_to: "",
      invoice_service_code: "",
      invoice_service_class: "",
      wcc: "",
      pay_advice_no: "",
      service_city: "",
      service_address: "",
      management_fees: "",
      service_state: "",
      transport_fees: "",
      service_items: []
    });
    setShowInvoiceModal(false);
  };

  const InvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); addInvoice(); }}>
          {Object.keys(invoiceForm).filter(f => f !== 'service_items').map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                name={field}
                value={invoiceForm[field]}
                onChange={handleInvoiceInput}
                className="border rounded p-2"
                type={field.includes('date') ? 'date' : 'text'}
                required={field !== 'management_fees' && field !== 'transport_fees'}
              />
            </div>
          ))}
          <div className="col-span-2 flex gap-2 justify-end mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowInvoiceModal(false)}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );

  const EditInvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>
        {/* TODO: Add form fields for editing invoiceForm */}
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEditInvoiceModal(false)}>Close</button>
      </div>
    </div>
  );

  const ViewInvoiceModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        {/* TODO: Show all invoice details, add print button */}
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowViewInvoiceModal(false)}>Close</button>
      </div>
    </div>
  );

  const handleServiceItemInput = (e) => {
    const { name, value } = e.target;
    setServiceItemForm((prev) => ({ ...prev, [name]: value }));
  };

  const addServiceItem = () => {
    if (!selectedInvoice) return;
    const newItem = {
      ...serviceItemForm,
      id: Date.now(),
      total_amount: Number(serviceItemForm.total_amount || 0)
    };
    setInvoices(prev => prev.map(inv =>
      inv.id === selectedInvoice.id
        ? {
            ...inv,
            service_items: [...(inv.service_items || []), newItem],
            amount: (inv.service_items ? inv.service_items.reduce((sum, item) => sum + Number(item.total_amount || 0), 0) : 0) + newItem.total_amount
          }
        : inv
    ));
    setServiceItemForm({
      invoice_id: "",
      item_code: "",
      description: "",
      vehicle_no: "",
      days_worked: "",
      no_of_persons: "",
      quantity: "",
      total_qty: "",
      day_rate: "",
      keves_merge_vendors: "",
      total_amount: "",
      service_category_id: "",
      unit: "",
      rate: "",
      invoice_item_class: "",
      location_id: "",
      uom: "",
      nepl_months: "",
      days_to: "",
      days_from: ""
    });
    setShowServiceItemModal(false);
  };

  const deleteServiceItem = (itemId) => {
    if (!selectedInvoice) return;
    setInvoices(prev => prev.map(inv =>
      inv.id === selectedInvoice.id
        ? {
            ...inv,
            service_items: inv.service_items.filter(item => item.id !== itemId),
            amount: inv.service_items.filter(item => item.id !== itemId).reduce((sum, item) => sum + Number(item.total_amount || 0), 0)
          }
        : inv
    ));
  };

  const ServiceItemModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Add Service Item</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); addServiceItem(); }}>
          {Object.keys(serviceItemForm).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                name={field}
                value={serviceItemForm[field]}
                onChange={handleServiceItemInput}
                className="border rounded p-2"
                type={field.includes('date') ? 'date' : 'text'}
                required={field !== 'keves_merge_vendors' && field !== 'nepl_months'}
              />
            </div>
          ))}
          <div className="col-span-2 flex gap-2 justify-end mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowServiceItemModal(false)}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Service Item</button>
          </div>
        </form>
      </div>
    </div>
  );

  // Invoice CRUD actions
  const deleteInvoice = (id) => setInvoices(prev => prev.filter(inv => inv.id !== id));
  const openEditInvoice = (invoice) => { setSelectedInvoice(invoice); setShowEditInvoiceModal(true); };
  const openViewInvoice = (invoice) => { setSelectedInvoice(invoice); setShowViewInvoiceModal(true); };
  const openServiceItemModal = (invoice) => {
    setSelectedInvoice(invoice);
    setServiceItemForm({
      invoice_id: invoice.id,
      item_code: "",
      description: "",
      vehicle_no: "",
      days_worked: "",
      no_of_persons: "",
      quantity: "",
      total_qty: "",
      day_rate: "",
      keves_merge_vendors: "",
      total_amount: "",
      service_category_id: "",
      unit: "",
      rate: "",
      invoice_item_class: "",
      location_id: "",
      uom: "",
      nepl_months: "",
      days_to: "",
      days_from: ""
    });
    setShowServiceItemModal(true);
  };

  // Main render
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Invoices" value={invoices.length} icon={Receipt} />
        <Card title="Revenue" value={`$${invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0)}`} icon={Banknote} color="bg-green-100" />
        <Card title="Vendors" value={14} icon={UserCheck} color="bg-blue-100" />
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Invoices</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setShowInvoiceModal(true)}>Create Invoice</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Invoice No</th>
                <th className="p-2">Date</th>
                <th className="p-2">Vendor</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b">
                  <td className="p-2 font-mono">{inv.invoice_no}</td>
                  <td className="p-2">{inv.invoice_date}</td>
                  <td className="p-2">{inv.vendor_code}</td>
                  <td className="p-2">${inv.amount}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === 'Completed' ? 'bg-green-200 text-green-800' : inv.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{inv.status}</span>
                  </td>
                  <td className="p-2 flex gap-1">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" onClick={() => openEditInvoice(inv)}>Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded text-xs" onClick={() => deleteInvoice(inv.id)}>Delete</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded text-xs" onClick={() => openViewInvoice(inv)}>View</button>
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" onClick={() => openServiceItemModal(inv)}>Add Service Item</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      {showInvoiceModal && <InvoiceModal />}
      {showEditInvoiceModal && <EditInvoiceModal />}
      {showViewInvoiceModal && <ViewInvoiceModal />}
      {showServiceItemModal && <ServiceItemModal />}
    {showEditServiceItemModal && <EditServiceItemModal />}
      {/* Service Items Table for selected invoice */}
      {selectedInvoice && selectedInvoice.service_items && selectedInvoice.service_items.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-lg font-bold mb-4">Service Items for Invoice {selectedInvoice.invoice_no}</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Item Code</th>
                <th className="p-2">Description</th>
                <th className="p-2">Vehicle No</th>
                <th className="p-2">Days Worked</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Day Rate</th>
                <th className="p-2">Total Amount</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.service_items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 font-mono">{item.item_code}</td>
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.vehicle_no}</td>
                  <td className="p-2">{item.days_worked}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{item.day_rate}</td>
                  <td className="p-2">${item.total_amount}</td>
                  <td className="p-2 flex gap-1">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" onClick={() => openEditServiceItemModal(item)}>Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded text-xs" onClick={() => deleteServiceItem(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState({
    code: "",
    name: "",
    description: "",
    client: "",
    site: "",
    startDate: "",
    endDate: "",
    cost: "",
    revenue: "",
    status: "Pending",
    progress: 0,
    activities: []
  });
  const openEditProjectModal = (project) => {
    setEditProjectId(project.id);
    setEditProject({
      code: project.code,
      name: project.name,
      description: project.description,
      client: project.client,
      site: project.site,
      startDate: project.startDate,
      endDate: project.endDate,
      cost: project.cost,
      revenue: project.revenue,
      status: project.status,
      progress: project.progress,
      activities: project.activities || []
    });
    setShowEditProjectModal(true);
  };

  const handleEditProjectInput = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditProject = () => {
    setProjects(projects => projects.map(p =>
      p.id === editProjectId
        ? {
            ...p,
            ...editProject,
            cost: Number(editProject.cost),
            revenue: Number(editProject.revenue),
            progress: Number(editProject.progress)
          }
        : p
    ));
    setTimeout(() => {
      setShowEditProjectModal(false);
      setEditProjectId(null);
    }, 100);
  };
  const EditProjectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form className="space-y-3" onSubmit={e => { e.preventDefault(); saveEditProject(); }}>
          <input name="code" value={editProject.code} onChange={handleEditProjectInput} className="border rounded p-2 w-full" placeholder="Project Code" required />
          <input name="name" value={editProject.name} onChange={handleEditProjectInput} className="border rounded p-2 w-full" placeholder="Project Name" required />
          <textarea name="description" value={editProject.description} onChange={handleEditProjectInput} className="border rounded p-2 w-full" placeholder="Description" rows={2} />
          <input name="client" value={editProject.client} onChange={handleEditProjectInput} className="border rounded p-2 w-full" placeholder="Client" required />
          <input name="site" value={editProject.site} onChange={handleEditProjectInput} className="border rounded p-2 w-full" placeholder="Site" required />
          <div className="flex gap-2">
            <input name="startDate" value={editProject.startDate} onChange={handleEditProjectInput} className="border rounded p-2 w-full" type="date" placeholder="Start Date" required />
            <input name="endDate" value={editProject.endDate} onChange={handleEditProjectInput} className="border rounded p-2 w-full" type="date" placeholder="End Date" required />
          </div>
          <div className="flex gap-2">
            <input name="cost" value={editProject.cost} onChange={handleEditProjectInput} className="border rounded p-2 w-full" type="number" placeholder="Cost" required />
            <input name="revenue" value={editProject.revenue} onChange={handleEditProjectInput} className="border rounded p-2 w-full" type="number" placeholder="Revenue" required />
          </div>
          <select name="status" value={editProject.status} onChange={handleEditProjectInput} className="border rounded p-2 w-full">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input name="progress" value={editProject.progress} onChange={handleEditProjectInput} className="border rounded p-2 w-full" type="number" min="0" max="100" placeholder="Progress (%)" />
          <div className="flex gap-2 justify-end">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowEditProjectModal(false); setEditProjectId(null); }}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
  const [newProject, setNewProject] = useState({
    code: "",
    name: "",
    description: "",
    client: "",
    site: "",
    startDate: "",
    endDate: "",
    cost: "",
    revenue: "",
    status: "Pending",
    progress: 0,
    activities: []
  });
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [viewActivitiesProject, setViewActivitiesProject] = useState(null);
  const [viewActivity, setViewActivity] = useState(null);
  const [activityProjectId, setActivityProjectId] = useState(null);
  const [newActivity, setNewActivity] = useState({
    code: "",
    name: "",
    assignee: "",
    assigner: "",
    startDate: "",
    endDate: "",
    progress: 0,
    status: "Pending"
  });

  // Cards summary
  const totalCost = projects.reduce((sum, p) => sum + p.cost, 0);
  const avgProgress = projects.length ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0;
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);

  // Modal skeletons (to be styled and implemented)
  const handleProjectInput = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
    // Validate required fields
    if (!newProject.code || !newProject.name || !newProject.client || !newProject.site || !newProject.startDate || !newProject.endDate || !newProject.cost || !newProject.revenue) return;
    setProjects(prev => [
      ...prev,
      {
        ...newProject,
        id: Date.now(),
        cost: Number(newProject.cost),
        revenue: Number(newProject.revenue),
        progress: 0,
        activities: []
      }
    ]);
    // Reset form after a short delay to avoid input blur/disabling
    setTimeout(() => {
      setNewProject({
        code: "",
        name: "",
        description: "",
        client: "",
        site: "",
        startDate: "",
        endDate: "",
        cost: "",
        revenue: "",
        status: "Pending",
        progress: 0,
        activities: []
      });
      setShowProjectModal(false);
    }, 100);
  };

  const ProjectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        <form className="space-y-3" onSubmit={e => { e.preventDefault(); addProject(); }}>
          <input name="code" value={newProject.code} onChange={handleProjectInput} className="border rounded p-2 w-full" placeholder="Project Code" required />
          <input name="name" value={newProject.name} onChange={handleProjectInput} className="border rounded p-2 w-full" placeholder="Project Name" required />
          <textarea name="description" value={newProject.description} onChange={handleProjectInput} className="border rounded p-2 w-full" placeholder="Description" rows={2} />
          <input name="client" value={newProject.client} onChange={handleProjectInput} className="border rounded p-2 w-full" placeholder="Client" required />
          <input name="site" value={newProject.site} onChange={handleProjectInput} className="border rounded p-2 w-full" placeholder="Site" required />
          <div className="flex gap-2">
            <input name="startDate" value={newProject.startDate} onChange={handleProjectInput} className="border rounded p-2 w-full" type="date" placeholder="Start Date" required />
            <input name="endDate" value={newProject.endDate} onChange={handleProjectInput} className="border rounded p-2 w-full" type="date" placeholder="End Date" required />
          </div>
          <div className="flex gap-2">
            <input name="cost" value={newProject.cost} onChange={handleProjectInput} className="border rounded p-2 w-full" type="number" placeholder="Cost" required />
            <input name="revenue" value={newProject.revenue} onChange={handleProjectInput} className="border rounded p-2 w-full" type="number" placeholder="Revenue" required />
          </div>
          <select name="status" value={newProject.status} onChange={handleProjectInput} className="border rounded p-2 w-full">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex gap-2 justify-end">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowProjectModal(false)}>Cancel</button>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleActivityInput = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const addActivity = () => {
    if (!activityProjectId) return;
    if (!newActivity.code || !newActivity.name || !newActivity.assignee || !newActivity.assigner || !newActivity.startDate || !newActivity.endDate) return;
    setProjects(projects => projects.map(p =>
      p.id === activityProjectId
        ? {
            ...p,
            activities: [
              ...p.activities,
              {
                ...newActivity,
                id: Date.now(),
                progress: Number(newActivity.progress),
              }
            ]
          }
        : p
    ));
    setTimeout(() => {
      setNewActivity({
        code: "",
        name: "",
        assignee: "",
        assigner: "",
        startDate: "",
        endDate: "",
        progress: 0,
        status: "Pending"
      });
      setShowActivityModal(false);
      setActivityProjectId(null);
    }, 100);
  };

  const ActivityModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Activity</h2>
        <form className="space-y-3" onSubmit={e => { e.preventDefault(); addActivity(); }}>
          <input name="code" value={newActivity.code} onChange={handleActivityInput} className="border rounded p-2 w-full" placeholder="Activity Code" required />
          <input name="name" value={newActivity.name} onChange={handleActivityInput} className="border rounded p-2 w-full" placeholder="Activity Name" required />
          <input name="assignee" value={newActivity.assignee} onChange={handleActivityInput} className="border rounded p-2 w-full" placeholder="Assignee" required />
          <input name="assigner" value={newActivity.assigner} onChange={handleActivityInput} className="border rounded p-2 w-full" placeholder="Assigner" required />
          <div className="flex gap-2">
            <input name="startDate" value={newActivity.startDate} onChange={handleActivityInput} className="border rounded p-2 w-full" type="date" placeholder="Start Date" required />
            <input name="endDate" value={newActivity.endDate} onChange={handleActivityInput} className="border rounded p-2 w-full" type="date" placeholder="End Date" required />
          </div>
          <div className="flex gap-2">
            <input name="progress" value={newActivity.progress} onChange={handleActivityInput} className="border rounded p-2 w-full" type="number" min="0" max="100" placeholder="Progress (%)" />
            <select name="status" value={newActivity.status} onChange={handleActivityInput} className="border rounded p-2 w-full">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowActivityModal(false); setActivityProjectId(null); }}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Activity</button>
          </div>
        </form>
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
                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs ml-2" onClick={() => { setShowActivityModal(true); setActivityProjectId(p.id); }}>Add Activity</button>
                  </td>
                  <td className="p-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1 text-xs" onClick={() => openEditProjectModal(p)}>Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m14-6V7a4 4 0 00-4-4H7a4 4 0 00-4 4v4m16 6v-2a4 4 0 00-4-4h-1a4 4 0 00-4 4v2" /></svg>
          Project Reports
        </h2>
        {/* Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-600">{projects.length}</span>
            <span className="text-sm text-gray-700">Total Projects</span>
          </div>
          <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-600">{projects.filter(p => p.status === 'Completed').length}</span>
            <span className="text-sm text-gray-700">Completed</span>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-600">{projects.filter(p => p.status === 'In Progress').length}</span>
            <span className="text-sm text-gray-700">In Progress</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <span className="text-3xl font-bold text-gray-600">{projects.filter(p => p.status === 'Pending').length}</span>
            <span className="text-sm text-gray-700">Pending</span>
          </div>
        </div>
        <div className="space-y-6">
          {projects.map(p => (
            <div key={p.id} className="border rounded-xl p-6 mb-2 bg-gradient-to-r from-gray-50 to-white shadow">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg text-gray-800">{p.name} <span className="text-xs text-gray-500">({p.code})</span></span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${p.status === 'Completed' ? 'bg-green-200 text-green-800' : p.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div><span className="font-semibold text-gray-700">Client:</span> <span className="text-gray-900">{p.client}</span></div>
                <div><span className="font-semibold text-gray-700">Site:</span> <span className="text-gray-900">{p.site}</span></div>
                <div><span className="font-semibold text-gray-700">Start:</span> <span className="text-gray-900">{p.startDate}</span></div>
                <div><span className="font-semibold text-gray-700">End:</span> <span className="text-gray-900">{p.endDate}</span></div>
                <div><span className="font-semibold text-gray-700">Cost:</span> <span className="text-blue-700 font-bold">${p.cost}</span></div>
                <div><span className="font-semibold text-gray-700">Revenue:</span> <span className="text-green-700 font-bold">${p.revenue}</span></div>
                <div><span className="font-semibold text-gray-700">Progress:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${p.progress === 100 ? 'bg-green-200 text-green-800' : p.progress > 0 ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{p.progress}%</span></div>
                <div><span className="font-semibold text-gray-700">Activities:</span> <span className="text-gray-900">{p.activities.length}</span></div>
              </div>
              <div className="mt-2 text-gray-700">
                <span className="font-semibold">Description:</span> <span className="text-gray-900">{p.description}</span>
              </div>
              {/* Visual cues for progress */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`h-3 rounded-full ${p.progress === 100 ? 'bg-green-500' : p.progress > 0 ? 'bg-yellow-400' : 'bg-gray-400'}`} style={{ width: `${p.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
  {showProjectModal && <ProjectModal />}
  {showEditProjectModal && <EditProjectModal />}
  {showActivityModal && <ActivityModal />}
  {viewActivitiesProject && <ViewActivitiesModal project={viewActivitiesProject} />}
    </div>
  );
}
