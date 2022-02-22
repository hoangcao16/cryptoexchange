import apiClient from './apiService';

export const postAdP2PServices = {
  getAllAllowBuySellService() {
    return apiClient.request({
      method: 'GET',
      url: '/admin-api/token/find-by-allow-buy-sell?allowBuySell=1',
    });
  },
};
