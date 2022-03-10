import apiClient from './apiService';

export const tabP2PService = {
  getListOrderBuy() {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder`,
    });
  },

  getListFiat() {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/P2pFiat`,
    });
  },

  getListPayments() {
    return apiClient.request({
      method: 'GET',
      url: `admin-api/payment-method`,
    });
  },

  getListToken() {
    return apiClient.request({
      method: 'GET',
      url: `admin-api/token`,
    });
  },
};
