import { all, call, put, takeEvery } from 'redux-saga/effects';
import { verifyEmailRegisterActions as actions } from '.';
import { authService } from 'services/authService';

function* handleRegisterVerifyEmail(action) {
  const { email, code, history } = action.payload;
  try {
    const response = yield call(authService.verifyEmailRegister, email, code);
    yield put(actions.registerVerifyEmailSuccess(response.data));
    if (response.data.rc === 0) {
      history.push('/login');
    }
  } catch (err) {
    yield put(actions.registerVerifyEmailFail(err));
    console.log(err);
  }
}
function* watchRegisterVerifyEmail() {
  yield takeEvery(
    actions.registerVerifyEmailRequest,
    handleRegisterVerifyEmail,
  );
}

export function* registerVerifyEmailSaga() {
  yield all([watchRegisterVerifyEmail()]);
}
