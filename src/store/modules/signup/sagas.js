import {takeLatest} from 'redux-saga/effects';
import * as SIGNUP from './actions';
import * as signupAPI from '../../../lib/api/signup';
import createRequestSaga from '../../../lib/createRequestSaga';

const requestLoginOauthSaga = createRequestSaga(
  SIGNUP.REQUEST_CHECK_NICK,
  signupAPI.checkNick,
);

const requestIGUserNameSaga = createRequestSaga(
  SIGNUP.REQUEST_IG_USER_NAME,
  signupAPI.igUserName,
);

const requestPhoneAuthOne = createRequestSaga(
  SIGNUP.CHANGE_PHONE_AUTH_ONE,
  signupAPI.phoneAuthOne,
);

const requestPhoneAuthTwo = createRequestSaga(
  SIGNUP.CHANGE_PHONE_AUTH_TWO,
  signupAPI.phoneAuthTwo,
);
export default function* rootSaga() {
  yield [
    yield takeLatest(SIGNUP.REQUEST_CHECK_NICK, requestLoginOauthSaga),
    yield takeLatest(SIGNUP.REQUEST_IG_USER_NAME, requestIGUserNameSaga),
    yield takeLatest(SIGNUP.CHANGE_PHONE_AUTH_ONE, requestPhoneAuthOne),
    yield takeLatest(SIGNUP.CHANGE_PHONE_AUTH_TWO, requestPhoneAuthTwo),
  ];
}
