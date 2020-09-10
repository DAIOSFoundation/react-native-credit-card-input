import styled from 'styled-components/native';
import {Platform, StatusBar} from 'react-native';
import * as Common from './Common';

export const ScrollView = styled.ScrollView((props) => ({
  backgroundColor: Common.BACKGROUND_COLOR(props),
}));

export const SafeAreaView = styled.SafeAreaView((props) => ({
  flex: 1,
  backgroundColor: Common.BACKGROUND_COLOR(props),
  // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
}));

export const CommonView = styled.View((props) => ({
  //size
  width: props.width || 'auto',

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

  //zIndex
  zIndex: props.zIndex || 1,
}));

export const Container = styled(CommonView)((props) => ({
  height: props.height || '100%',
  alignItems: 'center',
  justifyContent: props.justifyContent || 'flex-start',
}));

export const View = styled(CommonView)((props) => ({
  height: props.height || 'auto',
  alignItems: props.alignItems || 'stretch',
  justifyContent: props.justifyContent || 'flex-start',
}));

export const ViewSelf = styled(View)((props) => ({
  alignSelf: props.alignSelf || 'center',
}));

export const ViewAbsolute = styled(View)((props) => ({
  position: 'absolute',
  alignSelf: props.alignSelf || 'flex-start',

  top: props.top === true ? 15 : props.top,
  left: props.left === true ? 15 : props.left,
  right: props.right === true ? 15 : props.right,
  bottom: props.bottom === true ? 15 : props.bottom,
}));

export const ViewRelative = styled(View)((props) => ({
  position: 'relative',
  flex: 1,
}));

export const ViewRow = styled(View)((props) => ({
  flexDirection: props.flexDirection || 'row',
}));

export const ViewRowAbsolute = styled(ViewRow)((props) => ({
  position: 'absolute',
  flexDirection: 'row',
  alignSelf: props.alignSelf || 'flex-start',

  top: props.top === true ? 15 : props.top,
  left: props.left === true ? 15 : props.left,
  right: props.right === true ? 15 : props.right,
  bottom: props.bottom === true ? 15 : props.bottom,
}));

export const ViewBorder = styled(View)((props) => ({
  borderColor: Common.BORDER_COLOR(props),
  borderLeftWidth: Common.BORDER_LEFT_WIDTH(props),
  borderRightWidth: Common.BORDER_RIGHT_WIDTH(props),
  borderTopWidth: Common.BORDER_TOP_WIDTH(props),
  borderBottomWidth: Common.BORDER_BOTTOM_WIDTH(props),
}));

export const ViewBorderRow = styled(ViewBorder)({
  flexDirection: 'row',
});

export const ViewBorderRadius = styled(ViewBorder)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const ViewAbsoluteRadius = styled(ViewAbsolute)((props) => ({
  borderRadius: props.borderRadius || '5px',
}));

export const ViewRadiusCustom = styled(View)((props) => ({
  borderColor: Common.BORDER_COLOR(props),
  borderTopLeftRadius: props.borderTopLeftRadius || 0,
  borderTopRightRadius: props.borderTopRightRadius || 0,
  borderBottomLeftRadius: props.borderBottomLeftRadius || 0,
  borderBottomRightRadius: props.borderBottomRightRadius || 0,
}));

export const ViewRowRadiusCustom = styled(ViewRow)((props) => ({
  borderColor: Common.BORDER_COLOR(props),
  borderTopLeftRadius: props.borderTopLeftRadius || 0,
  borderTopRightRadius: props.borderTopRightRadius || 0,
  borderBottomLeftRadius: props.borderBottomLeftRadius || 0,
  borderBottomRightRadius: props.borderBottomRightRadius || 0,
}));

export const ViewRowBorderRadius = styled(ViewBorder)((props) => ({
  flexDirection: 'row',
  borderRadius: props.borderRadius || '5px',
}));
