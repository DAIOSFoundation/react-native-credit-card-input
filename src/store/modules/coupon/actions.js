import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

//모든 쿠폰 가져오기
export const [
  REQUEST_GET_COUPON,
  REQUEST_GET_COUPON_SUCCESS,
  REQUEST_GET_COUPON_FAILED,
] = createRequestActionTypes('coupon/REQUEST_GET_COUPON');
export const request_get_coupon = createAction(REQUEST_GET_COUPON);
