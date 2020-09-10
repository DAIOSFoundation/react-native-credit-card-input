import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as orderHistoryAPI from '../../../lib/api/orderHistory';
import * as ORDERHISTORY from './action';

const requestGetOrderHistorySaga = createRequestSaga(
  ORDERHISTORY.REQUEST_GET_ORDER_HISTORY,
  orderHistoryAPI.requestGetOrderHistory,
);

const requestGetViewerOrderList = createRequestSaga(
  ORDERHISTORY.REQUEST_GET_VIEWER_ORDER_LIST,
  orderHistoryAPI.requestGetViewerOrderList,
);

const requestOrderProductConfirm = createRequestSaga(
  ORDERHISTORY.REQUEST_ORDER_PRODUCT_CONFIRM,
  orderHistoryAPI.requestOrderProductConfirm,
);

const requestViewerOrderDetail = createRequestSaga(
  ORDERHISTORY.REQUEST_VIEWER_ORDER_DETAIL,
  orderHistoryAPI.requestViewerOrderDetail,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(
      ORDERHISTORY.REQUEST_GET_ORDER_HISTORY,
      requestGetOrderHistorySaga,
    ),
    yield takeLatest(
      ORDERHISTORY.REQUEST_GET_VIEWER_ORDER_LIST,
      requestGetViewerOrderList,
    ),
    yield takeLatest(
      ORDERHISTORY.REQUEST_ORDER_PRODUCT_CONFIRM,
      requestOrderProductConfirm,
    ),
    yield takeLatest(
      ORDERHISTORY.REQUEST_VIEWER_ORDER_DETAIL,
      requestViewerOrderDetail,
    ),
  ];
}
