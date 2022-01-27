import apiClient from 'services/apiService';

export const SpotWalletServices = {
  getAllSpotWallet() {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/spot`,
    });
  },
  getPairValueSpotWallet(pairId) {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/spot/self?pair_id=${pairId}`,
    });
  },
};
