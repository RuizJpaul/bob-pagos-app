import request from './client';
export const createPayment = (formData) => request('/payments', { method: 'POST', body: formData });
export const getPayments = (query='') => request(`/payments${query ? `?${query}`: ''}`);
export const validatePayment = (id, action, note='') => request(`/payments/${id}/validate`, { method:'PATCH', body:{ action, note }});
