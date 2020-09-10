import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {
  SafeAreaView,
  View,
  ViewBorderRadius,
  ViewBorderRow,
  ViewRow,
  ViewRowBorderRadius,
} from '../../../../components/styled/View';
import {Text} from '../../../../components/styled/Text';
import {Image, ImageBorder} from '../../../../components/styled/Image';
import {screenWidth} from '../../../../components/styled/ScreenSize';
import {disRate, timePrice, LocaleString} from '../../../../utils/functions';
import {
  Button,
  ButtonBorderRadius,
  ButtonRadius,
} from '../../../../components/styled/Button';
import * as broadcastActions from '../../../../store/modules/broadcast/actions';
import {Actions} from 'react-native-router-flux';
import * as productDetailActions from '../../../../store/modules/productDetail/actions';
import {useDispatch} from 'react-redux';
import Moment from 'moment';

const Product = (props) => {
  const dispatch = useDispatch();

  const onclick = (data) => {
    let param = {
      broadcastId: data.broadcastId,
      productId: data.productId,
    };
    // if (data.broadcastStatus === 8 &&  (data.productStatus !== 3 && data.productStatus!==4)) {
    //   if (props.previewScreen === 'YoutubeFullScreen')
    //     Actions.youtubeFullScreen(param);
    //   else if (props.previewScreen === 'SearchInfo') {
    //     Actions.searchYoutubeFullScreen(param);
    //   }
    // }
    // else
    // console.log('dfisdjfsdijfosijfosdijfsoij',data);
    //   if ((data.broadcastStatus !== 0 &&data.broadcastStatus !== 1 &&data.broadcastStatus !== 2) && (data.productStatus !== 3 && data.productStatus!==4)) {

    if (data.productStatus === 2) {
      if (props.previewScreen === 'YoutubeFullScreen') {
        dispatch(productDetailActions.request_product_detail(param));
        Actions.productDetailScreen([data.broadcastId, data.productId, 'main']);
      } else if (props.previewScreen === 'SearchInfo') {
        dispatch(productDetailActions.request_product_detail(param));
        Actions.searchProductDetailScreen([
          data.broadcastId,
          data.productId,
          'main',
        ]);
        // console.log('true');
      }
    }
    // }
    // else {
    //     console.log('false');
    //   }
  };

  return (
    <SafeAreaView marginLeft={15} marginRight={15} marginTop={10}>
      <ViewBorderRow>
        <Text bold fontSize={15} paddingRight={5} marginBottom={5}>
          상품
        </Text>
        <Text fontSize={15} bold ftTheme>
          {props.products.length}
        </Text>
      </ViewBorderRow>
      <View bgDarkWhite height={2} />
      <View alignItems={'center'} marginTop={20}>
        <FlatList
          data={props.products}
          // style={{padding:'5%'}}
          numColumns={2}
          // width={'100%'}
          renderItem={({item, index}) => (
            <ViewBorderRadius
              width={screenWidth / 2.2}
              marginBottom={25}
              paddingLeft={10}
              paddingRight={10}>
              <TouchableOpacity
                onPress={() =>
                  onclick({
                    productStatus: item.productInfo.sellingStatus,
                    broadcastStatus: item.broadcastInfo.status,
                    productId: item.broadcastInfo.productId,
                    broadcastId: item.broadcastInfo._id,
                  })
                }>
                {item.productInfo.sellingStatus === 2 ? (
                  <View>
                    <ImageBorder
                      height={160}
                      source={{uri: item.broadcastInfo.productImageUrl}}
                    />
                    <View marginTop={5}>
                      <Text ftDarkNavy fontSize={17}>
                        {item.broadcastInfo.productName}
                      </Text>
                    </View>
                    <ViewRow>
                      <Text
                        ftDarkGrayBlue
                        fontSize={13}
                        bold
                        paddingTop={3}
                        paddingRight={3}>
                        {disRate(
                          item.productInfo.normalPrice,
                          timePrice(
                            item.expectedStartTime,
                            item.expectedEndTime,
                            item.productInfo.sellerLivePrice,
                            item.productInfo.sellerFeedPrice,
                            item.status,
                          ),
                        )}
                        %
                      </Text>
                      <Text ftTheme bold fontSize={17}>
                        {LocaleString(
                          timePrice(
                            item.expectedStartTime,
                            item.expectedEndTime,
                            item.productInfo.sellerLivePrice,
                            item.productInfo.sellerFeedPrice,
                            item.status,
                          ),
                        )}
                      </Text>
                      <Text ftTheme fontSize={17}>
                        원
                      </Text>
                    </ViewRow>
                  </View>
                ) : item.productInfo.sellingStatus === 3 ? (
                  <View>
                    <View>
                      <ImageBorder
                        height={160}
                        source={{uri: item.broadcastInfo.productImageUrl}}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 5,
                          right: 5,
                          bottom: 7,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          ftWhite
                          fontSize={11}
                          bold
                          style={{
                            backgroundColor: 'black',
                            paddingLeft: 5,
                            paddingRight: 5,
                          }}>
                          일시 품절
                        </Text>
                      </View>
                    </View>
                    <Text ftDarkNavy fontSize={17}>
                      {item.broadcastInfo.productName}
                    </Text>
                    <ViewRow>
                      <Text
                        ftDarkGrayBlue
                        fontSize={13}
                        bold
                        paddingTop={3}
                        paddingRight={3}>
                        {disRate(
                          item.productInfo.normalPrice,
                          timePrice(
                            item.expectedStartTime,
                            item.expectedEndTime,
                            item.productInfo.sellerLivePrice,
                            item.productInfo.sellerFeedPrice,
                            item.status,
                          ),
                        )}
                        %
                      </Text>
                      <Text ftTheme bold fontSize={17}>
                        {LocaleString(
                          timePrice(
                            item.expectedStartTime,
                            item.expectedEndTime,
                            item.productInfo.sellerLivePrice,
                            item.productInfo.sellerFeedPrice,
                            item.status,
                          ),
                        )}
                      </Text>
                      <Text ftTheme fontSize={17}>
                        원
                      </Text>
                    </ViewRow>
                  </View>
                ) : item.productInfo.sellingStatus === 4 ? (
                  <View>
                    <ImageBorder
                      height={160}
                      source={{uri: item.broadcastInfo.productImageUrl}}
                    />
                    <View marginTop={5}>
                      <Text ftDarkNavy fontSize={17}>
                        {item.broadcastInfo.productName}
                      </Text>
                    </View>
                    <ViewRow>
                      <Text ftTheme fontSize={17} bold>
                        판매 종료
                      </Text>
                    </ViewRow>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </ViewBorderRadius>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Product;
