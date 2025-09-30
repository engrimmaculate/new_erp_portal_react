import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  // Example users for demo
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin', role: 'ict' },
    { id: 2, username: 'hr', password: 'hr', role: 'hr' },
    { id: 3, username: 'logistics', password: 'logistics', role: 'logistics' },
    { id: 4, username: 'accounts', password: 'accounts', role: 'accounts' },
    { id: 5, username: 'operations', password: 'operations', role: 'operations' },
    { id: 6, username: 'business', password: 'business', role: 'business' },
    { id: 7, username: 'qhsse', password: 'qhsse', role: 'qhsse' },
    { id: 8, username: 'project', password: 'project', role: 'project' },
  ]);
  const [user, setUser] = useState(() => {
    // Always log out on reload
    return null;
  });

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
    }
    return found;
  };

  const logout = () => {
    setUser(null);
  };

  const assignRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (user && user.id === userId) setUser({ ...user, role: newRole });
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, assignRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
