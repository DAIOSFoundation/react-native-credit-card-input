import React, {useState} from 'react';
import {View} from '../../components/styled/View';
import {Text} from '../../components/styled/Text';
import {NBInputBorder} from '../../components/styled/Input';
import {isEmpty} from '../../utils/functions';

// 타이틀 포함 인풋
// title : 타이틀
// placeholderText : 플레이스홀더 텍스트
// maxLength : 최대 길이
// isBottomLine : 하단 라인 여부
// value : 텍스트 내용
// onChangeText : onChangeText 리턴 함수
// width : 넓이
// height : 높이
// isOnlyNumber : 숫자만 입력 여부
// valid : 입력 확인값
// errorText : 입력 확인 에러 텍스트

{
  /* <TextAndInputBottomLine title={"테스트"}
placeholderText={"최상호"}
maxLength={20} d
isBottomLine={true}
/> */
}
const TextAndInputBottomLine = (props) => {
  const [brStyle, setBrStyle] = useState({brLightGray: true});
  const ftColor = props.ftColor || {ftBlack: true};

  const defaultMaxLength = props.maxLength || 30;
  const bottomLine = props.isBottomLine ? 1 : 0;
  const defaultWidth = props.width || '100%';
  const defaultHeight = props.height || 75;
  const isOnlyNumber = props.isOnlyNumber ? 'numeric' : 'default';
  let valid = true;
  const onFocus = () => {
    setBrStyle({brCerulean: true});
  };

  const onChangeText = (value) => {
    if (!isEmpty(props.valid)) {
      // 2 순위
      if (!props.valid) {
        return props.onChangeText(value, valid);
      } else {
        return props.onChangeText(value, valid);
      }
    }
    return props.onChangeText(value);
  };

  const onChange = (event) => {
    if (!isEmpty(props.valid)) {
      // 1 순위
      if (!props.valid(event.nativeEvent.text)) {
        setBrStyle({brLightRed: true});
        valid = false;
      } else {
        setBrStyle({brCerulean: true});
        valid = true;
      }
    }
  };

  return (
    <View width={defaultWidth} height={defaultHeight}>
      <Text ftDarkNavy bold marginBottom={10}>
        {props.title}
      </Text>
      <NBInputBorder
        {...ftColor}
        onFocus={onFocus}
        {...brStyle}
        fontSize={16}
        disabled={props.disabled}
        borderLeftWidth={'0'}
        borderRightWidth={'0'}
        borderTopWidth={'0'}
        borderBottomWidth={bottomLine}
        align={'left'}
        maxLength={defaultMaxLength}
        placeholder={props.placeholderText}
        placeholderTextColor={'#cbced5'}
        returnKeyType={'done'}
        autoCapitalize="none"
        value={`${props.value}`}
        onChange={onChange}
        onChangeText={onChangeText}
        keyboardType={isOnlyNumber}
      />
      <Text ftSmall ftRed>
        {brStyle.brLightRed ? props.errorText : null}
      </Text>
    </View>
  );
};
export default TextAndInputBottomLine;
