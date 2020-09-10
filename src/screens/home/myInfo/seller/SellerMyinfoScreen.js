import React, {useState} from 'react';
// Styled Component
import {ScrollView, View} from '../../../../components/styled/View';
import BackgroundOpacityModal from '../../../../components/modal/BackgroundOpacityModal';
import ToastMessage from '../../../../components/toast/ToastMessage';
// NPM Module
import {Clipboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
// Screen Import
import SellerMyinfoTop from './SellerMyinfoTop';
import SellerMyinfoBody from './SellerMyinfoBody';
// Redux
import * as live4StepActions from '../../../../store/modules/myinfo/live4Step/actions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
import * as globalActions from '../../../../store/modules/global/actions';
import AdjustmentScreen from './adjustment/AdjustmentScreen';

const SellerMyinfoScreen = () => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [modalInnerButton, setModalInnerButton] = useState([]);
  const [broadcastId, setBroadcastId] = useState('');
  const [productId, setProductId] = useState('');

  const {jwtToken} = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
    }),
    shallowEqual,
  );

  const bottomClosed = (state) => {
    setIsVisible(state);
  };

  const bottomOpen = (title, item) => {
    setModalInnerButton(title);
    setBroadcastId(item._id);
    setProductId(item.productId);
    setIsVisible(true);
  };

  const onPressModalBtn = (step, title) => {
    bottomClosed();
    if (step === 1) {
      deleteBroadcast();
    } else if (step === 2) {
      if (title === '방송 시나리오 및 일정 수정') {
        Actions.live4StepScenarioScreen(step);
        dispatch(live4StepActions.change_selected_broadcast_id(broadcastId));
      } else if (title === '방송 삭제') {
        deleteBroadcast();
      }
    } else {
      copyToClipboard();
    }
  };

  // todo - 구매 url 통신 후 추가 해야함
  const copyToClipboard = () => {
    Clipboard.setString(
      `https://dev-api.sellervision.net/v1/broadcasts/${broadcastId}/products/${productId}/link`,
    );
    dispatch(globalActions.change_toast_message('구매 url이 복사되었습니다'));
  };

  const deleteBroadcast = () => {
    const params = {
      jwtToken,
      broadcastId,
    };
    dispatch(broadcastActions.delete_step_one_two_broadcast(params));
  };

  const onPressAdjustmentButton = () => {
    // dispatch(globalActions.change_toast_message('준비중 입니다.'));
    Actions.adjustmentScreen();
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <SellerMyinfoTop />
        <SellerMyinfoBody
          bottomOpen={(title, item) => bottomOpen(title, item)}
          onPressAdjustmentButton={onPressAdjustmentButton}
        />
      </ScrollView>
      <BackgroundOpacityModal
        isVisible={isVisible}
        bottomClosed={bottomClosed}
        modalInnerButton={modalInnerButton}
        onPressModalBtn={(step, title) => onPressModalBtn(step, title)}
      />
      <ToastMessage />
    </View>
  );
};

export default SellerMyinfoScreen;
