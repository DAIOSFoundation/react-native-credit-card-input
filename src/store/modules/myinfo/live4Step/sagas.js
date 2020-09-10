import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../../lib/createRequestSaga';
import {PATCH_SELLER_RECORDED_VIDEO_DELETE} from './actions';
import * as LIVE4STEP from './actions';
import * as BROADCAST_API from '../../../../lib/api/broadcast';
import * as PRODUCTS_API from '../../../../lib/api/order';
import * as SAMPLE_ORDER_HISTORY_API from '../../../../lib/api/sampleOrderHistory';

const requestSampleProductHistories = createRequestSaga(
  LIVE4STEP.REQUEST_SAMPLE_PRODUCT_HISTORIES,
  SAMPLE_ORDER_HISTORY_API.getSampleHistories,
);

const requestScenarioVideoSaga = createRequestSaga(
  LIVE4STEP.REQUEST_SCENARIO_VIDEO,
  BROADCAST_API.patchReviewVideo,
);

const requestScenarioImageSaga = createRequestSaga(
  LIVE4STEP.REQUEST_SCENARIO_IMAGE,
  BROADCAST_API.patchReviewPhoto,
);

const deleteReviewVideoSaga = createRequestSaga(
  LIVE4STEP.DELETE_REVIEW_VIDEO,
  BROADCAST_API.deleteReviewVideo,
);

const requestDeleteImageSaga = createRequestSaga(
  LIVE4STEP.REQUEST_DELETE_IMAGES,
  BROADCAST_API.deleteReviewPhoto,
);

const requestPatchTempScenarioSaga = createRequestSaga(
  LIVE4STEP.REQUEST_PATCH_TEMP_SCENARIO,
  BROADCAST_API.patchTempScenario,
);

const requestPatchScenarioSaga = createRequestSaga(
  LIVE4STEP.REQUEST_PATCH_SCENARIO,
  BROADCAST_API.patchScenario,
);

const requestSampleProductConfirmSaga = createRequestSaga(
  LIVE4STEP.REQUEST_SAMPLE_PRODUCT_CONFIRM,
  SAMPLE_ORDER_HISTORY_API.patchProductsConfirm,
);

const requestCreateBroadcastSaga = createRequestSaga(
  LIVE4STEP.CREATE_BROADCAST,
  BROADCAST_API.postBroadcast,
);

const requestBroadcastSaga = createRequestSaga(
  LIVE4STEP.REQUEST_BROADCAST,
  BROADCAST_API.getUsersBroadcasts,
);

const requestBroadcastByIdSaga = createRequestSaga(
  LIVE4STEP.REQUEST_BROADCAST_BY_ID,
  BROADCAST_API.getUsersBroadcastsById,
);

const requestBroadcastByIdStatusSaga = createRequestSaga(
  LIVE4STEP.REQUEST_BROADCAST_BY_ID_STATUS,
  BROADCAST_API.getUsersBroadcastsByIdStatus,
);

const requestContractEmailSaga = createRequestSaga(
  LIVE4STEP.REQUEST_CONTRACT_EMAIL,
  BROADCAST_API.patchContractEmail,
);

const requestReadySaga = createRequestSaga(
  LIVE4STEP.REQUEST_READY,
  BROADCAST_API.patchReady,
);

const requestIgSaga = createRequestSaga(
  LIVE4STEP.REQUEST_IG,
  BROADCAST_API.patchIg,
);

const requestBroadcastUpload = createRequestSaga(
  LIVE4STEP.POST_BROADCAST_UPLOAD,
  BROADCAST_API.postBroadcastUpload,
);

const requestSellerBroadcastVideoSaga = createRequestSaga(
  LIVE4STEP.PATCH_SELLER_RECORDED_VIDEO,
  BROADCAST_API.patchSellerBroadcastVideo,
);

const deleteSellerRecordedVideoSaga = createRequestSaga(
  LIVE4STEP.DELETE_SELLER_RECORDED_VIDEO,
  BROADCAST_API.deleteSellerRecordedVideo,
);

const getSellerRecordedVideoSaga = createRequestSaga(
  LIVE4STEP.GET_SELLER_RECORDED_VIDEO,
  BROADCAST_API.getSellerRecordedVideo,
);

const postSellerRecordedVideoSaga = createRequestSaga(
  LIVE4STEP.POST_SELLER_RECORDED_VIDEO,
  BROADCAST_API.postSellerRecordedVideo,
);

const patchSellerBroadcastStatusSaga = createRequestSaga(
  LIVE4STEP.PATCH_SELLER_BROADCAST_STATUS,
  BROADCAST_API.patchSellerBroadcastStatus,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(
      LIVE4STEP.REQUEST_SAMPLE_PRODUCT_HISTORIES,
      requestSampleProductHistories,
    ),
    yield takeLatest(
      LIVE4STEP.REQUEST_SCENARIO_VIDEO,
      requestScenarioVideoSaga,
    ),
    yield takeLatest(
      LIVE4STEP.REQUEST_SCENARIO_IMAGE,
      requestScenarioImageSaga,
    ),
    yield takeLatest(LIVE4STEP.DELETE_REVIEW_VIDEO, deleteReviewVideoSaga),
    yield takeLatest(LIVE4STEP.REQUEST_DELETE_IMAGES, requestDeleteImageSaga),
    yield takeLatest(
      LIVE4STEP.REQUEST_PATCH_TEMP_SCENARIO,
      requestPatchTempScenarioSaga,
    ),
    yield takeLatest(
      LIVE4STEP.REQUEST_PATCH_SCENARIO,
      requestPatchScenarioSaga,
    ),
    yield takeLatest(
      LIVE4STEP.REQUEST_SAMPLE_PRODUCT_CONFIRM,
      requestSampleProductConfirmSaga,
    ),
    yield takeLatest(LIVE4STEP.CREATE_BROADCAST, requestCreateBroadcastSaga),
    yield takeLatest(LIVE4STEP.REQUEST_BROADCAST, requestBroadcastSaga),
    yield takeLatest(
      LIVE4STEP.REQUEST_BROADCAST_BY_ID,
      requestBroadcastByIdSaga,
    ),
    yield takeLatest(
      LIVE4STEP.REQUEST_CONTRACT_EMAIL,
      requestContractEmailSaga,
    ),
    yield takeLatest(LIVE4STEP.REQUEST_READY, requestReadySaga),
    yield takeLatest(LIVE4STEP.REQUEST_IG, requestIgSaga),
    yield takeLatest(
      LIVE4STEP.REQUEST_BROADCAST_BY_ID_STATUS,
      requestBroadcastByIdStatusSaga,
    ),
    yield takeLatest(LIVE4STEP.POST_BROADCAST_UPLOAD, requestBroadcastUpload),
    yield takeLatest(
      LIVE4STEP.PATCH_SELLER_RECORDED_VIDEO,
      requestSellerBroadcastVideoSaga,
    ),
    yield takeLatest(
      LIVE4STEP.DELETE_SELLER_RECORDED_VIDEO,
      deleteSellerRecordedVideoSaga,
    ),
    yield takeLatest(
      LIVE4STEP.GET_SELLER_RECORDED_VIDEO,
      getSellerRecordedVideoSaga,
    ),
    yield takeLatest(
      LIVE4STEP.POST_SELLER_RECORDED_VIDEO,
      postSellerRecordedVideoSaga,
    ),
    yield takeLatest(
      LIVE4STEP.PATCH_SELLER_BROADCAST_STATUS,
      patchSellerBroadcastStatusSaga,
    ),
  ];
}
