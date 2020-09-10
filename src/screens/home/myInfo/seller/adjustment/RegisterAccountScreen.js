import React, {useEffect} from 'react';
import ModalSelector from 'react-native-modal-selector';
import {Text} from '../../../../../components/styled/Text';
import {
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
import {Actions} from 'react-native-router-flux';
import BasicTextInput from '../../../../../components/input/BasicTextInput';
import {Picker} from 'react-native';
import {banksList} from '../../../../../utils/constants';
import BottomButton from '../../../../../components/buttons/BottomButton';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as adjustmentActions from '../../../../../store/modules/adjustment/actions';
import ToastMessage from '../../../../../components/toast/ToastMessage';
import * as customModalActions from '../../../../../store/modules/modal/customModal/actions';
import LoadingBar from '../../../../../components/loadingBar/LoadingBar';

const RegisterAccountScreen = () => {
  const dispatch = useDispatch();
  const {
    accountName,
    accountBank,
    accountNumber,
    jwtToken,
    userId,
    successMsg,
    updateLoading,
    getLoading,
  } = useSelector(
    (state) => ({
      accountName: state.adjustment.accountName,
      accountBank: state.adjustment.accountBank,
      accountNumber: state.adjustment.accountNumber,
      successMsg: state.adjustment.successMsg,

      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      updateLoading: state.loading['adjustment/UPDATE_ACCOUNT'],
      getLoading: state.loading['adjustment/REQUEST_ACCOUNT'],
    }),
    shallowEqual,
  );

  const onPressClose = () => {
    Actions.pop();
  };

  const onChangeName = (value) => {
    dispatch(adjustmentActions.change_account_name(value));
  };

  const onChangeBankName = (value) => {
    dispatch(adjustmentActions.change_account_bank(value));
  };

  const onChangeAccountNumber = (value) => {
    dispatch(adjustmentActions.change_account_number(value));
  };

  const onPressAdd = () => {
    let data = {
      jwtToken,
      userId,
    };
    let body = {
      name: accountName,
      bank: accountBank,
      bankAccount: accountNumber,
    };
    dispatch(adjustmentActions.update_account({data, body}));
  };

  useEffect(() => {
    let data = {
      jwtToken,
      userId,
    };
    dispatch(adjustmentActions.request_account(data));

    return () => {
      dispatch(adjustmentActions.get_own_live_adjustment(data));
    };
  }, []);

  const onPressOK = () => {
    Actions.pop();
  };

  useEffect(() => {
    if (successMsg === 'updateAccountSuccess') {
      dispatch(
        customModalActions.change_modal_message('계좌등록이 완료되었습니다.'),
      );
      dispatch(customModalActions.change_modal_onpress_ok(onPressOK));
      dispatch(adjustmentActions.change_success_msg_init());
    }
  }, [successMsg]);

  console.log('banklist ====> ', accountBank)

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'정산 관리'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
        isRightButton
      />

      {updateLoading || getLoading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{white: true}} />
        </View>
      ) : (
        <>
          <ScrollView>
            <View marginLeft={20} marginRight={20} marginTop={30}>
              <ViewRow
                alignItems={'center'}
                justifyContent={'space-between'}
                marginBottom={15}>
                <View width={'20%'}>
                  <Text>이름</Text>
                </View>
                <BasicTextInput
                  width={'80%'}
                  height={35}
                  brColor={'#cbced5'}
                  onChangeText={onChangeName}
                  value={accountName}
                />
              </ViewRow>
              <ViewRow
                alignItems={'center'}
                justifyContent={'space-between'}
                marginBottom={15}>
                <Text>은행</Text>
                <ViewBorderRadius width={'80%'} brLightGray borderRadius={15}>
                  <ModalSelector
                    data={banksList.map((item, index) => ({
                      key: index,
                      label: item,
                    }))}
                    cancelText={"취소"}
                    onModalClose={(item) => onChangeBankName(item.label)}
                    selectedKey={banksList.indexOf(accountBank)}
                    initValue={"은행을 선택해 주세요"}
                  />
                </ViewBorderRadius>
              </ViewRow>
              <ViewRow
                alignItems={'center'}
                justifyContent={'space-between'}
                marginBottom={15}>
                <Text>계좌 번호</Text>
                <BasicTextInput
                  width={'80%'}
                  height={35}
                  brColor={'#cbced5'}
                  onChangeText={onChangeAccountNumber}
                  value={accountNumber}
                />
              </ViewRow>
            </View>
          </ScrollView>
          <BottomButton
            textSize={17}
            onPress={onPressAdd}
            text={'계좌 등록 하기'}
          />
        </>
      )}
    </View>
  );
};
export default RegisterAccountScreen;
