import { all, call, put, takeEvery } from 'redux-saga/effects';
import { buyspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';

function* handlebuyspotlimit(action) {
  const {
    userId,
    baseSymbol,
    quoteSymbol,
    price,
    amount,
    percent,
    wallet,
    type,
    total,
  } = action.payload;
  try {
    const response = yield call(
      spotTradeServices.buySpotLimit,
      userId,
      baseSymbol,
      quoteSymbol,
      wallet,
      type,
      price,
      amount,
      percent,
      total,
    );
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.buyspotlimitSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.buyspotlimitFail(err.response));
    console.log(err);
  }
}

function* watchbuyspotlimit() {
  yield takeEvery(actions.buyspotlimitRequest, handlebuyspotlimit);
}

export function* buyspotlimitSaga() {
  yield all([watchbuyspotlimit()]);
}
