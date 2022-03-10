import apiClient from 'services/apiService';

export const DepositServices = {
  GetAllCoin(params) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token`,
      params: params,
    });
  },
  GetCoin(coin) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token/${coin}`,
    });
  },
  GetNetwork(id) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/token/${id}/network`,
    });
  },
  GetWallet(network_id, token_id) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/wallet?network_id=${network_id}&token_id=${token_id}`,
    });
  },
};
