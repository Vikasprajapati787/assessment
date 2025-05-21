import React, { useState, useEffect } from 'react';
import { listSoftware } from '../api/software';
import { submitRequest } from '../api/requests';

export default function RequestAccess() {
  const [software, setSoftware] = useState<any[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    listSoftware().then(res => setSoftware(res.data));
  }, []);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitRequest({ softwareId: selected, accessType: type, reason });
    alert('Requested');
  };

  return (
    <form onSubmit={handle}>
      <h2>Request Access</h2>
      <select onChange={e => setSelected(Number(e.target.value))}>
        <option>Select software</option>
        {software.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <input value={type} onChange={e => setType(e.target.value)} placeholder="Access Type" />
      <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason"></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
