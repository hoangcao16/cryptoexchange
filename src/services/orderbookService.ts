import apiClient from 'services/apiService';

export const OrderbookServices = {
  Orderbook(pair) {
    return apiClient.request({
      method: 'GET',
      url: `/matching-engine/api/v1/orderbook/depth?pair=${pair}`,
    });
  },
};
