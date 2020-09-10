import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 아임포트 결제내역 확인요청
export const [
  REQUEST_CONFIRM,
  REQUEST_CONFIRM_SUCCESS,
  REQUEST_CONFIRM_FAILED,
] = createRequestActionTypes('payment/REQUEST_CONFIRM');
export const request_confirm = createAction(REQUEST_CONFIRM);

// 결제 상태 초기화
export const RESET_INITIAL_STATE = 'payment/RESET_INITIAL_STATE';
export const reset_initial_state = createAction(RESET_INITIAL_STATE);
