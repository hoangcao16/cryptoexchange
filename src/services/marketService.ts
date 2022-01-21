import apiClient from 'services/apiService';

export const MarketServices = {
  GetAllPair() {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/pair/getAllPair`,
    });
  },
};
