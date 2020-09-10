import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 추천 상품 페이지 카테고리 토글
export const TOGGLE_CATEGORY_LIST = 'recommend/TOGGLE_CATEGORY_LIST';
export const toggle_category_list = createAction(TOGGLE_CATEGORY_LIST);

// 추천 상품 페이지 샘플담기 버튼 토글
export const TOGGLE_SAMPLE_PUT = 'recommend/TOGGLE_SAMPLE_PUT';
export const toggle_sample_put = createAction(TOGGLE_SAMPLE_PUT);

// 추천 상품 조회
export const [
  REQUEST_RECOMMEND_PRODUCT,
  REQUEST_RECOMMEND_PRODUCT_SUCCESS,
  REQUEST_RECOMMEND_PRODUCT_FAILED,
] = createRequestActionTypes('recommend/REQUEST_RECOMMEND_PRODUCT');

export const request_recommend_product = createAction(
  REQUEST_RECOMMEND_PRODUCT,
);

// 추천 상품 상세 조회
export const [
  REQUEST_RECOMMEND_PRODUCT_DETAIL,
  REQUEST_RECOMMEND_PRODUCT_DETAIL_SUCCESS,
  REQUEST_RECOMMEND_PRODUCT_DETAIL_FAILED,
] = createRequestActionTypes('recommend/REQUEST_RECOMMEND_PRODUCT_DETAIL');

export const request_recommend_product_detail = createAction(
  REQUEST_RECOMMEND_PRODUCT_DETAIL,
);

// 추천 상품 샘플 담기
export const CHANGE_SAMPLE_PUT = 'recommend/CHANGE_SAMPLE_PUT';
export const change_sample_put = createAction(CHANGE_SAMPLE_PUT);

// 추천 상품 샘플 취소
export const CHANGE_SAMPLE_DELETE = 'recommend/CHANGE_SAMPLE_DELETE';
export const change_sample_delete = createAction(CHANGE_SAMPLE_DELETE);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'recommend/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 담긴 샘플 수량 증가
export const CHANGE_SAMPLE_AMOUNT_INCREASE =
  'recommend/CHANGE_SAMPLE_AMOUNT_INCREASE';
export const change_sample_amount_increase = createAction(
  CHANGE_SAMPLE_AMOUNT_INCREASE,
);

// 담긴 샘플 수량 감소
export const CHANGE_SAMPLE_AMOUNT_DECREASE =
  'recommend/CHANGE_SAMPLE_AMOUNT_DECREASE';
export const change_sample_amount_decrease = createAction(
  CHANGE_SAMPLE_AMOUNT_DECREASE,
);
