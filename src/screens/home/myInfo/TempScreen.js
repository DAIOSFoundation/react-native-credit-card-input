import React from 'react';
// Styled Component
import {ScrollView, ViewBorderRadius} from '../../../components/styled/View';
import {Text} from '../../../components/styled/Text';
import Topbar from '../../../components/bar/Topbar';
import SelectButtons from '../../../components/buttons/SelectButtons';
import OnPressStyleButton from '../../../components/buttons/OnPressStyleButton';
import BasicCheckBox from '../../../components/checkboxes/BasicCheckBox';
import SelectCheckBoxes from '../../../components/checkboxes/SelectCheckBoxes';
import TextAndInputBottomLine from '../../../components/input/TextAndInputBottomLine';
import RecommendProduct from '../../../components/products/RecommendProduct';
import ConnectProfile from '../../../components/profiles/ConnectProfile';
import FavoritesProfile from '../../../components/profiles/FavoritesProfile';
import LiveProfile from '../../../components/profiles/LiveProfile';
import PickProfile from '../../../components/profiles/PickProfile';
import RecommendProfile from '../../../components/profiles/RecommendProfile';
import SellerProfile from '../../../components/profiles/SellerProfile';
import SignUpProfile from '../../../components/profiles/SignUpProfile';
import Timer from '../../../components/live/Timer';
import UserChat from '../../../components/live/UserChat';
import BuyProduct from '../../../components/products/BuyProduct';
import BroadcastingBottom from '../../../components/products/BroadcastingBottom';
import PutProduct from '../../../components/products/PutProduct';
// assets Image
const cancelIcon = require('../../../assets/common/icon_item_cancel.png');
const minIcon = require('../../../assets/common/icon_item_minus.png');
const plusIcon = require('../../../assets/common/icon_item_plus.png');

const TempScreen = () => {
  const valid = () => {
    return false;
  };
  return (
    <ScrollView marginBottom={50}>
      <Text>TempScreen Component !!!</Text>
      <Topbar
        onPressLeft={() => console.log('sfdsdf')}
        isLeftButton={true}
        isRightButton={true}
        title={'셀러 회원가입'}
        isLine={true}
      />
      <OnPressStyleButton
        showButtonProps={{brDarkNavy: true}}
        hideButtonProps={{brTheme: true}}
        showBody={<Text brDarkNavy>테스트</Text>}
        hideBody={<Text>테스트</Text>}
        onPress={() => console.log('테스트')}
      />
      <BasicCheckBox
        text={'이용약관/개인정보'}
        onPress={() => console.log('ssss')}
        checked={false}
      />
      <SelectButtons
        data={['asdfasdf', 'bbbbb', 'cccccc', 'sssss', 'fffffff']}
        lineCnt={4}
        onPress={() => console.log('테스트')}
      />
      <SelectCheckBoxes data={['asdfasdf', 'bbbbb', 'cccccc', 'sssss']} />
      <TextAndInputBottomLine
        title={'주민등록번호'}
        errorText={'정확히 입력 해주세요'}
        valid={valid}
        isBottomLine={true}
        onChangeText={() => console.log('ssss')}
        isOnlyNumber={true}
        width={300}
      />
      <ConnectProfile name={'sdfsdfsdf'} />
      <RecommendProduct
        id={'unikey'}
        productName={'최상호'}
        urlPath={''}
        sellPrice={99999}
        samplePrice={1000000}
        onPressAdd={() => console.log('테스트')}
      />
      <FavoritesProfile
        id={'unikey'}
        userName={'최상호'}
        urlPath={''}
        userDecription={'안녕하세요'}
        onPress={() => console.log('ssss')}
        isLive={true}
      />
      <LiveProfile
        id={'uniKey'}
        urlPath={''}
        isLive={true}
        userName={'최상호'}
        onPress={() => console.log('ssss')}
      />
      <PickProfile isIcon={true} onPress={() => console.log('ssss')} />
      <RecommendProfile
        id={'unikey'}
        userName={'최상호'}
        urlPath={''}
        userDecription={'안녕하세요'}
        onPress={() => console.log('ssss')}
        onPressFollow={() => console.log('ssss')}
      />
      <SellerProfile
        id={'uniKey'}
        urlPath={''}
        onPress={() => console.log('ssss')}
      />
      <SignUpProfile urlPath={''} userName={'최상호'} sellerCode={'#121212'} />

      {/* ㅡㅡㅡㅡㅡㅡ skh Component ㅡㅡㅡㅡㅡㅡ  */}

      {/* 시간 타이머 */}
      <Timer />

      {/* 유저 채팅 */}
      <UserChat
        urlPath={'https://picsum.photos/100/100'}
        nickName={'서강혁'}
        chat={
          '안녕하세요 반갑습니다 ~  안녕하세요 반갑습니다 ~  안녕하세요 반갑습니다 ~ '
        }
      />

      {/* 구매내역 상품 정보 */}
      <BuyProduct
        urlPath={'https://i.picsum.photos/id/237/100/100.jpg'}
        size={74}
        productName={
          '스트라이프 레터링 롱 남방 b80nb2202-블루 컬러 M사이즈 사이즈 사이즈 사이즈'
        }
        price={51000}
        state={'주문완료'}
        date={'2020.01'}
        onPressLeftText={'상품 구매 확정'}
        onPressLeftButton={() => console.log('왼쪽 버튼 이벤트 !!!')}
        onPressRightText={'주문 상세 내역'}
        onPressRightButton={() => Actions.purchaseDetailScreen()}
      />

      {/* 주문 상세 내역 상품정보 */}
      <BuyProduct
        detail
        urlPath={'https://i.picsum.photos/id/237/100/100.jpg'}
        size={74}
        productName={
          '스트라이프 레터링 롱 남방 b80nb2202-블루 컬러 M사이즈 사이즈 사이즈 사이즈'
        }
        price={51000}
        state={'주문완료'}
        date={'2020.01.22'}
      />

      {/* 라이브 메인화면 하단 상품정보 */}
      <BroadcastingBottom
        urlPath={'https://i.picsum.photos/id/237/100/100.jpg'}
        size={40}
        title={'엄청 귀여운 폰케이스 입니다. 아주 아주 싸요'}
        discount={'50'}
        price={'200000000'}
        hashTag={
          '#한정판매 #프리미엄 #폰케이스 #가성비탑 #가성비탑 #한정판매 #프리미엄'
        }
        textLine={1}
        buttonText={'구매하기'}
        onPressButton={() => {
          Actions.productDetailScreen();
        }}
      />

      {/* 추천상품페이지 샘플담기 레이아웃 */}
      <ViewBorderRadius
        bgWhite
        marginTop={10}
        paddingTop={15}
        paddingLeft={15}
        paddingRight={15}
        paddingBottom={15}
        brIceBlue>
        <PutProduct
          onPressIncrease={() => console.log('개수 증가 이벤트 !!!')}
          onPressDecrease={() => console.log('개수 감소 이벤트 !!!')}
          onPressCanCel={() => console.log('상품 취소 이벤트 !!!')}
          textLine={1}
          productName={
            '로얄베르겐 3+1 세트 로얄베르겐 3+1 세트 로얄베르겐 3+1 세트'
          }
          urlPath_1={cancelIcon}
          urlPath_2={minIcon}
          urlPath_3={plusIcon}
          count={1}
          price={310000}
        />
      </ViewBorderRadius>
    </ScrollView>
  );
};

export default TempScreen;
