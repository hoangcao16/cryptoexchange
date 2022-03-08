import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { depositCryptoSaga } from './saga';
import { DepositCryptoState } from './types';

export const initialState: DepositCryptoState = {
  coinList: [],
  selectedCoin: {},
  networksList: [],
  selectedNetwork: {},
};

const slice = createSlice({
  name: 'depositCrypto',
  initialState,
  reducers: {
    getCoinRequest(state, action: PayloadAction<any>) {},
    getCoinSuccess(state, action: PayloadAction<any>) {
      state.selectedCoin = action.payload;
    },
    getCoinFail(state, action: PayloadAction<any>) {},
    getListCoinRequest(state, action: PayloadAction<any>) {},
    getListCoinSuccess(state, action: PayloadAction<any>) {
      state.coinList = action.payload;
    },
    getListCoinFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: depositCryptoActions } = slice;

export const useDepositCryptoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: depositCryptoSaga });
  return { actions: slice.actions };
};
