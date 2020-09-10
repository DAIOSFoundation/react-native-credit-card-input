import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 메인화면 방송 정보 가져오기
export const [
  GET_BROADCAST_INFO,
  GET_BROADCAST_INFO_SUCCESS,
  GET_BROADCAST_INFO_FAILED,
] = createRequestActionTypes('broadcast/GET_BROADCAST_INFO');
export const get_broadcast_info = createAction(GET_BROADCAST_INFO);

// Live Streaming Comment 호출
export const GET_BROADCAST_COMMENTS = 'broadcast/GET_BROADCAST_COMMENTS';
export const GET_BROADCAST_COMMENTS_SUCCESS =
  'broadcast/GET_BROADCAST_COMMENTS_SUCCESS';
export const GET_BROADCAST_COMMENTS_FAILED =
  'broadcast/GET_BROADCAST_COMMENTS_FAILED';
export const get_broadcast_comments = createAction(GET_BROADCAST_COMMENTS);

// 자동재생 여부 변경
export const CHANGE_AUTOPLAY = 'broadcast/CHANGE_AUTOPLAY';
export const change_autoplay = createAction(CHANGE_AUTOPLAY);

// 방송 코멘트 호출의 setIntervalId 설정
export const CHANGE_INTERVAL_ID = 'broadcast/CHANGE_INTERVAL_ID';
export const change_interval_id = createAction(CHANGE_INTERVAL_ID);

// 방송중 구매 정보 요청
export const [
  REQUEST_BROADCAST_PRODUCT,
  REQUEST_BROADCAST_PRODUCT_SUCCESS,
  REQUEST_BROADCAST_PRODUCT_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_BROADCAST_PRODUCT');
export const request_broadcast_product = createAction(
  REQUEST_BROADCAST_PRODUCT,
);

// 시청 중 주문페이지로 보낼 상품들
export const CHANGE_BROADCAST_PRODUCT = 'broadcast/CHANGE_BROADCAST_PRODUCT';
export const change_broadcast_product = createAction(CHANGE_BROADCAST_PRODUCT);

// 리덕스 - 시청 중 주문페이지로 보낼 상품들 초기화
export const CHANGE_BROADCAST_PRODUCT_INIT_STATE =
  'broadcast/CHANGE_BROADCAST_PRODUCT_INIT_STATE';
export const change_broadcast_product_init_state = createAction(
  CHANGE_BROADCAST_PRODUCT_INIT_STATE,
);

// 라이브 예고 - 메인화면 조회
export const [
  GET_BROADCAST_PREVIEW,
  GET_BROADCAST_PREVIEW_SUCCESS,
  GET_BROADCAST_PREVIEW_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_BROADCAST_PREVIEW');
export const get_broadcast_preview = createAction(GET_BROADCAST_PREVIEW);

// 라이브 예고 - 상세화면 조회
export const [
  GET_BROADCAST_PREVIEW_DETAIL,
  GET_BROADCAST_PREVIEW_DETAIL_SUCCESS,
  GET_BROADCAST_PREVIEW_DETAIL_FAILED,
] = createRequestActionTypes('broadcast/GET_BROADCAST_PREVIEW_DETAIL');
export const get_broadcast_preview_detail = createAction(
  GET_BROADCAST_PREVIEW_DETAIL,
);

// 라이브 예고 알람상태 값 따로 빼서 리덕스 저장
export const CHANGE_BROADCAST_PREVIEW_ALARM_STATE =
  'broadcast/CHANGE_BROADCAST_PREVIEW_ALARM_STATE';
export const change_broadcast_preview_alarm_state = createAction(
  CHANGE_BROADCAST_PREVIEW_ALARM_STATE,
);

// 라이브 예고 알림상태 값 리덕스 수정
export const UPDATE_BROADCAST_PREVIEW_ALARM_STATE =
  'broadcast/UPDATE_BROADCAST_PREVIEW_ALARM_STATE';
export const update_broadcast_preview_alarm_state = createAction(
  UPDATE_BROADCAST_PREVIEW_ALARM_STATE,
);

// 라이브 예고 알림 받기
export const [
  REQUEST_BROADCAST_PREVIEW_ALARM,
  REQUEST_BROADCAST_PREVIEW_ALARM_SUCCESS,
  REQUEST_BROADCAST_PREVIEW_ALARM_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_BROADCAST_PREVIEW_ALARM');
export const request_broadcast_preview_alarm = createAction(
  REQUEST_BROADCAST_PREVIEW_ALARM,
);

// 라이브 예고 알림 받기 해제
export const [
  DELETE_BROADCAST_PREVIEW_ALARM,
  DELETE_BROADCAST_PREVIEW_ALARM_SUCCESS,
  DELETE_BROADCAST_PREVIEW_ALARM_FAILED,
] = createRequestActionTypes('broadcast/DELETE_BROADCAST_PREVIEW_ALARM');
export const delete_broadcast_preview_alarm = createAction(
  DELETE_BROADCAST_PREVIEW_ALARM,
);

// 알람 성공 실패 여부 메세지 초기화
export const CHANGE_ALARM_MESSAGE_INIT = 'broadcast/CHANGE_ALARM_MESSAGE_INIT';
export const change_alarm_message_init = createAction(
  CHANGE_ALARM_MESSAGE_INIT,
);

// 해당 라이브 예고 방송 미리 댓글 조회
export const [
  REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS,
  REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_SUCCESS,
  REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS_FAILED,
] = createRequestActionTypes(
  'broadcast/REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS',
);
export const request_preview_broadcast_prev_comments = createAction(
  REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS,
);

// 미리 댓글 페이지 - 상품에 대한 댓글
export const CHANGE_PREVIEW_PRODUCT_COMMENT =
  'broadcast/CHANGE_PREVIEW_PRODUCT_COMMENT';
export const change_preview_product_comment = createAction(
  CHANGE_PREVIEW_PRODUCT_COMMENT,
);

// 미리 댓글 페이지 - 상품에 대한 등록
export const [
  INSERT_PREVIEW_PRODUCT_COMMENT,
  INSERT_PREVIEW_PRODUCT_COMMENT_SUCCESS,
  INSERT_PREVIEW_PRODUCT_COMMENT_FAILED,
] = createRequestActionTypes('broadcast/INSERT_PREVIEW_PRODUCE_COMMENT');
export const insert_preview_product_comment = createAction(
  INSERT_PREVIEW_PRODUCT_COMMENT,
);

// 미리 댓글 페이지 - 상품에 대한 등록
export const [
  INSERT_PREVIEW_PRODUCT_SUB_COMMENT,
  INSERT_PREVIEW_PRODUCT_SUB_COMMENT_SUCCESS,
  INSERT_PREVIEW_PRODUCT_SUB_COMMENT_FAILED,
] = createRequestActionTypes('broadcast/INSERT_PREVIEW_PRODUCT_SUB_COMMENT');
export const insert_preview_product_sub_comment = createAction(
  INSERT_PREVIEW_PRODUCT_SUB_COMMENT,
);

// 미리 댓글 페이지 - 상품에 대한 댓글 삭제
export const DELETE_PREVIEW_PRODUCT_COMMENT =
  'broadcast/DELETE_PREVIEW_PRODUCT_COMMENT';
export const delete_preview_product_comment = createAction(
  DELETE_PREVIEW_PRODUCT_COMMENT,
);

// 미리 댓글 페이지 - 상품에 대한 대댓글 삭제
export const DELETE_PREVIEW_PRODUCT_SUB_COMMENT =
  'broadcast/DELETE_PREVIEW_PRODUCT_SUB_COMMENT';
export const delete_preview_product_sub_comment = createAction(
  DELETE_PREVIEW_PRODUCT_SUB_COMMENT,
);

// 방송 전체화면 진입 시 해당하는 방송 정보 가져오기
export const [
  GET_BROADCAST_DETAIL_INFO,
  GET_BROADCAST_DETAIL_INFO_SUCCESS,
  GET_BROADCAST_DETAIL_INFO_FAILED,
] = createRequestActionTypes('broadcast/GET_BROADCAST_DETAIL_INFO');
export const get_broadcast_detail_info = createAction(
  GET_BROADCAST_DETAIL_INFO,
);

// 라방 일정 - 유저별 이번달 방송 조회
export const [
  REQUEST_THIS_MONTH_BROADCAST,
  REQUEST_THIS_MONTH_BROADCAST_SUCCESS,
  REQUEST_THIS_MONTH_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_THIS_MONTH_BROADCAST');
export const request_this_month_broadcast = createAction(
  REQUEST_THIS_MONTH_BROADCAST,
);

// 라방 일정 - 유저별 특정달 방송 조회
export const [
  REQUEST_SPECIFIC_MONTH_BROADCAST,
  REQUEST_SPECIFIC_MONTH_BROADCAST_SUCCESS,
  REQUEST_SPECIFIC_MONTH_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SPECIFIC_MONTH_BROADCAST');
export const request_specific_month_broadcast = createAction(
  REQUEST_SPECIFIC_MONTH_BROADCAST,
);

// 라방 일정 - 유저별 특정 일 방송 상세 정보
export const [
  REQUEST_SPECIFIC_DAY_BROADCAST,
  REQUEST_SPECIFIC_DAY_BROADCAST_SUCCESS,
  REQUEST_SPECIFIC_DAY_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SPECIFIC_DAY_BROADCAST');
export const request_specific_day_broadcast = createAction(
  REQUEST_SPECIFIC_DAY_BROADCAST,
);

// 달력 탭 - 이번 달 방송 일정, 오늘 방송 상세정보
export const [
  REQUEST_THIS_MONTH_ALL_BROADCAST,
  REQUEST_THIS_MONTH_ALL_BROADCAST_SUCCESS,
  REQUEST_THIS_MONTH_ALL_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_THIS_MONTH_ALL_BROADCAST');
export const request_this_month_all_broadcast = createAction(
  REQUEST_THIS_MONTH_ALL_BROADCAST,
);

//라이브 방송중, 방송후 가격 변동
export const CHANGE_PRODUCT_PRICE = 'broadcast/CHANGE_PRODUCT_PRICE';
export const change_product_price = createAction(CHANGE_PRODUCT_PRICE);

// 달력 탭 - 특정 달 모든 방송 일정
export const [
  REQUEST_SPECIFIC_MONTH_ALL_BROADCAST,
  REQUEST_SPECIFIC_MONTH_ALL_BROADCAST_SUCCESS,
  REQUEST_SPECIFIC_MONTH_ALL_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SPECIFIC_MONTH_ALL_BROADCAST');
export const request_specific_month_all_broadcast = createAction(
  REQUEST_SPECIFIC_MONTH_ALL_BROADCAST,
);

// 달력 탭 - 특정 일 방송 상세정보
export const [
  REQUEST_SPECIFIC_DAY_ALL_BROADCAST,
  REQUEST_SPECIFIC_DAY_ALL_BROADCAST_SUCCESS,
  REQUEST_SPECIFIC_DAY_ALL_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SPECIFIC_DAY_ALL_BROADCAST');
export const request_specific_day_all_broadcast = createAction(
  REQUEST_SPECIFIC_DAY_ALL_BROADCAST,
);

// 방송 시기 (현재,미래,과거) 라이브 방송전,시작,끝 가격 차이 때문
export const CHANGE_PERIOD = 'broadcast/CHANGE_PERIOD';
export const change_period = createAction(CHANGE_PERIOD);

// 셀러 마이탭 - 라방 일정관리
export const [
  REQUEST_SELLER_THIS_WEEK_BROADCAST,
  REQUEST_SELLER_THIS_WEEK_BROADCAST_SUCCESS,
  REQUEST_SELLER_THIS_WEEK_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SELLER_THIS_WEEK_BROADCAST');
export const request_seller_this_week_broadcast = createAction(
  REQUEST_SELLER_THIS_WEEK_BROADCAST,
);

// 셀러 마이탭 - step1,2 방송 삭제
export const [
  DELETE_STEP_ONE_TWO_BROADCAST,
  DELETE_STEP_ONE_TWO_BROADCAST_SUCCESS,
  DELETE_STEP_ONE_TWO_BROADCAST_DELETE_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/DELETE_STEP_ONE_TWO_BROADCAST');
export const delete_step_one_two_broadcast = createAction(
  DELETE_STEP_ONE_TWO_BROADCAST,
);

export const CHANGE_STATUS = 'broadcast/CHANGE_STATUS';
export const change_status = createAction(CHANGE_STATUS);

export const [
  REQUEST_SELLER_INFO_FOR_VIEWER,
  REQUEST_SELLER_INFO_FOR_VIEWER_SUCCESS,
  REQUEST_SELLER_INFO_FOR_VIEWER_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SELLER_INFO_FOR_VIEWER');
export const request_seller_info_for_viewer = createAction(
  REQUEST_SELLER_INFO_FOR_VIEWER,
);

// 시청자가 보는 셀러 마이페이지 알람 등록 여부 확인
export const [
  REQUEST_SELLER_PAGE_ALARM,
  REQUEST_SELLER_PAGE_ALARM_SUCCESS,
  REQUEST_SELLER_PAGE_ALARM_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SELLER_PAGE_ALARM');
export const request_seller_page_alarm = createAction(
  REQUEST_SELLER_PAGE_ALARM,
);

// 시청자가 보는 셀러 마이페이지 알람 버튼 클릭 상태 변경
export const UPDATE_SELLER_PAGE_ALARM_STATE =
  'broadcast/UPDATE_SELLER_PAGE_ALARM_STATE';
export const update_seller_page_alarm_state = createAction(
  UPDATE_SELLER_PAGE_ALARM_STATE,
);

// 시청자가 보는 셀러 마이페이지 지난 방송
export const [
  REQUEST_SELLER_PAGE_PASSED_BROADCAST,
  REQUEST_SELLER_PAGE_PASSED_BROADCAST_SUCCESS,
  REQUEST_SELLER_PAGE_PASSED_BROADCAST_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SELLER_PAGE_PASSED_BROADCAST');
export const request_seller_page_passed_broadcast = createAction(
  REQUEST_SELLER_PAGE_PASSED_BROADCAST,
);

//시청자가 보는 셀러 마이페이지 상품 리스트
export const [
  REQUEST_SELLER_PAGE_PRODUCTS,
  REQUEST_SELLER_PAGE_PRODUCTS_SUCCESS,
  REQUEST_SELLER_PAGE_PRODUCTS_FAILED,
] = createRequestActionTypes('broadcast/REQUEST_SELLER_PAGE_PRODUCTS');
export const request_seller_page_products = createAction(
  REQUEST_SELLER_PAGE_PRODUCTS,
);

// 댓글 초기화
export const CHANGE_BROADCAST_COMMENTS = 'broadcast/CHANGE_BROADCAST_COMMENTS';
export const change_broadcast_comments = createAction(
  CHANGE_BROADCAST_COMMENTS,
);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'broadcast/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);
