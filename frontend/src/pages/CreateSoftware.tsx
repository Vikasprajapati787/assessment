import React, { useState, useEffect } from 'react';
import { createSoftware, listSoftware } from '../api/software';

export default function CreateSoftware() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('');
  const [all, setAll] = useState<any[]>([]);

  useEffect(() => {
    listSoftware().then(res => setAll(res.data));
  }, []);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const levels = accessLevels.split(',').map(s => s.trim());
    await createSoftware({ name, description, accessLevels: levels });
    const updated = await listSoftware();
    setAll(updated.data);
  };

  return (
    <div>
      <h2>Create Software</h2>
      <form onSubmit={handle}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
        <input value={accessLevels} onChange={e => setAccessLevels(e.target.value)} placeholder="Access Levels (comma separated)" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {all.map(s => (
          <li key={s.id}>{s.name} - {s.accessLevels.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}
