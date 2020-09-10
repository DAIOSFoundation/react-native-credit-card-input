import {createRequestActionTypes} from '../../../lib/createRequestSaga';
import {createAction} from 'redux-actions';

export const [
  REQUEST_GET_ORDER_HISTORY,
  REQUEST_GET_ORDER_HISTORY_SUCCESS,
  REQUEST_GET_ORDER_HISTORY_FAILED,
] = createRequestActionTypes('orderHistory/REQUEST_GET_ORDER_HISTORY');
export const request_get_order_history = createAction(
  REQUEST_GET_ORDER_HISTORY,
);

// 시청자 마이페이지 - 주문 내역(리스트)
export const [
  REQUEST_GET_VIEWER_ORDER_LIST,
  REQUEST_GET_VIEWER_ORDER_LIST_SUCCESS,
  REQUEST_GET_VIEWER_ORDER_LIST_FAILED,
] = createRequestActionTypes('orderHistory/REQUEST_GET_VIEWER_ORDER_LIST');
export const request_get_viewer_order_list = createAction(
  REQUEST_GET_VIEWER_ORDER_LIST,
);

//시청자 마이페이지 - 구매확정 하기
export const [
  REQUEST_ORDER_PRODUCT_CONFIRM,
  REQUEST_ORDER_PRODUCT_CONFIRM_SUCCESS,
  REQUEST_ORDER_PRODUCT_CONFIRM_FAILED,
] = createRequestActionTypes('orderHistory/REQUEST_ORDER_PRODUCT_CONFIRM');
export const request_order_product_confirm = createAction(
  REQUEST_ORDER_PRODUCT_CONFIRM,
);

//구매 확정 후 성공 메시지 초기화
export const CHANGE_CONFIRM_SUCCESS_MESSAGE =
  'orderHistory/CHANGE_CONFIRM_SUCCESS_MESSAGE';
export const change_confirm_success_message = createAction(
  CHANGE_CONFIRM_SUCCESS_MESSAGE,
);

//시청자 마이페이지 - 주문 상세 내역
export const [
  REQUEST_VIEWER_ORDER_DETAIL,
  REQUEST_VIEWER_ORDER_DETAIL_SUCCESS,
  REQUEST_VIEWER_ORDER_DETAIL_FAILED,
] = createRequestActionTypes('orderHistory/REQUEST_VIEWER_ORDER_DETAIL');
export const request_viewer_order_detail = createAction(
  REQUEST_VIEWER_ORDER_DETAIL,
);
