import React from 'react';
// Styled Component
import {View, ViewRowRadiusCustom} from '../../../components/styled/View';
import {ButtonRadius} from '../../../components/styled/Button';
import {Text} from '../../../components/styled/Text';
import LivePreview from '../../../components/live/LivePreview';
// NPM Module
import Moment from 'moment';
import 'moment/locale/ko';
import {Actions} from 'react-native-router-flux';
// utils Import
import {dayOfTheWeek} from '../../../utils/functions';
import {TouchableOpacity} from 'react-native';

const SliderLivePreviewEntry = (props) => {
  // 미리댓글 페이지 이동
  const onPressAlreadyComment = (id) => {
    Actions.alreadyCommentScreen(id);
  };

  return (
    <View>
      <LivePreview
        borderTopLeftRadius={{borderTopLeftRadius: 15}}
        borderTopRightRadius={{borderTopRightRadius: 15}}
        imagePath={props.data.productInfo.productImages[0].path}
        sellerNickName={props.data.userInfo.nickName}
        profilePath={props.data.userInfo.profileImageUrl}
        status={false}
        time={Moment(props.data.expectedStartTime).format('A hh:mm')}
        day={dayOfTheWeek(Moment(props.data.expectedStartTime).day())}
        date={Moment(props.data.expectedStartTime).format('M월 D일')}
        onPress={props.onPress}
      />
      <ViewRowRadiusCustom
        bgWhite
        height={70}
        alignItems={'center'}
        paddingLeft={10}
        paddingRight={10}
        borderBottomLeftRadius={15}
        borderBottomRightRadius={15}>
        <View width={'70%'}>
          <Text ftDarkNavy style={{lineHeight: 17}}>
            {props.data.productInfo.productName}
          </Text>
        </View>
        <View width={'30%'}>
          <ButtonRadius
            bgTheme
            borderRadius={50}
            onPress={() => onPressAlreadyComment(props.data._id)}>
            <Text ftWhite bold>
              미리댓글
            </Text>
          </ButtonRadius>
        </View>
      </ViewRowRadiusCustom>
    </View>
  );
};

export default SliderLivePreviewEntry;
