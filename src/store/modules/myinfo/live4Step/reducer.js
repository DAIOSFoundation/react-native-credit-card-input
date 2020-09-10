import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as LIVE4STEP from './actions';
import {checkResponseError} from '../../../../utils/functions';
import * as PAYMENT from '../../payment/actions';
import * as USER from '../../user/actions';
import Moment from 'moment';

const initialState = {
  selectedBroadcast: null, // 선택된 broadcast Object
  selectedBroadcastId: null, // 선택된 broadcastID
  broadcasts: [], // 방송 리스트 배열, 현재는 status 7이하만 출력
  sampleHistories: null,
  requestContractEmail: false, // 셀러 이메일 정보
  reviewVideos: [],
  reviewImages: [],
  title: null,
  description: null,
  tags: [],
  review: null,
  goalAmount: 0,
  scenario: null,
  expectedDate: null,
  expectedStartTime: null,
  expectedPeriod: null, // 인스타그램은 최대 한시간
  blockBeforeStartTime: null,
  needToPopUp: false,
  successMsg: '',
  errorMsg: '',
  toastMsg: '',
  broadcastStatus: null, // 해당 방송 상태
  rendering: null, // 랜더링 제어 값
  sellerRecordedVideo: [], // 셀러 방송한 비디오 업로드
  youtubeUploadSuccessMessage: null, //유튜브 업로드 성공 여부 메세지
  sellerRecordedVideoUploadSuccessMessage: null, // 셀러  방송한 비디오 gcs업로드 성공 메시지
};

const live4Step = handleActions(
  {
    // 단일 방송 조회 성공
    [LIVE4STEP.REQUEST_BROADCAST_BY_ID_SUCCESS]: (state, action) => {
      console.log('REQUEST_BROADCAST_BY_ID_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        // state 로 분기
        draft.selectedBroadcast = action.payload.data;
        draft.reviewVideos = action.payload.data.reviewVideos;
        draft.reviewImages = action.payload.data.reviewImages;
        draft.title = action.payload.data.title;
        draft.description = action.payload.data.description;
        draft.tags = action.payload.data.tags;
        draft.review = action.payload.data.review;
        draft.goalAmount = action.payload.data.goalAmount || 0;
        draft.scenario = action.payload.data.scenario;
        draft.expectedDate = Moment(
          action.payload.data.expectedStartTime,
        ).format('YYYY-MM-DD');
        draft.expectedStartTime = Moment(
          action.payload.data.expectedStartTime,
        ).format('HH:mm');
        draft.blockBeforeStartTime = Moment(
          action.payload.data.expectedStartTime,
        ).format('YYYYMMDDHHMM');
        draft.expectedPeriod = action.payload.data.expectedPeriod || 60;
        draft.requestContractEmail = action.payload.data.requestContractEmail;
      });
    },
    // 단일 방송 조회 실패
    [LIVE4STEP.REQUEST_BROADCAST_BY_ID_FAILED]: (state, action) => {
      console.log('REQUEST_BROADCAST_BY_ID_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    // 단일 방송 상태 값 조회
    [LIVE4STEP.REQUEST_BROADCAST_BY_ID_STATUS_SUCCESS]: (state, action) => {
      console.log('REQUEST_BROADCAST_BY_ID_STATUS_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.responseMessage.substring(0, 5);
        } else {
          draft.broadcastStatus = action.payload.data.status;
          draft.rendering = Math.random();
        }
      });
    },
    // 방송정보 생성시, 혹은 live4step 에서 모든 방송목록 호출
    [LIVE4STEP.REQUEST_BROADCAST_SUCCESS]: (state, action) => {
      console.log('REQUEST_BROADCAST_SUCCESS : ', action.payload.data);
      return produce(state, (draft) => {
        draft.broadcasts = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_BROADCAST_FAILED]: (state, action) => {
      console.log('REQUEST_BROADCAST_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.CHANGE_SELECTED_BROADCAST_ID]: (state, action) => {
      console.log('CHANGE_SELECTED_BROADCAST_ID : ', action.payload);
      return produce(state, (draft) => {
        draft.selectedBroadcastId = action.payload;
      });
    },
    [LIVE4STEP.CREATE_BROADCAST_SUCCESS]: (state, action) => {
      console.log('CREATE_BROADCAST_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.broadcasts = action.payload.data;
        draft.toastMsg = '새로운 방송을 생성했습니다.';
      });
    },
    [LIVE4STEP.CREATE_BROADCAST_FAILED]: (state, action) => {
      console.log('CREATE_BROADCAST_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.REQUEST_CONTRACT_EMAIL_SUCCESS]: (state, action) => {
      console.log('REQUEST_CONTRACT_EMAIL_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.successMsg = '계약서 확인을 요청하였습니다.';
      });
    },
    [LIVE4STEP.REQUEST_CONTRACT_EMAIL_FAILED]: (state, action) => {
      console.log('CREATE_BROADCAST_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.REQUEST_READY_SUCCESS]: (state, action) => {
      console.log('REQUEST_READY_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.successMsg = 'prepareSuccess';
      });
    },
    [LIVE4STEP.REQUEST_IG_SUCCESS]: (state, action) => {
      console.log('REQUEST_IG_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.responseMessage.substring(0, 5);
          draft.selectedBroadcast.broadcast_status = 'failed';
          draft.selectedBroadcast.cover_frame_url = null;
        } else {
          draft.selectedBroadcast = action.payload.data;
        }
      });
    },
    [LIVE4STEP.REQUEST_IG_FAILED]: (state, action) => {
      console.log('REQUEST_IG_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.REQUEST_READY_FAILED]: (state, action) => {
      console.log('REQUEST_READY_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.REQUEST_CONTRACT_EMAIL_FAILED]: (state, action) => {
      console.log('CREATE_BROADCAST_FAILED : ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.responseMessage;
      });
    },
    [LIVE4STEP.REQUEST_SAMPLE_PRODUCT_HISTORIES_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_SAMPLE_PRODUCT_HISTORIES_SUCCESS : ',
        action.payload.data,
      );
      return produce(state, (draft) => {
        draft.sampleHistories = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_SAMPLE_PRODUCT_HISTORIES_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
    [LIVE4STEP.CHANGE_SCENARIO_TITLE]: (state, action) => {
      console.log('CHANGE_SCENARIO_TITLE : ', action.payload);
      return produce(state, (draft) => {
        draft.title = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_SCENARIO_DESCRIPTION]: (state, action) => {
      console.log('CHANGE_SCENARIO_TITLE : ', action.payload);
      return produce(state, (draft) => {
        draft.description = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_NEED_TO_POP_UP]: (state, action) => {
      console.log('CHANGE_NEED_TO_POP_UP : ', action.payload);
      return produce(state, (draft) => {
        draft.needToPopUp = action.payload;
      });
    },
    // 배열 추가형식이지만 현재 최대 1개
    [LIVE4STEP.CHANGE_ADD_VIDEOS]: (state, action) => {
      console.log('CHANGE_ADD_VIDEOS : ', action.payload);
      return produce(state, (draft) => {
        draft.reviewVideos = [...draft.reviewVideos, action.payload];
      });
    },
    [LIVE4STEP.CHANGE_DELETE_VIDEOS]: (state, action) => {
      console.log('CHANGE_DELETE_VIDEOS : ', action.payload);
      return produce(state, (draft) => {
        draft.reviewVideos.splice(action.payload, 1);
      });
    },
    [LIVE4STEP.CHANGE_ADD_IMAGES]: (state, action) => {
      console.log('CHANGE_ADD_IMAGES : ', action.payload);
      return produce(state, (draft) => {
        draft.reviewImages = [...draft.reviewImages, action.payload];
      });
    },
    [LIVE4STEP.CHANGE_DELETE_IMAGES]: (state, action) => {
      console.log('CHANGE_DELETE_IMAGES : ', action.payload);
      return produce(state, (draft) => {
        draft.reviewImages.splice(action.payload, 1);
      });
    },
    [LIVE4STEP.CHANGE_SCENARIO_REVIEWS]: (state, action) => {
      console.log('CHANGE_SCENARIO_REVIEWS : ', action.payload);
      return produce(state, (draft) => {
        draft.review = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_SCENARIO_TAGS]: (state, action) => {
      console.log('CHANGE_SCENARIO_TAGS : ', action.payload);
      return produce(state, (draft) => {
        draft.tags = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_SCENARIO_GOAL_AMOUNT]: (state, action) => {
      console.log('CHANGE_SCENARIO_GOAL_AMOUNT : ', action.payload);
      return produce(state, (draft) => {
        draft.goalAmount = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_SCENARIO_SCENARIO]: (state, action) => {
      console.log('CHANGE_SCENARIO_SCENARIO : ', action.payload);
      return produce(state, (draft) => {
        draft.scenario = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_LIVE_BROADCAST_DATE]: (state, action) => {
      console.log('CHANGE_LIVE_BROADCAST_DATE : ', action.payload);
      return produce(state, (draft) => {
        draft.expectedDate = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_LIVE_BROADCAST_TIME]: (state, action) => {
      console.log('CHANGE_LIVE_BROADCAST_TIME : ', action.payload);
      return produce(state, (draft) => {
        draft.expectedStartTime = action.payload;
      });
    },
    [LIVE4STEP.CHANGE_EXPECTED_PERIOD]: (state, action) => {
      console.log('CHANGE_EXPECTED_PERIOD : ', action.payload);
      return produce(state, (draft) => {
        draft.expectedPeriod = action.payload;
      });
    },
    [LIVE4STEP.REQUEST_SCENARIO_REVIEWS_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_SCENARIO_REVIEWS_SUCCESS',
        action.payload.responseMessage,
      );
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else {
        }
      });
    },
    [LIVE4STEP.REQUEST_SCENARIO_REVIEWS_FAILED]: (state, action) => {
      console.log('REQUEST_SCENARIO_REVIEWS_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [LIVE4STEP.REQUEST_SCENARIO_VIDEO_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_SCENARIO_VIDEO_SUCCESS',
        action.payload.responseMessage,
      );
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.data;
        } else {
          draft.successMsg = 'uploadScenarioVideoSuccess';
        }
      });
    },
    [LIVE4STEP.REQUEST_SCENARIO_VIDEO_FAILED]: (state, action) => {
      console.log('REQUEST_SCENARIO_VIDEO_FAILED', action.payload);
      return produce(state, (draft) => {});
    },
    [LIVE4STEP.REQUEST_SCENARIO_IMAGE_SUCCESS]: (state, action) => {
      console.log(
        'REQUEST_SCENARIO_IMAGE_SUCCESS',
        action.payload.responseMessage,
      );
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.data;
        } else {
          draft.successMsg = 'uploadScenarioImageSuccess';
        }
      });
    },
    [LIVE4STEP.REQUEST_SCENARIO_IMAGE_FAILED]: (state, action) => {
      console.log('REQUEST_SCENARIO_IMAGE_FAILED', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.data;
      });
    },
    [LIVE4STEP.DELETE_REVIEW_VIDEO_SUCCESS]: (state, action) => {
      console.log('DELETE_REVIEW_VIDEO_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.data;
        } else {
          draft.successMsg = 'deleteVideoSuccess';
        }
      });
    },
    [LIVE4STEP.DELETE_REVIEW_VIDEO_FAILED]: (state, action) => {
      console.log('DELETE_REVIEW_VIDEO_FAILED', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_DELETE_IMAGES_SUCCESS]: (state, action) => {
      console.log('REQUEST_DELETE_IMAGES_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = action.payload.data;
        } else {
          draft.successMsg = 'deleteImageSuccess';
        }
      });
    },
    [LIVE4STEP.REQUEST_DELETE_IMAGES_FAILED]: (state, action) => {
      console.log('REQUEST_DELETE_IMAGES_FAILED', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_SAMPLE_PRODUCT_CONFIRM_SUCCESS]: (state, action) => {
      console.log('REQUEST_SAMPLE_PRODUCT_CONFIRM_SUCCESS', action.payload);
      return produce(state, (draft) => {
        draft.sampleHistories = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_PATCH_TEMP_SCENARIO_SUCCESS]: (state, action) => {
      console.log('REQUEST_PATCH_TEMP_SCENARIO_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else {
          draft.successMsg = 'tempStoreSuccess';
        }
      });
    },
    [LIVE4STEP.REQUEST_PATCH_TEMP_SCENARIO_FAILED]: (state, action) => {
      console.log('REQUEST_PATCH_TEMP_SCENARIO_FAILED => ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_PATCH_SCENARIO_SUCCESS]: (state, action) => {
      console.log('REQUEST_PATCH_SCENARIO_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
        } else {
          draft.successMsg = 'storeSuccess'; // 저장되었습니다
        }
      });
    },
    [LIVE4STEP.REQUEST_PATCH_SCENARIO_FAILED]: (state, action) => {
      console.log('REQUEST_PATCH_SCENARIO_FAILED => ', action.payload);
      return produce(state, (draft) => {
        draft.errorMsg = action.payload.data;
      });
    },
    [LIVE4STEP.REQUEST_SAMPLE_PRODUCT_CONFIRM_FAILED]: (state, action) => {
      console.log('REQUEST_SAMPLE_PRODUCT_CONFIRM_FAILED => ', action.payload);
      return produce(state, (draft) => {});
    },
    [LIVE4STEP.POST_BROADCAST_UPLOAD_SUCCESS]: (state, action) => {
      console.log('POST_BROADCAST_UPLOAD_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        if (checkResponseError(action.payload)) {
          draft.errorMsg = 'uploadError';
        } else {
          draft.successMsg = 'uploadSuccess';
        }
      });
    },
    [LIVE4STEP.POST_BROADCAST_UPLOAD_FAILED]: (state, action) => {
      console.log('POST_BROADCAST_UPLOAD_FAILED : ', action.payload);
      return produce(state, (draft) => {});
    },
    [LIVE4STEP.RESET_MSG]: (state, action) => {
      console.log('LIVE4STEP RESET_MSG');
      return produce(state, (draft) => {
        draft.successMsg = '';
        draft.errorMsg = '';
      });
    },
    [LIVE4STEP.RESET_TOAST_MSG]: (state, action) => {
      return produce(state, (draft) => {
        draft.toastMsg = '';
      });
    },
    [LIVE4STEP.RESET_LIVE4STEP]: () => {
      return initialState;
    },
    [LIVE4STEP.CHANGE_RENDERING_INIT]: (state, action) => {
      return produce(state, (draft) => {
        draft.rendering = null;
      });
    },
    [LIVE4STEP.CHANGE_SELLER_BROADCAST_VIDEO]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerRecordedVideo = [
          ...draft.sellerRecordedVideo,
          action.payload,
        ];
      });
    },
    [LIVE4STEP.PATCH_SELLER_RECORDED_VIDEO_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerRecordedVideo = [action.payload];
        draft.sellerRecordedVideoUploadSuccessMessage = 'success';
        // draft.sellerBroadcastVideo = action.payload;
      });
    },
    [LIVE4STEP.PATCH_SELLER_RECORDED_VIDEO_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('PATCH_SELLER_RECORDED_VIDEO_FAILED : ', action.payload);
      });
    },
    [LIVE4STEP.CHANGE_DELETE_SELLER_RECORDED_VIDEO]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerRecordedVideo = [];
      });
    },
    [LIVE4STEP.GET_SELLER_RECORDED_VIDEO_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload.data.recordedVideoGcp.length > 0) {
          draft.sellerRecordedVideo = [action.payload];
        }
      });
    },
    [LIVE4STEP.POST_SELLER_RECORDED_VIDEO_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerRecordedVideoUploadSuccessMessage = null;
      });
    },
    [LIVE4STEP.POST_SELLER_RECORDED_VIDEO_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('POST_SELLER_RECORDED_VIDEO_FAILED', action.payload);
      });
    },
    [LIVE4STEP.CHANGE_YOUTUBE_UPLOAD_SUCCESS_MESSAGE]: (state, action) => {
      return produce(state, (draft) => {
        draft.youtubeUploadSuccessMessage = null;
      });
    },
    [LIVE4STEP.CHANGE_SELLER_BROADCAST_VIDEO_SUCCESS_MESSAGE]: (
      state,
      action,
    ) => {
      return produce(state, (draft) => {
        draft.sellerRecordedVideoUploadSuccessMessage = null;
      });
    },
  },
  initialState,
);

export default live4Step;
