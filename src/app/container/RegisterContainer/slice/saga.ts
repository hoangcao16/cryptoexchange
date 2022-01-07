import { all, call, put, takeEvery } from 'redux-saga/effects';
import { registerActions as actions } from '.';
import { authService } from 'services/authService';

function* handleRegister(action) {
  const { email, password, referralId, allowReceiveEmail, allowShareData } =
    action.payload;
  try {
    const response = yield call(
      authService.register,
      email,
      password,
      referralId,
      allowReceiveEmail,
      allowShareData,
    );
    if (response.data.rc === 0) {
      yield put(actions.registerSuccess(response.data));
      yield put(actions.handleStepRegister(2));
      yield put(actions.handleOpenSuccessToast(true));
    } else if (response.data.rc === 1005) {
      yield put(actions.handleOpenErrorToast(true));
      yield put(actions.handleMessageError(response.data.rd));
    }
  } catch (err) {
    yield put(actions.registerFail(err));
    console.log(err);
  }
}

function* watchRegister() {
  yield takeEvery(actions.registerRequest, handleRegister);
}

export function* registerSaga() {
  yield all([watchRegister()]);
}
