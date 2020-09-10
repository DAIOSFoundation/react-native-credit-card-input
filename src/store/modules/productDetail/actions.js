import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 상품 상세 정보 조회
export const [
  REQUEST_PRODUCT_DETAIL,
  REQUEST_PRODUCT_DETAIL_SUCCESS,
  REQUEST_PRODUCT_DETAIL_FAILED,
] = createRequestActionTypes('product/REQUEST_PRODUCT_DETAIL');

export const request_product_detail = createAction(REQUEST_PRODUCT_DETAIL);

// 상품 상세 정보 - 바텀 모달 좌표값 설정
export const CHANGE_BOTTOM_MODAL_POSITION_VALUE =
  'product/CHANGE_BOTTOM_MODAL_POSITION_VALUE';
export const change_bottom_modal_position_value = createAction(
  CHANGE_BOTTOM_MODAL_POSITION_VALUE,
);
