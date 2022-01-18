import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerVerifyEmailSaga } from './saga';
import { VerifyEmailRegisterState } from './types';

export const initialState: VerifyEmailRegisterState = {};

const slice = createSlice({
  name: 'verifyEmailRegister',
  initialState,
  reducers: {
    registerVerifyEmailRequest(state, action: PayloadAction<any>) {},
    registerVerifyEmailSuccess(state, action) {},
    registerVerifyEmailFail(state, action) {},
  },
});

export const { actions: verifyEmailRegisterActions } = slice;

export const useVerifyEmailRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerVerifyEmailSaga });
  return { actions: slice.actions };
};
