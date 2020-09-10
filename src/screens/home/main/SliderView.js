import React from 'react';
// Styled Component
import SliderVideo from '../../../components/carousel/SliderVideo';
import {screenSize} from '../../../components/styled/ScreenSize';

const SliderView = (props) => {
  return props.broadcasts.length > 0 ? (
    <SliderVideo
      autoplay={props.autoplay}
      data={props.broadcasts}
      sliderWidth={screenSize}
      itemWidth={screenSize}
      pagination
    />
  ) : null;
};

export default SliderView;
