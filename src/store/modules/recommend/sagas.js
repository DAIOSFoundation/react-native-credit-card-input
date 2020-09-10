import {put, takeLatest, call} from 'redux-saga/effects';
import * as RECOMMEND from './actions';
import * as recommendAPI from '../../../lib/api/recommend';
import createRequestSaga from '../../../lib/createRequestSaga';

const requestRecommendProducts = createRequestSaga(
  RECOMMEND.REQUEST_RECOMMEND_PRODUCT,
  recommendAPI.recommendProducts,
);

const requestRecommendProductsDetail = createRequestSaga(
  RECOMMEND.REQUEST_RECOMMEND_PRODUCT_DETAIL,
  recommendAPI.recommendProductsDetail,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(
      RECOMMEND.REQUEST_RECOMMEND_PRODUCT,
      requestRecommendProducts,
    ),
    yield takeLatest(
      RECOMMEND.REQUEST_RECOMMEND_PRODUCT_DETAIL,
      requestRecommendProductsDetail,
    ),
  ];
}
