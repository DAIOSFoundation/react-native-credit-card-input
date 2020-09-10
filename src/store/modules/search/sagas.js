import {takeLatest} from 'redux-saga/effects';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as SEARCH from './actions';
import * as searchAPI from '../../../lib/api/search';

const requestSearchSellerInfo = createRequestSaga(
  SEARCH.REQUEST_SEARCH_SELLER_INFO,
  searchAPI.getSearchSellerInfo,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(
      SEARCH.REQUEST_SEARCH_SELLER_INFO,
      requestSearchSellerInfo,
    ),
  ];
}
