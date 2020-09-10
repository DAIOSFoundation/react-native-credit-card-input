import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import React from 'react';
import {View} from '../styled/View';
import {Image} from '../styled/Image';

export const ListButton = (props) => {
  return (
    <>
      <View height={1} bgDarkWhite />
      <Button
        height={48}
        justifyContent={'space-between'}
        onPress={props.onPress}>
        <Text marginLeft={15}>{props.text}</Text>
        <Text marginRight={15}>
          {props.showArrow ? (
            <Image
              width={12}
              height={12}
              justifyContent={'center'}
              source={require('../../assets/myinfo/icon_small_more_grey.png')}
            />
          ) : (
            ''
          )}
        </Text>
      </Button>
      <View height={1} bgDarkWhite />
    </>
  );
};

export default ListButton;
