import {handleActions} from 'redux-actions';
import produce from 'immer';

const initialState = {};

const management = handleActions({}, initialState);

export default management;
