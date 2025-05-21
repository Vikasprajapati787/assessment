import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000/api/requests',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export interface RequestPayload {
  softwareId: number;
  accessType: string;
  reason: string;
}

export const submitRequest = (data: RequestPayload) => {
  return API.post('/', data);
};

export const getPendingRequests = () => {
  return API.get('/pending');
};

export const updateRequest = (id: number, status: 'Pending' | 'Approved' | 'Rejected') => {
  return API.patch(`/${id}`, { status });
};
