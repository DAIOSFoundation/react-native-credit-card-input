import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

//일정 선택시
export const CHANGE_DATE = 'calendar/CHANGE_DATE';
export const change_date = createAction(CHANGE_DATE);

//달력 이동시 일정 저장
export const CHANGE_CALENDAR_DATE = 'calendar/CHANGE_CALENDAR_MONTH';
export const change_calendar_date = createAction(CHANGE_CALENDAR_DATE);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'broadcast/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 셀러 마이 페이지 라방 일정 상세 달력 날짜 변경
export const CHANGE_SELLER_PAGE_DATE = 'calendar/CHANGE_SELLER_PAGE_DATE';
export const change_seller_page_date = createAction(CHANGE_SELLER_PAGE_DATE);
