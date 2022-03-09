import apiClient from './apiService';

export const tabP2PService = {
  getListOrderBuy() {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder`,
    });
  },
};
