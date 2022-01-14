import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { sellspotlimitSaga } from './saga';
import { SellspotlimitState } from './types';

export const initialState: SellspotlimitState = {};

const slice = createSlice({
  name: 'sellspotlimit',
  initialState,
  reducers: {
    sellspotlimitRequest(state, action: PayloadAction<any>) {},
    sellspotlimitSuccess(state, action) {},
    sellspotlimitFail(state, action) {},
  },
});

export const { actions: sellspotlimitActions } = slice;

export const useSellspotlimitSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sellspotlimitSaga });
  return { actions: slice.actions };
};
