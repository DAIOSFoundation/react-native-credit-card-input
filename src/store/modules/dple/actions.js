import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// Dple 결제 요청
export const [
  POST_DPLE_PAYMENT,
  POST_DPLE_PAYMENT_SUCCESS,
  POST_DPLE_PAYMENT_FAILED,
] = createRequestActionTypes('dple/POST_DPLE_PAYMENT');

export const post_dple_payment = createAction(POST_DPLE_PAYMENT);
