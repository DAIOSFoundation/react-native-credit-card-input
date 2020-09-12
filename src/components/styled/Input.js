import styled from 'styled-components/native';
import * as Common from './Common';
import {Input, Textarea} from 'native-base';

export const NBInput = styled(Input)((props) => ({
  //size
  width: props.width || '100%',
  height: props.height || 40,

  //color
  backgroundColor: Common.BACKGROUND_COLOR(props),
  color: Common.FONT_COLOR(props),

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),

  //padding
  paddingLeft: Common.PADDING_LEFT(props),
  paddingRight: Common.PADDING_RIGHT(props),
  paddingTop: Common.PADDING_TOP(props),
  paddingBottom: Common.PADDING_BOTTOM(props),

  //font
  fontSize: Common.FONT_SIZE(props),
  fontWeight: Common.FONT_WEIGHT(props),

  //align
  textAlign: props.textAlign || 'left',
}));

export const NBInputBorder = styled(NBInput)((props) => ({
  borderColor: Common.BORDER_COLOR(props),
  borderLeftWidth: Common.BORDER_LEFT_WIDTH(props),
  borderRightWidth: Common.BORDER_RIGHT_WIDTH(props),
  borderTopWidth: Common.BORDER_TOP_WIDTH(props),
  borderBottomWidth: Common.BORDER_BOTTOM_WIDTH(props),
}));

export const NBTextarea = styled(Textarea)((props) => ({
  //size
  width: props.width || '100%',

  //font
  fontSize: Common.FONT_SIZE(props),
  fontWeight: Common.FONT_WEIGHT(props),
  //color
  color: Common.FONT_COLOR(props),

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),

  //padding
  paddingLeft: Common.PADDING_LEFT(props),
  paddingRight: Common.PADDING_RIGHT(props),
  paddingTop: Common.PADDING_TOP(props),
  paddingBottom: Common.PADDING_BOTTOM(props),
}));

export const NBInputBorderRadius = styled(NBInputBorder)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const NBTextareaRadius = styled(NBTextarea)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));
