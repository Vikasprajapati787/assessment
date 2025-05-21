import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/software',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export interface SoftwarePayload {
  name: string;
  description: string;
  accessLevels: string[];
}

export const createSoftware = (data: SoftwarePayload) => {
  return API.post('/', data);
};

export const listSoftware = () => {
  return API.get('/');
};
