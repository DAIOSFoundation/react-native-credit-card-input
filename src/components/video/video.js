import React, {useState} from 'react';
// NPM Module
import Video from 'react-native-video';

// *** 비디오 스트리밍 ***
// paused : 영상 일시중지
// data : 영상 경로
// size : 영상모드 ex) cover, stretch, contain
// muted : 음소거 설정
// radius : 테두리 조절
// repeat : 반복
// fullScreen : 전체화면
// controls : 컨트롤 설정

const VideoStreaming = (props) => {
  // 비디오 스트리밍 음소거 설정
  const [sound, setSound] = useState(props.muted);
  return (
    <Video
      onLoadStart={() => {
        setSound(!sound);
      }}
      paused={props.paused}
      source={{uri: props.data}}
      resizeMode={props.size}
      muted={sound}
      repeat={props.repeat}
      fullscreen={props.fullScreen}
      controls={props.controls}
      onError={(error) => {
        console.log('VideoStreaming error !!! ', error);
      }}
      onEnd={() => console.log('video ending !!!')}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderTopLeftRadius: props.borderTopLeftRadius,
        borderTopRightRadius: props.borderTopRightRadius,
        borderBottomLeftRadius: props.borderBottomLeftRadius,
        borderBottomRightRadius: props.borderBottomRightRadius,
        backgroundColor: 'black',
      }}
    />
  );
};

export default VideoStreaming;
