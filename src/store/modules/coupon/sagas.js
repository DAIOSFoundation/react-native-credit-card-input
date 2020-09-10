import {takeLatest} from 'redux-saga/effects';
import * as COUPON from './actions';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as couponAPI from '../../../lib/api/coupon';

const requestGetCouponSaga = createRequestSaga(
  COUPON.REQUEST_GET_COUPON,
  couponAPI.requestGetCoupon,
);

export default function* rootSaga() {
  yield [yield takeLatest(COUPON.REQUEST_GET_COUPON, requestGetCouponSaga)];
}
