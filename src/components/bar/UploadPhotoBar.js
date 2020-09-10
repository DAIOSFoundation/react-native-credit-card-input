import React, {useEffect, useState} from 'react';

import {ScrollView, ViewAbsolute, ViewBorderRadius} from '../styled/View';
import {ItemPreview, Image} from '../styled/Image';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {screenWidth} from '../styled/ScreenSize';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import * as Common from '../styled/Common';
import ImagePick from 'react-native-image-picker';

const UploadPhotoBar = (props) => {
  const [count, setCount] = useState(0);
  // 최대 이미지 크기를 초과하면 에러 메세지 반환
  const maximumImageSize = 20;
  const options = {
    title: '리뷰 사진 등록',
    takePhotoButtonTitle: '카메라',
    chooseFromLibraryButtonTitle: '갤러리에서 이미지 선택',
    cancelButtonTitle: '취소',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onPressPick = async () => {
    // try {
    //   const pickedImage = await ImagePicker.openPicker({
    //     cropping: false,
    //     cropperToolbarColor: 'white',
    //     mediaType: 'image',
    //     compressImageMaxWidth: 2000,
    //     // cropping: true,
    //   });
    //   console.log('selected image => ', pickedImage);
    //   if (pickedImage.size / 1024 / 1024 > maximumImageSize) {
    //     console.log('Too Big Image!');
    //     throw new Error(`최대 이미지 크기는 ${maximumImageSize}mb 입니다.`);
    //   }
    //   const resizedImage = await ImagePicker.openCropper({
    //     path: pickedImage.path,
    //     cropperToolbarColor: 'white',
    //   });
    //   props.onPressPick(resizedImage);
    // } catch (e) {
    //   console.log('e', e);
    //   props.imageError(e.message);
    // }
    try {
      await ImagePick.showImagePicker(options, async (response) => {
        const file = response;
        if (file) {
          if (file.fileSize / 1024 / 1024 > maximumImageSize) {
            console.log('Too Big Image!');
            throw new Error(
              props.imageError(
                `최대 이미지 크기는 ${maximumImageSize}mb 입니다.`,
              ),
            );
          }
          const resizedImage = await ImagePicker.openCropper({
            path: 'file://' + file.path,
            cropperToolbarColor: 'white',
          });
          props.onPressPick(resizedImage);
        }
      });
    } catch (e) {
      console.log('e', e);
      props.imageError(e.message);
    }
  };

  // 이미지 선택 버튼
  const renderCameraRect = () => {
    return props.items.length < 10 ? (
      <Button
        marginLeft={2}
        marginRight={2}
        height={screenWidth / 4}
        width={screenWidth / 4}
        onPress={onPressPick}>
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
            {props.items.length}/10
          </Text>
        </ViewBorderRadius>
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
              height={screenWidth / 4}
              width={screenWidth / 4}
              brLightGray>
              <Image size={screenWidth / 4} source={{uri: item.path}}/>
              <ViewAbsolute alignSelf={'center'}>
                {props.percent[index] !== 1 ? (
                  <Progress.Pie
                    progress={props.percent[index]}
                    size={50}
                    color={Common.colors.THEME}
                  />
                ) : null}
              </ViewAbsolute>
              <ViewAbsolute width={18} top={5} right={5}>
                <Button
                  width={18}
                  height={18}
                  onPress={() => props.onPressDelete(item._id)}>
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

export default UploadPhotoBar;
