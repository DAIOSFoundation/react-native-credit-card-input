import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {isEmpty} from '../../utils/functions';

// *** 기본 텍스트 인풋 ***
// editable : false -> readOnly
// brColor : 테두리 색상
// maxLength : 텍스트 몇자까지 입력할것인지
// keyboardType : 키보드 타입 ex) numeric 숫자만허용

const BasicTextInput = (props) => {
  const alignSelf = props.alignSelf || 'center';
  const width = props.width || '100%';

  const valueColor = props.valueColor || 'black';

  const onChangeText = (value) => {
    if (!isEmpty(props.onChangeText)) props.onChangeText(value);
  };

  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      editable={props.editable}
      onChangeText={onChangeText}
      value={props.value}
      style={{
        width: width,
        height: props.height,
        borderWidth: 1,
        borderRadius: 15,
        paddingTop: 0,
        paddingLeft: 15,
        paddingBottom: 0,
        borderColor: props.brColor,
        alignSelf: alignSelf,
        color: valueColor,
      }}
    />
  );
};

export default BasicTextInput;
