import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { postAdP2PSaga } from './saga';
import { PostAdP2PState } from './types';

export const initialState: PostAdP2PState = {
  currentStep: 1,
  data: {},
};

const slice = createSlice({
  name: 'postAdP2P',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
  },
});

export const { actions: PostAdP2PActions } = slice;

export const usePostAdP2PSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: postAdP2PSaga });
  return { actions: slice.actions };
};
