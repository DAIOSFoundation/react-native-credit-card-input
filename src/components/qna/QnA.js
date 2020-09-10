import React, {useState} from 'react';
// Styled Component
import {View, ViewBorderRadius, ViewRow} from '../styled/View';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

// 상품상세정보 - Q & A 질문과 답변
// id : index 값
// questionContent : 질문내용
// questionNickName : 질문자
// questionDate : 질문시간
// questionState : 질문상태 (0 = 미답, 1 = 답변완료)
// answerContent : 답변내용
// answerDate : 답변시간
// secret : 비밀글
// onPressToggle : 답변 접기 펼치기 토글함수

const QnA = (props) => {
  const [toggle, setToggle] = useState(false);

  const onPressToggle = () => {
    setToggle(!toggle);
  };

  return (
    <View>
      <View
        paddingTop={15}
        paddingBottom={15}
        paddingLeft={15}
        paddingRight={15}>
        <Text>
          {props.secret === false ? props.questionContent : '비밀글 입니다.'}
        </Text>
        <ViewRow marginTop={10} justifyContent={'space-between'}>
          <ViewRow alignItems={'center'}>
            <Text ftGray>{props.questionNickName}</Text>
            <View width={1} height={11} bgGray marginRight={7} marginLeft={7} />
            <Text ftGray>{props.questionDate}</Text>
            <View width={1} height={11} bgGray marginRight={7} marginLeft={7} />
            <Text ftGray>
              {props.questionState === 0 ? '미답' : '답변완료'}
            </Text>
          </ViewRow>
          {props.questionState === 1 && props.secret === false ? (
            <View>
              <Button width={'auto'} height={'auto'} onPress={onPressToggle}>
                <Text ftTheme textDecorationLine={'underline'}>
                  {toggle ? '접기' : '펼치기'}
                </Text>
              </Button>
            </View>
          ) : null}
        </ViewRow>
      </View>
      {props.questionState === 1 &&
      props.secret === false &&
      toggle === true ? (
        <View
          bgDarkWhite
          paddingTop={15}
          paddingBottom={15}
          paddingLeft={15}
          paddingRight={15}>
          <ViewRow alignItems={'center'}>
            <ViewBorderRadius
              bgNavy
              marginRight={5}
              paddingLeft={5}
              paddingRight={5}
              paddingTop={3}
              paddingBottom={3}>
              <Text ftWhite fontSize={11}>
                판매자 답변
              </Text>
            </ViewBorderRadius>
            <Text ftGray>{props.answerDate}</Text>
          </ViewRow>
          <Text marginTop={5} ftDarkNavy>
            {props.answerContent}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default QnA;
