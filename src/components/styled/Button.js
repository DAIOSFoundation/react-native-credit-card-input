import styled from 'styled-components/native';
import * as Common from './Common';

import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export const Button = styled.TouchableOpacity((props) => ({
  //size
  width: props.width || '100%',
  height: props.height || '40px',

  //color
  backgroundColor: Common.BACKGROUND_COLOR(props),

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

  //align
  alignItems: props.alignItems || 'center',
  justifyContent: props.justifyContent || 'center',
  alignSelf: props.alignSelf || 'stretch',
  flexDirection: props.flexDirection || 'row',
}));

export const ButtonRadius = styled(Button)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const ButtonRadiusCustom = styled(Button)((props) => ({
  borderTopLeftRadius: props.borderTopLeftRadius || 0,
  borderTopRightRadius: props.borderTopRightRadius || 0,
  borderBottomLeftRadius: props.borderBottomLeftRadius || 0,
  borderBottomRightRadius: props.borderBottomRightRadius || 0,
}));

export const ButtonBorder = styled(Button)((props) => ({
  borderWidth: props.borderWidth || '1px',
  borderColor: Common.BORDER_COLOR(props),
}));

export const ButtonBottomBorder = styled(Button)((props) => ({
  borderBottomColor: props.borderBottomColor || '#000000',
  borderBottomWidth: '0.5px',
}));

export const ButtonBorderRadius = styled(ButtonBorder)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const GestureButton = styled(TouchableOpacity)((props) => ({
  //size
  width: props.width || '100%',
  height: props.height || '40px',

  //color
  backgroundColor: Common.BACKGROUND_COLOR(props),

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

  //align
  alignItems: props.alignItems || 'center',
  justifyContent: props.justifyContent || 'center',
  alignSelf: props.alignSelf || 'stretch',
  flexDirection: props.flexDirection || 'row',
}));

export const GestureButtonRadius = styled(GestureButton)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const GestureButtonBorder = styled(GestureButton)((props) => ({
  borderWidth: props.borderWidth || '1px',
  borderColor: Common.BORDER_COLOR(props),
}));

export const GestureButtonBorderRadius = styled(GestureButtonBorder)(
  (props) => ({
    borderRadius: props.borderRadius || '5px',
  }),
);

export const ButtonHighlight = styled.TouchableHighlight((props) => ({
  //size
  width: props.width || '100%',
  height: props.height || '40px',

  //color
  backgroundColor: Common.BACKGROUND_COLOR(props),

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

  //align
  alignItems: props.alignItems || 'center',
  justifyContent: props.justifyContent || 'center',
  alignSelf: props.alignSelf || 'stretch',
  flexDirection: props.flexDirection || 'row',
}));

export const ButtonHighlightRadius = styled(ButtonHighlight)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const ButtonHighlightBorder = styled(ButtonHighlight)((props) => ({
  borderWidth: props.borderWidth || '1px',
  borderColor: Common.BORDER_COLOR(props),
}));

export const ButtonHighlightBorderRadius = styled(ButtonHighlightBorder)(
  (props) => ({
    borderRadius: props.borderRadius || '5px',
  }),
);
