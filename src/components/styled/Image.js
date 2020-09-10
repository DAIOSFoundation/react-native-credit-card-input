import styled from 'styled-components/native';
import * as Common from './Common';

export const Image = styled.Image((props) => ({
  //size
  width: props.width || '100%',
  height: props.height || '100%',

  //margin
  marginLeft: Common.MARGIN_LEFT(props),
  marginRight: Common.MARGIN_RIGHT(props),
  marginTop: Common.MARGIN_TOP(props),
  marginBottom: Common.MARGIN_BOTTOM(props),

  resizeMode: props.resizeMode ? props.resizeMode : 'cover',
  justifyContent: props.justifyContent || 'center',
}));

export const ImageAbsolute = styled(Image)((props) => ({
  position: 'absolute',
  alignSelf: props.alignSelf || 'flex-start',
  right: props.right || 'auto',
  bottom: props.bottom || 'auto',
}));

export const ItemPreview = styled(Image)((props) => ({
  //size
  width: props.size || 40,
  height: props.size || 40,

  //border
  borderRadius: props.borderRadius || 5,
  borderColor: Common.BORDER_COLOR(props),
  borderWidth: props.borderWidth || 0.5,
}));

export const ImageCirclePreview = styled(Image)((props) => ({
  //size
  width: props.size || 58,
  height: props.size || 58,

  //border
  borderRadius: props.size / 2 || 29,
  borderColor: Common.BORDER_COLOR(props),
  borderWidth: props.borderWidth || 0.5,
}));

export const ImageBorder = styled(Image)((props) => ({
  borderRadius: props.borderRadius || 5,
}));
