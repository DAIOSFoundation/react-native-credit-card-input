import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as PAYMENT from './actions';
import * as payment from '../../../lib/api/payment';

const requestConfirmSaga = createRequestSaga(
  PAYMENT.REQUEST_CONFIRM,
  payment.iAmPortConfirm,
);

export default function* rootSaga() {
  yield [yield takeLatest(PAYMENT.REQUEST_CONFIRM, requestConfirmSaga)];
}
