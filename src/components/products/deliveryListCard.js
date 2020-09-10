import React from 'react';
import {ViewRow, View, ScrollView} from '../styled/View';
import {Text} from '../styled/Text';
import {Button, ButtonRadius} from '../styled/Button';
import {Image} from '../styled/Image';
import {Actions} from 'react-native-router-flux';

const DeliveryListCard = (props) => {
  const basicView = () => {
    return props.userAddress.map((item, index) => (
      <View bgWhite>
        <ViewRow
          width={'100%'}
          height={'auto'}
          justifyContent={'space-between'}
          paddingTop={20}>
          <Text fontSize={17} bold paddingRight={10} paddingLeft={25}>
            {item.name}
            <Text fontSize={18} paddingLeft={10} paddingRight={90}>
              {' | '}
              {item.phone}
            </Text>
          </Text>
          {/*<Text*/}
          {/*    bgLightBlueGray*/}
          {/*    height={13}*/}
          {/*    width={1}*/}
          {/*    marginTop={5}/>*/}
          {/*<Text fontSize={18} paddingLeft={10} paddingRight={90}>010--0000</Text>*/}
          <ButtonRadius
            marginRight={20}
            bgNavy
            width={'auto'}
            height={'auto'}
            paddingTop={5}
            paddingLeft={9}
            paddingRight={9}
            paddingBottom={5}
            onPress={() => props.onPressDelivery(item)}>
            <Text ftWhite fontSize={13} bold>
              배송지 선택
            </Text>
          </ButtonRadius>
        </ViewRow>
        <ViewRow width={'100%'} height={'auto'} paddingTop={10}>
          <Text fontSize={15} paddingRight={10} paddingLeft={25} ftDarkNavy>
            우편번호
          </Text>
          <Text bgLightBlueGray height={13} width={1} marginTop={2} />
          <Text fontSize={15} paddingLeft={10} ftDarkNavy>
            {item.zipCode}
          </Text>
        </ViewRow>
        <ViewRow width={'100%'} height={'auto'} marginTop={3}>
          <Text
            fontSize={15}
            paddingBottom={20}
            paddingRight={10}
            paddingLeft={25}
            ftDarkNavy>
            {item.address} {item.detailAddress}
          </Text>
        </ViewRow>
        <Text bgIceBlue height={2} width={'auto'} />
      </View>
    ));
  };
  return (
    <>
      {props.userAddress && props.userAddress.length > 0 ? basicView() : null}
    </>
  );
};
export default DeliveryListCard;
