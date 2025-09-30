import React from 'react';
import { useAuth } from '../context/AuthContext';

const roles = [
  'accounts', 'hr', 'logistics', 'operations', 'business', 'qhsse', 'project', 'ict'
];

export default function UserManagement() {
  const { users, assignRole } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Username</th>
            <th className="p-2">Role</th>
            <th className="p-2">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.username}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <select
                  value={u.role}
                  onChange={e => assignRole(u.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
