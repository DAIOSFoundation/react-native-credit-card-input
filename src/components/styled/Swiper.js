import styled from 'styled-components/native';
import * as Common from './Common';

export const SwiperDot = styled.View((props) => ({
  //size
  width: props.width || '9px',
  height: props.height || '9px',

  //border
  borderRadius: props.borderRadius || '7px',

  //color
  borderColor: Common.BORDER_COLOR(props),
  backgroundColor: Common.BACKGROUND_COLOR(props),

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),
}));

export const SwiperActiveDot = styled.View((props) => ({
  //size
  width: props.width || '8px',
  height: props.height || '8px',

  //border
  borderRadius: props.borderRadius || '7px',

  //color
  borderColor: Common.BORDER_COLOR(props),
  backgroundColor: Common.BACKGROUND_COLOR(props),

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),
}));

export const Circle = styled.View((props) => ({
  //size
  width: props.width || '16px',
  height: props.height || '16px',

  //border
  borderRadius: props.borderRadius || '8px',

  //color
  borderColor: Common.BORDER_COLOR(props),
  backgroundColor: Common.BACKGROUND_COLOR(props),

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),
}));
