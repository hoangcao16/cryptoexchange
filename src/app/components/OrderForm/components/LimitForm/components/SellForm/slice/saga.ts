import { all, call, put, takeEvery } from 'redux-saga/effects';
import { sellspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';

function* handlesellspotlimit(action) {
  const {
    userId,
    baseSymbol,
    quoteSymbol,
    price,
    amount,
    wallet,
    type,
    total,
    ts,
  } = action.payload;
  try {
    const response = yield call(
      spotTradeServices.sellSpotLimit,
      userId,
      baseSymbol,
      quoteSymbol,
      wallet,
      type,
      price,
      amount,
      total,
      ts,
    );
    console.log('response', response);
    if (response.data.rc === 0) {
      yield put(actions.sellspotlimitSuccess(response.data));
    }
  } catch (err: any) {
    yield put(actions.sellspotlimitFail(err.response));
    console.log(err);
  }
}

function* watchsellspotlimit() {
  yield takeEvery(actions.sellspotlimitRequest, handlesellspotlimit);
}

export function* sellspotlimitSaga() {
  yield all([watchsellspotlimit()]);
}
