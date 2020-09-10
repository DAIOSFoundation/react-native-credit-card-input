import {takeLatest} from 'redux-saga/effects';
import * as GLOBAL from './actions';
import * as usersApi from '../../../lib/api/users';
import createRequestSaga from '../../../lib/createRequestSaga';

const changeFirebaseToken = createRequestSaga(
  GLOBAL.CHANGE_FIREBASE_TOKEN,
  usersApi.changeFirebaseToken,
);

const deleteFirebaseToken = createRequestSaga(
  GLOBAL.DELETE_FIREBASE_TOKEN,
  usersApi.deleteFirebaseToken,
);

export default function* rootSaga() {
  yield [
    yield takeLatest(GLOBAL.CHANGE_FIREBASE_TOKEN, changeFirebaseToken),
    yield takeLatest(GLOBAL.DELETE_FIREBASE_TOKEN, deleteFirebaseToken),
  ];
}
