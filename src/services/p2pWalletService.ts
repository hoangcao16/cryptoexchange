import apiClient from 'services/apiService';

export const P2PWalletServices = {
  getAllP2PWallet() {
    return apiClient.request({
      method: 'GET',
      url: `/trading-wallet-svc/p2p`,
    });
  },
};
