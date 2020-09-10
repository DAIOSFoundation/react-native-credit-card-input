import React, {useState} from 'react';
import {ButtonHighlightBorderRadius} from '../styled/Button';
import {Text} from '../styled/Text';
import {isEmpty} from '../../utils/functions';

// onPress 스타일 버튼
// showButtonProps : 버튼 기본 스타일
// hideButtonProps : 버튼 프레스시 스타일
// showBody : 버튼 기본 내용 스타일
// hideBody : 버튼 프레스시 내용 스타일

{
  /* <OnPressStyleButton
showButtonProps={{brWhite:true}}
hideButtonProps={{brGray:true}}
showBody={<Text ftWhite>테스트</Text>}
hideBody={<Text>테스트</Text>}
onPress={()=> console.log("테스트")}
> */
}

const OnPressStyleButton = (props) => {
  const [isPress, setIsPress] = useState(false);

  const propsData = isPress ? props.hideButtonProps : props.showButtonProps;
  const bodyData = isPress ? props.hideBody : props.showBody;

  return (
    <ButtonHighlightBorderRadius
      activeOpacity={1}
      underlayColor={'transparent'}
      {...propsData}
      onPress={() => {
        props.onPress();
      }}
      onHideUnderlay={() => {
        setIsPress(false);
      }}
      onShowUnderlay={() => {
        setIsPress(true);
      }}>
      {bodyData}
    </ButtonHighlightBorderRadius>
  );
};

export default OnPressStyleButton;
