import {takeLatest} from 'redux-saga/effects';
import * as PRODUCT from './actions';
import * as productAPI from '../../../lib/api/productDetail';
import createRequestSaga from '../../../lib/createRequestSaga';

const requestProductDetail = createRequestSaga(
  PRODUCT.REQUEST_PRODUCT_DETAIL,
  productAPI.getProductDetail,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(PRODUCT.REQUEST_PRODUCT_DETAIL, requestProductDetail),
  ];
}
