import apiClient from 'services/apiService';

export const SpotWalletServices = {
  getAllSpotWallet() {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/spot`,
    });
  },
};
