import React, {useEffect, useState, useCallback} from 'react';
// Styled Component
import {
  SafeAreaView,
  ScrollView,
  View,
} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {Text} from '../../../../components/styled/Text';
import BottomButton from '../../../../components/buttons/BottomButton';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import CustomModal from '../../../../components/modal/CustomModal';
import * as regularPaymentActions from '../../../../store/modules/regularPayment/actions';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';

// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

// card slider
import {CreditCardInput} from '../../../CreditCard'

// 구매할 제품 리스트 확인 후 구매
const AddCardScreen = () => {
  // redux
  const dispatch = useDispatch();

  const {
    userId,
    jwtToken,
    loading,
    card_number,
    expiry,
    birth,
    pwd_2digit,
    postCreditCardStatus,
    isVisible,
    isOneButton,
    message,
    onPressOK,
    size,
  } = useSelector(
    (state) => ({
      userId: state.user.userId,
      jwtToken: state.user.jwtToken,
      loading: state.loading['pay/GET_USER_ADDRESS'],
      loading: state.loading['regularPaymnet/POST_CREDIT_CARD'],
      card_number: state.regularPayment.card_number,
      expiry: state.regularPayment.expiry,
      birth: state.regularPayment.birth,
      pwd_2digit: state.regularPayment.pwd_2digit,
      postCreditCardStatus: state.regularPayment.postCreditCardStatus,
      isVisible: state.customModal.isVisible,
      isOneButton: state.customModal.isOneButton,
      message: state.customModal.message,
      onPressOK: state.customModal.onPressOK,
      size: state.customModal.size,
    }),
    shallowEqual,
  );

  const [cardInfoStatus, setCardInfoStatus] = useState(['invalid'])

  const onPressFail = () => {
    dispatch(customModalActions.change_modal_clear());
  }

  // 카드 등록 요청 실패
  const onPressPostFail = () => {
    dispatch(customModalActions.change_modal_clear());
    dispatch(regularPaymentActions.change_credit_card_info_clear());
    dispatch(regularPaymentActions.change_post_credit_card_status_clear());
    setCardInfoStatus(['invalid'])
  }

  // 카드 등룍 버튼 클릭, 등록 요청
  const onPress = () => {
    if (cardInfoStatus.includes('incomplete') || cardInfoStatus.includes('invalid')) {
      dispatch(customModalActions.change_modal_message('카드 정보를 확인해 주세요'));
      dispatch(customModalActions.change_modal_visible(true));
      dispatch(customModalActions.change_modal_onpress_ok(onPressFail));
    } else {
      // 카드번호, 만료일 포맷 변환
      const expirySplit = expiry.split('/');
      const expiryForm = `20${expirySplit[1]}-${expirySplit[0]}`;
      const cardNumberForm = card_number.replace(/ /g, '-');
      dispatch(regularPaymentActions.change_card_number(card_number.replace(/ /g, '-')));
      dispatch(regularPaymentActions.change_expiry(expiryForm));

      // 카드 등록 요청
      const params = {
        jwtToken, 
        card_number: cardNumberForm, 
        pwd_2digit, 
        expiry: expiryForm, 
        birth,
      };
      dispatch(regularPaymentActions.post_credit_card({params}));
    }
  }

  // 카드 입력 정보 상태 변환
  const onChange = ({values, status}) => {
    setCardInfoStatus(Object.values(status))
    
    dispatch(regularPaymentActions.change_card_number(values.number))
    dispatch(regularPaymentActions.change_expiry(values.expiry))
    dispatch(regularPaymentActions.change_birth(values.birth))
    dispatch(regularPaymentActions.change_pwd_2digit(values.password))
  }

  useEffect(() => {
    if (postCreditCardStatus === 200) {
      Actions.pop();
    } else if (postCreditCardStatus !== null) {
      dispatch(customModalActions.change_modal_message('카드 정보를 확인해 주세요'));
      dispatch(customModalActions.change_modal_onpress_ok(onPressPostFail));
    }
  },[postCreditCardStatus])

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        <Topbar
          isLine
          title={'카드 등록'}
          onPressLeft={() => Actions.pop()}
          isLeftButton={true}
        />
        <ScrollView marginTop={15} paddingLeft={40} paddingRight={40}>
          {/* 안내 텍스트 */}
          <View marginBottom={35} width={'84%'}>
            <Text bold ftLarge>결제 카드를 신규 등록합니다.</Text>
            <Text>카드 정보를 정확하게 입력해 주세요.</Text>
            <Text>카드 정보는 안전하게 암호화되어 저장됩니다.</Text>
          </View>
          {/* 신용카드 정보 입력 */}
          <View alignItems={'center'}>
            <CreditCardInput 
              requiresName={true}
              requiresCVC={false}
              inputStyle={{
                borderWidth: 1, 
                borderRadius: 5, 
                borderColor: 'lightgray', 
                marginTop: 10, 
                paddingLeft: 20
              }}
              inputContainerStyle={{marginTop: 20}}
              onChange={(formValue) => onChange(formValue)}
            />
          </View>
        </ScrollView>
        <BottomButton textSize={16} onPress={onPress} text={'카드 등록'} />
      </SafeAreaView>
      <CustomModal
        isVisible={isVisible}
        isOneButton={isOneButton}
        message={message}
        onPressOK={onPressOK}
        size={size}
        currentScene={'addCardScreen'}
      />
    </>
  );
};

export default AddCardScreen;
