import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api/auth' });

export const signup = (data: { username: string; password: string }) =>
  API.post('/signup', data);

export const login = (data: { username: string; password: string }) =>
  API.post('/login', data);
