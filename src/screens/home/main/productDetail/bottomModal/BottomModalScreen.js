import React from 'react';
// Styled Component
import {View, ViewRadiusCustom} from '../../../../../components/styled/View';
import BottomModal from '../../../../../components/modal/BottomModal';
import {Button} from '../../../../../components/styled/Button';
import {Image} from '../../../../../components/styled/Image';
// Screen Import
import BottomModalView from './BottomModalView';
// utils Import
import {disRate, timePrice} from '../../../../../utils/functions';
// Redux
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as productDetailActions from '../../../../../store/modules/productDetail/actions';
// assets Image
const modalCancel = require('../../../../../assets/common/icon_cancel_black.png');

const BottomModalScreen = (props) => {
  const dispatch = useDispatch();

  const {bottomModalPositionValue} = useSelector(
    (state) => ({
      bottomModalPositionValue: state.productDetail.bottomModalPositionValue,
    }),
    shallowEqual,
  );

  const bottomClosed = () => {
    dispatch(productDetailActions.change_bottom_modal_position_value([0]));
  };

  const {
    currentProduct,
    productStatus,
    expectedStartTime,
    expectedEndTime,
    productLivePrice,
    productFeedPrice,
    productNormalPrice,
    deliveryChargeAmount,
    isExtraCharge,
    extraCharge,
  } = useSelector(
    (state) => ({
      currentProduct: state.broadcast.currentProduct,
      productStatus: state.productDetail.productStatus,
      expectedStartTime: state.productDetail.expectedStartTime,
      expectedEndTime: state.productDetail.expectedEndTime,
      productLivePrice: state.productDetail.productLivePrice,
      productFeedPrice: state.productDetail.productFeedPrice,
      productNormalPrice: state.productDetail.productNormalPrice,
      deliveryChargeAmount: state.productDetail.deliveryChargeAmount,
      isExtraCharge: state.productDetail.isExtraCharge,
      extraCharge: state.productDetail.extraCharge,
    }),
    shallowEqual,
  );

  const bottomSheetHeader = () => {
    return (
      <ViewRadiusCustom
        bgWhite
        justifyContent={'center'}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        marginBottom={-1}
        width={'100%'}
        height={50}>
        <Button
          marginRight={15}
          alignSelf={'flex-end'}
          width={25}
          height={25}
          activeOpacity={1}
          onPress={bottomClosed}>
          <Image width={25} height={25} source={modalCancel} />
        </Button>
      </ViewRadiusCustom>
    );
  };
  const bottomSheetContent = () => {
    return (
      <View bgWhite height={'100%'}>
        <BottomModalView
          product={currentProduct}
          broadcastId={props.broadcastId}
          productId={props.productId}
          price={timePrice(
            expectedStartTime,
            expectedEndTime,
            productLivePrice,
            productFeedPrice,
            productStatus,
          )}
          discount={disRate(
            productNormalPrice,
            timePrice(
              expectedStartTime,
              expectedEndTime,
              productLivePrice,
              productFeedPrice,
              productStatus,
            ),
          )}
          status={productStatus}
          deliveryChargeAmount={deliveryChargeAmount}
          isExtraCharge={isExtraCharge}
          extraCharge={extraCharge}
        />
      </View>
    );
  };

  return (
    <>
      <BottomModal
        headerGesture={false}
        contentGesture={false}
        initialSnap={0}
        snapPoints={bottomModalPositionValue}
        header={bottomSheetHeader()}
        view={bottomSheetContent()}
      />
    </>
  );
};

export default BottomModalScreen;
