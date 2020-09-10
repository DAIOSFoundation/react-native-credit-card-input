import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as LiveNotice from './actions';

const initialState = {
  alarmButton: [],
};

const liveNotice = handleActions(
  {
    [LiveNotice.ALARM_BUTTON]: (state, action) => {
      return produce(state, (draft) => {
        draft.alarmButton = action.payload;
      });
    },
  },
  initialState,
);
export default liveNotice;
