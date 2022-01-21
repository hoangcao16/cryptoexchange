import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { getallpairSaga } from './saga';
import { GetallpairState } from './types';

export const initialState: GetallpairState = {
  data: {},
};

const slice = createSlice({
  name: 'getallpair',
  initialState,
  reducers: {
    getAllPairRequest(state) {},
    getAllPairSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    getAllPairFail(state, action: PayloadAction<any>) {},
  },
});

export const { actions: getallpairActions } = slice;

export const useGetallpairSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: getallpairSaga });
  return { actions: slice.actions };
};
