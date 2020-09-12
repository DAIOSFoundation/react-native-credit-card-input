import {CardItem} from 'native-base';
import styled from 'styled-components/native';
import * as Common from './Common';

export const NBCardItem = styled(CardItem)((props) => ({
  //padding
  paddingLeft: Common.PADDING_LEFT(props),
  paddingRight: Common.PADDING_RIGHT(props),
  paddingTop: Common.PADDING_TOP(props),
  paddingBottom: Common.PADDING_BOTTOM(props),
}));
