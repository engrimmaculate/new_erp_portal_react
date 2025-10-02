import React, { useState, useCallback } from "react";
import { Fragment } from "react";
import { Card } from "./ui/Card";
import { Building2, Users, Receipt, Banknote, UserCheck, Truck, Calendar, Shield, TrendingUp, BarChart3, Verified, LucideView, Check, FileArchive, FileBarChart } from "lucide-react";

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
  const [invoices, setInvoices] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showEditInvoiceModal, setShowEditInvoiceModal] = useState(false);
  const [showViewInvoiceModal, setShowViewInvoiceModal] = useState(false);
  const [showServiceItemModal, setShowServiceItemModal] = useState(false);
  const [showEditServiceItemModal, setShowEditServiceItemModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editableServiceItems, setEditableServiceItems] = useState([]);
  // Mock service items data (replace with API call in a real app)
  const mockServiceItems = [
    { id: 1, item_code: "SERV-001", description: "Provision Of Catering and House Keeping Services", item_category:"Catering", quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 100, total_amount: 1000 },
    { id: 2, item_code: "SERV-002", description: "provision of HouseBoat - 60 Man",  item_category:"House Boat", quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 150, total_amount: 750 },
    { id: 3, item_code: "SERV-003", description: "Security Support Services - 24 hrs",  item_category:"Security", quantity:1, no_of_persons:30,days_worked:30,  unit: "hr", rate: 80, total_amount: 1600 },
    { id: 4, item_code: "SERV-004", description: "Provision Vehicle for Executive Movement", item_category:"Vehicle",vehicle_no:"456AH", quantity:1, no_of_persons:30,days_worked:30,  unit: "hr", rate: 120, total_amount: 4800 },
    { id: 5, item_code: "SERV-005", description: "Provsoion of House Boat (40 man)", item_category:"House Boat",  quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 90, total_amount: 900 },
    { id: 6, item_code: "SERV-006", description: "Provision of Table Water", item_category:"Water",  quantity:300, no_of_persons:30,days_worked:30, unit: "hr", rate: 90, total_amount: 900 },
    { id: 7, item_code: "SERV-007", description: "{Provision of AGO} - 3000 Ltrs @ 850", item_category:"AGO" , quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 90, total_amount: 900 },
    { id: 8, item_code: "SERV-008", description: "Provision of Welfare", item_category:"Welfare" , quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 90, total_amount: 900 },
    { id: 9, item_code: "SERV-009", description: "Provision Of PortaCabin", item_category:"Porta Cabin",  quantity:1, no_of_persons:30,days_worked:30, unit: "hr", rate: 90, total_amount: 900 },
  ];

  const [selectedServiceItems, setSelectedServiceItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServiceItems, setFilteredServiceItems] = useState(mockServiceItems);
  const [vatRate, setVatRate] = useState(7.5);
  const [markupRate, setMarkupRate] = useState(20);

  const [invoiceForm, setInvoiceForm] = useState({
    invoice_no: "", // auto generated and editable
    invoice_date: "",
    vendor_code: "",
    service_entry_no: "",
    customer_uniqueid: "", // link to customer table, Make this a type searchable dropdown
    gl_credit_account: "", // link to general ledger account table, Make this a type searchable dropdown
    gl_credit_account_id: "", // link to general ledger account table, Make this a type searchable dropdown
    account_uniqueid: "", // link to chart of account table, Make this a type searchable dropdown
    gl_debit_account: "", // link to chart of account table, Make this a type searchable dropdown
    gl_debit_account_id: "", // link to chart of account table, Make this a type searchable dropdown
    service_location_code: "", // link to client service location table, Make this a type searchable dropdown
    vat: "",
    tin_no: "",
    po_no: "",
    focal_person_id: "", // link to client contact person table, Make this a type searchable dropdown
    service_description_id: "", // link to service description table, Make this a type searchable dropdown
    service_location_id: "",  // link to client service location table, Make this a type searchable dropdown
    signatory: "", // link to signatory table, Make this a type searchable dropdown
    client_id: "", // link to client table, Make this a type searchable dropdown
    client_bank_account_id_NGN: "", // For Nigerian Naira, make this input type searchable dropdown to select
    client_bank_account_id_USD: "", // For US Dollars make this input type searchable dropdown to select
    bank_name: "",
    branch: "",
    account_name: "",
    account_no: "",
    sortcode: "",
    currency_type: "", // make it drop down with options NGN, USD, EUR
    status: "Pending",
    amount: "",
    user_id: "", // link to user table, Make this a type searchable dropdown
    invoice_type: "", // make it a drop down menu e.g. Memorandum, Service, etc
    
    invoice_service_code: "", // link to service code table, Make this a type searchable dropdown
    invoice_service_class: "", // e.g. make it a drop down menu with options link to service category table
    wcc: "",
    pay_advice_no: "",
    billed_to: "",
    company_name: "",
    service_address: "",
    service_city: "",
    service_state: "",
    management_fees: "",
    
    transport_fees: "",
    service_items: [],
    status: "Pending" // make it A DROP DOWN SELECT OPTION : Pending, Approved, Paid
  });
  const [editServiceItem, setEditServiceItem] = useState(null);
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
  
  const calculateItemTotal = useCallback((item) => {
  const quantity = Number(item.quantity || 1);
  const rate = Number(item.rate || 0);
  const noOfDays = Number(item.no_of_days || 1);
  const noOfPersons = Number(item.no_of_persons || 1);

  if (item.item_category === "vehicle") {
    return (quantity *noOfDays) * rate ;
  } else {
    return (quantity * noOfDays * noOfPersons) * rate ;
  }
}, []);

const calculateSubtotal = useCallback(() => {
  return editableServiceItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}, [editableServiceItems, calculateItemTotal]);

  // invoice modal function
    const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredServiceItems(
      mockServiceItems.filter(item =>
        item.item_code.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, []);

  // const addSelectedServiceItem = useCallback((item) => {
  //   if (!selectedServiceItems.some(selected => selected.id === item.id)) {
  //     setSelectedServiceItems(prev => [...prev, item]);
  //   }
  // }, [selectedServiceItems]);

  const addSelectedServiceItem = useCallback((item) => {
  if (!editableServiceItems.some(selected => selected.id === item.id)) {
    setEditableServiceItems(prev => [
      ...prev,
      {
        ...item,
        no_of_days: item.item_category === "vehicle" ? 1 : 0,
        quantity: 1,
        no_of_persons: item.item_category === "vehicle" ? 1 : 1,
        vehicle_no: item.item_category === "vehicle" ? item.vehicle_no : null,
        total_amount: calculateItemTotal({
          ...item,
          no_of_days: item.item_category === "vehicle" ? 1 : 1,
          quantity: 1,
          no_of_persons: item.item_category === "vehicle" ? 1 : 1
        })
      }
    ]);
  }
}, [editableServiceItems, calculateItemTotal]);


  const removeSelectedServiceItem = useCallback((id) => {
    setSelectedServiceItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // new subtotal, vat, markup, grand total functions
  

const updateEditableServiceItem = useCallback((id, field, value) => {
  setEditableServiceItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    )
  );
}, []);


  // const calculateSubtotal = useCallback(() => {
  //   return selectedServiceItems.reduce((sum, item) => sum + Number(item.total_amount || 0), 0);
  // }, [selectedServiceItems]);

  const calculateVat = useCallback(() => {
    return calculateSubtotal() * (vatRate / 100);
  }, [calculateSubtotal, vatRate]);

  const calculateMarkup = useCallback(() => {
    return calculateSubtotal() * (markupRate / 100);
  }, [calculateSubtotal, markupRate]);

  const calculateGrandTotal = useCallback(() => {
    return calculateSubtotal() + calculateVat() + calculateMarkup();
  }, [calculateSubtotal, calculateVat, calculateMarkup]);


// end invoice funcntion mdal

  const handleInvoiceInput = useCallback((e) => {
    const { name, value } = e.target;
    setInvoiceForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditServiceItemInput = useCallback((e) => {
    const { name, value } = e.target;
    setEditServiceItem((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleServiceItemInput = useCallback((e) => {
    const { name, value } = e.target;
    setServiceItemForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addInvoice = useCallback((data) => {
    setInvoices(prev => [
      ...prev,
      {
        ...data,
        id: Date.now(),
        // service_items: [],
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
  }, [invoiceForm]);

  const saveEditServiceItem = useCallback(() => {
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
  }, [selectedInvoice, editServiceItem]);

  const openEditServiceItemModal = useCallback((item) => {
    setEditServiceItem(item);
    setShowEditServiceItemModal(true);
  }, []);

  const openEditInvoice = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceForm({ ...invoice });
    setShowEditInvoiceModal(true);
  }, []);

  const openViewInvoice = useCallback((invoice) => {
    setSelectedInvoice(invoice);
    setShowViewInvoiceModal(true);
  }, []);

  const openServiceItemModal = useCallback((invoice) => {
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
  }, []);

  const addServiceItem = useCallback(() => {
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
  }, [selectedInvoice, serviceItemForm]);

  const deleteServiceItem = useCallback((itemId) => {
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
  }, [selectedInvoice]);

  const deleteInvoice = useCallback((id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  }, []);

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

      {/* Invoice Modal */}
  <InvoiceModal
  isOpen={showInvoiceModal}
  onClose={() => {
    setShowInvoiceModal(false);
    setEditableServiceItems([]);
    setSearchTerm("");
  }}
  form={invoiceForm}
  onChange={handleInvoiceInput}
  onSubmit={(data) => {
    addInvoice(data);
    setEditableServiceItems([]);
    setSearchTerm("");
  }}
  editableServiceItems={editableServiceItems}
  setEditableServiceItems={setEditableServiceItems}
  searchTerm={searchTerm}
  filteredServiceItems={filteredServiceItems}
  vatRate={vatRate}
  markupRate={markupRate}
  handleSearch={handleSearch}
  addSelectedServiceItem={addSelectedServiceItem}
  removeSelectedServiceItem={removeSelectedServiceItem}
  updateEditableServiceItem={updateEditableServiceItem}
  calculateSubtotal={calculateSubtotal}
  calculateVat={calculateVat}
  calculateMarkup={calculateMarkup}
  calculateGrandTotal={calculateGrandTotal}
  calculateItemTotal={calculateItemTotal}
/>

    {/* Edit Invoice Modal */}
    <EditInvoiceModal
      isOpen={showEditInvoiceModal}
      onClose={() => {
        setShowEditInvoiceModal(false);
        setEditableServiceItems([]);
        setSearchTerm("");
      }}
      form={invoiceForm}
      onChange={handleInvoiceInput}
      onSubmit={(data) => {
        // Implement your edit logic here
        setInvoices(prev => prev.map(inv =>
          inv.id === selectedInvoice.id ? { ...inv, ...data } : inv
        ));
        setShowEditInvoiceModal(false);
        setEditableServiceItems([]);
        setSearchTerm("");
      }}
      editableServiceItems={editableServiceItems}
      setEditableServiceItems={setEditableServiceItems}
      setSearchTerm={setSearchTerm}
      filteredServiceItems={filteredServiceItems}
      vatRate={vatRate}
      markupRate={markupRate}
      handleSearch={handleSearch}
      addSelectedServiceItem={addSelectedServiceItem}
      removeSelectedServiceItem={(id) => setEditableServiceItems(prev => prev.filter(item => item.id !== id))}
      updateEditableServiceItem={updateEditableServiceItem}
      calculateSubtotal={calculateSubtotal}
      calculateVat={calculateVat}
      calculateMarkup={calculateMarkup}
      calculateGrandTotal={calculateGrandTotal}
      calculateItemTotal={calculateItemTotal}
    />

      {/* View Invoice Modal */}
      <ViewInvoiceModal
        isOpen={showViewInvoiceModal}
        onClose={() => setShowViewInvoiceModal(false)}
        invoice={selectedInvoice}
      />

      {/* Service Item Modal */}
      <ServiceItemModal
        isOpen={showServiceItemModal}
        onClose={() => setShowServiceItemModal(false)}
        form={serviceItemForm}
        onChange={handleServiceItemInput}
        onSubmit={addServiceItem}
      />

      {/* Edit Service Item Modal */}
      <EditServiceItemModal
        isOpen={showEditServiceItemModal}
        onClose={() => setShowEditServiceItemModal(false)}
        item={editServiceItem}
        onChange={handleEditServiceItemInput}
        onSave={saveEditServiceItem}
      />

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

// InvoiceModal Component
  // const InvoiceModal = ({
  //   isOpen,
  //   onClose,
  //   form,
  //   onChange,
  //   onSubmit,
  //   selectedServiceItems,
  //   setSelectedServiceItems,
  //   searchTerm,
  //   filteredServiceItems,
  //   vatRate,
  //   markupRate,
  //   handleSearch,
  //   addSelectedServiceItem,
  //   removeSelectedServiceItem,
  //   calculateSubtotal,
  //   calculateVat,
  //   calculateMarkup,
  //   calculateGrandTotal
  // }) => {
  //   if (!isOpen) return null;

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
  //       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl max-h-[95vh] overflow-y-auto">
  //         <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Invoice</h2>

  //         {/* Invoice Details Section */}
  //         <div className="mb-8">
  //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Invoice Details</h3>
  //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //             {Object.keys(form).filter(f => f !== 'service_items' && !['amount', 'status'].includes(f)).map((field, index) => (
  //               <div key={field} className="flex flex-col">
  //                 <label className="text-xs font-semibold mb-1 capitalize text-gray-600">{field.replace(/_/g, ' ')}</label>
  //                 <input
  //                   name={field}
  //                   value={form[field]}
  //                   onChange={onChange}
  //                   className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                   type={field.includes('date') ? 'date' : 'text'}
  //                   required={field !== 'management_fees' && field !== 'transport_fees'}
  //                   autoFocus={index === 0}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Service Items Section */}
  //         <div className="mb-8">
  //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Service Items</h3>

  //           {/* Search and Add Service Items */}
  //           <div className="mb-4">
  //             <label className="text-xs font-semibold mb-1 text-gray-600">Search Service Items</label>
  //             <input
  //               type="text"
  //               value={searchTerm}
  //               onChange={handleSearch}
  //               placeholder="Search by code or description..."
  //               className="w-full border rounded-lg p-2.5 mb-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //             />
  //             {filteredServiceItems.length > 0 && (
  //               <div className="border rounded-lg p-2 bg-gray-50 max-h-48 overflow-y-auto">
  //                 {filteredServiceItems.map(item => (
  //                   <div
  //                     key={item.id}
  //                     onClick={() => addSelectedServiceItem(item)}
  //                     className="p-2 hover:bg-blue-50 rounded cursor-pointer flex justify-between items-center"
  //                   >
  //                     <div>
  //                       <div className="font-medium text-gray-800">{item.item_code}</div>
  //                       <div className="text-xs text-gray-600">{item.description}</div>
  //                     </div>
  //                     <div className="text-sm font-medium text-gray-800">${item.total_amount}</div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>

  //           {/* Selected Service Items Table */}
  //           {selectedServiceItems.length > 0 && (
  //             <div className="mb-4">
  //               <h4 className="text-sm font-semibold mb-2 text-gray-700">Selected Items</h4>
  //               <div className="overflow-x-auto border rounded-lg">
  //                 <table className="min-w-full text-left">
  //                   <thead className="bg-gray-100">
  //                     <tr>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Item Code</th>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Description</th>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Unit</th>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Rate</th>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Amount</th>
  //                       <th className="p-3 text-xs font-semibold text-gray-600">Action</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {selectedServiceItems.map(item => (
  //                       <tr key={item.id} className="border-b border-gray-100">
  //                         <td className="p-3 text-sm text-gray-800">{item.item_code}</td>
  //                         <td className="p-3 text-sm text-gray-800">{item.description}</td>
  //                         <td className="p-3 text-sm text-gray-800">{item.unit}</td>
  //                         <td className="p-3 text-sm text-gray-800">${item.rate}</td>
  //                         <td className="p-3 text-sm text-gray-800">${item.total_amount}</td>
  //                         <td className="p-3">
  //                           <button
  //                             type="button"
  //                             onClick={() => removeSelectedServiceItem(item.id)}
  //                             className="text-red-500 hover:text-red-700 text-xs font-medium"
  //                           >
  //                             Remove
  //                           </button>
  //                         </td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         {/* Summary Section */}
  //         <div className="border-t pt-6 mb-6">
  //           <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary</h3>
  //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">Subtotal</label>
  //               <input
  //                 type="text"
  //                 value={`$${calculateSubtotal().toFixed(2)}`}
  //                 readOnly
  //                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">VAT Rate (%)</label>
  //               <input
  //                 type="number"
  //                 value={vatRate}
  //                 onChange={(e) => setVatRate(Number(e.target.value))}
  //                 className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                 min="0"
  //                 max="100"
  //                 step="0.1"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">VAT Amount</label>
  //               <input
  //                 type="text"
  //                 value={`$${calculateVat().toFixed(2)}`}
  //                 readOnly
  //                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">Markup Rate (%)</label>
  //               <input
  //                 type="number"
  //                 value={markupRate}
  //                 onChange={(e) => setMarkupRate(Number(e.target.value))}
  //                 className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
  //                 min="0"
  //                 max="100"
  //                 step="0.1"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">Markup Amount</label>
  //               <input
  //                 type="text"
  //                 value={`$${calculateMarkup().toFixed(2)}`}
  //                 readOnly
  //                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
  //               />
  //             </div>
  //             <div className="flex flex-col">
  //               <label className="text-xs font-semibold mb-1 text-gray-600">Grand Total</label>
  //               <input
  //                 type="text"
  //                 value={`$${calculateGrandTotal().toFixed(2)}`}
  //                 readOnly
  //                 className="border rounded-lg p-2.5 bg-gray-100 text-sm font-bold text-blue-600"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         {/* Action Buttons */}
  //         <div className="flex justify-end gap-3 pt-4 border-t">
  //           <button
  //             type="button"
  //             onClick={onClose}
  //             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type="submit"
  //             onClick={(e) => {
  //               e.preventDefault();
  //               onSubmit({ ...form, service_items: selectedServiceItems, amount: calculateGrandTotal() });
  //             }}
  //             className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
  //           >
  //             Create Invoice
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
const InvoiceModal = ({
  isOpen,
  onClose,
  form,
  onChange,
  onSubmit,
  editableServiceItems,
  setEditableServiceItems,
  searchTerm,
  setSearchTerm,
  filteredServiceItems,
  vatRate,
  markupRate,
  handleSearch,
  addSelectedServiceItem,
  removeSelectedServiceItem,
  updateEditableServiceItem,
  calculateSubtotal,
  calculateVat,
  calculateMarkup,
  calculateGrandTotal,
  calculateItemTotal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Invoice</h2>

        {/* Invoice Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Invoice Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(form).filter(f => f !== 'service_items' && !['amount', 'status'].includes(f)).map((field, index) => (
              <div key={field} className="flex flex-col">
                <label className="text-xs font-semibold mb-1 capitalize text-gray-600">{field.replace(/_/g, ' ')}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={onChange}
                  className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  type={field.includes('date') ? 'date' : 'text'}
                  required={field !== 'management_fees' && field !== 'transport_fees'}
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Service Items Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Service Items</h3>

          {/* Search and Add Service Items */}
          <div className="mb-6">
            <label className="text-xs font-semibold mb-1 text-gray-600">Search Service Items</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by code or description..."
              className="w-full border rounded-lg p-2.5 mb-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {filteredServiceItems.length > 0 && (
              <div className="border rounded-lg p-2 bg-gray-50 max-h-48 overflow-y-auto">
                {filteredServiceItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => addSelectedServiceItem(item)}
                    className="p-2 hover:bg-blue-50 rounded cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{item.item_code}</div>
                      <div className="text-xs text-gray-600">{item.description}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-800">${item.rate}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Service Items Table */}
          {editableServiceItems.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Selected Items</h4>
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-xs font-semibold text-gray-600">Item Code</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Description</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Category</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">No. of Days</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Quantity</th>
                      {editableServiceItems.some(item => item.item_category !== "vehicle") && (
                        <th className="p-3 text-xs font-semibold text-gray-600">No. of Persons</th>
                      )}
                      {editableServiceItems.some(item => item.item_category === "vehicle") && (
                        <th className="p-3 text-xs font-semibold text-gray-600">Vehicle No.</th>
                      )}
                      <th className="p-3 text-xs font-semibold text-gray-600">Rate</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Total Amount</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editableServiceItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="p-3 text-sm text-gray-800">{item.item_code}</td>
                        <td className="p-3 text-sm text-gray-800">{item.description}</td>
                        <td className="p-3 text-sm text-gray-800">{item.item_category}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.no_of_days}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateEditableServiceItem(item.id, 'no_of_days', value);
                              updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, no_of_days: value}));
                            }}
                            className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                            min="0"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateEditableServiceItem(item.id, 'quantity', value);
                              updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, quantity: value}));
                            }}
                            className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                            min="0"
                          />
                        </td>
                        {item.item_category !== "vehicle" && (
                          <td className="p-3">
                            <input
                              type="number"
                              value={item.no_of_persons}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                updateEditableServiceItem(item.id, 'no_of_persons', value);
                                updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, no_of_persons: value}));
                              }}
                              className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                              min="0"
                            />
                          </td>
                        )}
                        {item.item_category === "vehicle" && (
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.vehicle_no || ""}
                              onChange={(e) => updateEditableServiceItem(item.id, 'vehicle_no', e.target.value)}
                              className="border rounded p-1.5 w-24 text-sm focus:ring-1 focus:ring-blue-400"
                              placeholder="Vehicle No."
                            />
                          </td>
                        )}
                        <td className="p-3 text-sm text-gray-800">${item.rate}</td>
                        <td className="p-3 text-sm font-medium text-gray-800">${item.total_amount.toFixed(2)}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => removeSelectedServiceItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="border-t pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Subtotal</label>
              <input
                type="text"
                value={`$${calculateSubtotal().toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">VAT Rate (%)</label>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">VAT Amount</label>
              <input
                type="text"
                value={`$${(calculateSubtotal() * (vatRate / 100)).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Markup Rate (%)</label>
              <input
                type="number"
                value={markupRate}
                onChange={(e) => setMarkupRate(Number(e.target.value))}
                className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                min="0"
                max="100"
                
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Markup Amount</label>
              <input
                type="text"
                value={`$${(calculateSubtotal() * (markupRate / 100)).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Grand Total</label>
              <input
                type="text"
                value={`$${(
                  calculateSubtotal() +
                  (calculateSubtotal() * (vatRate / 100)) +
                  (calculateSubtotal() * (markupRate / 100))
                ).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-bold text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => {
              onClose();
              setEditableServiceItems([]);
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmit({
                ...form,
                service_items: editableServiceItems,
                amount: calculateSubtotal() + (calculateSubtotal() * (vatRate / 100)) + (calculateSubtotal() * (markupRate / 100))
              });
              setEditableServiceItems([]);
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};



// EditInvoiceModal Component
// const EditInvoiceModal = ({
//   isOpen,
//   onClose,
//   form,
//   onChange,
//   selectedServiceItems,
//   setSelectedServiceItems,
//   searchTerm,
//   filteredServiceItems,
//   vatRate,
//   markupRate,
//   handleSearch,
//   addSelectedServiceItem,
//   removeSelectedServiceItem,
//   calculateSubtotal,
//   calculateVat,
//   calculateMarkup,
//   calculateGrandTotal
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl max-h-[95vh] overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Invoice</h2>

//         {/* Invoice Details Section */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Invoice Details</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {Object.keys(form).filter(f => f !== 'service_items' && !['amount', 'status'].includes(f)).map((field, index) => (
//               <div key={field} className="flex flex-col">
//                 <label className="text-xs font-semibold mb-1 capitalize text-gray-600">{field.replace(/_/g, ' ')}</label>
//                 <input
//                   name={field}
//                   value={form[field]}
//                   onChange={onChange}
//                   className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                   type={field.includes('date') ? 'date' : 'text'}
//                   required={true}
//                   autoComplete="off"
//                   autoFocus={index === 0}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Service Items Section */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Service Items</h3>

//           {/* Search and Add Service Items */}
//           <div className="mb-4">
//             <label className="text-xs font-semibold mb-1 text-gray-600">Search Service Items</label>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleSearch}
//               placeholder="Search by code or description..."
//               className="w-full border rounded-lg p-2.5 mb-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//             />
//             {filteredServiceItems.length > 0 && (
//               <div className="border rounded-lg p-2 bg-gray-50 max-h-48 overflow-y-auto">
//                 {filteredServiceItems.map(item => (
//                   <div
//                     key={item.id}
//                     onClick={() => addSelectedServiceItem(item)}
//                     className="p-2 hover:bg-blue-50 rounded cursor-pointer flex justify-between items-center"
//                   >
//                     <div>
//                       <div className="font-medium text-gray-800">{item.item_code}</div>
//                       <div className="text-xs text-gray-600">{item.description}</div>
//                     </div>
//                     <div className="text-sm font-medium text-gray-800">${item.total_amount}</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Selected Service Items Table */}
//           {selectedServiceItems.length > 0 && (
//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2 text-gray-700">Selected Items</h4>
//               <div className="overflow-x-auto border rounded-lg">
//                 <table className="min-w-full text-left">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Item Code</th>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Description</th>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Unit</th>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Rate</th>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Amount</th>
//                       <th className="p-3 text-xs font-semibold text-gray-600">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {selectedServiceItems.map(item => (
//                       <tr key={item.id} className="border-b border-gray-100">
//                         <td className="p-3 text-sm text-gray-800">{item.item_code}</td>
//                         <td className="p-3 text-sm text-gray-800">{item.description}</td>
//                         <td className="p-3 text-sm text-gray-800">{item.unit}</td>
//                         <td className="p-3 text-sm text-gray-800">${item.rate}</td>
//                         <td className="p-3 text-sm text-gray-800">${item.total_amount}</td>
//                         <td className="p-3">
//                           <button
//                             type="button"
//                             onClick={() => removeSelectedServiceItem(item.id)}
//                             className="text-red-500 hover:text-red-700 text-xs font-medium"
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Summary Section */}
//         <div className="border-t pt-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">Subtotal</label>
//               <input
//                 type="text"
//                 value={`$${calculateSubtotal().toFixed(2)}`}
//                 readOnly
//                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">VAT Rate (%)</label>
//               <input
//                 type="number"
//                 value={vatRate}
//                 onChange={(e) => setVatRate(Number(e.target.value))}
//                 className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                 min="0"
//                 max="100"
//                 step="0.1"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">VAT Amount</label>
//               <input
//                 type="text"
//                 value={`$${calculateVat().toFixed(2)}`}
//                 readOnly
//                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">Markup Rate (%)</label>
//               <input
//                 type="number"
//                 value={markupRate}
//                 onChange={(e) => setMarkupRate(Number(e.target.value))}
//                 className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                 min="0"
//                 max="100"
//                 step="0.1"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">Markup Amount</label>
//               <input
//                 type="text"
//                 value={`$${calculateMarkup().toFixed(2)}`}
//                 readOnly
//                 className="border rounded-lg p-2.5 bg-gray-100 text-sm"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-xs font-semibold mb-1 text-gray-600">Grand Total</label>
//               <input
//                 type="text"
//                 value={`$${calculateGrandTotal().toFixed(2)}`}
//                 readOnly
//                 className="border rounded-lg p-2.5 bg-gray-100 text-sm font-bold text-blue-600"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3 pt-4 border-t">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={(e) => {
//               e.preventDefault();
//               onSubmit({ ...form, service_items: selectedServiceItems, amount: calculateGrandTotal() });
//             }}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const EditInvoiceModal = ({
  isOpen,
  onClose,
  form,
  onChange,
  editableServiceItems,
  setEditableServiceItems,
  searchTerm,
  setSearchTerm,
  filteredServiceItems,
  vatRate,
  markupRate,
  handleSearch,
  addSelectedServiceItem,
  removeSelectedServiceItem,
  updateEditableServiceItem,
  calculateSubtotal,
  calculateVat,
  calculateMarkup,
  calculateGrandTotal,
  calculateItemTotal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Invoice</h2>

        {/* Invoice Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Invoice Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(form).filter(f => f !== 'service_items' && !['amount', 'status'].includes(f)).map((field, index) => (
              <div key={field} className="flex flex-col">
                <label className="text-xs font-semibold mb-1 capitalize text-gray-600">{field.replace(/_/g, ' ')}</label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={onChange}
                  className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  type={field.includes('date') ? 'date' : 'text'}
                  required={true}
                  autoComplete="off"
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Service Items Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Service Items</h3>

          {/* Search and Add Service Items */}
          <div className="mb-6">
            <label className="text-xs font-semibold mb-1 text-gray-600">Search Service Items</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by code or description..."
              className="w-full border rounded-lg p-2.5 mb-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
            {filteredServiceItems.length > 0 && (
              <div className="border rounded-lg p-2 bg-gray-50 max-h-48 overflow-y-auto">
                {filteredServiceItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => addSelectedServiceItem(item)}
                    className="p-2 hover:bg-blue-50 rounded cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-800">{item.item_code}</div>
                      <div className="text-xs text-gray-600">{item.description}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-800">${item.total_amount}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Service Items Table */}
          {editableServiceItems.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Selected Items</h4>
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-xs font-semibold text-gray-600">Item Code</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Description</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Category</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">No. of Days</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Quantity</th>
                      {editableServiceItems.some(item => item.item_category !== "vehicle") && (
                        <th className="p-3 text-xs font-semibold text-gray-600">No. of Persons</th>
                      )}
                      {editableServiceItems.some(item => item.item_category === "vehicle") && (
                        <th className="p-3 text-xs font-semibold text-gray-600">Vehicle No.</th>
                      )}
                      <th className="p-3 text-xs font-semibold text-gray-600">Rate</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Total Amount</th>
                      <th className="p-3 text-xs font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editableServiceItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="p-3 text-sm text-gray-800">{item.item_code}</td>
                        <td className="p-3 text-sm text-gray-800">{item.description}</td>
                        <td className="p-3 text-sm text-gray-800">{item.item_category}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.no_of_days}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateEditableServiceItem(item.id, 'no_of_days', value);
                              updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, no_of_days: value}));
                            }}
                            className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                            min="0"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              updateEditableServiceItem(item.id, 'quantity', value);
                              updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, quantity: value}));
                            }}
                            className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                            min="0"
                          />
                        </td>
                        {item.item_category !== "vehicle" && (
                          <td className="p-3">
                            <input
                              type="number"
                              value={item.no_of_persons}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                updateEditableServiceItem(item.id, 'no_of_persons', value);
                                updateEditableServiceItem(item.id, 'total_amount', calculateItemTotal({...item, no_of_persons: value}));
                              }}
                              className="border rounded p-1.5 w-16 text-sm focus:ring-1 focus:ring-blue-400"
                              min="0"
                            />
                          </td>
                        )}
                        {item.item_category === "vehicle" && (
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.vehicle_no || ""}
                              onChange={(e) => updateEditableServiceItem(item.id, 'vehicle_no', e.target.value)}
                              className="border rounded p-1.5 w-24 text-sm focus:ring-1 focus:ring-blue-400"
                              placeholder="Vehicle No."
                            />
                          </td>
                        )}
                        <td className="p-3 text-sm text-gray-800">${item.rate}</td>
                        <td className="p-3 text-sm font-medium text-gray-800">${item.total_amount.toFixed(2)}</td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => removeSelectedServiceItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="border-t pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Subtotal</label>
              <input
                type="text"
                value={`$${calculateSubtotal().toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">VAT Rate (%)</label>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">VAT Amount</label>
              <input
                type="text"
                value={`$${(calculateSubtotal() * (vatRate / 100)).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Markup Rate (%)</label>
              <input
                type="number"
                value={markupRate}
                onChange={(e) => setMarkupRate(Number(e.target.value))}
                className="border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Markup Amount</label>
              <input
                type="text"
                value={`$${(calculateSubtotal() * (markupRate / 100)).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1 text-gray-600">Grand Total</label>
              <input
                type="text"
                value={`$${(
                  calculateSubtotal() +
                  (calculateSubtotal() * (vatRate / 100)) +
                  (calculateSubtotal() * (markupRate / 100))
                ).toFixed(2)}`}
                readOnly
                className="border rounded-lg p-2.5 bg-gray-100 text-sm font-bold text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={() => {
              onClose();
              setEditableServiceItems([]);
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmit({
                ...form,
                service_items: editableServiceItems,
                amount: calculateSubtotal() + (calculateSubtotal() * (vatRate / 100)) + (calculateSubtotal() * (markupRate / 100))
              });
              setEditableServiceItems([]);
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};




// ViewInvoiceModal Component
const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        {invoice && (
          <div id="print-invoice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.keys(invoice).filter(f => f !== 'service_items').map((field) => (
                <div key={field} className="flex flex-col">
                  <span className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</span>
                  <span className="text-gray-900">{invoice[field]}</span>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2">Service Items</h3>
            <table className="min-w-full text-left mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Item Code</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Day Rate</th>
                  <th className="p-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.service_items && invoice.service_items.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2 font-mono">{item.item_code}</td>
                    <td className="p-2">{item.description}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.day_rate}</td>
                    <td className="p-2">${item.total_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between"><span className="font-semibold">Subtotal:</span> <span>${invoice.service_items ? invoice.service_items.reduce((sum, item) => sum + Number(item.total_amount || 0), 0) : 0}</span></div>
              <div className="flex justify-between"><span className="font-semibold">VAT (7.5%):</span> <span>${invoice.service_items ? (invoice.service_items.reduce((sum, item) => sum + Number(item.total_amount || 0), 0) * 0.075).toFixed(2) : 0}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Grand Total:</span> <span>${invoice.service_items ? (invoice.service_items.reduce((sum, item) => sum + Number(item.total_amount || 0), 0) * 1.075).toFixed(2) : 0}</span></div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mb-2" onClick={() => window.print()}>Print Invoice</button>
          </div>
        )}
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// ServiceItemModal Component
const ServiceItemModal = ({ isOpen, onClose, form, onChange, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-6">Add Service Item</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
          {Object.keys(form).map((field, index) => (
            <div key={field} className="flex flex-col">
              <label className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                name={field}
                value={form[field]}
                onChange={onChange}
                className="border rounded p-2"
                type={field.includes('date') ? 'date' : 'text'}
                required={field !== 'keves_merge_vendors' && field !== 'nepl_months'}
                autoFocus={index === 0}
              />
            </div>
          ))}
          <div className="col-span-full flex gap-2 justify-end mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Service Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// EditServiceItemModal Component
const EditServiceItemModal = ({ isOpen, onClose, item, onChange, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-6">Edit Service Item</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" onSubmit={e => { e.preventDefault(); onSave(); }}>
          {item && Object.keys(item).map((field, index) => (
            <div key={field} className="flex flex-col">
              <label className="text-xs font-semibold mb-1 capitalize">{field.replace(/_/g, ' ')}</label>
              <input
                name={field}
                value={item[field]}
                onChange={onChange}
                className="border rounded p-2"
                type={field.includes('date') ? 'date' : 'text'}
                required={field !== 'keves_merge_vendors' && field !== 'nepl_months'}
                autoFocus={index === 0}
              />
            </div>
          ))}
          <div className="col-span-full flex gap-2 justify-end mt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


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
      <Card title="Fitness to Work" value={6} icon={Check} color="bg-secondary" />
      <Card title="Document Control" value={6} icon={FileArchive} color="bg-green-100" />
      <Card title="ISO AUDIT REPORT" value={6} icon={FileBarChart} color="bg-secondary" />
    </div>
  );
}

export function ProjectDashboard() {
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

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [viewActivitiesProject, setViewActivitiesProject] = useState(null);
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
  const [activityProjectId, setActivityProjectId] = useState(null);

  const handleProjectInput = useCallback((e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEditProjectInput = useCallback((e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleActivityInput = useCallback((e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addProject = useCallback(() => {
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
  }, [newProject]);

  // const openEditProjectModal = useCallback((project) => {
  //   setEditProjectId(project.id);
  //   setEditProject({
  //     code: project.code,
  //     name: project.name,
  //     description: project.description,
  //     client: project.client,
  //     site: project.site,
  //     startDate: project.startDate,
  //     endDate: project.endDate,
  //     cost: project.cost,
  //     revenue: project.revenue,
  //     status: project.status,
  //     progress: project.progress,
  //     activities: project.activities || []
  //   });
  //   setShowEditProjectModal(true);
  // }, []);

  const openEditInvoice = useCallback((invoice) => {
  setSelectedInvoice(invoice);
  setInvoiceForm({ ...invoice });
  setEditableServiceItems(invoice.service_items || []);
  setShowEditInvoiceModal(true);
}, []);

  const saveEditProject = useCallback(() => {
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
    setShowEditProjectModal(false);
    setEditProjectId(null);
  }, [editProject, editProjectId]);

  const addActivity = useCallback(() => {
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
  }, [newActivity, activityProjectId]);

  const totalCost = projects.reduce((sum, p) => sum + p.cost, 0);
  const avgProgress = projects.length ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0;
  const totalRevenue = projects.reduce((sum, p) => sum + (p.revenue || 0), 0);

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

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        form={newProject}
        onChange={handleProjectInput}
        onSubmit={addProject}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={showEditProjectModal}
        onClose={() => setShowEditProjectModal(false)}
        form={editProject}
        onChange={handleEditProjectInput}
        onSubmit={saveEditProject}
      />

      {/* Activity Modal */}
      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        form={newActivity}
        onChange={handleActivityInput}
        onSubmit={addActivity}
      />

      {/* View Activities Modal */}
      {viewActivitiesProject && (
        <ViewActivitiesModal
          project={viewActivitiesProject}
          onClose={() => setViewActivitiesProject(null)}
        />
      )}
    </div>
  );
}

// ProjectModal Component
const ProjectModal = ({ isOpen, onClose, form, onChange, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6">Add New Project</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Project Code</label>
              <input name="code" value={form.code} onChange={onChange} className="border rounded p-2" placeholder="Project Code" required autoFocus />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Project Name</label>
              <input name="name" value={form.name} onChange={onChange} className="border rounded p-2" placeholder="Project Name" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Client</label>
              <input name="client" value={form.client} onChange={onChange} className="border rounded p-2" placeholder="Client" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Site</label>
              <input name="site" value={form.site} onChange={onChange} className="border rounded p-2" placeholder="Site" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Start Date</label>
              <input name="startDate" value={form.startDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="Start Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">End Date</label>
              <input name="endDate" value={form.endDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="End Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Cost</label>
              <input name="cost" value={form.cost} onChange={onChange} className="border rounded p-2" type="number" placeholder="Cost" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Revenue</label>
              <input name="revenue" value={form.revenue} onChange={onChange} className="border rounded p-2" type="number" placeholder="Revenue" required />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={onChange} className="border rounded p-2" placeholder="Description" rows={3} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="border rounded p-2">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// EditProjectModal Component
const EditProjectModal = ({ isOpen, onClose, form, onChange, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6">Edit Project</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Project Code</label>
              <input name="code" value={form.code} onChange={onChange} className="border rounded p-2" placeholder="Project Code" required autoFocus />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Project Name</label>
              <input name="name" value={form.name} onChange={onChange} className="border rounded p-2" placeholder="Project Name" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Client</label>
              <input name="client" value={form.client} onChange={onChange} className="border rounded p-2" placeholder="Client" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Site</label>
              <input name="site" value={form.site} onChange={onChange} className="border rounded p-2" placeholder="Site" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Start Date</label>
              <input name="startDate" value={form.startDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="Start Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">End Date</label>
              <input name="endDate" value={form.endDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="End Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Cost</label>
              <input name="cost" value={form.cost} onChange={onChange} className="border rounded p-2" type="number" placeholder="Cost" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Revenue</label>
              <input name="revenue" value={form.revenue} onChange={onChange} className="border rounded p-2" type="number" placeholder="Revenue" required />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={onChange} className="border rounded p-2" placeholder="Description" rows={3} />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Status</label>
            <select name="status" value={form.status} onChange={onChange} className="border rounded p-2">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Progress (%)</label>
            <input name="progress" value={form.progress} onChange={onChange} className="border rounded p-2" type="number" min="0" max="100" placeholder="Progress" />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ActivityModal Component
const ActivityModal = ({ isOpen, onClose, form, onChange, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6">Add New Activity</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Activity Code</label>
              <input name="code" value={form.code} onChange={onChange} className="border rounded p-2" placeholder="Activity Code" required autoFocus />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Activity Name</label>
              <input name="name" value={form.name} onChange={onChange} className="border rounded p-2" placeholder="Activity Name" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Assignee</label>
              <input name="assignee" value={form.assignee} onChange={onChange} className="border rounded p-2" placeholder="Assignee" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Assigner</label>
              <input name="assigner" value={form.assigner} onChange={onChange} className="border rounded p-2" placeholder="Assigner" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Start Date</label>
              <input name="startDate" value={form.startDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="Start Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">End Date</label>
              <input name="endDate" value={form.endDate} onChange={onChange} className="border rounded p-2" type="date" placeholder="End Date" required />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Progress (%)</label>
              <input name="progress" value={form.progress} onChange={onChange} className="border rounded p-2" type="number" min="0" max="100" placeholder="Progress" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold mb-1">Status</label>
              <select name="status" value={form.status} onChange={onChange} className="border rounded p-2">
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Activity</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ViewActivitiesModal Component
const ViewActivitiesModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl">
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
        <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
