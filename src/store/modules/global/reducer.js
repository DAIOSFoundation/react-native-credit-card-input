import {handleActions} from 'redux-actions';
import * as GLOBAL from './actions';
import produce from 'immer';

const initialState = {
  firebaseToken: null, // 토큰 값
  toastMessage: null, // 토스트 메세지
  notificationBroadcastId: null, // BroadcastId ID
  notificationProductId: null, // Product ID
  notificationType: null, // ex) 방송 전체화면 or 상품 상세화면 분기 처리
  notificationStatus: null, // Type === Broadcast 일 경우 라이브 여부
  tabLocation: '', // 화면 분기를 위해 tab 위치를 설정
  scrollToY: null, // 스크롤 Y 좌표값
};

const global = handleActions(
  {
    [GLOBAL.SET_FIREBASE_TOKEN]: (state, action) => {
      console.log('SET_FIREBASE_TOKEN', action.payload);
      return produce(state, (draft) => {
        draft.firebaseToken = action.payload;
      });
    },
    [GLOBAL.CHANGE_FIREBASE_TOKEN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('CHANGE_FIREBASE_TOKEN_SUCCESS');
      });
    },
    [GLOBAL.CHANGE_FIREBASE_TOKEN_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('CHANGE_FIREBASE_TOKEN_FAILED');
      });
    },
    [GLOBAL.DELETE_FIREBASE_TOKEN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('DELETE_FIREBASE_TOKEN_SUCCESS');
      });
    },
    [GLOBAL.DELETE_FIREBASE_TOKEN_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('DELETE_FIREBASE_TOKEN_FAILED');
      });
    },
    [GLOBAL.CHANGE_TOAST_MESSAGE]: (state, action) => {
      console.log('CHANGE_TOAST_MESSAGE => ', action.payload);
      return produce(state, (draft) => {
        draft.toastMessage = action.payload;
      });
    },
    [GLOBAL.CHANGE_TOAST_MESSAGE_INIT]: (state, action) => {
      console.log('CHANGE_TOAST_MESSAGE_INIT => ', action.payload);
      return produce(state, (draft) => {
        draft.toastMessage = null;
      });
    },
    [GLOBAL.SET_NOTIFICATION_BROADCAST_ID]: (state, action) => {
      console.log('SET_NOTIFICATION_BROADCAST_ID => ', action.payload);
      return produce(state, (draft) => {
        draft.notificationBroadcastId = action.payload;
      });
    },
    [GLOBAL.SET_NOTIFICATION_PRODUCT_ID]: (state, action) => {
      console.log('SET_NOTIFICATION_PRODUCT_ID => ', action.payload);
      return produce(state, (draft) => {
        draft.notificationProductId = action.payload;
      });
    },
    [GLOBAL.SET_NOTIFICATION_TYPE]: (state, action) => {
      console.log('SET_NOTIFICATION_TYPE => ', action.payload);
      return produce(state, (draft) => {
        draft.notificationType = action.payload;
      });
    },
    [GLOBAL.SET_NOTIFICATION_STATUS]: (state, action) => {
      console.log('SET_NOTIFICATION_IS_LIVE => ', action.payload);
      return produce(state, (draft) => {
        draft.notificationStatus = action.payload;
      });
    },
    [GLOBAL.CHANGE_TAB_LOCATION]: (state, action) => {
      console.log('CHANGE_TAB_LOCATION => ', action.payload);
      return produce(state, (draft) => {
        draft.tabLocation = action.payload;
      });
    },
    [GLOBAL.CHANGE_SCROLL_TO_Y]: (state, action) => {
      console.log('CHANGE_SCROLL_TO_Y => ', action.payload);
      return produce(state, (draft) => {
        draft.scrollToY = action.payload;
      });
    },
  },
  initialState,
);

export default global;
