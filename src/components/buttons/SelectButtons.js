import React, {useState, useEffect} from 'react';
import {View, ViewRow} from '../styled/View';
import {ButtonBorderRadius} from '../styled/Button';
import {Text} from '../styled/Text';
import {screenWidth} from '../styled/ScreenSize';

// 데이터를 받아 버튼으로 출력하고 선택 된 데이터 리턴
// data : 버튼으로 출력한 배열
// lineCnt : 한 줄에 출력한 버튼 갯수
// onPress : 버튼 터치 리턴 받을 함수
// isOnlyOne : true, false 하나만 선택 여부
// selectCount : 최대 선택 갯수
// render : 취소버튼 클릭 시 선택 값 초기화 시키기 위한 값.
// selectedIndex : 선택한 인덱스 값 필요 여부

{
  /*
  <SelectButtons
  data={data}
  lineCnt={4}
  onPress={data => onPress(data)}/> */
}
const SelectButtons = (props) => {
  const [items, setItems] = useState([]);
  const [changed, setChanged] = useState(false);

  const onPressButton = (idx) => {
    let newItems = [...items];

    if (props.isOnlyOne) {
      for (let i = 0; i < items.length; i++) {
        if (i === idx - 1) {
          newItems[i] = true;
        } else {
          newItems[i] = false;
        }
      }
    } else {
      let result = newItems.filter((item) => item === true);

      if (props.selectCount) {
        if (result.length >= props.selectCount) {
          if (newItems[idx - 1] === true) {
            newItems[idx - 1] = !items[idx - 1];
          }
        } else {
          newItems[idx - 1] = !items[idx - 1];
        }
      } else {
        newItems[idx - 1] = !items[idx - 1];
      }
    }

    setItems(newItems);
    setChanged(!changed);
  };

  useEffect(() => {
    if (items.length !== 0) {
      returnCurrentItems();
    }
  }, [changed]);

  useEffect(() => {
    const initItems = [];

    if (props.selectedIndex) {
      for (let i = 0; i < props.data.length; i++) {
        initItems.push(false);
      }

      for (let i = 0; i < props.selectedIndex.length; i++) {
        initItems[props.selectedIndex[i]] = true;
      }
    } else {
      for (let i = 0; i < props.data.length; i++) {
        initItems.push(false);
      }
    }

    setItems(initItems);
  }, [props.render]);

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

  const renderButtons = () => {
    let retList = [];
    let tmpList = [];

    if (props.data) {
      for (let i = 1; i < props.data.length + 1; i++) {
        tmpList.push(
          items[i - 1] ? (
            <ButtonBorderRadius
              key={i}
              marginLeft={5}
              marginRight={5}
              style={{flex: 1 / props.lineCnt}}
              brTheme
              borderRadius={10}
              onPress={() => {
                onPressButton(i);
              }}>
              <Text ftTheme textAlign={'center'}>
                {props.selectedIndex
                  ? props.data[i - 1].name
                  : props.data[i - 1]}
              </Text>
            </ButtonBorderRadius>
          ) : (
            <ButtonBorderRadius
              key={i}
              marginLeft={5}
              marginRight={5}
              style={{flex: 1 / props.lineCnt}}
              brLightGray
              borderRadius={10}
              onPress={() => onPressButton(i)}>
              <Text ftDartNavy textAlign={'center'}>
                {props.selectedIndex
                  ? props.data[i - 1].name
                  : props.data[i - 1]}
              </Text>
            </ButtonBorderRadius>
          ),
        );

        let viewData =
          i !== 1 && i % props.lineCnt === 0 ? (
            <ViewRow key={i} width={'100%'} paddingBottom={10}>
              {tmpList}
            </ViewRow>
          ) : null;

        if (viewData) {
          retList.push(viewData);
          tmpList = [];
          viewData = null;
        }
      }
      retList.push(
        <ViewRow
          key={'resultData'}
          marginRight={(props.lineCnt - tmpList.length) * 12}>
          {tmpList}
        </ViewRow>,
      );
    }
    return retList;
  };

  return <View>{renderButtons()}</View>;
};

export default SelectButtons;
