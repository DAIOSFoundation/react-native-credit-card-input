import {handleActions} from 'redux-actions';
import * as COUPON from './actions';
import produce from 'immer';

const initialState = {
  coupons: [],
};

const coupon = handleActions(
  {
    [COUPON.REQUEST_GET_COUPON_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload) {
          draft.coupons = action.payload.data;
        }
      });
    },
    [COUPON.REQUEST_GET_COUPON_FAILED]: (state, action) => {
      return produce(state, (draft) => {});
    },
  },
  initialState,
);

export default coupon;
