import React from 'react';
import {ButtonBorderRadius} from '../styled/Button';
import {Text} from '../styled/Text';
import {Image} from '../styled/Image';

const SelectBorderButton = (props) => {
  return (
    <ButtonBorderRadius
      brLightGray
      width={'100%'}
      paddingLeft={10}
      paddingRight={10}
      justifyContent={'space-between'}
      onPress={props.onPress}>
      <Text textAlign={'right'} ftLightGray>
        {props.title}
      </Text>
      <Image
        width={8}
        height={8}
        source={require('../../assets/common/black_triangle.png')}
      />
    </ButtonBorderRadius>
  );
};

export default SelectBorderButton;
