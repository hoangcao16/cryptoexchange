import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { SearchParam, TabP2PState } from './type';

export const initialState: TabP2PState = {
  data: {},
  searchParam: {
    action: 'buy',
    crypto: '',
    fiat: '',
    payment: '',
  },
};

const slice = createSlice({
  name: 'tabP2P',
  initialState,
  reducers: {
    /**
     *
     * @param state
     * @param action | payload {action, crypto, fiat, payment}
     */
    upTabP2P(state, action: PayloadAction<any>) {
      state.searchParam = action.payload;
    },

    /**
     * @param state
     * @param action | payload: action
     */
    actionTabP2P(state, action: PayloadAction<'buy' | 'sell'>) {
      state.searchParam = { ...state.searchParam, action: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: crypto
     */
    cryptoTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, crypto: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: fiat
     */
    fiatTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, fiat: action.payload };
    },

    /**
     *
     * @param state
     * @param action | payload: payment method
     */
    paymentTabP2P(state, action: PayloadAction<string>) {
      state.searchParam = { ...state.searchParam, payment: action.payload };
    },
  },
});

export const { actions: TabP2PActions } = slice;

export const useTabP2PSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
