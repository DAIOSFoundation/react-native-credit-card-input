import React, {useEffect, useState} from 'react';
// Styled Component
import {View, ViewRow} from '../styled/View';
import {ButtonBorderRadius} from '../styled/Button';
import {Image, ItemPreview} from '../styled/Image';
import {Text} from '../styled/Text';
// assets Img
const checked = require('../../assets/checkbox/icon_check_pressed.png');
const NoChecked = require('../../assets/checkbox/icon_check_normal.png');

// *** 이미지가 들어간 체크박스 ***
// data : 버튼으로 출력할 배열
// onPress : 버튼 터치 리턴 받을 함수
// isOnlyOne : true, false 하나만 선택 여부
// index : index 값

const SelectImageCheckBoxes = (props) => {
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(false);

  const onPressButton = (idx) => {
    let newItems = [...items];

    if (props.isOnlyOne) {
      for (let i = 0; i < items.length; i++) {
        if (i === idx) {
          newItems[i] = true;
        } else {
          newItems[i] = false;
        }
      }
    } else {
      newItems[idx] = !items[idx];
    }

    setItems(newItems);
    setChanged(!changed);
  };

  useEffect(() => {
    const initItem = [];
    for (let i = 0; i < props.data.length; i++) {
      initItem.push(false);
    }
    setItems(initItem);
  }, []);

  useEffect(() => {
    if (items.length !== 0) {
      returnCurrentItems();
    }
  }, [changed]);

  const returnCurrentItems = () => {
    let pressedData = [];

    for (let i = 0; i < props.data.length; i++) {
      if (items[i]) {
        pressedData.push(props.data[i]);
        if (props.isOnlyOne) break;
      }
    }
    props.onPress(pressedData);
  };

  const renderCheckButton = (data) => {
    return data.map((item, index) => (
      <View key={index}>
        {props.index === index + 1 ? (
          <ButtonBorderRadius
            marginTop={10}
            borderWidth={2}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
            paddingBottom={5}
            brTheme
            onPress={() => onPressButton(index)}
            width={'100%'}
            justifyContent={'space-between'}>
            <ViewRow alignItems={'center'}>
              <ItemPreview size={20} source={item.image} marginRight={10} />
              <Text>{item.pg.toUpperCase()}</Text>
            </ViewRow>
            <Image width={24} height={24} source={checked} />
          </ButtonBorderRadius>
        ) : (
          <ButtonBorderRadius
            marginTop={10}
            borderWidth={2}
            paddingLeft={5}
            paddingRight={5}
            paddingTop={5}
            paddingBottom={5}
            brIceBlue
            onPress={() => onPressButton(index)}
            width={'100%'}
            justifyContent={'space-between'}>
            <ViewRow alignItems={'center'}>
              <ItemPreview size={20} source={item.image} marginRight={10} />
              <Text>{item.pg.toUpperCase()}</Text>
            </ViewRow>
            <Image width={24} height={24} source={NoChecked} />
          </ButtonBorderRadius>
        )}
        {item.description ? (
          <ViewRow key={index} alignSelf={'center'} marginTop={5}>
            <Text fontSize={12} ftGray bold>
              {item.description}
            </Text>
          </ViewRow>
        ) : null}
      </View>
    ));
  };

  return <View>{renderCheckButton(props.data)}</View>;
};

export default SelectImageCheckBoxes;
