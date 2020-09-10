import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as MYINFO from './actions';

const initialState = {
  menu: 'live4step', // live4step or calendar
};

const live4Step = handleActions(
  {
    [MYINFO.CHANGE_MENU]: (state, action) => {
      return produce(state, (draft) => {
        draft.menu = action.payload;
      });
    },
  },
  initialState,
);

export default live4Step;
