
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Eye, EyeOff } from 'lucide-react';


export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const user = login(username, password);
    if (!user) setError('Invalid credentials');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(234, 49, 49, 0.15), rgba(57, 56, 56, 0.5)), url('/assets/banner.jpg')`
      }}
    >
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-sm relative z-10">
        <div className="flex justify-center mb-6">
          <img src="/assets/keves-logo-no-bg.png" alt="Company Logo" className="h-16 w-auto" />
        </div>
        <h6 className="text-sm font-bold mb-6 text-center text-primary">Enter username and Password to Login</h6>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User className="w-5 h-5" />
          </span>
          <input
            className="w-full p-2 pl-10 border rounded"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Lock className="w-5 h-5" />
          </span>
          <input
            className="w-full p-2 pl-10 pr-10 border rounded"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <button className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-800" type="submit">
          Login
        </button>
      </form>
      {/* Optional: Overlay for extra color effect */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
    </div>
  );
}
