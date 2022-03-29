import apiClient from './apiService';

export const tabPaymentServices = {
  addPayment(data) {
    return apiClient.request({
      method: 'POST',
      url: 'p2p-api/api/v1/p2pPayment',
      data: data,
    });
  },
};
