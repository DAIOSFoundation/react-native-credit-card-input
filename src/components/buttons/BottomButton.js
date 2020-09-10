import React from 'react';
// Styled Component
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';
import {isEmpty} from '../../utils/functions';

// *** 하단 바텀 버튼 ***
// textSize : 텍스트 크기
// colorProperty : 바텀 버튼 색상 - 기본값 : bgTheme

const BottomButton = (props) => {
  const colorProperty = props.bgColor || {bgTheme: true};
  const textSize = props.textSize || 14;

  const onPressButton = () => {
    if (!isEmpty(props.onPress)) props.onPress();
  };

  return (
    <Button
      {...colorProperty}
      width={props.width || '100%'}
      height={props.height || 56}
      onPress={onPressButton}>
      <Text ftWhite fontSize={textSize}>
        {props.text}
      </Text>
    </Button>
  );
};

export default BottomButton;
