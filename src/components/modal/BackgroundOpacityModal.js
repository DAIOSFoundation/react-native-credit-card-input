import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
// MPM Module
import Modal from 'react-native-modal';
// Styled Component
import {View, ViewBorderRow, ViewRow} from '../styled/View';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {Image} from '../styled/Image';
// Images assets
const modalCancel = require('../../assets/common/icon_cancel_black.png');

const BackgroundOpacityModal = (props) => {
  const bottomClosed = (state) => {
    props.bottomClosed(state);
  };

  const onPressModalBtn = (step, title) => {
    props.onPressModalBtn(step, title);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={{
        justifyContent: 'flex-end',
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
      onRequestClose={() => bottomClosed(false)}>
      <TouchableWithoutFeedback onPress={() => bottomClosed(false)}>
        <View style={{opacity: 0, flex: 1}} />
      </TouchableWithoutFeedback>
      <ViewBorderRow
        width={'100%'}
        bgWhite
        style={{borderTopRightRadius: 12, borderTopLeftRadius: 12}}>
        <View width="100%" paddingLeft={20} paddingRight={20} paddingTop={20}>
          <ViewRow
            justifyContent={'space-between'}
            alignItems={'center'}
            marginBottom={15}>
            <Text fontSize={19} bold>
              라방 관리
            </Text>
            <Button onPress={() => bottomClosed(false)} width={'auto'}>
              <Image width={15} height={15} source={modalCancel} />
            </Button>
          </ViewRow>
          {props.modalInnerButton.data ? (
            props.modalInnerButton.data.title.map((item, index) => {
              return (
                <Button
                  width={'100%'}
                  marginBottom={15}
                  justifyContent={'flex-start'}
                  onPress={() =>
                    onPressModalBtn(props.modalInnerButton.data.step, item)
                  }>
                  <Text ftDarkNavy fontSize={17}>
                    {item}
                  </Text>
                </Button>
              );
            })
          ) : (
            <></>
          )}
        </View>
      </ViewBorderRow>
    </Modal>
  );
};
export default BackgroundOpacityModal;
