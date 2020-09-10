import React, {useRef} from 'react';
// Styled Component
import {ScrollView, View, ViewRow} from '../../../components/styled/View';
import LiveProfile from '../../../components/profiles/LiveProfile';
import {Text} from '../../../components/styled/Text';
import {Button} from '../../../components/styled/Button';
import {Image} from '../../../components/styled/Image';
// assets Image
const moreArrowIcon = require('../../../assets/main/icon_more_arrow.png');

// 즐겨찾기 셀러 컴포넌트
const FavoritesSeller = () => {
  const scrollRef = useRef(null);

  //todo 현재 데이터 하드코딩.. 추후 실데이터값 들어가야함 !!!
  return (
    <View>
      <ViewRow
        justifyContent={'space-between'}
        paddingLeft={15}
        paddingRight={15}>
        <View>
          <Text ftLarge ftWhite bold>
            즐겨찾기 셀러
          </Text>
        </View>
        <View>
          <Button width={24} height={24}>
            <Image width={24} height={24} source={moreArrowIcon} />
          </Button>
        </View>
      </ViewRow>
      <ScrollView horizontal={true} ref={scrollRef}>
        <ViewRow>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://picsum.photos/100/100'}
              isLive
              userName={'서강혁'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
              isLive
              userName={'토니'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'
              }
              isLive
              userName={'공재웅'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://placeimg.com/100/100/any'}
              isLive
              userName={'장경재'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
              }
              isLive
              userName={'박지숙'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://picsum.photos/100/100'}
              isLive
              userName={'서강혁'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
              isLive
              userName={'토니'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'
              }
              isLive
              userName={'공재웅'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://placeimg.com/100/100/any'}
              isLive
              userName={'장경재'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
              }
              isLive
              userName={'박지숙'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://picsum.photos/100/100'}
              isLive
              userName={'서강혁'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://homepages.cae.wisc.edu/~ece533/images/cat.png'}
              isLive
              userName={'토니'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/tulips.png'
              }
              isLive
              userName={'공재웅'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={'https://placeimg.com/100/100/any'}
              isLive
              userName={'장경재'}
            />
          </View>
          <View
            marginTop={20}
            marginBottom={20}
            marginLeft={10}
            marginRight={10}>
            <LiveProfile
              urlPath={
                'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
              }
              isLive
              userName={'박지숙'}
            />
          </View>
        </ViewRow>
      </ScrollView>
    </View>
  );
};

export default FavoritesSeller;
