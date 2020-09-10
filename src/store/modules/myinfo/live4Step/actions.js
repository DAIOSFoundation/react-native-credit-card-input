import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../../lib/createRequestSaga';

// 셀러 - 구매한 샘플 목록 조회
export const [
  REQUEST_SAMPLE_PRODUCT_HISTORIES,
  REQUEST_SAMPLE_PRODUCT_HISTORIES_SUCCESS,
  REQUEST_SAMPLE_PRODUCT_HISTORIES_FAILED,
] = createRequestActionTypes('live4step/REQUEST_SAMPLE_PRODUCT_HISTORIES');
export const request_sample_product_histories = createAction(
  REQUEST_SAMPLE_PRODUCT_HISTORIES,
);

export const CHANGE_SELECTED_BROADCAST_ID =
  'live4step/CHANGE_SELECTED_BROADCAST_ID';
export const change_selected_broadcast_id = createAction(
  CHANGE_SELECTED_BROADCAST_ID,
);

// 셀러 - 방송정보 생성
export const [
  CREATE_BROADCAST,
  CREATE_BROADCAST_SUCCESS,
  CREATE_BROADCAST_FAILED,
] = createRequestActionTypes('live4Step/CREATE_BROADCAST');
export const create_broadcast = createAction(CREATE_BROADCAST);

// 셀러 - 계약서 요청
export const [
  REQUEST_CONTRACT_EMAIL,
  REQUEST_CONTRACT_EMAIL_SUCCESS,
  REQUEST_CONTRACT_EMAIL_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_CONTRACT_EMAIL');
export const request_contract_email = createAction(REQUEST_CONTRACT_EMAIL);

// 셀러 - 방송 준비 완료
export const [
  REQUEST_READY,
  REQUEST_READY_SUCCESS,
  REQUEST_READY_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_READY');
export const request_broadcast_ready = createAction(REQUEST_READY);

// 셀러 - 인스타 라이브방송 활성화
export const [
  REQUEST_IG,
  REQUEST_IG_SUCCESS,
  REQUEST_IG_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_IG');
export const request_ig = createAction(REQUEST_IG);

// 셀러 - 나의 여러 방송정보 조회
export const [
  REQUEST_BROADCAST,
  REQUEST_BROADCAST_SUCCESS,
  REQUEST_BROADCAST_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_BROADCAST');
export const request_broadcast = createAction(REQUEST_BROADCAST);

// 셀러 - 단일방송 조회
export const [
  REQUEST_BROADCAST_BY_ID,
  REQUEST_BROADCAST_BY_ID_SUCCESS,
  REQUEST_BROADCAST_BY_ID_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_BROADCAST_BY_ID');
export const request_broadcast_by_id = createAction(REQUEST_BROADCAST_BY_ID);

// 셀러 - 단일방송 상태값 조회
export const [
  REQUEST_BROADCAST_BY_ID_STATUS,
  REQUEST_BROADCAST_BY_ID_STATUS_SUCCESS,
  REQUEST_BROADCAST_BY_ID_STATUS_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_BROADCAST_BY_ID_STATUS');
export const request_broadcast_by_id_status = createAction(
  REQUEST_BROADCAST_BY_ID_STATUS,
);

// 팝업 필요 여부
export const CHANGE_NEED_TO_POP_UP = 'live4Step/CHANGE_NEED_TO_POP_UP';
export const change_need_to_pop_up = createAction(CHANGE_NEED_TO_POP_UP);

// 라방 시나리오 작성 방송 제목
export const CHANGE_SCENARIO_TITLE = 'live4Step/CHANGE_SCENARIO_TITLE';
export const change_scenario_title = createAction(CHANGE_SCENARIO_TITLE);

// 라방 시나리오 작성 방송 설명
export const CHANGE_SCENARIO_DESCRIPTION =
  'live4Step/CHANGE_SCENARIO_DESCRIPTION';
export const change_scenario_description = createAction(
  CHANGE_SCENARIO_DESCRIPTION,
);

// 라방 시나리오 방송 태그
export const CHANGE_SCENARIO_TAGS = 'live4Step/CHANGE_SCENARIO_TAGS';
export const change_scenario_tags = createAction(CHANGE_SCENARIO_TAGS);

// 라방 시나리오 작성 셀러리뷰
export const CHANGE_SCENARIO_REVIEWS = 'live4Step/CHANGE_SCENARIO_REVIEWS';
export const change_scenario_reviews = createAction(CHANGE_SCENARIO_REVIEWS);

// 라방 시나리오 판매 목표
export const CHANGE_SCENARIO_GOAL_AMOUNT =
  'live4Step/CHANGE_SCENARIO_GOAL_AMOUNT';
export const change_scenario_goal_amount = createAction(
  CHANGE_SCENARIO_GOAL_AMOUNT,
);

// 라방 시나리오 방송 시나리오
export const CHANGE_SCENARIO_SCENARIO = 'live4Step/CHANGE_SCENARIO_SCENARIO';
export const change_scenario_scenario = createAction(CHANGE_SCENARIO_SCENARIO);

// 라이브 방송 날짜 선택
export const CHANGE_LIVE_BROADCAST_DATE =
  'live4Step/CHANGE_LIVE_BROADCAST_DATE';
export const change_live_broadcast_date = createAction(
  CHANGE_LIVE_BROADCAST_DATE,
);

// 셀러 - 라이브방송 시작 시간 변경
export const CHANGE_LIVE_BROADCAST_TIME =
  'live4Step/CHANGE_LIVE_BROADCAST_TIME';
export const change_live_broadcast_time = createAction(
  CHANGE_LIVE_BROADCAST_TIME,
);

// 셀러 - 라이브방송 예상 진행 시간 변경
export const CHANGE_EXPECTED_PERIOD = 'live4Step/CHANGE_EXPECTED_PERIOD';
export const change_expected_period = createAction(CHANGE_EXPECTED_PERIOD);

// 셀러 비디오 등록
export const REQUEST_SCENARIO_VIDEO = 'live4Step/REQUEST_SCENARIO_VIDEO';
export const REQUEST_SCENARIO_VIDEO_SUCCESS =
  'live4Step/REQUEST_SCENARIO_VIDEO_SUCCESS';
export const REQUEST_SCENARIO_VIDEO_FAILED =
  'live4Step/REQUEST_SCENARIO_VIDEO_FAILED';
export const request_scenario_video = createAction(REQUEST_SCENARIO_VIDEO);

// 셀러 이미지 등록
export const REQUEST_SCENARIO_IMAGE = 'live4Step/REQUEST_SCENARIO_IMAGE';
export const REQUEST_SCENARIO_IMAGE_SUCCESS =
  'live4Step/REQUEST_SCENARIO_IMAGE_SUCCESS';
export const REQUEST_SCENARIO_IMAGE_FAILED =
  'live4Step/REQUEST_SCENARIO_IMAGE_FAILED';
export const request_scenario_image = createAction(REQUEST_SCENARIO_IMAGE);

// 동영상 배열 추가
export const CHANGE_ADD_VIDEOS = 'live4Step/CHANGE_ADD_VIDEOS';
export const change_add_videos = createAction(CHANGE_ADD_VIDEOS);

// 동영상 배열 삭제
export const CHANGE_DELETE_VIDEOS = 'live4Step/CHANGE_DELETE_VIDEOS';
export const change_delete_videos = createAction(CHANGE_DELETE_VIDEOS);

// 동영상 삭제
export const [
  DELETE_REVIEW_VIDEO,
  DELETE_REVIEW_VIDEO_SUCCESS,
  DELETE_REVIEW_VIDEO_FAILED,
] = createRequestActionTypes('live4Step/DELETE_REVIEW_VIDEO');
export const delete_review_video = createAction(DELETE_REVIEW_VIDEO);

// 이미지 배열 추가
export const CHANGE_ADD_IMAGES = 'live4Step/CHANGE_ADD_IMAGES';
export const change_add_images = createAction(CHANGE_ADD_IMAGES);

// 리뷰 사진 삭제 요청
export const [
  REQUEST_DELETE_IMAGES,
  REQUEST_DELETE_IMAGES_SUCCESS,
  REQUEST_DELETE_IMAGES_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_DELETE_IMAGES');
export const request_delete_image = createAction(REQUEST_DELETE_IMAGES);

// 이미지 배열 삭제, 재요청으로 변경되어 필요 없어짐
export const CHANGE_DELETE_IMAGES = 'live4Step/CHANGE_DELETE_IMAGES';
export const change_delete_images = createAction(CHANGE_DELETE_IMAGES);

// 셀러 라방 시나리오 임시 저장
export const [
  REQUEST_PATCH_TEMP_SCENARIO,
  REQUEST_PATCH_TEMP_SCENARIO_SUCCESS,
  REQUEST_PATCH_TEMP_SCENARIO_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_PATCH_TEMP_SCENARIO');
export const request_patch_temp_scenario = createAction(
  REQUEST_PATCH_TEMP_SCENARIO,
);

// 셀러 라방 시나리오 작성
export const [
  REQUEST_PATCH_SCENARIO,
  REQUEST_PATCH_SCENARIO_SUCCESS,
  REQUEST_PATCH_SCENARIO_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_PATCH_SCENARIO');
export const request_patch_scenario = createAction(REQUEST_PATCH_SCENARIO);

// 셀러 - 샘플상품 구매 확정
export const [
  REQUEST_SAMPLE_PRODUCT_CONFIRM,
  REQUEST_SAMPLE_PRODUCT_CONFIRM_SUCCESS,
  REQUEST_SAMPLE_PRODUCT_CONFIRM_FAILED,
] = createRequestActionTypes('live4Step/REQUEST_SAMPLE_PRODUCT_CONFIRM');
export const request_sample_product_confirm = createAction(
  REQUEST_SAMPLE_PRODUCT_CONFIRM,
);

// 메세지 초기화
export const RESET_MSG = 'live4Step/RESET_MSG';
export const reset_msg = createAction(RESET_MSG);

// Toast 메세지 초기화
export const RESET_TOAST_MSG = 'live4Step/RESET_TOAST_MSG';
export const reset_toast_msg = createAction(RESET_TOAST_MSG);

// live4Step 리덕스 초기화
export const RESET_LIVE4STEP = 'live4Step/RESET_LIVE4STEP';
export const reset_live4step = createAction(RESET_LIVE4STEP);

// 라이브 영상 업로드
export const [
  POST_BROADCAST_UPLOAD,
  POST_BROADCAST_UPLOAD_SUCCESS,
  POST_BROADCAST_UPLOAD_FAILED,
] = createRequestActionTypes('live4Step/POST_BROADCAST_UPLOAD');

export const post_broadcast_upload = createAction(POST_BROADCAST_UPLOAD);

export const CHANGE_RENDERING_INIT = 'live4Step/CHANGE_RENDERING_INIT';
export const change_rendering_init = createAction(CHANGE_RENDERING_INIT);

//셀러 라이브 끝나고 방송 동영상 업로드
export const CHANGE_SELLER_BROADCAST_VIDEO =
  'live4Step/CHANGE_SELLER_BROADCAST_VIDEO';
export const change_seller_broadcast_video = createAction(
  CHANGE_SELLER_BROADCAST_VIDEO,
);

// 셀러 라이브 끝나고 방송 동영상 등록
export const [
  PATCH_SELLER_RECORDED_VIDEO,
  PATCH_SELLER_RECORDED_VIDEO_SUCCESS,
  PATCH_SELLER_RECORDED_VIDEO_FAILED,
] = createRequestActionTypes('live4Step/PATCH_SELLER_RECORDED_VIDEO');
export const patch_seller_recorded_video = createAction(
  PATCH_SELLER_RECORDED_VIDEO,
);

//셀러 라이브 끝나고 방송 동영상 삭제
export const [
  DELETE_SELLER_RECORDED_VIDEO,
  DELETE_SELLER_RECORDED_VIDEO_SUCCESS,
  DELETE_SELLER_RECORDED_VIDEO_FAILED,
] = createRequestActionTypes('live4Step/DELETE_SELLER_VIDEO');
export const delete_seller_recorded_video = createAction(
  DELETE_SELLER_RECORDED_VIDEO,
);

// 셀러 방송 종류 후 저장한 동영상 있으면 가져오기
export const [
  GET_SELLER_RECORDED_VIDEO,
  GET_SELLER_RECORDED_VIDEO_SUCCESS,
  GET_SELLER_RECORDED_VIDEO_FAILED,
] = createRequestActionTypes('live4Step/GET_SELLER_RECORDED_VIDEO');
export const get_seller_recorded_video = createAction(
  GET_SELLER_RECORDED_VIDEO,
);

//셀러 동영상 배열 삭제
export const CHANGE_DELETE_SELLER_RECORDED_VIDEO =
  'live4Step/CHANGE_DELETE_SELLER_RECORDED_VIDEO';
export const change_delete_seller_recorded_video = createAction(
  CHANGE_DELETE_SELLER_RECORDED_VIDEO,
);

// 셀러 방송 종료 후 동영상 유튜브 업로드
export const [
  POST_SELLER_RECORDED_VIDEO,
  POST_SELLER_RECORDED_VIDEO_SUCCESS,
  POST_SELLER_RECORDED_VIDEO_FAILED,
] = createRequestActionTypes('live4Step/POST_SELLER_RECORDED_VIDEO');
export const post_seller_recorded_video = createAction(
  POST_SELLER_RECORDED_VIDEO,
);

//유튜브 성공 메세지 reset
export const CHANGE_YOUTUBE_UPLOAD_SUCCESS_MESSAGE =
  'live4Step/CHANGE_YOUTUBE_UPLOAD_SUCCESS_MESSAGE';
export const change_youtube_upload_success_message = createAction(
  CHANGE_YOUTUBE_UPLOAD_SUCCESS_MESSAGE,
);

//셀러 방송 종료 후 동영상 업로드 클릭 시 status 7로 변경
export const [
  PATCH_SELLER_BROADCAST_STATUS,
  PATCH_SELLER_BROADCAST_STATUS_SUCCESS,
  PATCH_SELLER_BROADCAST_STATUS_FAILED,
] = createRequestActionTypes('live4Step/PATCH_SELLER_BROADCAST_STATUS');
export const patch_seller_broadcast_status = createAction(
  PATCH_SELLER_BROADCAST_STATUS,
);

//셀러 방송 후 동영상 업로드 성공 메세지 초기화
export const CHANGE_SELLER_BROADCAST_VIDEO_SUCCESS_MESSAGE =
  'live4Step/CHANGE_SELLER_BROADCAST_VIDEO_SUCCESS_MESSAGE';
export const change_seller_broadcast_video_success_message = createAction(
  CHANGE_SELLER_BROADCAST_VIDEO_SUCCESS_MESSAGE,
);
