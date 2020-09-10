import * as orderAPI from '../../../lib/api/order';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as ORDER from './action';
import {takeLatest} from 'redux-saga/effects';

const requestUserAddressSaga = createRequestSaga(
  ORDER.GET_USER_ADDRESS,
  orderAPI.getUserAddress,
);

const requestRecommendSamplePaymentSaga = createRequestSaga(
  ORDER.REQUEST_RECOMMEND_SAMPLE_PAYMENT,
  orderAPI.requestRecommendSamplePayment,
);

const requestBroadcastProductPaymentSaga = createRequestSaga(
  ORDER.REQUEST_BROADCAST_PRODUCT_PAYMENT,
  orderAPI.requestBroadcastProductPayment,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(ORDER.GET_USER_ADDRESS, requestUserAddressSaga),
    yield takeLatest(
      ORDER.REQUEST_RECOMMEND_SAMPLE_PAYMENT,
      requestRecommendSamplePaymentSaga,
    ),
    yield takeLatest(
      ORDER.REQUEST_BROADCAST_PRODUCT_PAYMENT,
      requestBroadcastProductPaymentSaga,
    ),
  ];
}
