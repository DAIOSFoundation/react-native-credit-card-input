import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 일정 선택시
export const CHANGE_SEARCH_WORD = 'search/CHANGE_SEARCH_WORD';
export const change_search_word = createAction(CHANGE_SEARCH_WORD);

// 검색 - (type seller nickName)
export const [
  REQUEST_SEARCH_SELLER_INFO,
  REQUEST_SEARCH_SELLER_INFO_SUCCESS,
  REQUEST_SEARCH_SELLER_INFO_FAILED,
] = createRequestActionTypes('search/REQUEST_SEARCH_SELLER_INFO');
export const request_search_seller_info = createAction(
  REQUEST_SEARCH_SELLER_INFO,
);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'search/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 검색 결과, 셀러 text 변경
export const CHANGE_SEARCH_TEXT = 'search/CHANGE_SEARCH_TEXT';
export const change_search_text = createAction(CHANGE_SEARCH_TEXT);
