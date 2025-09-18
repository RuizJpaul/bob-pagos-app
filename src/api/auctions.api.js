import request from './client';
export const listAuctions = () => request('/auctions');
export const getAuction = (id) => request(`/auctions/${id}`);
export const closeAuction = (id) => request(`/auctions/${id}/close`, { method:'POST' });
