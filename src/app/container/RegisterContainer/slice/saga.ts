import { all, call, put, takeEvery } from 'redux-saga/effects';
import { registerActions as actions } from '.';
import { authService } from 'services/authService';

function* handleRegister(action) {
  const {
    email,
    password,
    referralId,
    allowReceiveEmail,
    allowShareData,
    history,
  } = action.payload;
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
      history.push('/register/step2');
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
