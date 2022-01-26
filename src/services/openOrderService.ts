import apiClient from 'services/apiService';

export const OpenOrderServices = {
  getOpenOrder(pageIndex, pageSize) {
    return apiClient.request({
      method: 'GET',
      url: `/order/getOpenOrder`,
      params: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
  },
  cancelOpenOrder(id) {
    return apiClient.request({
      method: 'POST',
      url: `/orders/cancel?orderId=${id}`,
    });
  },
};
