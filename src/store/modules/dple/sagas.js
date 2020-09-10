import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as DPLE from './actions';
import * as dpleAPI from '../../../lib/api/dple';

const postDplePaymentSaga = createRequestSaga(
  DPLE.POST_DPLE_PAYMENT,
  dpleAPI.postDplePayment,
);

export default function* rootSaga() {
  yield [yield takeLatest(DPLE.POST_DPLE_PAYMENT, postDplePaymentSaga)];
}
