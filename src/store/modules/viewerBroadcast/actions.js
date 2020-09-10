import {createAction} from 'redux-actions';
import {createRequestActionTypes} from '../../../lib/createRequestSaga';

// user stroy 정보 모두 가져오기
export const [
  GET_VIEWER_BROADCAST_INFO,
  GET_VIEWER_BROADCAST_INFO_SUCCESS,
  GET_VIEWER_BROADCAST_INFO_FAILED,
] = createRequestActionTypes('viewerBroadcast/GET_VIEWER_BROADCAST_INFO');
export const get_viewer_broadcast_info = createAction(GET_VIEWER_BROADCAST_INFO);

// 시청자수 업데이트
export const CHANGE_VIEWER_COUNT = 'viewerBroadcast/CHANGE_VIEWER_COUNT';
export const change_viewer_count = createAction(CHANGE_VIEWER_COUNT);
