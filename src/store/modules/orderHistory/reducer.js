import {handleActions} from 'redux-actions';
import * as ORDERHISTORY from './action';
import produce, {createDraft, finishDraft} from 'immer';
import * as ADJUSTMENT from '../adjustment/actions';

const initialState = {
  orderHistory: null,
  orderHistoryList: [], //시청자 마이페이지 - 주문 리스트
  orderHistoryItem: [], // 시청자 마이페이지 - 주문 상세내역 구매 옵션 리스트
  rendering: null, //구매확정 누르면 페이지 새로고침
  orderHistoryDetail: [], // 주문 상세 내역
  successMsg: '', //구매 확정 성공 메세지
  orderHistoryDetailItems: [], //주문 상세 내역 - 옵션 정보
};

const orderHistory = handleActions(
  {
    [ORDERHISTORY.REQUEST_GET_ORDER_HISTORY_SUCCESS]: (state, action) => {
      console.log('REQUEST_GET_ORDER_HISTORY_SUCCESS', action.payload.data);
      return produce(state, (draft) => {
        if (action.payload) {
          draft.orderHistory = action.payload.data;
        }
      });
    },
    [ORDERHISTORY.REQUEST_GET_VIEWER_ORDER_LIST_SUCCESS]: (state, action) => {
      console.log('REQUEST_GET_VIEWER_ORDER_LIST_SUCCESS', action.payload.data);
      return produce(state, (draft) => {
        draft.orderHistoryList = action.payload.data;
      });
    },
    [ORDERHISTORY.REQUEST_ORDER_PRODUCT_CONFIRM_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.successMsg = 'success';
      });
    },
    [ORDERHISTORY.CHANGE_CONFIRM_SUCCESSMSG]: (state, action) => {
      return produce(state, (draft) => {
        draft.successMsg = '';
      });
    },
    [ORDERHISTORY.REQUEST_VIEWER_ORDER_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.orderHistoryDetail = action.payload.data;
        draft.orderHistoryDetailItems = action.payload.data.items;
      });
    },
  },
  initialState,
);
export default orderHistory;
