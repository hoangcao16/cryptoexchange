import { all, call, put, takeEvery } from 'redux-saga/effects';
import { sellspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';
import { toastActions } from 'app/components/Toast/slice';

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
    if (response.data.rc === 0) {
      yield put(actions.sellspotlimitSuccess(response.data));
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Successfully sell',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: 'Sell failed',
        }),
      );
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
