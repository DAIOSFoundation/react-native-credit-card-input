import {handleActions} from 'redux-actions';
import * as REGULAR_PAYMENT from './actions';
import produce from 'immer';

const initialState = {
  creditCardInfo: [],
  postCreditCardStatus: null,
  card_number: null,
  expiry: null,
  birth: null,
  pwd_2digit: null,
  deleteCardStatus: false,
  regularPaymentStatus: null,
  target: null,
  recurringMonth: ["1개월", "2개월", "3개월", "4개월", "5개월", "6개월"],
  recurringMonthSelect: null,
};

const regularPayment = handleActions(
  {
    [REGULAR_PAYMENT.GET_CREDIT_CARD_INFO_SUCCESS]: (state, action) => {
      console.log('GET_CREDIT_CARD_INFO_SUCCESS', action.payload.data);
      return produce(state, (draft) => {
        if (action.payload) {
          draft.creditCardInfo = action.payload.data;
        }
      });
    },
    [REGULAR_PAYMENT.POST_CREDIT_CARD_SUCCESS]: (state, action) => {
      console.log('POST_CREDIT_CARD_SUCCESS', action.payload);
      return produce(state, (draft) => {
        if (action.payload) {
          console.log(action.payload)
          draft.postCreditCardStatus = action.payload.responseStatus;
        }
      });
    },
    [REGULAR_PAYMENT.POST_REGULAR_PAYMENT_SUCCESS]: (state, action) => {
      console.log('POST_REGULAR_PAYMENT_SUCCESS', action.payload);
      return produce(state, (draft) => {
        draft.regularPaymentStatus = action.payload.responseStatus;
      });
    },
    [REGULAR_PAYMENT.DELETE_CREDIT_CARD_SUCCESS]: (state, action) => {
      console.log('DELETE_CREDIT_CARD_SUCCESS', action.payload.data);
      return produce(state, (draft) => {
        if (action.payload) {
          console.log(action.payload)
          draft.deleteCardStatus = true;
        }
      });
    },
    [REGULAR_PAYMENT.CHANGE_CARD_NUMBER]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_CARD_NUMBER', action.payload);
      return produce(state, (draft) => {
        draft.card_number = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_EXPIRY]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_EXPIRY', action.payload);
      return produce(state, (draft) => {
        draft.expiry = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_BIRTH]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_BIRTH', action.payload);
      return produce(state, (draft) => {
        draft.birth = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_PWD_2DIGIT]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_PWD_2DIGIT', action.payload);
      return produce(state, (draft) => {
        draft.pwd_2digit = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_POST_CREDIT_CARD_STATUS_CLEAR]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_POST_CREDIT_CARD_STATUS_CLEAR', action.payload);
      return produce(state, (draft) => {
        draft.postCreditCardStatus = null;
      });
    },
    [REGULAR_PAYMENT.CHANGE_DELETE_CARD_STATUS]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_DELETE_CARD_STATUS', action.payload);
      return produce(state, (draft) => {
        draft.deleteCardStatus = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_CREDIT_CARD_INFO_CLEAR]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_CREDIT_CARD_INFO_CLEAR', action.payload);
      return produce(state, (draft) => {
        draft.card_number = null;
        draft.expiry= null;
        draft.birth = null;
        draft.pwd_2digit = null;
      });
    },
    [REGULAR_PAYMENT.CHANGE_TARGET]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_TARGET', action.payload);
      return produce(state, (draft) => {
        draft.target = action.payload;
      });
    },
    [REGULAR_PAYMENT.CHANGE_REGULAR_PAYMENT_STATUS_CLEAR]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_REGULAR_PAYMENT_STATUS_CLEAR', action.payload);
      return produce(state, (draft) => {
        draft.regularPaymentStatus = null;
      });
    },
    [REGULAR_PAYMENT.CHANGE_RECURRING_MONTH_SELECT]: (state, action) => {
      console.log('REGULAR_PAYMENT.CHANGE_RECURRING_MONTH_SELECT', action.payload);
      return produce(state, (draft) => {
        draft.recurringMonthSelect = action.payload;
      });
    },
  },
  initialState,
);

export default regularPayment;
