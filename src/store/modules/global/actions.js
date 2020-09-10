import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 파이어베이스 토큰
export const SET_FIREBASE_TOKEN = 'global/SET_FIREBASE_TOKEN';
export const set_firebase_token = createAction(SET_FIREBASE_TOKEN);

// 파이어베이스 토큰 서버 전송
export const [
  CHANGE_FIREBASE_TOKEN,
  CHANGE_FIREBASE_TOKEN_SUCCESS,
  CHANGE_FIREBASE_TOKEN_FAILED,
] = createRequestActionTypes('global/CHANGE_FIREBASE_TOKEN');
export const change_firebase_token = createAction(CHANGE_FIREBASE_TOKEN);

//로그아웃 - 파이어베이스 토큰 삭제
export const [
  DELETE_FIREBASE_TOKEN,
  DELETE_FIREBASE_TOKEN_SUCCESS,
  DELETE_FIREBASE_TOKEN_FAILED,
] = createRequestActionTypes('global/DELETE_FIREBASE_TOKEN');
export const delete_firebase_token = createAction(DELETE_FIREBASE_TOKEN);

// 토스트 메세지 설정
export const CHANGE_TOAST_MESSAGE = 'global/CHANGE_TOAST_MESSAGE';
export const change_toast_message = createAction(CHANGE_TOAST_MESSAGE);

// 토스트 메세지 초기화
export const CHANGE_TOAST_MESSAGE_INIT = 'global/CHANGE_TOAST_MESSAGE_INIT';
export const change_toast_message_init = createAction(
  CHANGE_TOAST_MESSAGE_INIT,
);

// Notification broadcastId 저장
export const SET_NOTIFICATION_BROADCAST_ID =
  'global/SET_NOTIFICATION_BROADCAST_ID';
export const set_notification_broadcast_id = createAction(
  SET_NOTIFICATION_BROADCAST_ID,
);

// Notification productId 저장
export const SET_NOTIFICATION_PRODUCT_ID = 'global/SET_NOTIFICATION_PRODUCT_ID';
export const set_notification_product_id = createAction(
  SET_NOTIFICATION_PRODUCT_ID,
);

// Notification type 저장
export const SET_NOTIFICATION_TYPE = 'global/SET_NOTIFICATION_TYPE';
export const set_notification_type = createAction(SET_NOTIFICATION_TYPE);

// Notification 라이브 여부 저장
export const SET_NOTIFICATION_STATUS = 'global/SET_NOTIFICATION_STATUS';
export const set_notification_status = createAction(SET_NOTIFICATION_STATUS);

// tab 위치
export const CHANGE_TAB_LOCATION = 'global/CHANGE_TAB_LOCATION';
export const change_tab_location = createAction(CHANGE_TAB_LOCATION);

// ScrollView Y 좌표 값
export const CHANGE_SCROLL_TO_Y = 'global/CHANGE_SCROLL_TO_Y';
export const change_scroll_to_y = createAction(CHANGE_SCROLL_TO_Y);
