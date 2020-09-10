import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 카드 번호
export const CHANGE_CARD_NUMBER = 'regularPayment/CHANGE_CARD_NUMBER';
export const change_card_number = createAction(CHANGE_CARD_NUMBER);

// 유효 기간(년도)
export const CHANGE_EXPIRY = 'regularPayment/CHANGE_EXPIRY';
export const change_expiry = createAction(CHANGE_EXPIRY);

// 생년월일
export const CHANGE_BIRTH = 'regularPayment/CHANGE_BIRTH';
export const change_birth = createAction(CHANGE_BIRTH);

// 비밀번호 앞 2자리
export const CHANGE_PWD_2DIGIT = 'regularPayment/CHANGE_PWD_2DIGIT';
export const change_pwd_2digit = createAction(CHANGE_PWD_2DIGIT);

// postCreditCardStatus 초기화
export const CHANGE_POST_CREDIT_CARD_STATUS_CLEAR = 'regularPayment/CHANGE_POST_CREDIT_CARD_STATUS_CLEAR';
export const change_post_credit_card_status_clear = createAction(CHANGE_POST_CREDIT_CARD_STATUS_CLEAR);

// 카드 입력 정보 초기화
export const CHANGE_CREDIT_CARD_INFO_CLEAR = 'regularPayment/CHANGE_CREDIT_CARD_INFO_CLEAR';
export const change_credit_card_info_clear = createAction(CHANGE_CREDIT_CARD_INFO_CLEAR);

// 카드 삭제 상태 변환
export const CHANGE_DELETE_CARD_STATUS = 'regularPayment/CHANGE_DELETE_CARD_STATUS';
export const change_delete_card_status = createAction(CHANGE_DELETE_CARD_STATUS);

// 정기 결제 선택 카드
export const CHANGE_TARGET = 'regularPayment/CHANGE_TARGET';
export const change_target = createAction(CHANGE_TARGET);

// 정기 결제 상태 초기화
export const CHANGE_REGULAR_PAYMENT_STATUS_CLEAR = 'regularPayment/CHANGE_REGULAR_PAYMENT_STATUS_CLEAR';
export const change_regular_payment_status_clear = createAction(CHANGE_REGULAR_PAYMENT_STATUS_CLEAR);

// 정기 결제 달 변경
export const CHANGE_RECURRING_MONTH_SELECT = 'regularPayment/CHANGE_RECURRING_MONTH_SELECT';
export const change_recurring_month_select = createAction(CHANGE_RECURRING_MONTH_SELECT);

// 정기결제 등록된 신용카드 정보
export const [
  GET_CREDIT_CARD_INFO,
  GET_CREDIT_CARD_INFO_SUCCESS,
  GET_CREDIT_CARD_INFO_FAILED,
] = createRequestActionTypes('regularPayment/GET_CREDIT_CARD_INFO');
export const get_credit_card_info = createAction(GET_CREDIT_CARD_INFO);

// 정기결제 카드 등록
export const [
  POST_CREDIT_CARD,
  POST_CREDIT_CARD_SUCCESS,
  POST_CREDIT_CARD_FAILED,
] = createRequestActionTypes('regularPaymnet/POST_CREDIT_CARD');
export const post_credit_card = createAction(POST_CREDIT_CARD);

// 정기결제 요청 (결제)
export const [
  POST_REGULAR_PAYMENT,
  POST_REGULAR_PAYMENT_SUCCESS,
  POST_REGULAR_PAYMENT_FAILED,
] = createRequestActionTypes('regularPaymnet/POST_REGULAR_PAYMENT');
export const post_regular_payment = createAction(POST_REGULAR_PAYMENT);

// 정기결제 카드 삭제
export const [
  DELETE_CREDIT_CARD,
  DELETE_CREDIT_CARD_SUCCESS,
  DELETE_CREDIT_CARD_FAILED,
] = createRequestActionTypes('regularPaymnet/DELETE_CREDIT_CARD');
export const detele_credit_card = createAction(DELETE_CREDIT_CARD);