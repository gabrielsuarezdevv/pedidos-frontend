import api from './axios';

export const getOrders = () => api.get('/api/orders');
export const createOrder = (data) => api.post('/api/orders', data);