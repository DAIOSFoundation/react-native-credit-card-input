import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 로그아웃 리덕스 초기화
export const LOGOUT = 'user/USER_LOGOUT';
export const logout = createAction(LOGOUT);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'user/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 로그인 플랫폼 변경
export const CHANGE_PLATFORM = 'user/CHANGE_PLATFORM';
export const change_platform = createAction(CHANGE_PLATFORM);

// 로그인 토큰 변경
export const CHANGE_OAUTH_TOKEN = 'user/CHANGE_OAUTH_TOKEN';
export const change_oauth_token = createAction(CHANGE_OAUTH_TOKEN);

// 로그인 요청
export const REQUEST_LOGIN_OAUTH = 'user/REQUEST_LOGIN_OAUTH';
export const REQUEST_LOGIN_OAUTH_SUCCESS = 'user/REQUEST_LOGIN_OAUTH_SUCCESS';
export const REQUEST_LOGIN_OAUTH_FAILED = 'user/REQUEST_LOGIN_OAUTH_FAILED';

export const request_login_oauth = createAction(REQUEST_LOGIN_OAUTH);

// 로그인 정보 변경
export const CHANGE_LOGIN_INFO = 'user/CHANGE_LOGIN_INFO';
export const change_login_info = createAction(CHANGE_LOGIN_INFO);

// 에러메세지 변경
export const CHANGE_ERROR_MSG = 'user/CHANGE_ERROR_MSG';
export const change_error_msg = createAction(CHANGE_ERROR_MSG);

// 회원가입 요청 시청자
export const REQUEST_SIGNUP_VIEWER = 'user/REQUEST_SIGNUP_VIEWER';
export const REQUEST_SIGNUP_VIEWER_SUCCESS =
  'user/REQUEST_SIGNUP_VIEWER_SUCCESS';
export const REQUEST_SIGNUP_VIEWER_FAILED = 'user/REQUEST_SIGNUP_VIEWER_FAILED';

export const request_signup_viewer = createAction(REQUEST_SIGNUP_VIEWER);

// 회원가입 요청 셀러
export const REQUEST_SIGNUP_SELLER = 'user/REQUEST_SIGNUP_SELLER';
export const REQUEST_SIGNUP_SELLER_SUCCESS =
  'user/REQUEST_SIGNUP_SELLER_SUCCESS';
export const REQUEST_SIGNUP_SELLER_FAILED = 'user/REQUEST_SIGNUP_SELLER_FAILED';

export const request_signup_seller = createAction(REQUEST_SIGNUP_SELLER);

// 내 정보 요청
export const REQUEST_USER_MYINFO = 'user/REQUEST_USER_MYINFO';
export const REQUEST_USER_MYINFO_SUCCESS = 'user/REQUEST_USER_MYINFO_SUCCESS';
export const REQUEST_USER_MYINFO_FAILED = 'user/REQUEST_USER_MYINFO_FAILED';

export const request_user_myinfo = createAction(REQUEST_USER_MYINFO);

// 프로필 이미지 변경, 회원가입시만 사용, 경로정보만 세팅
export const CHANGE_PROFILE_IMAGE = 'user/CHANGE_PROFILE_IMAGE';
export const change_profile_image = createAction(CHANGE_PROFILE_IMAGE);

// 프로필 이미지 업로드
export const [
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILED,
] = createRequestActionTypes('user/UPLOAD_PROFILE_IMAGE');
export const upload_profile_image = createAction(UPLOAD_PROFILE_IMAGE);

// 성공, 실패 메세지 초기화
export const RESET_MSG = 'user/RESET_MSG';
export const reset_msg = createAction(RESET_MSG);

//닉네임
export const CHANGE_NICK = 'user/CHANGE_NICK';
export const change_nick = createAction(CHANGE_NICK);

//파이어베이스 토큰
export const SET_FIREBASE_TOKEN = 'user/SET_FIREBASE_TOKEN';
export const set_firebase_token = createAction(SET_FIREBASE_TOKEN);

//셀러 환영 메세지 스크린 호출 여부 , 셀러코드 발급 여부 확인
export const [
  REQUEST_USER_SELLER_ACTIVATE,
  REQUEST_USER_SELLER_ACTIVATE_SUCCESS,
  REQUEST_USER_SELLER_ACTIVATE_FAILED,
] = createRequestActionTypes('user/REQUEST_USER_SELLER_ACTIVATE');
export const request_user_seller_activate = createAction(
  REQUEST_USER_SELLER_ACTIVATE,
);

//셀러 환영 메시지 확인
export const [
  REQUEST_USER_SELLER_ACTIVATE_CHECK,
  REQUEST_USER_SELLER_ACTIVATE_CHECK_SUCCESS,
  REQUEST_USER_SELLER_ACTIVATE_CHECK_FAILED,
] = createRequestActionTypes('user/REQUEST_USER_SELLER_ACTIVATE_CHECK');
export const request_user_seller_activate_check = createAction(
  REQUEST_USER_SELLER_ACTIVATE_CHECK,
);

//셀러 활성화 초기화
export const CHANGE_INIT_SELLER_ACTIVATE = 'user/CHANGE_INIT_SELLER_ACTIVATE';
export const change_init_seller_activate = createAction(
  CHANGE_INIT_SELLER_ACTIVATE,
);

//카트에 담기
export const [
  REQUEST_ADD_CART,
  REQUEST_ADD_CART_SUCCESS,
  REQUEST_ADD_CART_FAILED,
] = createRequestActionTypes('user/REQUEST_ADD_CART');
export const request_add_cart = createAction(REQUEST_ADD_CART);

//카트 보기
export const [
  REQUEST_GET_CART,
  REQUEST_GET_CART_SUCCESS,
  REQUEST_GET_CART_FAILED,
] = createRequestActionTypes('user/REQUEST_GET_CART');
export const request_get_cart = createAction(REQUEST_GET_CART);

// 카트에 담긴 상품 수량 증가 / 감소
export const [
  CHANGE_CART_PRODUCT_AMOUNT,
  CHANGE_CART_PRODUCT_AMOUNT_SUCCESS,
  CHANGE_CART_PRODUCT_AMOUNT_FAILED,
] = createRequestActionTypes('user/CHANGE_CART_PRODUCT_AMOUNT');
export const change_cart_product_amount = createAction(
  CHANGE_CART_PRODUCT_AMOUNT,
);

// 카트에 담긴 상품 부분 제거
export const [
  DELETE_CART_PRODUCT_PART,
  DELETE_CART_PRODUCT_PART_SUCCESS,
  DELETE_CART_PRODUCT_PART_FAILED,
] = createRequestActionTypes('user/DELETE_CART_PRODUCT_PART');
export const delete_cart_product_part = createAction(DELETE_CART_PRODUCT_PART);

// 카트에 담긴 상품 전체 제거
export const [
  DELETE_CART_PRODUCT_ALL,
  DELETE_CART_PRODUCT_ALL_SUCCESS,
  DELETE_CART_PRODUCT_ALL_FAILED,
] = createRequestActionTypes('user/DELETE_CART_PRODUCT_ALL');
export const delete_cart_product_all = createAction(DELETE_CART_PRODUCT_ALL);

export const [
  REQUEST_RESERVATION_BROADCASTS,
  REQUEST_RESERVATION_BROADCASTS_SUCCESS,
  REQUEST_RESERVATION_BROADCASTS_FAILED,
] = createRequestActionTypes('user/REQUEST_RESERVATION_BROADCASTS');
export const request_reservation_broadcasts = createAction(
  REQUEST_RESERVATION_BROADCASTS,
);

//뷰어 마이페이지 - 프로필 수정 (프로필 정보)
export const [
  REQUEST_VIEWER_INFO,
  REQUEST_VIEWER_INFO_SUCCESS,
  REQUEST_VIEWER_INFO_FAILED,
] = createRequestActionTypes('myInfo/REQUEST_VIEWER_INFO');
export const request_viewer_info = createAction(REQUEST_VIEWER_INFO);

//뷰어 마이페이지 - 닉네임 변경
export const CHANGE_VIEWER_NICK_NAME = 'myInfo/CHANGE_VIEWER_NICK_NAME';
export const change_viewer_nick_name = createAction(CHANGE_VIEWER_NICK_NAME);

//뷰어 마이페이지 - 이메일 변경
export const CHANGE_VIEWER_EMAIL = 'myInfo/CHANGE_VIEWER_EMAIL';
export const change_viewer_email = createAction(CHANGE_VIEWER_EMAIL);

//뷰어 마이페이지 - 핸드폰 번호 변경
export const CHANGE_VIEWER_PHONE = 'myInfo/CHANGE_VIEWER_PHONE';
export const change_viewer_phone = createAction(CHANGE_VIEWER_PHONE);

//뷰어 마이페이지 - 프로필 수정 (프로필 수정 요청)
export const [
  UPDATE_VIEWER_INFO,
  UPDATE_VIEWER_INFO_SUCCESS,
  UPDATE_VIEWER_INFO_FAILED,
] = createRequestActionTypes('myInfo/UPDATE_VIEWER_INFO');
export const update_viewer_info = createAction(UPDATE_VIEWER_INFO);

export const CHANGE_PROFILE_SUCCESS_MESSAGE =
  'myInfo/CHANGE_PROFILE_SUCCESS_MESSAGE';
export const change_profile_success_message = createAction(
  CHANGE_PROFILE_SUCCESS_MESSAGE,
);

// 뷰어 유저 테이블 dpleJwt 값 있는지 없는지 여부
export const [
  GET_VIEWER_IS_DPLE_JWT,
  GET_VIEWER_IS_DPLE_JWT_SUCCESS,
  GET_VIEWER_IS_DPLE_JWT_FAILED,
] = createRequestActionTypes('user/GET_VIEWER_IS_DPLE_JWT');
export const get_viewer_is_dple_jwt = createAction(GET_VIEWER_IS_DPLE_JWT);
