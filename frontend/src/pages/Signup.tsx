import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ username, password });
    navigate('/login');
  };

  return (
    <form onSubmit={handle}>
      <h2>Sign Up</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
