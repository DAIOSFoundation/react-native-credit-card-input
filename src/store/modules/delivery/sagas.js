import {takeLatest} from 'redux-saga/effects';
import * as DELIVERY from './actions';
import createRequestSaga from '../../../lib/createRequestSaga';
import * as deliveryAPI from '../../../lib/api/delivery';

const requestAddDeliverySaga = createRequestSaga(
  DELIVERY.REQUEST_ADD_DELIVERY,
  deliveryAPI.requestAddDelivery,
);

const requestGetUserAddressesSaga = createRequestSaga(
  DELIVERY.REQUEST_GET_USER_ADDRESSES,
  deliveryAPI.requestGetUserAddresses,
);

const getIsLandCheckNewInputSaga = createRequestSaga(
  DELIVERY.GET_ISLAND_CHECK_NEW_INPUT,
  deliveryAPI.getIsLandCheck,
);

const getIsLandCheckBasicSaga = createRequestSaga(
  DELIVERY.GET_ISLAND_CHECK_BASIC,
  deliveryAPI.getIsLandCheck,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(DELIVERY.REQUEST_ADD_DELIVERY, requestAddDeliverySaga),
    yield takeLatest(
      DELIVERY.REQUEST_GET_USER_ADDRESSES,
      requestGetUserAddressesSaga,
    ),
    yield takeLatest(
      DELIVERY.GET_ISLAND_CHECK_NEW_INPUT,
      getIsLandCheckNewInputSaga,
    ),
    yield takeLatest(DELIVERY.GET_ISLAND_CHECK_BASIC, getIsLandCheckBasicSaga),
  ];
}
