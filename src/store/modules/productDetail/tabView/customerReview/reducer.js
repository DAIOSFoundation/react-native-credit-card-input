import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as CUSTOMERREVIEW from './actions';

const initialState = {
  toggleReviewOrder: false, // 리뷰 순서 바텀 모달 펼치기 접기 토글
};

const customerReview = handleActions(
  {
    [CUSTOMERREVIEW.TOGGLE_REVIEW_ORDER]: (state, action) => {
      console.log('TOGGLE_REVIEW_ORDER : ', action.payload);
      return produce(state, (draft) => {
        draft.toggleReviewOrder = !draft.toggleReviewOrder;
      });
    },
  },
  initialState,
);

export default customerReview;
