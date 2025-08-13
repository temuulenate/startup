import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Users
export const registerUser = (data) => api.post('/api/users/register', data);
export const getUserByPhone = (phone) => api.get(`/api/users/${phone}`);
export const topUp = (data) => api.post('/api/users/topup', data);

// Transfers
export const transfer = (data) => api.post('/api/transfer', data);
