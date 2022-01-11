import { Dataprops } from '.';
export const data: Dataprops[] = [
  {
    key: 1,
    name: {
      coin: 'BTC',
      description: 'Bitcoin',
      url: 'https://coinmarketcap.com/currencies/bitcoin/',
    },
    total: 98,
    available: 60,
    inOrder: 70,
    btcValue: 0.0,
    action: ['Buy', 'Deposit', 'Withdraw', 'Trade', 'Earn', 'Convert'],
  },
  {
    key: 2,
    name: {
      coin: 'ETH',
      description: 'Ethereum',
      url: 'https://coinmarketcap.com/currencies/ethereum/',
    },
    total: 98,
    available: 66,
    inOrder: 89,
    btcValue: 0.0,
    action: ['Buy', 'Deposit', 'Withdraw', 'Trade'],
  },
  {
    key: 3,
    name: {
      coin: 'USDT',
      description: 'TetherUS',
      url: 'https://coinmarketcap.com/currencies/tether/',
    },
    total: 98,
    available: 90,
    inOrder: 70,
    btcValue: 0.0,
    action: ['Buy', 'Deposit', 'Withdraw'],
  },
  {
    key: 4,
    name: {
      coin: '1INCH',
      description: '1inch',
      url: 'https://coinmarketcap.com/currencies/1inch/',
    },
    total: 88,
    available: 99,
    inOrder: 89,
    btcValue: 0.0,
    action: ['Buy', 'Deposit', 'Withdraw', 'Trade', 'Earn', 'Convert'],
  },
];
