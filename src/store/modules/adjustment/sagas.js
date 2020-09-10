import {takeLatest} from 'redux-saga/effects';
import * as ADJUSTMENT from './actions';
import * as usersApi from '../../../lib/api/users';
import createRequestSaga from '../../../lib/createRequestSaga';

const requestAccountSaga = createRequestSaga(
  ADJUSTMENT.REQUEST_ACCOUNT,
  usersApi.getBankInfo,
);

const updateAccountSaga = createRequestSaga(
  ADJUSTMENT.UPDATE_ACCOUNT,
  usersApi.updateBankInfo,
);

const getOwnLiveAdjustment = createRequestSaga(
  ADJUSTMENT.GET_OWN_LIVE_ADJUSTMENT,
  usersApi.getOwnLiveAdjustment,
);

const getOwnDayAdjustment = createRequestSaga(
  ADJUSTMENT.GET_OWN_DAY_ADJUSTMENT,
  usersApi.getOwnDayAdjustment,
);

const getOwnMonthAdjustment = createRequestSaga(
  ADJUSTMENT.GET_OWN_MONTH_ADJUSTMENT,
  usersApi.getOwnMonthAdjustment,
);

const getSpecificDateAdjustmentSaga = createRequestSaga(
  ADJUSTMENT.GET_SPECIFIC_DATE_ADJUSTMENT,
  usersApi.getSpecificDateAdjustment,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(ADJUSTMENT.REQUEST_ACCOUNT, requestAccountSaga),
    yield takeLatest(ADJUSTMENT.UPDATE_ACCOUNT, updateAccountSaga),
    yield takeLatest(ADJUSTMENT.GET_OWN_LIVE_ADJUSTMENT, getOwnLiveAdjustment),
    yield takeLatest(ADJUSTMENT.GET_OWN_DAY_ADJUSTMENT, getOwnDayAdjustment),
    yield takeLatest(
      ADJUSTMENT.GET_OWN_MONTH_ADJUSTMENT,
      getOwnMonthAdjustment,
    ),
    yield takeLatest(
      ADJUSTMENT.GET_SPECIFIC_DATE_ADJUSTMENT,
      getSpecificDateAdjustmentSaga,
    ),
  ];
}