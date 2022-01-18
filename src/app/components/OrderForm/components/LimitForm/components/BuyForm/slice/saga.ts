import { all, call, put, takeEvery } from 'redux-saga/effects';
import { buyspotlimitActions as actions } from '.';
import { spotTradeServices } from 'services/spotTradeService';
import { toastActions } from 'app/components/Toast/slice';

function* handlebuyspotlimit(action) {
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
      spotTradeServices.buySpotLimit,
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
      yield put(actions.buyspotlimitSuccess(response.data));
      yield put(
        toastActions.openSuccessToast({
          title: 'Success',
          message: 'Successfully purchase',
        }),
      );
    } else if (response.data.rc !== 0) {
      yield put(
        toastActions.openErrorToast({
          title: 'Error',
          message: 'Buy failed',
        }),
      );
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
