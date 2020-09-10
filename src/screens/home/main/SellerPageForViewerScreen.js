import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ViewBorder,
  ViewBorderRadius,
  ViewBorderRow,
  ViewRow,
} from '../../../components/styled/View';
import Topbar from '../../../components/bar/Topbar';
import * as broadcastActions from '../../../store/modules/broadcast/actions';

import SellerPageForViewerTop from './SellerPageForViewerTop';
import SellerPageForViewerBody from './SellerPageForViewBody';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import LoadingBar from '../../../components/loadingBar/LoadingBar';

const SellerPageForViewerScreen = (props) => {
  const dispatch = useDispatch();

  const onPressClose = () => {
    Actions.pop();
  };

  const {jwtToken, sellerInfo, loading} = useSelector((state) => ({
    jwtToken: state.user.jwtToken,
    sellerInfo: state.broadcast.sellerInfo,
    loading: state.loading['broadcast/REQUEST_SELLER_PAGE_PRODUCTS'],
  }));

  useEffect(() => {
    const params = {
      sellerId: props.data,
      jwtToken,
    };
    dispatch(broadcastActions.request_seller_info_for_viewer(params));
    dispatch(broadcastActions.request_seller_page_products(params));
    dispatch(broadcastActions.request_seller_page_passed_broadcast(params));
  }, []);

  const onPressChannel = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {loading || !sellerInfo.sellerInfo ? (
          // <View style={{position: 'absolute', zIndex: 0}}>
          <LoadingBar color={'#e6427a'} bgColor={{bgDarkNavy: true}} />
        ) : (
          // </View>
          <View>
            <Topbar
              onPressLeft={onPressClose}
              isLeftButton={true}
              bgColor={{bgDarkNavy: true}}
              leftButtonColor={'white'}
            />

            <SellerPageForViewerTop
              sellerInfo={sellerInfo}
              onPressChannel={onPressChannel}
              previewScreen={props.screen}
            />
            <SellerPageForViewerBody
              sellerInfo={sellerInfo}
              previewScreen={props.screen}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default SellerPageForViewerScreen;
