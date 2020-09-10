import {handleActions} from 'redux-actions';
import produce, {createDraft, finishDraft} from 'immer';
import * as CALENDAR from './actions';
import * as BROADCAST from '../broadcast/actions';

const initialState = {
  date: null,
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  numOfBroadcast: 0,
  calendarChangeDate: null,
  sellerDate: null,
  sellerMonth: new Date().getMonth() + 1,
  sellerDay: new Date().getDate(),
};

const calendar = handleActions(
  {
    [CALENDAR.CHANGE_DATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.date = action.payload.date.dateString;
        draft.month = action.payload.date.month;
        draft.day = action.payload.date.day;
      });
    },
    [CALENDAR.CHANGE_CALENDAR_DATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.calendarChangeDate = action.payload.date.dateString;
      });
    },
    [CALENDAR.CHANGE_INIT_STATE]: (state, action) => {
      // Redux 초기화
      const draft = createDraft(initialState);
      return finishDraft(draft);
    },
    [CALENDAR.CHANGE_SELLER_PAGE_DATE]: (state, action) => {
      return produce(state, (draft) => {
        draft.sellerDate = action.payload.date.dateString;
        draft.sellerMonth = action.payload.date.month;
        draft.sellerDay = action.payload.date.day;
      });
    },
  },
  initialState,
);

export default calendar;
