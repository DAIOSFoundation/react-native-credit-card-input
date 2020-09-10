import React, {useState, useEffect} from 'react';
import {View, ViewBorder} from '../styled/View';
import BasicCheckBox from './BasicCheckBox';
import {Text} from '../styled/Text';
import {isEmpty} from '../../utils/functions';

// 데이터를 받아 버튼으로 출력하고 선택 된 데이터 리턴
// data : 체크 버튼으로 출력할 배열
// onPress : 체크된 데이터 리턴 받을 함수
// selectCount : 최대 선택 갯수
// selectedIndex : 선택한 인덱스 값 필요 여부

const SelectCheckBoxes = (props) => {
  const [items, setItems] = useState([]);
  const [checkCount, setCheckCount] = useState(0);

  const onPress = (isCheck) => {
    let newItems = [...items];

    // if (isCheck[0]) {
    //   setCheckCount(checkCount + 1);
    // } else {
    //   setCheckCount(checkCount - 1);
    // }

    // if (!isEmpty(props.MaxCnt) && props.MaxCnt < checkCount) {
    //   return
    // }

    let result = newItems.filter((item) => item === true);

    if (props.selectCount) {
      if (result.length >= props.selectCount) {
        if (isCheck[0] === false) {
          newItems[isCheck[1]] = isCheck[0];
          setItems(newItems);
        }
      } else {
        newItems[isCheck[1]] = isCheck[0];
        setItems(newItems);
      }
    } else {
      newItems[isCheck[1]] = isCheck[0];
      setItems(newItems);
    }

    props.onPress(newItems);
  };

  const renderCheckBoxes = () => {
    let retData = [];

    if (props.data) {
      for (let i = 0; i < props.data.length; i++) {
        retData.push(
          <ViewBorder
            key={i}
            width={'100%'}
            height={50}
            brDarkWhite
            justifyContent={'center'}>
            {props.selectedIndex ? (
              <BasicCheckBox
                id={i}
                textStyle={{ftDarkNavy: true}}
                text={props.data[i].name}
                isRight={props.isRight}
                onPress={(data) => onPress(data)}
                checked={items[i]}
              />
            ) : (
              <BasicCheckBox
                id={i}
                textStyle={{ftDarkNavy: true}}
                text={props.data[i]}
                isRight={props.isRight}
                onPress={(data) => onPress(data)}
                checked={items[i]}
              />
            )}
          </ViewBorder>,
        );
      }
    }

    return retData;
  };

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
  }, [props.selectedIndex]);

  return <View>{renderCheckBoxes()}</View>;
};

export default SelectCheckBoxes;
