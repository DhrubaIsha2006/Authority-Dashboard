import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const nav = useNavigate();

  const login = () => {
    if (u === 'admin' && p === '1234') nav('/dashboard');
    else alert('Invalid credentials (admin / 1234)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2">Tourist Safety Dashboard</h1>
        <p className="text-sm text-slate-500 mb-4">Authority portal — demo mode</p>
        <input className="w-full p-3 border rounded mb-3" placeholder="Username" value={u} onChange={e=>setU(e.target.value)} />
        <input className="w-full p-3 border rounded mb-4" placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} />
        <button className="small-btn w-full" onClick={login}>Login</button>
      </div>
      <div className="ml-6 text-sm text-slate-500 max-w-sm">
        <p><strong>Demo credentials:</strong> admin / 1234</p>
        
      </div>
    </div>
  );
};

export default LoginPage;
