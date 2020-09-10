import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as PAYMENT from './actions';

const initialState = {
  uid: null,
  paymentData: null,
  paymentSuccess: null,
  error_msg: null, // 아임포트 결제 실패 에러메세지
  error_code: null, // 아임포트 결제 실패 에러코드
};

const payment = handleActions(
  {
    [PAYMENT.CHANGE_UID]: (state, action) => {
      console.log('CHANGE_UID => ', action.payload);
      return produce(state, (draft) => {
        draft.uid = action.payload;
      });
    },
    // 통신은 성공했으나 결제를 실패했을 때도 아래상태로 진입
    [PAYMENT.REQUEST_CONFIRM_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('REQUEST_CONFIRM_SUCCESS => ', action.payload);
        // 결제 성공
        if (action.payload.responseMessage.startsWith('S')) {
          draft.paymentSuccess = true;
        } else if (action.payload.data.error_msg) {
          draft.paymentSuccess = false;
          draft.error_code = action.payload.data.error_code;
          draft.error_msg = action.payload.data.error_msg;
        }
        draft.paymentData = action.payload;
      });
    },
    [PAYMENT.REQUEST_CONFIRM_FAILED]: (state, action) => {
      return produce(state, (draft) => {
        console.log('REQUEST_CONFIRM_FAILED => ', action.payload);
        draft.paymentData = action.payload;
        draft.paymentSuccess = false;
      });
    },
    [PAYMENT.RESET_INITIAL_STATE]: () => {
      return initialState;
    },
  },
  initialState,
);

export default payment;
