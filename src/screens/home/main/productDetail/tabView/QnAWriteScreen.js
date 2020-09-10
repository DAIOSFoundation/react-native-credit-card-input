import React from 'react';
import {Keyboard} from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
// Styled Component
import {
  View,
  ViewAbsolute,
  ViewRow,
} from '../../../../../components/styled/View';
import Topbar from '../../../../../components/bar/Topbar';
import BasicCheckBox from '../../../../../components/checkboxes/BasicCheckBox';
import {Text} from '../../../../../components/styled/Text';
import {Button} from '../../../../../components/styled/Button';
// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import * as qnaWriteAction from '../../../../../store/modules/productDetail/tabView/qnaWrite/actions';

const QnAWriteScreen = () => {
  const dispatch = useDispatch();
  const {agreeInquiry, agreeAnswerAlarm} = useSelector(
    (state) => ({
      agreeInquiry: state.qnaWrite.agreeInquiry,
      agreeAnswerAlarm: state.qnaWrite.agreeAnswerAlarm,
    }),
    shallowEqual,
  );

  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  const onPressAgreeInquiry = (check) => {
    dispatch(qnaWriteAction.change_agree_inquiry(check[0]));
  };
  const onPressAgreeAnswerAlarm = (check) => {
    dispatch(qnaWriteAction.change_agree_answer_alarm(check[0]));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View height={'100%'}>
        <Topbar
          isLine
          title={'상품 Q&A 작성'}
          isLeftButton
          onPressLeft={onPressBack}
        />
        <View marginTop={30}>
          <TextInput
            multiline={true}
            placeholderTextColor={'#8f9499'}
            placeholder={'문의하실 내용을 입력해주세요.'}
            style={{
              width: '90%',
              height: 200,
              borderColor: '#cbced5',
              borderWidth: 1,
              borderRadius: 10,
              alignSelf: 'center',
              textAlignVertical: 'top',
              paddingLeft: 15,
              paddingTop: 15,
            }}
          />
        </View>
        <ViewRow
          marginTop={20}
          marginBottom={20}
          paddingLeft={15}
          paddingRight={15}>
          <View width={'50%'}>
            <BasicCheckBox
              text={'비공개로 문의'}
              textStyle={{
                bold: true,
                ftDarkNavy: true,
                fontSize: 14,
              }}
              onPress={onPressAgreeInquiry}
              checked={agreeInquiry}
            />
          </View>
          <View width={'50%'}>
            <BasicCheckBox
              text={'답변완료 시 알림 받기'}
              textStyle={{
                bold: true,
                ftDarkNavy: true,
                fontSize: 14,
              }}
              onPress={onPressAgreeAnswerAlarm}
              checked={agreeAnswerAlarm}
            />
          </View>
        </ViewRow>
        <View
          paddingLeft={15}
          paddingRight={15}
          paddingTop={20}
          bgDarkWhite
          height={'100%'}
          width={'100%'}>
          <Text bold ftDarkNavy fontSize={17}>
            상품 Q&A 작성 유의사항
          </Text>
          <Text ftDarkNavy marginTop={15} style={{lineHeight: 20}}>
            상품 및 상품 구매 과정과 관련 없는 비방/욕설/명예훼손성 게시글 및
            상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및
            게시글이 삭제 조치 될 수 있습니다.
          </Text>
          <Text ftDarkNavy marginTop={15} style={{lineHeight: 20}}>
            개인정보가 포함된 글 작성시 비공개로 문의를 선택하여 문의해 주시기
            바랍니다.
          </Text>
        </View>
        <ViewAbsolute
          bottom={0}
          bgTheme
          width={'100%'}
          paddingTop={10}
          paddingBottom={10}>
          <Button>
            <Text ftWhite fontSize={16}>
              문의 등록
            </Text>
          </Button>
        </ViewAbsolute>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default QnAWriteScreen;
