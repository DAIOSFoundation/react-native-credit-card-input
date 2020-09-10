import {createAction} from 'redux-actions';

// 상품상세페이지 고객리뷰 탭뷰 - 리뷰순서 모달 펼치기 접기 토글
export const TOGGLE_REVIEW_ORDER = 'productDetail/TOGGLE_REVIEW_ORDER';
export const toggle_review_order = createAction(TOGGLE_REVIEW_ORDER);
