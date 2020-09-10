import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
// Styled Component
import {
  ButtonBorderRadius,
  Button,
} from '../../../../../../components/styled/Button';
import {
  Image,
  ImageAbsolute,
  ItemPreview,
} from '../../../../../../components/styled/Image';
import {
  View,
  ViewRow,
  ViewBorderRadius,
  ViewSelf,
  ViewBorderRow,
} from '../../../../../../components/styled/View';
import {Text} from '../../../../../../components/styled/Text';
import {screenWidth} from '../../../../../../components/styled/ScreenSize';
// Screen Import
import Live4StepExplanation from './Live4StepExplanation';

const Preview = (props) => {
  const [isVisibleContent, setIsVisibleContent] = useState(false);
  const comment = require('../../../../../../assets/myinfo/icon_comment_more.png');

  //라방 가이드 보기 숨기기 이미지
  const convertImage = () => {
    if (!isVisibleContent) {
      return require('../../../../../../assets/myinfo/icon_detail_arrow_pink.png');
    } else {
      return require('../../../../../../assets/myinfo/icon_hide_arrow_pink.png');
    }
  };

  const onPressContent = () => {
    setIsVisibleContent(!isVisibleContent);
  };

  //스탭별 설명 내용
  const mimiTextBubble = () => {
    switch (props.step) {
      case 0:
        return '샘플을 받으셨다면 수령 확인을 눌러주세요.';
      case 1:
        return '방송 시나리오를 작성해주세요.';
      case 2:
        return '방송 일정을 등록해주세요.';
      case 3:
        return '방송 계약서에 서명해주세요.';
      case 4:
        return '모든 준비 완료! 라이브 방송을 시작하세요.';
      case 5:
        return '라이브 방송 중입니다.';
      case 6:
        return '라이브 방송이 종료되었습니다.';
      case 7:
        return '라이브 방송이 인코딩 중입니다.';
      default:
        return '종료된 방송';
    }
  };

  const bottomOpen = () => {
    if (props.step === 1) {
      props.bottomOpen({data: {title: ['방송 삭제'], step: 1}});
    } else if (
      props.step === 2 &&
      props.requestContractEmail === false &&
      !props.changeConfirmText
    ) {
      props.bottomOpen({
        data: {title: ['방송 시나리오 및 일정 수정', '방송 삭제'], step: 2},
      });
    } else if (props.step === 3 || props.step === 4) {
      props.bottomOpen({data: {title: ['구매 URL 복사'], step: 3}});
    }
  };

  const broadcastId = props.broadcastId;
  const renderHeader = () => {
    return (
      <ViewRow paddingLeft={20} paddingRight={20} width={screenWidth}>
        {props.src ? (
          <ItemPreview
            size={74}
            marginRight={10}
            source={{
              uri: props.src,
            }}
          />
        ) : (
          <ViewSelf justifyContent={'center'} alignItems={'center'}>
            <ViewBorderRadius width={74} height={74} bgDarkWhite />
            <ImageAbsolute
              width={32}
              height={36}
              alignSelf={'center'}
              style={{zIndex: 2}}
              source={require('../../../../../../assets/myinfo/icon_empty_box_01.png')}
            />
          </ViewSelf>
        )}
        <View
          width={screenWidth - 124}
          // height={120}
          justifyContent={'space-between'}>
          <View>
            <ViewBorderRow justifyContent={'space-between'}>
              <ViewBorderRadius
                bgLightPink
                width={100}
                height={22}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={20}>
                <Text ftTheme ftSmall>
                  Step 0{props.step}
                </Text>
              </ViewBorderRadius>
              <Button
                alignSelf={'center'}
                width={24}
                height={24}
                onPress={() => bottomOpen()}>
                <Image source={comment} />
              </Button>
            </ViewBorderRow>
            <TouchableOpacity onPress={onPressContent}>
              <Text fontSize={15} ftDarkNavy>
                {props.name}
              </Text>
              <Text ftGray fontSize={12}>
                {mimiTextBubble()}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            width={'auto'}
            justifyContent={'flex-start'}
            onPress={onPressContent}>
            <Text ftTheme bold ftSmall>
              라방 가이드 {isVisibleContent ? '숨기기' : '보기'}
            </Text>
            <ItemPreview size={16} source={convertImage()} />
          </Button>
        </View>
      </ViewRow>
    );
  };

  return (
    <View>
      {renderHeader()}
      {isVisibleContent ? (
        <Live4StepExplanation
          key={broadcastId}
          broadcastId={broadcastId}
          productId={props.productId}
          step={props.step}
          requestContractEmail={props.requestContractEmail}
          clickCheck={props.clickCheck}
          changeConfirmText={props.changeConfirmText}
        />
      ) : null}
    </View>
  );
};

export default Preview;
