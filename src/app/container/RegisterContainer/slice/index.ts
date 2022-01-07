import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerSaga } from './saga';
import { RegisterState } from './types';

export const initialState: RegisterState = {
  data: {},
};

const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerRequest(state, action: PayloadAction<any>) {},
    registerSuccess(state, action) {
      state.data = action.payload;
    },
    registerFail(state, action) {},
  },
});

export const { actions: registerActions } = slice;

export const useRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
  return { actions: slice.actions };
};
