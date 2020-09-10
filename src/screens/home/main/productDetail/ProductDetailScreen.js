import React, {useState, useEffect} from 'react';
// Styled Component
import {
  ScrollView,
  View,
  ViewAbsolute,
  ViewBorderRadius,
  ViewRadiusCustom,
  ViewRow,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import Topbar from '../../../../components/bar/Topbar';
import {Image} from '../../../../components/styled/Image';
import {Button} from '../../../../components/styled/Button';
import BottomButton from '../../../../components/buttons/BottomButton';
import LoadingBar from '../../../../components/loadingBar/LoadingBar';
// utils Import
import {
  disRate,
  LocaleString,
  percentWidth,
  timePrice,
} from '../../../../utils/functions';
import {liveStatus} from '../../../../utils/constants';
// NPM Module
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Actions} from 'react-native-router-flux';
// assets Img
const shareIcon = require('../../../../assets/common/icon_share.png');
const modalCancel = require('../../../../assets/common/icon_cancel_black.png');
// TabView Import
import ProductDetailRoute from './tabView/ProductDetailRoute';
import SellerReviewRoute from './tabView/SellerReviewRoute';
import CustomerReviewRoute from './tabView/CustomerReviewRoute';
import QnARoute from './tabView/QnARoute';
// redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as customerReviewActions from '../../../../store/modules/productDetail/tabView/customerReview/actions';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
import * as productDetailActions from '../../../../store/modules/productDetail/actions';
// Screen Import
import BottomModalScreen from './bottomModal/BottomModalScreen';

// 상품 상세 페이지 슬라이더 이미지
import SliderProductDetailImage from '../../../../components/carousel/SliderProductDetailImage';
import {screenWidth} from '../../../../components/styled/ScreenSize';

// 상품상세정보 스크린
const ProductDetailScreen = (props) => {
  const [mainImages, setMainImages] = useState([]);
  const [statusBottomButton, setStatusBottomButton] = useState(null);

  // redux
  const dispatch = useDispatch();

  const {
    jwtToken,
    userId,
    toggleReviewOrder,
    broadcastId,
    productName,
    productImages,
    productStatus,
    expectedStartTime,
    expectedEndTime,
    productLivePrice,
    productFeedPrice,
    productNormalPrice,
    productDescription,
    productDeliveryCompany,
    productDeliveryCharge,
    productIsExtraCharge,
    productExtraCharge,
    productCategory,
    informationNotices,
    isReturnCharge,
    returnCharge,
    isExchangeCharge,
    exchangeCharge,
    loading,
    tabLocation,
    paymentType,
    regularPaymentStatus,
  } = useSelector(
    (state) => ({
      jwtToken: state.user.jwtToken,
      userId: state.user.userId,
      toggleReviewOrder: state.customerReview.toggleReviewOrder,
      broadcastId: state.productDetail.broadcastId,
      productName: state.productDetail.productName,
      productImages: state.productDetail.productImages,
      productStatus: state.productDetail.productStatus,
      expectedStartTime: state.productDetail.expectedStartTime,
      expectedEndTime: state.productDetail.expectedEndTime,
      productLivePrice: state.productDetail.productLivePrice,
      productFeedPrice: state.productDetail.productFeedPrice,
      productNormalPrice: state.productDetail.productNormalPrice,
      productDescription: state.productDetail.productDescription,
      productDeliveryCompany: state.productDetail.productDeliveryCompany,
      productDeliveryCharge: state.productDetail.productDeliveryCharge,
      productIsExtraCharge: state.productDetail.productIsExtraCharge,
      productExtraCharge: state.productDetail.productExtraCharge,
      productCategory: state.productDetail.productCategory,
      informationNotices: state.productDetail.informationNotices,
      isReturnCharge: state.productDetail.isReturnCharge,
      returnCharge: state.productDetail.returnCharge,
      isExchangeCharge: state.productDetail.isExchangeCharge,
      exchangeCharge: state.productDetail.exchangeCharge,
      loading: state.loading['product/REQUEST_PRODUCT_DETAIL'],
      tabLocation: state.global.tabLocation,
      paymentType: state.productDetail.paymentType,
      regularPaymentStatus: state.regularPayment.regularPaymentStatus,
    }),
    shallowEqual,
  );

  useEffect(() => {
    imagesQuarter();
  }, [productImages]);

  // 미리댓글 페이지 이동
  const onPressAlreadyComment = (id) => {
    if (tabLocation === 'Calendar') {
      Actions.calendarAlreadyCommentScreen(id);
    } else if (tabLocation === 'Search') {
      Actions.searchAlreadyCommentScreen(id);
    } else {
      Actions.alreadyCommentScreen(id);
    }
  };

  useEffect(() => {
    // 메인화면에서 상품 상세보기로 이동할 시 dispatch 실행
    if (jwtToken && userId && props.data[2] === 'main') {
      const body = {
        broadcastId: props.data[0],
        productId: props.data[1],
        jwtToken: jwtToken,
      };

      dispatch(broadcastActions.request_broadcast_product(body));
    }

    return () => {
      dispatch(productDetailActions.change_bottom_modal_position_value([0]));
    };
  }, [jwtToken, userId]);

  const bottomOpen = () => {
    dispatch(productDetailActions.change_bottom_modal_position_value(['60%']));
  };

  const buttonTextChange = () => {
    return paymentType ? '정기결제' : '구매하기'
  };

  useEffect(() => {
    const status = [5, 6, 7, 8];
    if (status.includes(productStatus)) {
      // 생방송 중
      if (jwtToken && userId) {
        // 로그인한 상태
        setStatusBottomButton(
          <View>
            <BottomButton
              onPress={bottomOpen}
              width={'100%'}
              text={buttonTextChange()}
            />
          </View>,
        );
      }
    } else if (productStatus === 3 || productStatus === 4) {
      // 방송 전
      setStatusBottomButton(
        <View>
          <BottomButton
            onPress={() => onPressAlreadyComment(broadcastId)}
            width={'100%'}
            text={'미리댓글'}
          />
        </View>,
      );
    }
  }, [paymentType, productStatus]); //todo sellingStatus 분기 예정

  const onPressToggleReviewOrder = () => {
    dispatch(customerReviewActions.toggle_review_order());
  };

  const productDetailRoute = () => {
    if (index === 0) {
      return (
        <ProductDetailRoute
          productCategory={productCategory}
          informationNotices={informationNotices}
          isReturnCharge={isReturnCharge}
          returnCharge={returnCharge}
          isExchangeCharge={isExchangeCharge}
          exchangeCharge={exchangeCharge}
        />
      );
    } else {
      return null;
    }
  };
  const sellerReviewRoute = () => {
    if (index === 1) {
      return <SellerReviewRoute />;
    } else {
      return null;
    }
  };
  // const customerReviewRoute = () => {
  //   if (index === 2) {
  //     return <CustomerReviewRoute/>;
  //   } else {
  //     return null;
  //   }
  // };
  // const qnaRoute = () => {
  //   if (index === 3) {
  //     return <QnARoute/>;
  //   } else {
  //     return null;
  //   }
  // };

  const initialLayout = {width: percentWidth(100)};

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'productDetail', title: '상세정보'},
    {key: 'sellerReview', title: '셀러리뷰'},
    // {key: 'customerReview', title: '고객리뷰'},
    // {key: 'qnaReview', title: 'Q&A'},
  ]);

  const renderScene = SceneMap({
    productDetail: productDetailRoute,
    sellerReview: sellerReviewRoute,
    // customerReview: customerReviewRoute,
    // qnaReview: qnaRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#e6427a"
      inactiveColor="black"
      labelStyle={{fontWeight: 'bold'}}
      indicatorStyle={{backgroundColor: '#e6427a'}}
      style={{backgroundColor: 'white'}}
    />
  );

  // 고객리뷰 - 리뷰순서 바텀 모달
  const reviewOrderBottomModal = () => {
    return (
      <ViewAbsolute width={'100%'} height={'100%'}>
        <View height={'70%'} bgBlack style={{opacity: 0.6}} />
        <View height={'31%'} style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <ViewRadiusCustom
            bgWhite
            justifyContent={'center'}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            marginBottom={-1}
            width={'100%'}
            height={'30%'}>
            <ViewRow
              justifyContent={'space-between'}
              alignItems={'center'}
              paddingLeft={15}
              paddingRight={15}>
              <Text bold ftDarkNavy ftLarge>
                리뷰 보기 순서
              </Text>
              <Button
                marginRight={15}
                alignSelf={'flex-end'}
                width={25}
                height={25}
                activeOpacity={1}
                onPress={onPressToggleReviewOrder}>
                <Image width={25} height={25} source={modalCancel} />
              </Button>
            </ViewRow>
          </ViewRadiusCustom>
          <View bgWhite justifyContent={'center'} height={'70%'}>
            <Button
              justifyContent={'flex-start'}
              paddingLeft={15}
              onPress={() => console.log('최신순 !!!')}>
              <Text fontSize={16} ftDarkNavy>
                최신순
              </Text>
            </Button>
            <Button
              justifyContent={'flex-start'}
              paddingLeft={15}
              onPress={() => console.log('평점 높은순 !!!')}>
              <Text fontSize={16} ftDarkNavy>
                평점 높은순
              </Text>
            </Button>
            <Button
              justifyContent={'flex-start'}
              paddingLeft={15}
              onPress={() => console.log('평점 낮은순 !!!')}>
              <Text fontSize={16} ftDarkNavy>
                평점 낮은순
              </Text>
            </Button>
          </View>
        </View>
      </ViewAbsolute>
    );
  };

  // 뒤로가기 버튼
  const onPressBack = () => {
    Actions.pop();
  };

  // 제품 이미지 분기 처리
  const imagesQuarter = () => {
    let initItems = [];

    if (productImages) {
      for (let i = 0; i < productImages.length; i++) {
        if (productImages[i].imageType === 'productMain') {
          initItems.push(productImages[i].path);
        }
      }
      setMainImages(initItems);
    }
  };

  const allImages = () => {
    let initItems = [];

    if (productImages) {
      for (let i = 0; i < productImages.length; i++) {
        initItems.push(productImages[i].path);
      }
    }
  };

  // 라이브 할인가 태그
  const liveTag = () => {
    let timeCheck = new Date(new Date(expectedEndTime).getTime() + 3600 * 1000);

    return (new Date(expectedStartTime) < new Date() &&
      new Date() < timeCheck) ||
      liveStatus.includes(productStatus) ? (
      <ViewBorderRadius
        alignSelf={'flex-start'}
        paddingTop={3}
        paddingBottom={3}
        paddingLeft={5}
        paddingRight={5}
        bgTheme
        borderRadius={100}
        marginTop={15}
        marginBottom={5}>
        <Text ftWhite ftSmall bold>
          라이브할인가
        </Text>
      </ViewBorderRadius>
    ) : null;
  };

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'상품 상세 정보'}
        isLeftButton
        // isRightButton
        // rightButtonImage={shareIcon}
        onPressLeft={onPressBack}
      />
      {loading ? (
        <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
        </View>
      ) : (
        <>
          <ScrollView>
            <SliderProductDetailImage
              data={productImages}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              pagination
            />
            <View
              paddingLeft={15}
              paddingRight={15}
              paddingTop={20}
              paddingBottom={20}>
              <Text ftLarge>{productName}</Text>
              <ViewRow alignItems={'flex-end'}>
                <Text ftTheme marginRight={5}>
                  {disRate(
                    productNormalPrice,
                    timePrice(
                      expectedStartTime,
                      expectedEndTime,
                      productLivePrice,
                      productFeedPrice,
                      productStatus,
                    ),
                  )}
                  %
                </Text>
                <Text fontSize={22} bold marginRight={5}>
                  {LocaleString(
                    timePrice(
                      expectedStartTime,
                      expectedEndTime,
                      productLivePrice,
                      productFeedPrice,
                      productStatus,
                    ),
                  )}
                  원
                </Text>
                <Text ftLightGray textDecorationLine={'line-through'}>
                  {LocaleString(productNormalPrice)}원
                </Text>
                <View marginLeft={15}>{liveTag()}</View>
              </ViewRow>
            </View>
            <View bgDarkWhite height={3} />
            <View
              paddingTop={15}
              paddingBottom={15}
              paddingLeft={15}
              paddingRight={15}>
              <ViewRow marginTop={5} marginBottom={5}>
                <Text width={'30%'} ftDarkGray>
                  배송
                </Text>
                <Text width="70%">{productDeliveryCompany}</Text>
              </ViewRow>
              <ViewRow marginTop={5} marginBottom={5}>
                <Text width={'30%'} ftDarkGray>
                  배송비
                </Text>
                <Text width="70%">
                  {productDeliveryCharge === 0
                    ? '무료배송'
                    : productDeliveryCharge + '원'}
                  {productIsExtraCharge
                    ? ' (제주/도서산간 배송비 ' + productExtraCharge + '원)'
                    : ' (제주/도서산간 배송 불가)'}
                </Text>
              </ViewRow>
              <ViewRow marginTop={5} marginBottom={5}>
                <Text width={'30%'} ftDarkGray>
                  발송
                </Text>
                <Text width="70%">2일 이내 발송 예정 (주말/공휴일 제외)</Text>
              </ViewRow>
            </View>
            <View bgDarkWhite height={15} />
            <View>
              <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </View>
          </ScrollView>

          {/* 상태에 따른 하단 바 호출 */}
          {statusBottomButton}

          {/*{toggleReviewOrder === true ? reviewOrderBottomModal() : null}*/}
          <BottomModalScreen
            broadcastId={props.data[0]}
            productId={props.data[1]}
          />
        </>
      )}
    </View>
  );
};

export default ProductDetailScreen;
