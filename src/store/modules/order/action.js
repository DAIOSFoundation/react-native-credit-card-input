import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 결제페이지 - 결제하기 동의 / 비동의
export const CHANGE_AGREE_PAYMENT = 'pay/CHANGE_AGREE_PAYMENT';
export const change_agree_payment = createAction(CHANGE_AGREE_PAYMENT);

// 결제페이지 - 결제 수단
export const CHANGE_PAYMENT_METHOD = 'pay/CHANGE_PAYMENT_METHOD';
export const change_payment_method = createAction(CHANGE_PAYMENT_METHOD);

// 결제페이지 - 결제 수단 Index 값
export const CHANGE_PAYMENT_INDEX = 'pay/CHANGE_PAYMENT_INDEX';
export const change_payment_index = createAction(CHANGE_PAYMENT_INDEX);

// 결제페이지 - 배송 요청 사항 메세지
export const CHANGE_DELIVERY_MESSAGE = 'pay/CHANGE_DELIVERY_MESSAGE';
export const change_delivery_message = createAction(CHANGE_DELIVERY_MESSAGE);

// 결제페이지 - 주소 신규 입력인지 아닌지 분기
export const CHANGE_IS_NEW = 'pay/CHANGE_IS_NEW';
export const change_is_new = createAction(CHANGE_IS_NEW);

// 결제페이지 - 사용자 주소 조회
export const [
  GET_USER_ADDRESS,
  GET_USER_ADDRESS_SUCCESS,
  GET_USER_ADDRESS_FAILED,
] = createRequestActionTypes('pay/GET_USER_ADDRESS');

export const get_user_address = createAction(GET_USER_ADDRESS);

// 결제페이지 - 신규 입력 이름
export const CHANGE_NEW_NAME = 'pay/CHANGE_NEW_NAME';
export const change_new_name = createAction(CHANGE_NEW_NAME);

// 결제페이지 - 신규 우편 번호
export const CHANGE_NEW_ZIPCODE = 'pay/CHANGE_NEW_ZIPCODE';
export const change_new_zipcode = createAction(CHANGE_NEW_ZIPCODE);

// 결제페이지 - 신규 주소
export const CHANGE_NEW_ADDRESS = 'pay/CHANGE_NEW_ADDRESS';
export const change_new_address = createAction(CHANGE_NEW_ADDRESS);

// 결제페이지 - 신규 상세 주소
export const CHANGE_NEW_DETAIL_ADDRESS = 'pay/CHANGE_NEW_DETAIL_ADDRESS';
export const change_new_detail_address = createAction(
  CHANGE_NEW_DETAIL_ADDRESS,
);

// 결제페이지 - 신규 핸드폰 앞 번호
export const CHANGE_NEW_FRONT_PHONE = 'pay/CHANGE_NEW_FRONT_PHONE';
export const change_new_front_phone = createAction(CHANGE_NEW_FRONT_PHONE);

// 결제페이지 - 신규 핸드폰 중간 번호
export const CHANGE_NEW_MIDDLE_PHONE = 'pay/CHANGE_NEW_MIDDLE_PHONE';
export const change_new_middle_phone = createAction(CHANGE_NEW_MIDDLE_PHONE);

// 결제페이지 - 신규 핸드폰 뒷 번호
export const CHANGE_NEW_BACK_PHONE = 'pay/CHANGE_NEW_BACK_PHONE';
export const change_new_back_phone = createAction(CHANGE_NEW_BACK_PHONE);

// 결제페이지 - 결제하기 요청(추천 페이지 상품 결제)
export const [
  REQUEST_RECOMMEND_SAMPLE_PAYMENT,
  REQUEST_RECOMMEND_SAMPLE_PAYMENT_SUCCESS,
  REQUEST_RECOMMEND_SAMPLE_PAYMENT_FAILED,
] = createRequestActionTypes('pay/REQUEST_RECOMMEND_SAMPLE_PAYMENT');

export const request_recommend_sample_payment = createAction(
  REQUEST_RECOMMEND_SAMPLE_PAYMENT,
);

// 결제페이지 - 결제하기 요청(라이브 & 녹방 시청 중 상품 결제)
export const [
  REQUEST_BROADCAST_PRODUCT_PAYMENT,
  REQUEST_BROADCAST_PRODUCT_PAYMENT_SUCCESS,
  REQUEST_BROADCAST_PRODUCT_PAYMENT_FAILED,
] = createRequestActionTypes('pay/REQUEST_BROADCAST_PRODUCT_PAYMENT');

export const request_broadcast_product_payment = createAction(
  REQUEST_BROADCAST_PRODUCT_PAYMENT,
);

// 결제페이지 - 결제상품 담아놓을 곳
export const CHANGE_PAYMENT_PRODUCT = 'pay/CHANGE_PAYMENT_PRODUCT';
export const change_payment_product = createAction(CHANGE_PAYMENT_PRODUCT);

// 리덕스 초기화
export const CHANGE_INIT_STATE = 'order/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 배송지 목록에서 배송지 선택
export const CHANGE_DELIVERY_LIST = 'order/CHANGE_DELIVERY_LIST';
export const change_delivery_list = createAction(CHANGE_DELIVERY_LIST);

//todo test
export const CHANGE_MERCHANTUID_INIT = 'order/CHANGE_MERCHANTUID_INIT';
export const change_merchantuid_init = createAction(CHANGE_MERCHANTUID_INIT);

// order Message Set
export const CHANGE_ORDER_MESSAGE = 'order/CHANGE_ORDER_MESSAGE';
export const change_order_message = createAction(CHANGE_ORDER_MESSAGE);

// 쿠폰을 적용한 총 상품 할인가
export const CHANGE_COUPON_REPLACE_RESULT =
  'order/CHANGE_COUPON_REPLACE_RESULT';
export const change_coupon_replace_result = createAction(
  CHANGE_COUPON_REPLACE_RESULT,
);

// 해당 상품에 적용한 쿠폰의 broadcastId 저장
export const CHANGE_COUPON_REPLACE_BROADCAST_Id =
  'order/CHANGE_COUPON_REPLACE_BROADCAST_Id';
export const change_coupon_replace_broadcast_id = createAction(
  CHANGE_COUPON_REPLACE_BROADCAST_Id,
);

// 신규입력 탭뷰 - 배송지 입력부분 초기화
export const CHANGE_NEW_INPUT_ADDRESS_INIT =
  'order/CHANGE_NEW_INPUT_ADDRESS_INIT';
export const change_new_input_address_init = createAction(
  CHANGE_NEW_INPUT_ADDRESS_INIT,
);
