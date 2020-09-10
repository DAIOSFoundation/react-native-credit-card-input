import {handleActions} from 'redux-actions';
import * as ADJUSTMENT from './actions';
import produce, {createDraft, finishDraft} from 'immer';
import Moment from 'moment';
import {CHANGE_ADJUSTMENT_START_DATE} from './actions';

const initialState = {
  startDate: null,
  endDate: null,
  accountName: '', // 계좌등록 이름
  accountBank: 'KB국민은행', // 계좌등록 은행
  accountNumber: '', // 계좌 번호
  successMsg: null,
  liveAdjustmentInfo: null, // 라이브 정산 정보
  dayAdjustmentInfo: null, // 1일 정산 정보
  monthAdjustmentInfo: null, // 한달 정산 정보
  specificDateAdjustmentInfo: null, // 정산 내역 - 특정 날짜 정산 정보
};

const adjustment = handleActions(
  {
    [ADJUSTMENT.CHANGE_ADJUSTMENT_START_DATE]: (state, action) => {
      console.log('ADJUSTMENT.CHANGE_ADJUSTMENT_START_DATE', action.payload);
      return produce(state, (draft) => {
        draft.startDate = action.payload.dateString;
      });
    },
    [ADJUSTMENT.CHANGE_ADJUSTMENT_END_DATE]: (state, action) => {
      console.log('ADJUSTMENT.CHANGE_ADJUSTMENT_END_DATE', action.payload);
      return produce(state, (draft) => {
        draft.endDate = action.payload.dateString;
      });
    },
    [ADJUSTMENT.CHANGE_ACCOUNT_NAME]: (state, action) => {
      console.log('ADJUSTMENT.CHANGE_ACCOUNT_NAME', action.payload);
      return produce(state, (draft) => {
        draft.accountName = action.payload;
      });
    },
    [ADJUSTMENT.CHANGE_ACCOUNT_BANK]: (state, action) => {
      console.log('ADJUSTMENT.CHANGE_ACCOUNT_BANK', action.payload);
      return produce(state, (draft) => {
        draft.accountBank = action.payload;
      });
    },
    [ADJUSTMENT.CHANE_ACCOUNT_NUMBER]: (state, action) => {
      console.log('CHANE_ACCOUNT_NUMBER', action.payload);
      return produce(state, (draft) => {
        draft.accountNumber = action.payload;
      });
    },
    [ADJUSTMENT.REQUEST_ACCOUNT_SUCCESS]: (state, action) => {
      console.log('REQUEST_ACCOUNT_SUCCESS', action.payload);
      return produce(state, (draft) => {
        draft.accountName = action.payload.data.bankInfo[0].name;
        draft.accountBank = action.payload.data.bankInfo[0].bank;
        draft.accountNumber = action.payload.data.bankInfo[0].bankAccount;
      });
    },
    [ADJUSTMENT.REQUEST_ACCOUNT_FAILED]: (state, action) => {
      return produce(state, (draft) => {
      });
    },
    [ADJUSTMENT.UPDATE_ACCOUNT_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload.responseMessage.startsWith('S')) {
          draft.successMsg = 'updateAccountSuccess';
        }
      });
    },
    [ADJUSTMENT.UPDATE_ACCOUNT_FAILED]: (state, action) => {
      return produce(state, (draft) => {
      });
    },
    [ADJUSTMENT.CHANGE_INIT_STATE]: (state, action) => {
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [ADJUSTMENT.GET_OWN_LIVE_ADJUSTMENT_SUCCESS]: (state, action) => {
      console.log('GET_OWN_LIVE_ADJUSTMENT_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.liveAdjustmentInfo = action.payload.data;
      });
    },
    [ADJUSTMENT.GET_OWN_DAY_ADJUSTMENT_SUCCESS]: (state, action) => {
      console.log('GET_OWN_DAY_ADJUSTMENT_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.dayAdjustmentInfo = action.payload.data;
      });
    },
    [ADJUSTMENT.GET_OWN_MONTH_ADJUSTMENT_SUCCESS]: (state, action) => {
      console.log('GET_OWN_MONTH_ADJUSTMENT_SUCCESS : ', action.payload);
      return produce(state, (draft) => {
        draft.monthAdjustmentInfo = action.payload.data;
      });
    },
    [ADJUSTMENT.CHANGE_SUCCESS_MSG_INIT]: (state, action) => {
      console.log('SUCCESS_MSG_INIT : ', action.payload);
      return produce(state, (draft) => {
        draft.successMsg = null;
      });
    },
    [ADJUSTMENT.CHANGE_DATE_STATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.startDate = null;
        draft.endDate = null;
        draft.specificDateAdjustmentInfo = null;
      });
    },
    [ADJUSTMENT.GET_SPECIFIC_DATE_ADJUSTMENT_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.specificDateAdjustmentInfo = action.payload.data;
      });
    },
  },
  initialState,
);
export default adjustment;
