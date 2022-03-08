import { take, call, put, takeEvery, all } from 'redux-saga/effects';
import { depositCryptoActions as actions } from '.';
import { DepositServices } from 'services/depositService';

function* handlegetCoin(action) {
  const { coin } = action.payload;
  try {
    const response = yield call(DepositServices.GetCoin, coin);
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.getCoinSuccess(response.data.rows[0]));
    }
  } catch (err: any) {
    yield put(actions.getCoinFail(err.response));
    console.log(err);
  }
}

function* watchGetCoin() {
  yield takeEvery(actions.getCoinRequest, handlegetCoin);
}
export function* depositCryptoSaga() {
  yield all([watchGetCoin()]);
}
