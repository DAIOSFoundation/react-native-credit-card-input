import React, {useEffect, useState} from 'react';
import {Picker} from 'react-native';
// Styled Component
import {
  ScrollView,
  View,
  ViewBorderRadius,
  ViewRow,
} from '../../../../components/styled/View';
import Topbar from '../../../../components/bar/Topbar';
import {ButtonRadius} from '../../../../components/styled/Button';
import {Text} from '../../../../components/styled/Text';
import BuyProduct from '../../../../components/products/BuyProduct';

// NPM Module
import {Actions} from 'react-native-router-flux';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as live4StepActions from '../../../../store/modules/myinfo/live4Step/actions';
import * as paymentActions from '../../../../store/modules/payment/actions';
import * as customModalActions from '../../../../store/modules/modal/customModal/actions';
import * as globalActions from '../../../../store/modules/global/actions';
import ToastMessage from '../../../../components/toast/ToastMessage';
import {deliveryState} from '../../../../utils/deliveryState';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
import * as recommendActions from '../../../../store/modules/recommend/actions';

// 구매내역 화면
const PurchaseListScreen = () => {
  const dispatch = useDispatch();
  const [selectOption, setSelectOption] = useState('');
  const {
    jwtToken,
    sampleHistories,
    successMsg,
    errorMsg,
    toastMsg,
    loading,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      sampleHistories: state.live4Step.sampleHistories,
      successMsg: state.live4Step.successMsg,
      errorMsg: state.live4Step.errorMsg,
      toastMsg: state.live4Step.toastMsg,
      loading: state.loading['live4step/REQUEST_SAMPLE_PRODUCT_HISTORIES'],
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(live4StepActions.request_sample_product_histories(jwtToken));
  }, [jwtToken]);

  useEffect(() => {}, [sampleHistories]);

  useEffect(() => {
    if (successMsg !== '') {
      const attrForm = {
        isOneButton: true,
      };
      dispatch(customModalActions.change_modal_message(successMsg));
      dispatch(customModalActions.change_modal_attr(attrForm));
      dispatch(customModalActions.change_modal_visible(true));
      dispatch(live4StepActions.reset_msg(''));
    }
  }, [successMsg]);

  useEffect(() => {
    if (toastMsg) {
      dispatch(globalActions.change_toast_message(toastMsg));
      // Toast.show(toastMsg);
      dispatch(live4StepActions.reset_toast_msg(null));
    }
  }, [toastMsg]);

  useEffect(() => {
    if (errorMsg !== '') {
      dispatch(customModalActions.change_modal_message(errorMsg));
      dispatch(customModalActions.change_modal_onebutton(true));
      dispatch(customModalActions.change_modal_visible(true));
      dispatch(live4StepActions.reset_msg(''));
    }
  }, [errorMsg]);

  // 우측상단 배송정보

  // 좌측하단 버튼 string
  const statusToButtonString = (status) => {
    switch (status) {
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
        return '구매 확정';
      case 107:
        return '방송 생성';
      default:
        return status;
    }
  };

  const statusToDispatch = (status, sampleOrderHistoryId, _id, productId) => {
    const sampleOrderParams = {
      token: jwtToken,
      status,
      sampleOrderHistoryId,
      _id,
    };
    const broadcastParams = {
      token: jwtToken,
      productId,
    };
    switch (status) {
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
        return purchaseConfirm(sampleOrderParams);
      case 107:
        return dispatch(live4StepActions.create_broadcast(broadcastParams));
      default:
        return status;
    }
  };
  const purchaseConfirm = async (sampleOrderParams) => {
    dispatch(customModalActions.change_modal_message('구매확정 하시겠습니까?'));
    dispatch(customModalActions.change_modal_onebutton(false));
    dispatch(customModalActions.change_modal_visible(true));
    dispatch(
      customModalActions.change_modal_onpress_ok(() =>
        modalOnPressOk(sampleOrderParams),
      ),
    );
  };

  const modalOnPressOk = (sampleOrderParams) => {
    dispatch(
      live4StepActions.request_sample_product_confirm(sampleOrderParams),
    );
  };

  const onPressDetail = (productId) => {
    let param = {
      jwtToken,
      productId,
    };
    dispatch(recommendActions.request_recommend_product_detail(param));
    Actions.myInfoRecommendDetailScreen();
  };

  const SampleHistories = () => {
    let productsArray = [];
    {
      sampleHistories.map((item, index) => {
        item.products.map((product) => {
          console.log('sampleHistories product => ', product);
          productsArray.push(
            <BuyProduct
              key={product._id}
              urlPath={product.sampleImagePath}
              size={74}
              productName={product.sampleName}
              price={
                product.samplePrice * product.sampleAmount +
                product.sampleDeliveryCharge
              }
              state={deliveryState(product.productStatus)}
              date={item.createdAt.substring(0, 10)}
              onPressLeftText={statusToButtonString(product.productStatus)}
              onPressLeftButton={() =>
                statusToDispatch(
                  product.productStatus,
                  item._id,
                  product._id,
                  product.productId,
                )
              }
              onPressTest={() => onPressDetail(product.productId)}
              onPressRightText={'주문 상세 내역'}
              onPressRightButton={() =>
                Actions.purchaseDetailScreen({
                  _id: item._id,
                  productId: product._id,
                })
              }
            />,
          );
        });
      });
    }
    return productsArray;
  };

  return (
    <View height={'100%'}>
      <ToastMessage />
      {/*<View height={'20%'}>*/}
      <Topbar
        isLine
        title={'구매내역'}
        isLeftButton
        onPressLeft={() => Actions.pop()}
      />
      {/*<ViewRow*/}
      {/*  paddingLeft={20}*/}
      {/*  paddingRight={20}*/}
      {/*  paddingTop={20}*/}
      {/*  paddingBottom={10}*/}
      {/*  bgDarkWhite>*/}
      {/*  <ViewBorderRadius brIceBlue width={'65%'} bgWhite marginRight="5%">*/}
      {/*    <Picker*/}
      {/*      selectedValue={selectOption}*/}
      {/*      style={{*/}
      {/*        height: 45,*/}
      {/*        width: '100%',*/}
      {/*        zIndex: 100,*/}
      {/*      }}*/}
      {/*      onValueChange={(itemValue, itemIndex) =>*/}
      {/*        setSelectOption(itemValue)*/}
      {/*      }>*/}
      {/*      <Picker.Item label="전체 조회" color="#162037" value="전체조회"/>*/}
      {/*    </Picker>*/}
      {/*  </ViewBorderRadius>*/}
      {/*  <View width={'30%'}>*/}
      {/*    <ButtonRadius*/}
      {/*      bgTheme*/}
      {/*      borderRadius={10}*/}
      {/*      height={45}*/}
      {/*      onPress={() => console.log('조회하기 이벤트 !!!')}>*/}
      {/*      <Text ftWhite bold>*/}
      {/*        조회하기*/}
      {/*      </Text>*/}
      {/*    </ButtonRadius>*/}
      {/*  </View>*/}
      {/*</ViewRow>*/}
      {/*</View>*/}
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <ScrollView>
          {sampleHistories && sampleHistories.length !== 0 ? (
            SampleHistories()
          ) : (
            <View paddingLeft={15}>
              <Text>구매한 샘플이 없습니다.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default PurchaseListScreen;
