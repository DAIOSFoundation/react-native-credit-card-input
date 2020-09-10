import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

//정산내역 기간 설정 시작날짜 변경
export const CHANGE_ADJUSTMENT_START_DATE =
  'adjustment/CHANGE_ADJUSTMENT_START_DATE';
export const change_adjustment_start_date = createAction(
  CHANGE_ADJUSTMENT_START_DATE,
);

//정산내역 기간 설정 끝날짜 변경
export const CHANGE_ADJUSTMENT_END_DATE =
  'adjustment/CHANGE_ADJUSTMENT_END_DATE';
export const change_adjustment_end_date = createAction(
  CHANGE_ADJUSTMENT_END_DATE,
);

// 계좌 등록 페이지 이름 변경
export const CHANGE_ACCOUNT_NAME = 'adjustment/CHANGE_ACCOUNT_NAME';
export const change_account_name = createAction(CHANGE_ACCOUNT_NAME);

// 계좌 등록 페이지 은행 변경
export const CHANGE_ACCOUNT_BANK = 'adjustment/CHANGE_ACCOUNT_BANK';
export const change_account_bank = createAction(CHANGE_ACCOUNT_BANK);

// 계좌 등록 페이지 계좌 번호 변경
export const CHANE_ACCOUNT_NUMBER = 'adjustment/CHANE_ACCOUNT_NUMBER';
export const change_account_number = createAction(CHANE_ACCOUNT_NUMBER);

// 자신의 계좌 조회
export const [
  REQUEST_ACCOUNT,
  REQUEST_ACCOUNT_SUCCESS,
  REQUEST_ACCOUNT_FAILED,
] = createRequestActionTypes('adjustment/REQUEST_ACCOUNT');
export const request_account = createAction(REQUEST_ACCOUNT);

// 자신의 계좌 정보 업데이트
export const [
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILED,
] = createRequestActionTypes('adjustment/UPDATE_ACCOUNT');
export const update_account = createAction(UPDATE_ACCOUNT);

// 정산관리 - 자신의 라이브 정산 보기
export const [
  GET_OWN_LIVE_ADJUSTMENT,
  GET_OWN_LIVE_ADJUSTMENT_SUCCESS,
  GET_OWN_LIVE_ADJUSTMENT_FAILED,
] = createRequestActionTypes('adjustment/GET_OWN_LIVE_ADJUSTMENT');
export const get_own_live_adjustment = createAction(GET_OWN_LIVE_ADJUSTMENT);

// 정산관리 - 자신의 1일 정산 보기
export const [
  GET_OWN_DAY_ADJUSTMENT,
  GET_OWN_DAY_ADJUSTMENT_SUCCESS,
  GET_OWN_DAY_ADJUSTMENT_FAILED,
] = createRequestActionTypes('adjustment/GET_OWN_DAY_ADJUSTMENT');
export const get_own_day_adjustment = createAction(GET_OWN_DAY_ADJUSTMENT);

// 정산관리 - 자신의 한달 정산 보기
export const [
  GET_OWN_MONTH_ADJUSTMENT,
  GET_OWN_MONTH_ADJUSTMENT_SUCCESS,
  GET_OWN_MONTH_ADJUSTMENT_FAILED,
] = createRequestActionTypes('adjustment/GET_OWN_MONTH_ADJUSTMENT');
export const get_own_month_adjustment = createAction(GET_OWN_MONTH_ADJUSTMENT);

// successMsg 초기화
export const CHANGE_SUCCESS_MSG_INIT = 'adjustment/CHANGE_SUCCESS_MSG_INIT';
export const change_success_msg_init = createAction(CHANGE_SUCCESS_MSG_INIT);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'adjustment/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 날짜 조회 초기화
export const CHANGE_DATE_STATE = 'adjustment/CHANGE_DATE_STATE';
export const changE_date_state = createAction(CHANGE_DATE_STATE);

// 특정 날짜에 정산 내역 조회
export const [
  GET_SPECIFIC_DATE_ADJUSTMENT,
  GET_SPECIFIC_DATE_ADJUSTMENT_SUCCESS,
  GET_SPECIFIC_DATE_ADJUSTMENT_FAILED,
] = createRequestActionTypes('adjustment/CHANGE_SPECIFIC_DATE_ADJUSTMENT');
export const get_specific_date_adjustment = createAction(
  GET_SPECIFIC_DATE_ADJUSTMENT,
);
