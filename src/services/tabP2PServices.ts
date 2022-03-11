import apiClient from './apiService';

export const tabP2PService = {
  getListOrderBuy() {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder`,
    });
  },

  getListOrderBy(params) {
    return apiClient.request({
      method: 'GET',
      url: `/p2p-api/api/v1/p2pOrder/orders`,
      params: {
        fiat: params.fiat,
        payment: params.payments,
        amount: params.amount,
        orderType: params.orderType,
        tokenId: params.tokenId,
      },
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

  getOrderByEmail(params) {
    return apiClient.request({
      method: 'GET',
      url: `p2p-api/api/v1/p2pOrder/p2POrdersByEmail?email=${params}`,
    });
  },
};
