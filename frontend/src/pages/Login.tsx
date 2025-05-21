import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login({ username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    if (res.data.role === 'Admin') navigate('/create-software');
    if (res.data.role === 'Employee') navigate('/request-access');
    if (res.data.role === 'Manager') navigate('/pending-requests');
  };

  return (
    <form onSubmit={handle}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
