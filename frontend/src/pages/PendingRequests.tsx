import React, { useState, useEffect } from 'react';
import { getPendingRequests, updateRequest } from '../api/requests';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface PendingRequest {
  id: number;
  user: { username: string };
  software: { name: string };
  accessType: string; // or narrow to 'Read' | 'Write' | 'Admin'
  status: RequestStatus;
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<PendingRequest[]>([]);

  useEffect(() => {
    getPendingRequests().then(res => {
      setRequests(res.data as PendingRequest[]);
    });
  }, []);

  const handle =
    (id: number, status: RequestStatus): (() => Promise<void>) =>
    async () => {
      await updateRequest(id, status);
      setRequests(reqs => reqs.filter(r => r.id !== id));
    };

  return (
    <div>
      <h2>Pending Requests</h2>
      <ul>
        {requests.map(r => (
          <li key={r.id}>
            {r.user.username} requested {r.software.name} ({r.accessType})
            <button onClick={handle(r.id, 'Approved')}>Approve</button>
            <button onClick={handle(r.id, 'Rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

