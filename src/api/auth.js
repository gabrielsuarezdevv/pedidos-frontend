import api from './axios';

export const getCsrfCookie = () => api.get('/sanctum/csrf-cookie');

export const login = (credentials) => api.post('/api/login', credentials);

export const register = (data) => api.post('/api/register', data);

export const logout = () => api.post('/api/logout');

export const getUser = () => api.get('/api/user');