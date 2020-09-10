import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as QNA from './actions';

const initialState = {};

const qna = handleActions({}, initialState);

export default qna;
