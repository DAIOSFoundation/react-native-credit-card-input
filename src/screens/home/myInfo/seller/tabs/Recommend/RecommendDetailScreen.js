import React, {useState, useEffect} from 'react';
// Styled Component
import {
  View,
  ScrollView,
  ViewRow,
  ViewBorderRow,
} from '../../../../../../components/styled/View';
import Topbar from '../../../../../../components/bar/Topbar';
import LoadingBar from '../../../../../../components/loadingBar/LoadingBar';
import {Button} from '../../../../../../components/styled/Button';
import {Image} from '../../../../../../components/styled/Image';
import {Text} from '../../../../../../components/styled/Text';
// NPM Module
import {Actions} from 'react-native-router-flux';
import {Rows, Table, TableWrapper} from 'react-native-table-component';
// Redux
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
// utils
import {LocaleString} from '../../../../../../utils/functions';
import {
  airlineTicketCategory,
  babyProductsCategory,
  bagCategory,
  beddingCurtainCategory,
  booksCategory,
  carAccessoriesCategory,
  carRentalCategory,
  clothingCategory,
  cosmeticsCategory,
  digitalContentsCategory,
  electricProdductCategory,
  etcGoodsCategory,
  etcService,
  fashionAccessoriesCategory,
  foodCategory,
  furnitureCategory,
  giftCardCouponCategory,
  healthFunctionalFoodCategory,
  hotelPensionCategory,
  imageHaCategory,
  instrumentCategory,
  jewelryCategory,
  kitchenUtensilsCategory,
  mobileCouponCategory,
  moviePerformanceCategory,
  navigationCategory,
  officeApplianceCategory,
  opticalInstrumentCategory,
  phoneCategory,
  processedFoodCategory,
  productRentalCategory,
  regulatoryAffairsCategory,
  seasonHaCategory,
  shoseCategory,
  smallElectronicCategory,
  sportingGoodsCategory,
  travelCategory,
} from '../../../../../../utils/constants';
import {StyleSheet} from 'react-native';
// assets Images
const toggleDown = require('../../../../../../assets/toggle/toggle_down.png');
const toggleUp = require('../../../../../../assets/toggle/toggle_up.png');

// 추천 상품 상세화면 페이지
const RecommendDetailScreen = () => {
  // redux
  const dispatch = useDispatch();

  const [subImages, setSubImages] = useState([]);
  const [productInfoToggle, setProductInfoToggle] = useState(false); // 상품 정보 제공 고시 토글 버튼
  const [returnExchangeToggle, setReturnExchangeToggle] = useState(false); // 반품 / 교환 안내 토글 버튼
  const [tableData, setTableData] = useState([]);
  const [informationNotices, setInformationNotices] = useState(null);

  const {
    loading,
    productInformationNotices,
    productImages,
    productName,
    productDeliveryCharge,
    productIsExtraCharge,
    productExtraCharge,
    productDeliveryCompany,
    isLend,
    normalPrice,
    samplePrice,
    productCategory,
    isReturnCharge,
    returnCharge,
    isExchangeCharge,
    exchangeCharge,
  } = useSelector(
    (state) => ({
      loading: state.loading['recommend/REQUEST_RECOMMEND_PRODUCT_DETAIL'],
      productInformationNotices: state.recommend.productInformationNotices,
      productImages: state.recommend.productImages,
      productName: state.recommend.productName,
      productDeliveryCharge: state.recommend.productDeliveryCharge,
      productIsExtraCharge: state.recommend.productIsExtraCharge,
      productExtraCharge: state.recommend.productExtraCharge,
      productDeliveryCompany: state.recommend.productDeliveryCompany,
      isLend: state.recommend.isLend,
      normalPrice: state.recommend.normalPrice,
      samplePrice: state.recommend.samplePrice,
      productCategory: state.recommend.productCategory,
      isReturnCharge: state.recommend.isReturnCharge,
      returnCharge: state.recommend.returnCharge,
      isExchangeCharge: state.recommend.isExchangeCharge,
      exchangeCharge: state.recommend.exchangeCharge,
    }),
    shallowEqual,
  );

  useEffect(() => {
    imagesQuarter();
  }, [productImages]);

  useEffect(() => {
    productCategoryQuarter();

    let dataItems = [];

    if (productInformationNotices && informationNotices) {
      productInformationNotices.map((item, index) =>
        dataItems.push([informationNotices[index], item]),
      );
    }

    setTableData(dataItems);
  }, [informationNotices, productInformationNotices]);

  // 제품 이미지 분기 처리
  const imagesQuarter = () => {
    let initItems = [];

    if (productImages) {
      for (let i = 0; i < productImages.length; i++) {
        if (productImages[i].imageType === 'productSub') {
          initItems.push(productImages[i].path);
        }
      }
      setSubImages(initItems);
    }
  };

  // 뒤로가기 버튼 기능
  const onPressBack = () => {
    Actions.pop();
  };

  const samplePriceName = () => {
    if (samplePrice === 0) {
      return '무상제공';
    } else {
      if (isLend === true) {
        return '대여가';
      } else {
        return '구매가';
      }
    }
  };

  // 상품 정보 제공 고시 - 토글 버튼
  const onPressProductInfoToggle = () => {
    setProductInfoToggle(!productInfoToggle);
  };

  // 반품 / 교환 안내 - 토글 버튼
  const onPressReturnExchangeToggle = () => {
    setReturnExchangeToggle(!returnExchangeToggle);
  };

  // 상품 카테고리에 따른 고시정보 저장
  const productCategoryQuarter = () => {
    let items;

    switch (productCategory) {
      case 0:
        items = clothingCategory;
        break;
      case 1:
        items = shoseCategory;
        break;
      case 2:
        items = bagCategory;
        break;
      case 3:
        items = fashionAccessoriesCategory;
        break;
      case 4:
        items = beddingCurtainCategory;
        break;
      case 5:
        items = furnitureCategory;
        break;
      case 6:
        items = imageHaCategory;
        break;
      case 7:
        items = electricProdductCategory;
        break;
      case 8:
        items = seasonHaCategory;
        break;
      case 9:
        items = officeApplianceCategory;
        break;
      case 10:
        items = opticalInstrumentCategory;
        break;
      case 11:
        items = smallElectronicCategory;
        break;
      case 12:
        items = phoneCategory;
        break;
      case 13:
        items = navigationCategory;
        break;
      case 14:
        items = carAccessoriesCategory;
        break;
      case 15:
        items = regulatoryAffairsCategory;
        break;
      case 16:
        items = kitchenUtensilsCategory;
        break;
      case 17:
        items = cosmeticsCategory;
        break;
      case 18:
        items = jewelryCategory;
        break;
      case 19:
        items = foodCategory;
        break;
      case 20:
        items = processedFoodCategory;
        break;
      case 21:
        items = healthFunctionalFoodCategory;
        break;
      case 22:
        items = babyProductsCategory;
        break;
      case 23:
        items = instrumentCategory;
        break;
      case 24:
        items = sportingGoodsCategory;
        break;
      case 25:
        items = booksCategory;
        break;
      case 26:
        items = hotelPensionCategory;
        break;
      case 27:
        items = travelCategory;
        break;
      case 28:
        items = airlineTicketCategory;
        break;
      case 29:
        items = carRentalCategory;
        break;
      case 30:
        items = productRentalCategory;
        break;
      case 31:
        items = digitalContentsCategory;
        break;
      case 32:
        items = giftCardCouponCategory;
        break;
      case 33:
        items = etcGoodsCategory;
        break;
      case 34:
        items = mobileCouponCategory;
        break;
      case 35:
        items = moviePerformanceCategory;
        break;
      case 36:
        items = etcService;
        break;
      default:
        break;
    }

    return setInformationNotices(items);
  };

  if (loading) {
    return (
      <View style={{position: 'absolute', zIndex: 0}}>
        <LoadingBar color={'#e6427a'} bgColor={{bgWhite: true}} />
      </View>
    );
  }

  return (
    <View height={'100%'}>
      <Topbar
        isLine
        title={'샘플 상품 상세화면'}
        onPressLeft={onPressBack}
        isLeftButton={true}
      />
      <ScrollView>
        <Image
          source={{uri: productImages ? productImages[0].path : null}}
          width={'100%'}
          height={360}
        />
        <View
          paddingLeft={15}
          paddingRight={15}
          paddingTop={10}
          paddingBottom={10}>
          <Text ftLarge>{productName}</Text>
          <ViewRow alignItems={'center'}>
            <Text fontSize={16} ftGray marginRight={5}>
              판매가
            </Text>
            <Text fontSize={16} ftGray bold marginRight={15} paddingBottom={1}>
              {LocaleString(normalPrice)} 원
            </Text>
            <Text ftTheme marginRight={5} bold>
              {samplePriceName()}
            </Text>
            <Text fontSize={16} bold marginRight={5}>
              {LocaleString(samplePrice)} 원
            </Text>
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
          {subImages.length !== 0
            ? subImages.map((item, index) => (
                <Image
                  key={index}
                  witdh={'100%'}
                  height={330}
                  source={{uri: item}}
                  marginTop={15}
                />
              ))
            : null}
        </View>
        <View height={5} marginTop={15} width={'100%'} bgIceBlue />
        <View marginBottom={15}>
          <ViewRow
            paddingLeft={15}
            paddingRight={15}
            paddingTop={15}
            paddingBottom={15}
            justifyContent={'space-between'}>
            <Text ftLarge ftDarkNavy>
              상품 정보 제공 고시
            </Text>
            <Button
              width={'auto'}
              height={'auto'}
              onPress={onPressProductInfoToggle}>
              {productInfoToggle ? (
                <Image width={19} height={19} source={toggleUp} />
              ) : (
                <Image width={19} height={19} source={toggleDown} />
              )}
            </Button>
          </ViewRow>
          <View height={2} width={'100%'} bgIceBlue marginBottom={15} />
          {productInfoToggle ? (
            <View paddingLeft={15} paddingRight={15}>
              <Table borderStyle={{borderWidth: 2, borderColor: 'white'}}>
                <TableWrapper style={styles.wrapper}>
                  <Rows
                    data={tableData}
                    flexArr={[1]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
            </View>
          ) : null}
        </View>
        <View height={5} width={'100%'} bgIceBlue />
        <ViewRow
          paddingLeft={15}
          paddingRight={15}
          paddingTop={15}
          paddingBottom={15}
          justifyContent={'space-between'}>
          <Text ftLarge ftDarkNavy>
            반품 / 교환 안내
          </Text>
          <Button
            width={'auto'}
            height={'auto'}
            onPress={onPressReturnExchangeToggle}>
            {returnExchangeToggle ? (
              <Image width={19} height={19} source={toggleUp} />
            ) : (
              <Image width={19} height={19} source={toggleDown} />
            )}
          </Button>
        </ViewRow>
        <View height={2} width={'100%'} bgIceBlue marginBottom={15} />
        {returnExchangeToggle ? (
          <View>
            <View paddingLeft={15} paddingRight={15}>
              <Text bold>반품배송비</Text>
              <Text marginTop={10} marginBottom={10} ftTheme bold>
                {isReturnCharge ? LocaleString(returnCharge) + '원' : '무료'}
              </Text>
              <Text bold>교환배송비</Text>
              <Text marginTop={10} marginBottom={15} ftTheme bold>
                {isExchangeCharge
                  ? LocaleString(exchangeCharge) + '원'
                  : '무료'}
              </Text>
            </View>
            <View height={2} width={'100%'} bgIceBlue marginBottom={15} />
            <View paddingLeft={15} paddingRight={15}>
              <Text marginBottom={10} bold>
                반품/교환 안내
              </Text>
              <View>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    상품불량 및 오배송등의 이유로 반품하실 경우, 반품 배송비는
                    무료입니다.
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품신청시 즉시 환불처리됩니다.(카드사 사정에 따라
                    카드취소는 시일이 쇼요될 수 있습니다.)
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품 접수 후 영업일 기준 2~5일 이내에 직접 방문하여 상품을
                    수거합니다.
                  </Text>
                </ViewRow>
                <Text marginTop={15} marginBottom={10} bold>
                  반품/교환 가능시점
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품 및 교환은 상품 수령 후 30일 이내에 신청하실 수
                    있습니다. 의류/속옷/보석/서적/잡화/컴퓨터/디지털기기는 15일,
                    신선식품은 7일. 단, 신선식품 중 냉장/냉동/생물 상품은
                    배송준비 시작 후 취소/반품 불가.
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    재화 등의 내용이 표시, 광고의 내용과 다르거나 계약내용과
                    다르게 이행된 경우에는 전자상거래법 제17조3항에 따라
                    청약철회를 할 수 있습니다.
                  </Text>
                </ViewRow>
                <Text marginTop={15} bold>
                  반품/교환 불가사유
                </Text>
                <Text marginBottom={10} bold>
                  다음의 경우에는 반품/교환이 불가합니다.
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품/교환 가능기간을 초과하였을 경우 상품 및 구성품을
                    분실하였거나 취급부주의로 인한 파손/고장/오염된 경우
                    고객님의 요청에 의해 상품사양이 변경(이니셜 상품, 사이즈
                    맞춤 상품 등)된 경우는 제작이 시작된 이후 취소 및
                    반품/교환이 불가 합니다.
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    상품을 사용하였거나 세탁, 수선한 경우고객님의 책임있는
                    사유로 상품 등이 멸실 또는 훼손 된 경우(단, 상품의 내용을
                    확인하기 위하여 포장 등을 훼손한 경우 제외)
                  </Text>
                </ViewRow>
                <Text marginTop={15} marginBottom={10} bold>
                  반품/교환 참고사항
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품/교환시 고객님 귀책사유로 인해 수거가 지연될 경우에는
                    반품이 제한될 수 있습니다. 일부 상품의 경우, 제조사의
                    사정(신모델 출시 등) 및 부품 가격변동 등에 의해 가격이 변동
                    될 수 있으며, 이로 인한 반품 및 가격보상은 불가합니다.
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    비닐포장된 상품의 비닐포장을 개봉, 훼손한 경우 반품이
                    불가합니다. 구성품의 일부를 사용한 경우 구성품 비용은 고객님
                    부담입니다. 일부상품은 트러블 발생 시 소견서, 진료 확인서 중
                    1가지를 첨부하셔야 반품이 가능합니다. (단, 기타 제반 비용은
                    고객님의 부담입니다.) 치료비 지급은 해당 상품과의 인과관계가
                    성립되어야 하며 자의로 행한 성형, 미용관리 목적으로 인한
                    경우에는 지급하지 않습니다. 일부 화장품은 특정 고객님의
                    피부에 맞지 않을 수 있으며, 이는 상품자체 품질의 문제로 볼
                    수 없습니다. 본품을 반품할 경우 사은품도 반품처리되며
                    사은품을 사용한 경우 해당 비용을 고객님이 부담하신 후 본품만
                    반품처리됩니다. 자체 A/S센터가 있는 상품은 해당 A/S센터에서
                    불량제품 판정을 받으신 후 반품신청 해주시기 바랍니다.
                  </Text>
                </ViewRow>
                <Text marginTop={20} marginBottom={10} bold>
                  미성년자 권리보호 안내
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    구매자가 미성년자인 경우에는 상품 구입시 법정 대리인이
                    동의하지 아니하면 미성년자 본인 또는 법정 대리인이 구매
                    취소할 수 있습니다.
                  </Text>
                </ViewRow>
              </View>
            </View>
            <View height={2} width={'100%'} bgIceBlue marginTop={20} />
            <View paddingLeft={15} paddingRight={15} marginBottom={15}>
              <View>
                <Text marginTop={15} marginBottom={10} bold>
                  전자상거래 반품규정 안내
                </Text>
                <Text ftDarkGray bold ftSmall>
                  전자상거래 등에서의 소비자 보호에 관한 법률에 의한 반품규정이
                  판매자가 지정한 반품조건보다 우선합니다.
                </Text>
                <Text ftGray ftSmall>
                  단, 판매자 또는 협력사가 지정한 반품조건이 소비자에게 더
                  유리한 경우 가장 유리한 반품조건으로 적용됩니다.
                </Text>
                <Text ftGray ftSmall>
                  구매자가 미성년자인 경우에는 상품 구입시 법정 대리인이
                  동의하지 아니하면 미성년자 본인 또는 법정 대리인이 구매취소 할
                  수 있습니다.
                </Text>
                <Text ftGray ftSmall>
                  반품 기간 이내에 구매자가 반품을 요청할 경우 판매자는 구매자의
                  반품을 인정하고 받아들여야 합니다.
                </Text>
                <Text ftGray ftSmall>
                  상품 상세 설명에 반품불가 사유를 표기하더라도
                  전자상거래등에서의 소비자보호에 관한 법률에서 고지한 반품 불가
                  사유 이외에는 구매자의 반품을 받아주어야 하며 상품을 반환 받은
                  날로부터 지체없이 결제업자에게 취소 요청 또는 3 영업일 이내에
                  대금을 환급 하여야 합니다. (고객의 요구가 아닌 판매자 임의로
                  적립금 또는 상품 교환으로 대체할 수 없습니다.)
                </Text>
              </View>
              <View>
                <Text marginTop={15} marginBottom={10} bold>
                  반품요청 가능기간
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    구매자 단순변심 : 물품 수령 후 7일 이내 (구매자 반품비 부담)
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    표시/광고와 상이하거나 계약내용과 다르게 이행된 경우 : 물품
                    수령 후 3개월 이내, 사실을 안 날로부터 30일 이내 (판매자
                    반품비 부담)
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    단, 아래의 사유에 의해 반품기간이 지났거나 반품불가 상품일
                    경우에는 반품이 거절될 수 있기에 구매자의 주의를 요합니다.
                  </Text>
                </ViewRow>
              </View>
              <View>
                <Text marginTop={15} marginBottom={10} bold>
                  반품이 불가능한 경우
                </Text>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    반품요청기간이 지난 경우
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    구매자에게 책임있는 사유로 상품등이 멸실 또는 훼손된 경우
                    (다만, 상품등의 내용을 확인하기 위하여 포장등을 훼손한
                    경우는 제외)
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    구매자의 사용 또는 일부 소비에 의하여 상품등의 가치가 현저히
                    감소한 경우 (화장품류/식품류는 밀봉 개봉시, 패션류/침구류는
                    수선했거나 세탁하였을 시, 기타 사용/분리/훼손에 의해 상품의
                    가치가 현저히 감소하여 재판매가 불가할 시)
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    시간의 경과에 의하여 재판매가 곤란할 정도로 상품의 가치가
                    현저히 감소한 경우
                  </Text>
                </ViewRow>
                <ViewRow>
                  <View
                    bgTheme
                    height={4}
                    width={4}
                    marginTop={8}
                    borderRadius={2}
                    marginRight={5}
                  />
                  <Text ftGray ftSmall>
                    복제가 가능한 상품의 포장을 훼손한 경우 (CD / DVD / GAME /
                    BOOK 등의 경우 포장 개봉시)
                  </Text>
                </ViewRow>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  text: {fontSize: 11},
  row: {marginVertical: 5},
});

export default RecommendDetailScreen;
