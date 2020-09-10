import React, {useState, useEffect} from 'react';
import {
  ViewBorderRow,
  ViewRow,
  View,
  ViewBorderRadius,
  ScrollView,
} from '../../../components/styled/View';
import {Image, ImageBorder} from '../../../components/styled/Image';
import {Text} from '../../../components/styled/Text';
import {Button, ButtonBorderRadius} from '../../../components/styled/Button';
import {LocaleString} from '../../../utils/functions';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as sellerPageForViewerActions from '../../../store/modules/sellerPageForViewer/actions';
import * as LiveNoticeActions from '../../../store/modules/sellerPageForViewer/LiveNotice/actions';
import LiveNotice from './tab/LiveNotice';
import PastBroadcast from './tab/PastBoradcast';
import Product from './tab/Product';
import * as broadcastActions from '../../../store/modules/broadcast/actions';

const SellerPageForViewBody = (props) => {
  const dispatch = useDispatch();

  const {
    menu,
    sellerPageAlarm,
    jwtToken,
    passedBroadcasts,
    products,
    sellerInfo,
  } = useSelector(
    (state) => ({
      menu: state.sellerPageForViewer.menu,
      sellerPageAlarm: state.broadcast.sellerPageAlarm,
      jwtToken: state.user.jwtToken,
      passedBroadcasts: state.broadcast.passedBroadcasts,
      products: state.broadcast.products,
      sellerInfo: state.broadcast.sellerInfo,
    }),
    shallowEqual,
  );

  const [button, setButton] = useState(false);

  useEffect(() => {
    let param = {
      jwtToken,
      sellerId: props.sellerInfo.sellerInfo._id,
    };
    dispatch(broadcastActions.request_seller_page_alarm(param));
  }, []);

  const changeMenu = (menu) => {
    dispatch(
      sellerPageForViewerActions.change_seller_page_for_viewer_menu(menu),
    );
  };

  const onPressAlarmButton = () => {
    if (button === false) {
      setButton(true);
    } else {
      setButton(false);
    }
    dispatch(LiveNoticeActions.alarm_button(button));
  };

  return (
    <View>
      <View bgDarkWhite height={10} />
      <ViewBorderRow
        paddingTop={25}
        paddingBottom={15}
        marginLeft={35}
        marginRight={40}>
        <View
          marginRight={'auto'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Button
            width={'auto'}
            marginBottom={10}
            onPress={() => changeMenu('liveNotice')}>
            {menu === 'liveNotice' ? (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_schedule_pressed.png')}
                  width={40}
                  height={40}
                />
                <Text ftTheme bold paddingTop={5}>
                  라이브 예고
                </Text>
              </View>
            ) : (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_schedule_normal.png')}
                  width={40}
                  height={40}
                />
                <Text ftGray paddingTop={5}>
                  라이브 예고
                </Text>
              </View>
            )}
          </Button>
        </View>
        <View
          marginRight={'auto'}
          alignItems={'center'}
          justifyContent={'center'}>
          <Button
            width={'auto'}
            marginBottom={10}
            onPress={() => changeMenu('pastBroadcast')}>
            {menu === 'pastBroadcast' ? (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_seller_live_pressed.png')}
                  width={40}
                  height={40}
                />
                <Text ftTheme bold paddingTop={5}>
                  지난 방송
                </Text>
              </View>
            ) : (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_seller_live_normal.png')}
                  width={40}
                  height={40}
                />
                <Text ftGray paddingTop={5}>
                  지난 방송
                </Text>
              </View>
            )}
          </Button>
        </View>
        <View alignItems={'center'} justifyContent={'center'}>
          <Button
            width={'auto'}
            marginBottom={10}
            onPress={() => changeMenu('product')}>
            {menu === 'product' ? (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_sample_pressed.png')}
                  width={40}
                  height={40}
                />
                <Text ftTheme bold paddingTop={5}>
                  상품
                </Text>
              </View>
            ) : (
              <View alignItems={'center'}>
                <Image
                  source={require('../../../assets/common/icon_sample_normal.png')}
                  width={40}
                  height={40}
                />
                <Text ftGray paddingTop={5}>
                  상품
                </Text>
              </View>
            )}
          </Button>
        </View>
      </ViewBorderRow>
      <View bgDarkWhite height={5} />
      {menu === 'liveNotice' ? (
        // 라이브 예고 화면
        <LiveNotice
          onPressAlarmButton={() => onPressAlarmButton()}
          sellerPageAlarm={sellerPageAlarm}
          previewScreen={props.previewScreen}
        />
      ) : menu === 'pastBroadcast' ? (
        // 지난 방송 화면
        <PastBroadcast passedBroadcasts={passedBroadcasts} />
      ) : menu === 'product' ? (
        // 상품 화면
        <Product
          currentDate={new Date()}
          products={products}
          previewScreen={props.previewScreen}
        />
      ) : (
        <></>
      )}
    </View>
  );
};
export default SellerPageForViewBody;
