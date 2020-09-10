import React, {useState} from 'react';
import {Picker} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// Styled Component
import {
  SafeAreaView,
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../../components/styled/View';
import {Button} from '../../../../../components/styled/Button';
import {Image, ItemPreview} from '../../../../../components/styled/Image';
import {Text} from '../../../../../components/styled/Text';
// assets Img
const minIcon = require('../../../../../assets/common/icon_item_minus.png');
const plusIcon = require('../../../../../assets/common/icon_item_plus.png');
const cancelRadiusIcon = require('../../../../../assets/common/icon_cancel_radius.png');
// utils Import
import {isEmpty, LocaleString} from '../../../../../utils/functions';
import * as Common from '../../../../../components/styled/Common';
import ModalSelector from 'react-native-modal-selector';
import { createIconSetFromFontello } from 'react-native-vector-icons';

// actions
import * as regularPaymentActions from '../../../../../store/modules/regularPayment/actions';

// 상품 상세보기 바텀 모달 상품 정보
const ModalProductInfo = (props) => {
  const dispatch = useDispatch();
  const {
    paymentType,
    recurringMonth,
    recurringMonthSelect,
  } = useSelector(
    (state) => ({
      paymentType: state.productDetail.paymentType,
      recurringMonth: state.regularPayment.recurringMonth,
      recurringMonthSelect: state.regularPayment.recurringMonthSelect,
    }),
    shallowEqual,
  );

  const [selectOption, setSelectOption] = useState([]);

  // 아이템 수량 증가
  const onPressIncrease = (paramItem) => {
    if (!isEmpty(props.onPressIncrease)) {
      const addedAmountItem = selectOption.map((item) =>
        item.itemId === paramItem.itemId
          ? {...item, amount: paramItem.amount + 1}
          : item,
      );

      setSelectOption(addedAmountItem);

      props.onPressIncrease(addedAmountItem);
    }
  };

  // 아이템 수량 감소
  const onPressDecrease = (paramItem) => {
    if (!isEmpty(props.onPressDecrease)) {
      if (paramItem.amount > 1) {
        const minusedAmountItem = selectOption.map((item) =>
          item.itemId === paramItem.itemId
            ? {...item, amount: paramItem.amount - 1}
            : item,
        );
        setSelectOption(minusedAmountItem);
        props.onPressDecrease(minusedAmountItem);
      }
    }
  };

  // 옵션 선택 시 이벤트
  const changeSelectOption = (value) => {
    if (value !== '0') {
      if (selectOption.length === 0) {
        let newSelectOption = [];
        let initValue = {
          itemId: value._id,
          itemName: value.itemName,
          amount: 1,
        };
        newSelectOption.push(initValue);
        setSelectOption(newSelectOption);
        props.onChangeSelectOption(newSelectOption);
      } else {
        for (let i = 0; i < selectOption.length; i++) {
          if (selectOption[i].itemId === value._id) {
            break;
          }
          if (selectOption.length - 1 === i) {
            let newSelectOption = [...selectOption];
            let initValue = {
              itemId: value._id,
              itemName: value.itemName,
              amount: 1,
            };
            newSelectOption.push(initValue);
            setSelectOption(newSelectOption);
            props.onChangeSelectOption(newSelectOption);
          }
        }
      }
    }
  };

  // 추가된 옵션 제거
  const onPressDelete = (paramItem) => {
    const deletedItem = selectOption.filter((item) => item !== paramItem);
    setSelectOption(deletedItem);

    props.onPressDelete(deletedItem);
  };

  // 옵션 추가 뷰
  const renderSelectedOption = () => {
    return (
      <>
        {selectOption.length > 0
          ? selectOption.map((item, index) => (
              <View
                key={item + index}
                paddingRight={15}
                paddingLeft={15}
                alignItems={'center'}>
                <ViewRow marginTop={10} marginBottom={10}>
                  <ViewBorderRadius
                    bgDarkWhite
                    brIceBlue
                    height={28}
                    justifyContent={'center'}
                    paddingLeft={15}
                    marginRight={10}
                    style={{flex: 1}}>
                    <Text>{item.itemName}</Text>
                  </ViewBorderRadius>
                  <View>
                    <Button
                      width={30}
                      height={28}
                      onPress={() => onPressDecrease(item)}>
                      <Image source={minIcon} />
                    </Button>
                  </View>
                  <ViewBorderRadius
                    height={28}
                    justifyContent={'center'}
                    brIceBlue
                    marginRight={10}
                    marginLeft={10}>
                    <Text paddingLeft={20} paddingRight={20}>
                      {item.amount}
                    </Text>
                  </ViewBorderRadius>
                  <View marginRight={10}>
                    <Button
                      width={30}
                      height={28}
                      onPress={() => onPressIncrease(item)}>
                      <Image source={plusIcon} />
                    </Button>
                  </View>
                  <View>
                    <Button
                      width={30}
                      height={28}
                      onPress={() => onPressDelete(item)}>
                      <Image source={cancelRadiusIcon} />
                    </Button>
                  </View>
                </ViewRow>
              </View>
            ))
          : null}
        <View
          bgDarkWhite
          width={'100%'}
          height={1}
          marginTop={10}
          marginBottom={10}
        />
      </>
    );
  };

  const changing = (value) => {
    dispatch(regularPaymentActions.change_recurring_month_select(value.label));
  }

  const onModalClose = (item) => {
    dispatch(regularPaymentActions.change_recurring_month_select(item.label));
  }

  console.log('paymentType ===> ', paymentType)

  return (
    <View>
      <View paddingLeft={15} paddingRight={15} marginTop={15}>
        <ViewRow marginBottom={10}>
          <Button width={58} height={58} marginRight={10} disabled>
            <ItemPreview size={'100%'} source={{uri: props.urlPath}} />
          </Button>
          <SafeAreaView justifyContent={'center'}>
            <Button
              justifyContent={'flex-start'}
              width={'auto'}
              height={'auto'}
              disabled>
              <Text ftGray numberOfLines={props.textLine}>
                {props.productName}
              </Text>
            </Button>
            <ViewRow alignItems={'center'}>
              <Text ftTheme bold marginRight={5}>
                {props.discount}%
              </Text>
              <Text bold ftDarkNavy ftLarge marginRight={5}>
                {LocaleString(props.price)}원
              </Text>
              {props.status === 5 ? (
                <ViewBorderRadius
                  bgLightPink
                  borderRadius={100}
                  paddingTop={5}
                  paddingLeft={5}
                  paddingRight={5}
                  paddingBottom={5}>
                  <Text ftTheme bold ftVerySmall>
                    라이브할인가
                  </Text>
                </ViewBorderRadius>
              ) : null}
            </ViewRow>
          </SafeAreaView>
        </ViewRow>

        {props.productOption.length > 0 ? (
          <ModalSelector
            data={props.productOption.map((el, index) => ({
              ...el,
              key: index,
              label: el.itemName
            }))}
            cancelText={'취소'}
            initValue={props.productOptionTitle}
            onChange={changeSelectOption}/>
        ) : null}

      </View>
      {renderSelectedOption()}

      {/* 정기결제 개월수 선택 샘플 */}
      {/* 추후 api 연동해서 데이터 받아와야 함 */}
      {selectOption[0] && paymentType ? (
        <View paddingLeft={15} paddingRight={15} marginTop={15}>
          <ModalSelector
            data={recurringMonth.map((item, index) => ({
              key: index,
              label: item 
            }))}
            cancelText={'취소'}
            onModalClose={onModalClose}
            initValue={"정기결제 기간을 선택해 주세요"}
            selectedKey={recurringMonth.indexOf(recurringMonthSelect)}
            onChange={changing}/>
        </View>
      ) : null}
    </View>
  );
};

export default ModalProductInfo;
