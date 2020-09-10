import ViewerBroadcastSagas from './viewerBroadcast/sagas';
import UserSagas from './user/sagas';
import SignupSagas from './signup/sagas';
import BroadcastSagas from './broadcast/sagas';
import PaymentSagas from './payment/sagas';
import RecommendSagas from './recommend/sagas';
import Live4StepSagas from './myinfo/live4Step/sagas';
import OrderSagas from './order/sagas';
import GlobalSagas from './global/sagas';
import CouponSagas from './coupon/sagas';
import AdjustmentSagas from './adjustment/sagas';
import DpleSagas from './dple/sagas';
// import CalendarSagas from './calendar/sagas';
import SearchSagas from './search/sagas';
import DeliverySagas from './delivery/sagas';
import ProductDetailSagas from './productDetail/sagas';
import OrderHistorySagas from './orderHistory/sagas';
import RegularPaymentSagas from './regularPayment/sagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ViewerBroadcastSagas(),
    UserSagas(),
    SignupSagas(),
    BroadcastSagas(),
    PaymentSagas(),
    RecommendSagas(),
    Live4StepSagas(),
    OrderSagas(),
    ProductDetailSagas(),
    GlobalSagas(),
    DeliverySagas(),
    CouponSagas(),
    OrderHistorySagas(),
    // CalendarSagas(),
    SearchSagas(),
    AdjustmentSagas(),
    DpleSagas(),
    RegularPaymentSagas(),
  ]);
}
