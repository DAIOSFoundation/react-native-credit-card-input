import styled from 'styled-components/native';
import {CheckBox} from 'native-base';
import * as Common from './Common';

export const NBCheckBox = styled(CheckBox)((props) => ({
  //size
  width: props.size || 20,
  height: props.size || 20,

  borderRadius: props.borderRadius || 10,
}));
