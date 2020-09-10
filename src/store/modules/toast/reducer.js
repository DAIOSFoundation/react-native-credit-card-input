import {handleActions} from 'redux-actions';
import * as TOAST from './actions';
import produce from 'immer';

/* 각 라우터에서 어떻게 분기할지 논의 */

const initialState = {
  myInfoToastMsg: null,
};

const toast = handleActions(
  {
    [TOAST.SET_MY_INFO_TOAST_MSG]: (state, action) => {
      console.log('TOAST.SET_MY_INFO_TOAST_MSG', action.payload);
      return produce(state, (draft) => {
        draft.myInfoToastMsg = action.payload;
      });
    },
    [TOAST.RESET_INITIAL_STATE]: () => {
      return initialState;
    },
  },
  initialState,
);

export default toast;
