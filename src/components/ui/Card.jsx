import React from "react";

export function Card({ title, value, icon: Icon, color = "bg-white", children }) {
  return (
    <div className={`rounded-xl shadow-lg p-6 flex items-center space-x-4 ${color}`}>
      {Icon && <Icon className="w-8 h-8 text-red-600" />}
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {value !== undefined && <p className="text-2xl font-bold">{value}</p>}
        {children}
      </div>
    </div>
  );
}
