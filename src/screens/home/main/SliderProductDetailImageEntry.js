import React from 'react';
// Styled Component
import {View} from '../../../components/styled/View';
import {Image} from '../../../components/styled/Image';

const SliderProductDetailImageEntry = (props) => {
  return (
    <View height={420}>
      <Image source={{uri: props.data.path}} />
    </View>
  );
};

export default SliderProductDetailImageEntry;
