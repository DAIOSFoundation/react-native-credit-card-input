import React from 'react';
import {Button} from '../styled/Button';
import {ViewRow, ViewBorder} from '../styled/View';
import {Image} from '../styled/Image';
import {Text} from '../styled/Text';
import {isEmpty} from '../../utils/functions';

// 커스텀 탑바
// isLeftButton : 좌측 버튼 활성화
// leftButtonImage : 좌측 버튼 이미지
// onPressLeft : 좌측 버튼 리턴 함수
// isRightButton : 우측 버튼 활성화
// rightButtonImage : 우측 버튼 이미지
// onPressRight : 우측 버튼 리턴 함수
// title : 타이틀
// titleColor : 타이틀색
// isLine : 라인
// lineColor : 라인색
// backGroundColor : 배경색
const Topbar = (props) => {
  const lineColor = props.lineColor || {brIceBlue: true};
  const titleColor = props.titleColor || {ftDarkNavy: true};
  const bgColor = props.bgColor || 'transparent';
  const onPressRight = () => {
    if (!isEmpty(props.onPressRight)) props.onPressRight();
  };

  const onPressLeft = () => {
    if (!isEmpty(props.onPressLeft)) props.onPressLeft();
  };
  return (
    <>
      <ViewRow
        width={'100%'}
        {...bgColor}
        paddingTop={15}
        paddingBottom={15}
        paddingLeft={20}
        paddingRight={20}
        justifyContent="space-between">
        <Button
          width={26}
          height={26}
          disabled={!props.isLeftButton}
          onPress={onPressLeft}
          alignSelf={'center'}>
          {props.isLeftButton ? (
            <Image
              source={
                isEmpty(props.leftButtonImage)
                  ? props.leftButtonColor === 'white'
                    ? require('../../assets/common/icon_back_white.png')
                    : require('../../assets/common/icon_back_black.png')
                  : props.leftButtonImage
              }
            />
          ) : null}
        </Button>
        <Text fontSize={17} {...titleColor}>
          {props.title}
        </Text>
        <Button
          width={19}
          height={19}
          disabled={!props.isRightButton}
          onPress={onPressRight}>
          {props.isRightButton ? (
            <Image
              source={
                isEmpty(props.rightButtonImage)
                  ? require('../../assets/common/icon_cancel_white.png')
                  : props.rightButtonImage
              }
            />
          ) : null}
        </Button>
      </ViewRow>
      {props.isLine ? (
        <ViewBorder width={'100%'} borderTopWidth={1} {...lineColor} />
      ) : null}
    </>
  );
};

export default Topbar;
