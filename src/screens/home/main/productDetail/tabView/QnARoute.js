import React from 'react';
// Styled Component
import {View, ViewRow} from '../../../../../components/styled/View';
import {Text} from '../../../../../components/styled/Text';
import {ButtonRadius} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
import QnA from '../../../../../components/qna/QnA';
// assets Img
const kakaoIcon = require('../../../../../assets/symbol/icon_kakao_simbol.png');
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as qnaAction from '../../../../../store/modules/productDetail/tabView/qna/actions';
// NPM Module
import {Actions} from 'react-native-router-flux';

// Q & A 탭뷰
const QnARoute = () => {
  // redux
  const dispatch = useDispatch();

  // 상품 QnA 작성 페이지 이동
  const qnaWriteAction = () => {
    Actions.qnaWriteScreen();
  };

  return (
    <View>
      <View paddingTop={20}>
        <Text fontSize={13} ftDarkNavy textAlign={'center'} marginBottom={15}>
          상품에 대한 문의를 판매자가 확인 후 답변을 드립니다.
        </Text>
        <ViewRow
          justifyContent={'space-between'}
          paddingLeft={30}
          paddingRight={30}>
          <ButtonRadius bgTheme width={'47%'} onPress={qnaWriteAction}>
            <Text ftWhite bold>
              Q&A에 문의
            </Text>
          </ButtonRadius>
          <ButtonRadius bgYellow width={'47%'}>
            <Image width={18} height={16} source={kakaoIcon} marginRight={6} />
            <Text ftBrown bold>
              1:1 챗봇 문의
            </Text>
          </ButtonRadius>
        </ViewRow>
        <View paddingLeft={15} paddingRight={15}>
          <View bgDarkWhite height={2} marginTop={15} />
        </View>
      </View>

      <QnA
        questionContent={'2/4일 주문신청했는데 언제쯤 배송하나요???'}
        questionNickName={'방울사과'}
        questionDate={'2020.02.07 12:11'}
        questionState={1}
        secret={false}
        answerContent={
          '안녕하세요 고객님. 우선 배송 오류로 인해 불편을 드려 죄송합니다. 발송이 되지 않은 치즈 돈까스는 추가로 고객님께 발송하도록 하겠습니다. 감사합니다.'
        }
        answerDate={'2020.02.08 09:35'}
      />

      <QnA
        questionContent={'2/4일 주문신청했는데 언제쯤 배송하나요???'}
        questionNickName={'방울사과'}
        questionDate={'2020.02.07 12:11'}
        questionState={1}
        secret={true}
        answerContent={
          '안녕하세요 고객님. 우선 배송 오류로 인해 불편을 드려 죄송합니다. 발송이 되지 않은 치즈 돈까스는 추가로 고객님께 발송하도록 하겠습니다. 감사합니다.'
        }
        answerDate={'2020.02.08 09:35'}
      />

      <QnA
        questionContent={'2/4일 주문신청했는데 언제쯤 배송하나요???'}
        questionNickName={'방울사과'}
        questionDate={'2020.02.07 12:11'}
        questionState={0}
        secret={false}
        answerContent={
          '안녕하세요 고객님. 우선 배송 오류로 인해 불편을 드려 죄송합니다. 발송이 되지 않은 치즈 돈까스는 추가로 고객님께 발송하도록 하겠습니다. 감사합니다.'
        }
        answerDate={'2020.02.08 09:35'}
      />
    </View>
  );
};

export default QnARoute;
