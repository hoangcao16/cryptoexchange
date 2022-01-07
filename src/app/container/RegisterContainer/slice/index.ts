import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { registerSaga } from './saga';
import { RegisterState } from './types';

export const initialState: RegisterState = {
  data: {},
  stepRegister: 1,
  openSuccessToast: false,
  openErrorToast: false,
  messageError: '',
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
    handleStepRegister(state, action) {
      state.stepRegister = action.payload;
    },
    handleOpenSuccessToast(state, action) {
      state.openSuccessToast = action.payload;
    },
    handleOpenErrorToast(state, action) {
      state.openErrorToast = action.payload;
    },
    handleMessageError(state, action) {
      state.messageError = action.payload;
    },
  },
});

export const { actions: registerActions } = slice;

export const useRegisterSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: registerSaga });
  return { actions: slice.actions };
};
