import apiClient from 'services/apiService';

export const MarketServices = {
  GetAllPair() {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/api/v1/pair/getAllPair`,
    });
  },
};
