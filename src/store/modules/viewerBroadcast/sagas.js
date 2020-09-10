import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as VIEWER_BROADCAST from './actions';
import * as viewerBroadcastAPI from '../../../lib/api/viewerBroadcast';

const getViewerBroadcastInfoSaga = createRequestSaga(
  VIEWER_BROADCAST.GET_VIEWER_BROADCAST_INFO,
  viewerBroadcastAPI.getViewerBroadcastInfo,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(
      VIEWER_BROADCAST.GET_VIEWER_BROADCAST_INFO,
      getViewerBroadcastInfoSaga,
    ),
  ];
}
