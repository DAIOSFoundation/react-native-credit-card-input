import React, {useEffect, useState} from 'react';
import {ScrollView, ViewAbsolute, ViewBorderRadius} from '../styled/View';
import {ItemPreview, Image} from '../styled/Image';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {screenWidth} from '../styled/ScreenSize';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import * as Common from '../styled/Common';
import AntIcon from 'react-native-vector-icons/AntDesign';

const UploadVideoBar = (props) => {
  const [count, setCount] = useState(0);
  // 최대 비디오 크기를 초과하면 에러 메세지 반환
  const maximumVideoSize = 1024;
  const onPressPick = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then((video) => {
        console.log('selected video => ', video);
        if (video.size / 1024 / 1024 > maximumVideoSize) {
          throw new Error(`최대 비디오 크기는 ${maximumVideoSize}mb 입니다.`);
        }
        props.onPressPick(video);
      })
      .catch((e) => {
        console.log('e', e);
        props.videoError(e.message);
      });
  };

  // 이미지 선택 버튼
  const renderCameraRect = () => {
    return props.items.length < 1 ? (
      <Button
        marginLeft={2}
        marginRight={2}
        height={props.height || screenWidth / 4}
        width={props.width || screenWidth / 4}
        onPress={onPressPick}>
        {!props.noBorderRadius ? (
          <ViewBorderRadius
            justifyContent={'center'}
            alignItems={'center'}
            height={screenWidth / 4}
            width={screenWidth / 4}
            brLightGray>
            <ItemPreview
              mode={'contain'}
              size={screenWidth / 8}
              borderRadius={0}
              borderColor={'white'}
              source={require('../../assets/myinfo/icon_camera_oval_grey.png')}
            />
            <Text marginTop={5} ftGray>
              {props.items.length}/1
            </Text>
          </ViewBorderRadius>
        ) : (
          <ViewBorderRadius
            justifyContent={'center'}
            alignItems={'center'}
            height={props.height || screenWidth / 4}
            width={props.width || screenWidth / 4}
            style={props.bgColor ? {backgroundColor: '#2c3957'} : null}>
            <ItemPreview
              source={require('../../assets/myinfo/icon_upload_white.png')}
            />
            <Text ftWhite marginTop={10}>
              동영상 업로드하기
            </Text>
          </ViewBorderRadius>
        )}
      </Button>
    ) : null;
  };

  //올라간 이미지
  const renderUploadedPhoto = () => {
    return (
      <>
        {props.items.map((item, index) => {
          return (
            <ViewBorderRadius
              key={index}
              marginLeft={2}
              marginRight={2}
              justifyContent={'center'}
              alignItems={'center'}
              height={props.height || screenWidth / 4}
              width={props.width || screenWidth / 4}
              brLightGray
              style={props.bgColor ? {backgroundColor: '#2c3957'} : null}>
              <Image size={screenWidth / 4} source={{uri: item.path}} />
              <ViewAbsolute alignSelf={'center'}>
                {props.percent[index] !== 1 ? (
                  <Progress.Pie
                    progress={props.percent[index]}
                    size={50}
                    color={Common.colors.THEME}
                  />
                ) : (
                  <AntIcon
                    name="videocamera"
                    style={{fontSize: screenWidth / 6 - 10, color: '#e6427a'}}
                  />
                )}
              </ViewAbsolute>
              <ViewAbsolute width={18} top={5} right={5}>
                <Button
                  width={18}
                  height={18}
                  onPress={() =>
                    props.onPressDelete(
                      props.sellerVideo && item.data
                        ? item.data.recordedVideoGcp[0]._id
                        : item._id,
                    )
                  }>
                  <Image
                    source={require('../../assets/myinfo/icon_item_cancel_dark.png')}
                  />
                </Button>
              </ViewAbsolute>
            </ViewBorderRadius>
          );
        })}
      </>
    );
  };

  return (
    <ScrollView horizontal>
      {renderCameraRect()}
      {renderUploadedPhoto()}
    </ScrollView>
  );
};

export default UploadVideoBar;
