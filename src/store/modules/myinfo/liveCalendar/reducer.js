import {handleActions} from 'redux-actions';
import produce from 'immer';

const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDay(),
  date: new Date().getDate(),
};

const liveCalendar = handleActions({}, initialState);

export default liveCalendar;
