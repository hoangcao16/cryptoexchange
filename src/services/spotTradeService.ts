import apiClient from 'services/apiService';

export const spotTradeServices = {
  buySpotLimit(
    userId,
    baseSymbol,
    quoteSymbol,
    wallet,
    type,
    price,
    amount,
    total,
    ts,
  ) {
    return apiClient.request({
      method: 'POST',
      url: '/wise-router/orders/buy',
      data: {
        userId,
        baseSymbol,
        quoteSymbol,
        wallet,
        type,
        price,
        amount,
        total,
        ts,
      },
    });
  },
  sellSpotLimit(
    userId,
    baseSymbol,
    quoteSymbol,
    wallet,
    type,
    price,
    amount,
    total,
    ts,
  ) {
    return apiClient.request({
      method: 'POST',
      url: '/wise-router/orders/sell',
      data: {
        userId,
        baseSymbol,
        quoteSymbol,
        wallet,
        type,
        price,
        amount,
        total,
        ts,
      },
    });
  },
};
