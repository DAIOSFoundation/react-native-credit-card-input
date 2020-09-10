import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as BROADCAST from './actions';
import * as broadcastAPI from '../../../lib/api/broadcast';
import {create} from 'react-native/jest/renderer';
import {request_seller_page_passed_broadcast} from './actions';

const requestBroadcastInfoSaga = createRequestSaga(
  BROADCAST.GET_BROADCAST_INFO,
  broadcastAPI.getBroadcasts,
);

const requestBroadcastCommentsSaga = createRequestSaga(
  BROADCAST.GET_BROADCAST_COMMENTS,
  broadcastAPI.getBroadcastsComments,
);

const requestBroadcastProductSaga = createRequestSaga(
  BROADCAST.REQUEST_BROADCAST_PRODUCT,
  broadcastAPI.getBroadcastsProduct,
);

const requestBroadcastsPreview = createRequestSaga(
  BROADCAST.GET_BROADCAST_PREVIEW,
  broadcastAPI.getBroadcastsPreview,
);

const requestBroadcastsPreviewDetail = createRequestSaga(
  BROADCAST.GET_BROADCAST_PREVIEW_DETAIL,
  broadcastAPI.getBroadcastsPreviewDetail,
);

const requestBroadcastsPreviewAlarm = createRequestSaga(
  BROADCAST.REQUEST_BROADCAST_PREVIEW_ALARM,
  broadcastAPI.requestBroadcastsPreviewAlarm,
);

const deleteBroadcastsPreviewAlarm = createRequestSaga(
  BROADCAST.DELETE_BROADCAST_PREVIEW_ALARM,
  broadcastAPI.deleteBroadcastsPreviewAlarm,
);

const requestBroadcastsPrevComments = createRequestSaga(
  BROADCAST.REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS,
  broadcastAPI.getBroadcastsPrevComments,
);

const insertBroadcastPrevComments = createRequestSaga(
  BROADCAST.INSERT_PREVIEW_PRODUCT_COMMENT,
  broadcastAPI.insertPreviewProductComment,
);

const insertBroadcastPrevSubComments = createRequestSaga(
  BROADCAST.INSERT_PREVIEW_PRODUCT_SUB_COMMENT,
  broadcastAPI.insertPreviewProductSubComment,
);

const deleteBroadcastsPrevComments = createRequestSaga(
  BROADCAST.DELETE_PREVIEW_PRODUCT_COMMENT,
  broadcastAPI.deletePreviewProductComment,
);

const deleteBroadcastsPrevSubComments = createRequestSaga(
  BROADCAST.DELETE_PREVIEW_PRODUCT_SUB_COMMENT,
  broadcastAPI.deletePreviewProductSubComment,
);

const getBroadcastDetailInfo = createRequestSaga(
  BROADCAST.GET_BROADCAST_DETAIL_INFO,
  broadcastAPI.getBroadcastDetailInfo,
);

const requestThisMonthBroadcast = createRequestSaga(
  BROADCAST.REQUEST_THIS_MONTH_BROADCAST,
  broadcastAPI.requestThisMonthBroadcast,
);

const requestSpecificMonthBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SPECIFIC_MONTH_BROADCAST,
  broadcastAPI.requestSpecificMonthBroadcast,
);

const requestSpecificDayBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SPECIFIC_DAY_BROADCAST,
  broadcastAPI.requestSpecificDayBroadcast,
);

const requestThisMonthAllBroadcast = createRequestSaga(
  BROADCAST.REQUEST_THIS_MONTH_ALL_BROADCAST,
  broadcastAPI.requestThisMonthAllBroadcast,
);

const requestSpecificMonthAllBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SPECIFIC_MONTH_ALL_BROADCAST,
  broadcastAPI.requestSpecificMonthAllBroadcast,
);

const requestSpecificDayAllBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SPECIFIC_DAY_ALL_BROADCAST,
  broadcastAPI.requestSpecificDayAllBroadcast,
);

const requestSellerThisWeekBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SELLER_THIS_WEEK_BROADCAST,
  broadcastAPI.requestSellerThisWeekBroadcast,
);

const deleteStepOneTowBroadcast = createRequestSaga(
  BROADCAST.DELETE_STEP_ONE_TWO_BROADCAST,
  broadcastAPI.deleteStepOneTowBroadcast,
);

const requestSellerInfoForViewer = createRequestSaga(
  BROADCAST.REQUEST_SELLER_INFO_FOR_VIEWER,
  broadcastAPI.requestSellerInfoForViewer,
);

const requestSellerPageAlarm = createRequestSaga(
  BROADCAST.REQUEST_SELLER_PAGE_ALARM,
  broadcastAPI.requestSellerPageAlarm,
);

const requestSellerPagePassedBroadcast = createRequestSaga(
  BROADCAST.REQUEST_SELLER_PAGE_PASSED_BROADCAST,
  broadcastAPI.requestSellerPagePassedBroadcast,
);

const requestSellerPageProduces = createRequestSaga(
  BROADCAST.REQUEST_SELLER_PAGE_PRODUCTS,
  broadcastAPI.requestSellerPageProducts,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(BROADCAST.GET_BROADCAST_INFO, requestBroadcastInfoSaga),
    yield takeLatest(
      BROADCAST.REQUEST_BROADCAST_PRODUCT,
      requestBroadcastProductSaga,
    ),
    yield takeLatest(
      BROADCAST.GET_BROADCAST_COMMENTS,
      requestBroadcastCommentsSaga,
    ),
    yield takeLatest(BROADCAST.GET_BROADCAST_PREVIEW, requestBroadcastsPreview),
    yield takeLatest(
      BROADCAST.GET_BROADCAST_PREVIEW_DETAIL,
      requestBroadcastsPreviewDetail,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_BROADCAST_PREVIEW_ALARM,
      requestBroadcastsPreviewAlarm,
    ),
    yield takeLatest(
      BROADCAST.DELETE_BROADCAST_PREVIEW_ALARM,
      deleteBroadcastsPreviewAlarm,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_PREVIEW_BROADCAST_PREV_COMMENTS,
      requestBroadcastsPrevComments,
    ),
    yield takeLatest(
      BROADCAST.INSERT_PREVIEW_PRODUCT_COMMENT,
      insertBroadcastPrevComments,
    ),
    yield takeLatest(
      BROADCAST.INSERT_PREVIEW_PRODUCT_SUB_COMMENT,
      insertBroadcastPrevSubComments,
    ),
    yield takeLatest(
      BROADCAST.DELETE_PREVIEW_PRODUCT_COMMENT,
      deleteBroadcastsPrevComments,
    ),
    yield takeLatest(
      BROADCAST.DELETE_PREVIEW_PRODUCT_SUB_COMMENT,
      deleteBroadcastsPrevSubComments,
    ),
    yield takeLatest(
      BROADCAST.GET_BROADCAST_DETAIL_INFO,
      getBroadcastDetailInfo,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_THIS_MONTH_BROADCAST,
      requestThisMonthBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SPECIFIC_MONTH_BROADCAST,
      requestSpecificMonthBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SPECIFIC_DAY_BROADCAST,
      requestSpecificDayBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_THIS_MONTH_ALL_BROADCAST,
      requestThisMonthAllBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SPECIFIC_MONTH_ALL_BROADCAST,
      requestSpecificMonthAllBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SPECIFIC_DAY_ALL_BROADCAST,
      requestSpecificDayAllBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SELLER_THIS_WEEK_BROADCAST,
      requestSellerThisWeekBroadcast,
    ),
    yield takeLatest(
      BROADCAST.DELETE_STEP_ONE_TWO_BROADCAST,
      deleteStepOneTowBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SELLER_INFO_FOR_VIEWER,
      requestSellerInfoForViewer,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SELLER_PAGE_ALARM,
      requestSellerPageAlarm,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SELLER_PAGE_PASSED_BROADCAST,
      requestSellerPagePassedBroadcast,
    ),
    yield takeLatest(
      BROADCAST.REQUEST_SELLER_PAGE_PRODUCTS,
      requestSellerPageProduces,
    ),
  ];
}
