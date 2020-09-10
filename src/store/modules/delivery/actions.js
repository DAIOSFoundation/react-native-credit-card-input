import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';
import {delivery} from '../index';

// 이름변경
export const CHANGE_NAME = 'delivery/CHANGE_NAME';
export const change_name = createAction(CHANGE_NAME);

// 우편 번호 변경
export const CHANGE_ZIPCODE = 'delivery/CHANGE_ZIPCODE';
export const change_zipcode = createAction(CHANGE_ZIPCODE);

//기본 주소 변경
export const CHANGE_ADDRESS = 'delivery/CHANGE_ADDRESS';
export const change_address = createAction(CHANGE_ADDRESS);
//상세주소 변경
export const CHANGE_DETAIL_ADDRESS = 'delivery/CHANGE_DETAIL_ADDRESS';
export const change_detail_address = createAction(CHANGE_DETAIL_ADDRESS);

//핸드폰 앞 번호 변경
export const CHANGE_FRONT_PHONE = 'delivery/CHANGE_FRONT_PHONE';
export const change_front_phone = createAction(CHANGE_FRONT_PHONE);

//핸드폰 중간 번호 변경
export const CHANGE_MIDDLE_PHONE = 'delivery/CHANGE_MIDDLE_PHONE';
export const change_middle_phone = createAction(CHANGE_MIDDLE_PHONE);

//핸드폰 뒷 번호 변경
export const CHANGE_BACK_PHONE = 'delivery/CHANGE_BACK_PHONE';
export const change_back_phone = createAction(CHANGE_BACK_PHONE);

//배송지 추가 버튼
export const [
  REQUEST_ADD_DELIVERY,
  REQUEST_ADD_DELIVERY_SUCCESS,
  REQUEST_ADD_DELIVERY_FAILED,
] = createRequestActionTypes('delivery/REQUEST_ADD_DELIVERY');
export const request_add_delivery = createAction(REQUEST_ADD_DELIVERY);

//모든 배송지 가져오기
export const [
  REQUEST_GET_USER_ADDRESSES,
  REQUEST_GET_USER_ADDRESSES_SUCCESS,
  REQUEST_GET_USER_ADDRESSES_FAILED,
] = createRequestActionTypes('delivery/REQUEST_GET_USER_ADDRESS');
export const request_get_user_addresses = createAction(
  REQUEST_GET_USER_ADDRESSES,
);

// 우편번호 값으로 도서 산간 지역 여부 확인 - 주문하기페이지 < 신규입력탭뷰 < 주소찾기 버튼 클릭 후 우편번호 확인
export const [
  GET_ISLAND_CHECK_NEW_INPUT,
  GET_ISLAND_CHECK_NEW_INPUT_SUCCESS,
  GET_ISLAND_CHECK_NEW_INPUT_FAILED,
] = createRequestActionTypes('delivery/GET_ISLAND_CHECK_NEW_INPUT');
export const get_island_check_new_input = createAction(
  GET_ISLAND_CHECK_NEW_INPUT,
);

// 우편번호 값으로 도서 산간 지역 여부 확인 - 주문하기페이지 < 배송지선택 탭뷰
export const [
  GET_ISLAND_CHECK_BASIC,
  GET_ISLAND_CHECK_BASIC_SUCCESS,
  GET_ISLAND_CHECK_BASIC_FAILED,
] = createRequestActionTypes('delivery/GET_ISLAND_CHECK_BASIC');
export const get_island_check_basic = createAction(GET_ISLAND_CHECK_BASIC);

// 상태값에 다른 모달 실행
export const CHANGE_MODAL_STATUS = 'delivery/CHANGE_MODAL_STATUS';
export const change_modal_status = createAction(CHANGE_MODAL_STATUS);

// isLandCheckNewInput 초기화
export const CHANGE_ISLAND_CHECK_NEW_INPUT_INIT =
  'delivery/CHANGE_ISLAND_CHECK_NEW_INPUT_INIT';
export const change_island_check_new_input_init = createAction(
  CHANGE_ISLAND_CHECK_NEW_INPUT_INIT,
);
