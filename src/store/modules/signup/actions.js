import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// 회원가입 유저 타입 변경
export const CHANGE_USER_TYPE = 'signup/CHANGE_USER_TYPE';
export const change_user_type = createAction(CHANGE_USER_TYPE);

// 회원가입 상태바 변경
export const CHANGE_STATEBAR = 'signup/CHANGE_STATEBAR';
export const change_statebar = createAction(CHANGE_STATEBAR);

// 이용약관/개인정보 처리방침 동의
export const CHANGE_AGREE_PRIVACY = 'signup/CHANGE_STATE';
export const change_agree_privacy = createAction(CHANGE_AGREE_PRIVACY);

// 마케팅 동의
export const CHANGE_AGREE_MARKETING = 'signup/CHANGE_AGREE_MARKETING';
export const change_agree_marketing = createAction(CHANGE_AGREE_MARKETING);

// 컨텐츠 활용 동의
export const CHANGE_AGREE_CONTENTS = 'signup/CHANGE_AGREE_CONTENTS';
export const change_agree_contents = createAction(CHANGE_AGREE_CONTENTS);

// 소속사 방송 활동 동의
export const CHANGE_AGREE_BROADCAST = 'signup/CHANGE_AGREE_BROADCAST';
export const change_agree_broadcast = createAction(CHANGE_AGREE_BROADCAST);

// 전체동의
export const CHANGE_AGREE_ALL = 'signup/CHANGE_AGREE_ALL';
export const change_agree_all = createAction(CHANGE_AGREE_ALL);

// 전체동의만 변경
export const CHANGE_ONLY_AGREE_ALL = 'signup/CHANGE_ONLY_AGREE_ALL';
export const change_only_agree_all = createAction(CHANGE_ONLY_AGREE_ALL);

// 닉네임 변경
export const CHANGE_NICK_NAME = 'signup/CHANGE_NICK_NAME';
export const change_nick_name = createAction(CHANGE_NICK_NAME);

// 쇼핑 리스트 변경
export const CHANGE_SHOPPING_PLACE = 'signup/CHANGE_CHANGE_SHOPPING_PLACE';
export const change_shopping_place = createAction(CHANGE_SHOPPING_PLACE);

// 소비 금액 변경
export const CHANGE_SHOPPING_AMOUNT = 'signup/CHANGE_SHOPPING_AMOUNT';
export const change_shopping_amount = createAction(CHANGE_SHOPPING_AMOUNT);

// 관심 상품변경
export const CHANGE_PRODUCT_INTEREST = 'signup/CHANGE_PRODUCT_INTEREST';
export const change_product_interest = createAction(CHANGE_PRODUCT_INTEREST);

// 이름 변경
export const CHANGE_NAME = 'signup/CHANGE_NAME';
export const change_name = createAction(CHANGE_NAME);

// 주민번호 앞자리
export const CHANGE_BIRTH = 'signup/CHANGE_BIRTH';
export const change_birth = createAction(CHANGE_BIRTH);

// 주민번호 뒷자리
export const CHANGE_BIRTH2 = 'signup/CHANGE_BIRTH2';
export const change_birth2 = createAction(CHANGE_BIRTH2);

// 폰번호 변경
export const CHANGE_PHONE = 'signup/CHANGE_PHONE';
export const change_phone = createAction(CHANGE_PHONE);

// 통신사 변경
export const CHANGE_PHONE_CARRIER = 'signup/CHANGE_PHONE_CARRIER';
export const change_phone_carrier = createAction(CHANGE_PHONE_CARRIER);

// 이메일 변경
export const CHANGE_EMAIL = 'signup/CHANGE_EMAIL';
export const change_email = createAction(CHANGE_EMAIL);

// 프로필 이미지 변경
export const CHANGE_PROFILE_IMAGE = 'signup/CHANGE_PROFILE_IMAGE';
export const change_profile_image = createAction(CHANGE_PROFILE_IMAGE);

// 라이브 방송 겸험 변경
export const CHANGE_BROADCAST_EXPERIENCE = 'signup/CHANGE_BROADCAST_EXPERIENCE';
export const change_broadcast_experience = createAction(
  CHANGE_BROADCAST_EXPERIENCE,
);

// 방송경험 횟수 변경
export const CHANGE_NUM_OF_LIVE = 'signup/CHANGE_NUM_OF_LIVE';
export const change_num_of_live = createAction(CHANGE_NUM_OF_LIVE);

// 판매 경험 변경
export const CHANGE_SELLING_EXPERIENCE = 'signup/CHANGE_SELLING_EXPERIENCE';
export const change_selling_experience = createAction(
  CHANGE_SELLING_EXPERIENCE,
);

// 판매한 상품의 개당 판매 금액 변경
export const CHANGE_SELLING_PRICE = 'signup/CHANGE_SELLING_PRICE';
export const change_selling_price = createAction(CHANGE_SELLING_PRICE);

// 판매한 상품 카테고리
export const CHANGE_SELLING_CATEGORY = 'signup/CHANGE_SELLING_CATEGORY';
export const change_selling_category = createAction(CHANGE_SELLING_CATEGORY);

// 인스타 채널 아이디
export const CHANGE_CHANNEL_NAME = 'signup/CHANGE_CHANNEL_NAME';
export const change_channel_name = createAction(CHANGE_CHANNEL_NAME);

// SNS 게시물 업로드 횟수
export const CHANGE_NUM_OF_UPLOAD = 'signup/CHANGE_NUM_OF_UPLOAD';
export const change_num_of_upload = createAction(CHANGE_NUM_OF_UPLOAD);

// 채닐 남녀 성비
export const CHANGE_CHANNEL_GENDER_RATIO = 'signup/CHANGE_CHANNEL_GENDER_RATIO';
export const change_channel_gender_ratio = createAction(
  CHANGE_CHANNEL_GENDER_RATIO,
);

// 채널 주요 연령
export const CHANGE_CHANNEL_AGE_RANGE = 'signup/CHANGE_CHANNEL_AGE_RANGE';
export const change_channel_age_range = createAction(CHANGE_CHANNEL_AGE_RANGE);

// 외모 유형 변경
export const CHANGE_APPEARANCE = 'signup/CHANGE_APPEARANCE';
export const change_appearance = createAction(CHANGE_APPEARANCE);

// 나의 목소리 유형
export const CHANGE_VOICE = 'signup/CHANGE_VOICE';
export const change_voice = createAction(CHANGE_VOICE);

// 라방 연습하기 비디오
export const CHANGE_PREV_LIVE_INFO = 'signup/CHANGE_PREV_LIVE_INFO';
export const change_prev_live_info = createAction(CHANGE_PREV_LIVE_INFO);

// 활동 범위
export const CHANGE_SELLING_TYPE = 'signup/CHANGE_SELLING_TYPE';
export const change_selling_type = createAction(CHANGE_SELLING_TYPE);

// 라방을 통해 벌고픈 월 수익
export const CHANGE_DESIRED_INCOME = 'signup/CHANGE_DESIRED_INCOME';
export const change_desired_income = createAction(CHANGE_DESIRED_INCOME);

// 에러메세지 변경
export const CHANGE_ERROR_MSG = 'signup/CHANGE_ERROR_MSG';
export const change_error_msg = createAction(CHANGE_ERROR_MSG);

// 유효한 입력 변경
export const CHANGE_IS_VALID = 'signup/CHANGE_IS_VALID';
export const change_is_valid = createAction(CHANGE_IS_VALID);

// 유효한 입력 변경 - 시청자 생년월일
export const CHANGE_IS_VALID_BIRTH = 'signup/CHANGE_IS_VALID_BIRTH';
export const change_is_valid_birth = createAction(CHANGE_IS_VALID_BIRTH);

// 유효한 입력 변경 - 시청자 생년월일
export const CHANGE_IS_VALID_PHONE = 'signup/CHANGE_IS_VALID_PHONE';
export const change_is_valid_phone = createAction(CHANGE_IS_VALID_PHONE);

// 유효한 입력 변경 - 닉네임
export const CHANGE_IS_VALID_NICKNAME = 'signup/CHANGE_IS_VALID_NICKNAME';
export const change_is_valid_nickname = createAction(CHANGE_IS_VALID_NICKNAME);

// 유효한 입력 변경 - 이메일
export const CHANGE_IS_VALID_EMAIL = 'signup/CHANGE_IS_VALID_EMAIL';
export const change_is_valid_email = createAction(CHANGE_IS_VALID_EMAIL);

// 유효한 입력 변경 - 라이브 방송 횟수
export const CHANGE_IS_VALID_NUM_OF_LIVE = 'signup/CHANGE_IS_VALID_NUM_OF_LIVE';
export const change_is_valid_num_of_live = createAction(
  CHANGE_IS_VALID_NUM_OF_LIVE,
);

// 유효한 입력 변경 - 라방을 통해 벌고픈 월 수익은 얼마인가요?
export const CHANGE_IS_VALID_DESIRED_INCOME =
  'signup/CHANGE_IS_VALID_DESIRED_INCOME';
export const change_is_valid_desired_income = createAction(
  CHANGE_IS_VALID_DESIRED_INCOME,
);

// 닉네임 중복검사 여부
export const CHANGE_IS_CHECK_NICK = 'signup/CHANGE_IS_CHECK_NICK';
export const change_is_check_nick = createAction(CHANGE_IS_CHECK_NICK);

// 닉네임 중복 조회
export const REQUEST_CHECK_NICK = 'signup/REQUEST_CHECK_NICK';
export const REQUEST_CHECK_NICK_SUCCESS = 'signup/REQUEST_CHECK_NICK_SUCCESS';
export const REQUEST_CHECK_NICK_FAILED = 'signup/REQUEST_CHECK_NICK_FAILED';

export const request_check_nick = createAction(REQUEST_CHECK_NICK);

// 인스타그램 아이디 조회
export const REQUEST_IG_USER_NAME = 'signup/REQUEST_IG_USER_NAME';
export const REQUEST_IG_USER_NAME_SUCCESS =
  'signup/REQUEST_IG_USER_NAME_SUCCESS';
export const REQUEST_IG_USER_NAME_FAILED = 'signup/REQUEST_IG_USER_NAME_FAILED';

export const request_ig_user_name = createAction(REQUEST_IG_USER_NAME);

export const CHANGE_INIT_STATE = 'signup/CHANGE_INIT_STATE';
export const change_init_state = createAction(CHANGE_INIT_STATE);

// 선택된 채널 아이디 변경
export const CHANGE_CHECKED_CHANNELPK = 'signup/CHANGE_CHECKED_CHANNELPK';
export const change_checked_channelpk = createAction(CHANGE_CHECKED_CHANNELPK);

// 검색된 채널 클리어
export const CHANGE_CHANNEL_PK = 'signup/CHANGE_CHANNEL_PK';
export const change_channel_pk = createAction(CHANGE_CHANNEL_PK);

// 회원가입 오류메세지 텍스트
export const CHANGE_ERROR_MESSAGE = 'signup/CHANGE_ERROR_MESSAGE';
export const change_error_message = createAction(CHANGE_ERROR_MESSAGE);

// 휴대폰 인증 모달 메세지 초기화
export const CHANGE_PHONE_AUTH_MESSAGE_INIT =
  'signup/CHANGE_PHONE_AUTH_MESSAGE_INIT';
export const change_phone_auth_message_init = createAction(
  CHANGE_PHONE_AUTH_MESSAGE_INIT,
);

// 휴대폰 인증 회원가입 정보 임시 저장
export const CHANGE_PHONE_AUTH_INFO_TEMPORARY_STORAGE =
  'signup/CHANGE_PHONE_AUTH_INFO_TEMPORARY_STORAGE';
export const change_phone_auth_info_temporary_storage = createAction(
  CHANGE_PHONE_AUTH_INFO_TEMPORARY_STORAGE,
);

// 회원가입 ARS 휴대폰 본인인증 1
export const [
  CHANGE_PHONE_AUTH_ONE,
  CHANGE_PHONE_AUTH_ONE_SUCCESS,
  CHANGE_PHONE_AUTH_ONE_FAILED,
] = createRequestActionTypes('signup/CHANGE_PHONE_AUTH_ONE');
export const change_phone_auth_one = createAction(CHANGE_PHONE_AUTH_ONE);

// 회원가입 ARS 휴대폰 본인인증 2
export const [
  CHANGE_PHONE_AUTH_TWO,
  CHANGE_PHONE_AUTH_TWO_SUCCESS,
  CHANGE_PHONE_AUTH_TWO_FAILED,
] = createRequestActionTypes('signup/CHANGE_PHONE_AUTH_TWO');
export const change_phone_auth_two = createAction(CHANGE_PHONE_AUTH_TWO);

// ARS authNumber Init
export const ARS_AUTH_NUMBER_INIT = 'signup/ARS_AUTH_NUMBER_INIT';
export const ars_auth_number_init = createAction(ARS_AUTH_NUMBER_INIT);

// ARS phoneAuthId Init
export const ARS_PHONE_AUTH_ID_INIT = 'signup/ARS_PHONE_AUTH_ID_INIT';
export const ars_phone_auth_id_init = createAction(ARS_PHONE_AUTH_ID_INIT);

// 01 라이브 경험 - SNS 라이브 방송을 해보셨나요 ? 선택 여부
export const BROADCAST_ITEM_SELL_STATUS = 'signup/BROADCAST_ITEM_SELL_STATUS';
export const broadcast_item_sell_status = createAction(
  BROADCAST_ITEM_SELL_STATUS,
);
