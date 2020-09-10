import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as VIEWER_BROADCAST from './actions';
import 'react-native-get-random-values';

const initialState = {
  viewerBroadcast: [], // userStory 정보 모두 가져오기
  viewerCount: 0, // 시청자수
  keepCallingCommentsIntervalId: null,
};

const viewerBroadcast = handleActions(
  {
    [VIEWER_BROADCAST.CHANGE_VIEWER_COUNT]: (state, action) => {
      console.log('CHANGE_VIEWER_COUNT : ', action.payload)
      return produce(state, (draft) => {
        draft.viewerCount = action.payload;
      });
    },
    [VIEWER_BROADCAST.GET_VIEWER_BROADCAST_INFO_SUCCESS]: (state, action) => {
      console.log('GET_VIEWER_BROADCAST_INFO_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.viewerBroadcast = action.payload.broadcast;
        draft.viewerCount = action.payload.broadcast.viewer_count;
      });
    },
    [VIEWER_BROADCAST.GET_VIEWER_BROADCAST_INFO_FAILED]: (state, action) => {
      console.log('GET_VIEWER_BROADCAST_INFO_FAILED : ', action.payload);
      return produce(state, (draft) => {
      // draft.broadcasts = '';
      })
    },
  },
  initialState,
);

export default viewerBroadcast;
