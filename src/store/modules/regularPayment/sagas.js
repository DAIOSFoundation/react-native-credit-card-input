import {takeLatest} from 'redux-saga/effects';
import * as REGULAR_PAYMENT from './actions';
import * as creditCardApi from '../../../lib/api/creditCard';
import createRequestSaga from '../../../lib/createRequestSaga';

// GET: 정기결제 카드 정보
const getCreditCardInfo = createRequestSaga(
  REGULAR_PAYMENT.GET_CREDIT_CARD_INFO,
  creditCardApi.getCreditCardInfo,
);

// POST: 정기결제 카드 등록
const postCreditCard = createRequestSaga(
  REGULAR_PAYMENT.POST_CREDIT_CARD,
  creditCardApi.postCreditCard,
);

// POST: 정기결제 (결제)
const postRegularPayment = createRequestSaga(
  REGULAR_PAYMENT.POST_REGULAR_PAYMENT,
  creditCardApi.postRegularPayment,
);

// DELETE: 정기결제 카드 삭제
const deleteCreditCard = createRequestSaga(
  REGULAR_PAYMENT.DELETE_CREDIT_CARD,
  creditCardApi.deleteCreditCard,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(REGULAR_PAYMENT.GET_CREDIT_CARD_INFO, getCreditCardInfo),
    yield takeLatest(REGULAR_PAYMENT.POST_CREDIT_CARD, postCreditCard),
    yield takeLatest(REGULAR_PAYMENT.POST_REGULAR_PAYMENT, postRegularPayment),
    yield takeLatest(REGULAR_PAYMENT.DELETE_CREDIT_CARD, deleteCreditCard),
  ];
}