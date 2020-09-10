import {handleActions} from 'redux-actions';
import produce from 'immer';
import * as SELLERREVIEW from './actions';

const initialState = {};

const sellerReview = handleActions({}, initialState);

export default sellerReview;
