import { call, put, takeLatest } from 'redux-saga/effects';
import { getallpairActions as actions } from '.';
import { MarketServices } from 'services/marketService';

function* handleGetAllPair() {
  try {
    const response = yield call(MarketServices.GetAllPair);
    if (response.data.rc === 0) {
      yield put(actions.getAllPairSuccess(response.data));
      const index = response.data.rows[0].symbol.indexOf('/');
      localStorage.setItem(
        'base_symbol',
        response.data.rows[0].symbol.substring(0, index),
      );
      localStorage.setItem(
        'quote_symbol',
        response.data.rows[0].symbol.substring(index + 1),
      );
      localStorage.setItem('pair', response.data.rows[0].symbol);
      localStorage.setItem('pair_id', response.data.rows[0].id);
      yield put(actions.reselectPair());
    }
  } catch (err: any) {
    yield put(actions.getAllPairFail(err.response));
    console.log(err);
  }
}

export function* getallpairSaga() {
  yield takeLatest(actions.getAllPairRequest, handleGetAllPair);
}
