import React from 'react';
import {Container, ViewBorder, View, ViewRow, ScrollView} from '../styled/View';
import Modal from 'react-native-modal';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {useDispatch} from 'react-redux';
import * as modalActions from '../../store/modules/modal/customModal/actions';
import {Actions} from 'react-native-router-flux';

const CustomModal = (props) => {
  const dispatch = useDispatch();

  let converSize = '20%';
  if (props.size) {
    converSize = props.size;
  }

  const scrollJustifyContent = props.scrollJustifyContent || {
    justifyContent: 'center',
  };

  const bgColor = props.bgColor || {bgWhite: true};
  const leftButtonColor = props.leftButtonColor || {bgDarkNavy: true};

  const onPressCancel = () => {
    dispatch(modalActions.change_modal_clear());
  };

  const onPress = () => {
    if (!props.onPressOK || typeof props.onPressOK !== 'function') {
      dispatch(modalActions.change_modal_clear());
    } else {
      dispatch(modalActions.change_modal_clear());
      return props.onPressOK();
    }
  };

  const renderMessage = () => {
    if (typeof props.message === 'object') {
      return props.message;
    } else {
      return <Text textAlign={'center'}>{props.message}</Text>;
    }
  };
  const renderElements = () => {
    return <>{props.elements}</>;
  };

  console.log('Actions.currentParams.title', Actions.currentParams.Screentitle);
  console.log('props.currentScene', props.currentScene);
  console.log('Actions.currentScene ', Actions.currentScene);
  return props.currentScene === Actions.currentParams.Screentitle ||
    props.currentScene === Actions.currentScene ? (
    <Modal isVisible={props.isVisible}>
      <Container height={converSize} bgWhite marginLeft={20} marginRight={20}>
        <ScrollView
          // bgDarkGrayBlue
          {...bgColor}
          {...scrollJustifyContent}
          alignItems={'center'}>
          {renderMessage()}
          {renderElements()}
        </ScrollView>

        {props.isOneButton ? (
          <Button
            height={props.buttonHeight || 40}
            bgTheme
            onPress={() => onPress()}>
            <Text ftWhite>확인</Text>
          </Button>
        ) : (
          <View height={50}>
            <ViewRow height={'100%'} width={'100%'}>
              <Button
                height={'100%'}
                width={'50%'}
                {...leftButtonColor}
                onPress={() => onPressCancel()}>
                <Text ftWhite>취소</Text>
              </Button>
              <Button
                height={'100%'}
                width={'50%'}
                bgTheme
                onPress={() => onPress()}>
                <Text ftWhite>확인</Text>
              </Button>
            </ViewRow>
          </View>
        )}
      </Container>
    </Modal>
  ) : null;
};

export default CustomModal;
