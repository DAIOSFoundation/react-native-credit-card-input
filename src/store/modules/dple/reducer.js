import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as DPLE from './actions';
import {checkResponseError} from '../../../utils/functions';

const initialState = {
  dpleWebViewHost: 'https://dple.daios.net/#/payments/orderHistory', // 결제 주문서 웹뷰 주소
  dpleOrderHistory: null, // 결제 주문서
  orderHistoryId: null, // 결제 주문서 Id
  clientCode: null, // DPLE에서 발급받은 고유 고객사 번호
  sessionCode: null, // 결제 주문서 고유 sessionCode
  payPrice: null, // 주문서에 표시될 지불 가격
  clientSessionCode: null, // 클라이언트에서 임의로 발급한 인증코드 (필수값 아님)
};

const dple = handleActions(
  {
    [DPLE.POST_DPLE_PAYMENT_SUCCESS]: (state, action) => {
      console.log('POST_DPLE_PAYMENT_SUCCESS => ', action.payload);
      return produce(state, (draft) => {
        draft.dpleOrderHistory = action.payload.data;
        draft.clientCode = action.payload.data.clientCode;
        draft.sessionCode = action.payload.data.sessionCode;
        draft.payPrice = action.payload.data.payPrice;
        draft.orderHistoryId = action.payload.data._id;
        draft.clientSessionCode = action.payload.data.clientSessionCode;
      });
    },
    [DPLE.POST_DPLE_PAYMENT_FAILED]: (state, action) => {
      console.log('POST_DPLE_PAYMENT_FAILED => ', action.payload);
    },
  },
  initialState,
);

export default dple;
