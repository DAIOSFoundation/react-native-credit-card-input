import React, {useRef, useEffect} from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {View, ScrollView} from '../styled/View';

// contentGesture : 내용부분 제스쳐 여부
// contentHeader : 헤더부분 제스쳐 여부

const BottomModal = (props) => {
  const BS = useRef(null);

  // const onPressClose = () =>{
  //   console.log("onPressClose")
  // }

  useEffect(() => {
    console.log('props.initialSnap', props.initialSnap);
    if (BS.current) {
      BS.current.snapTo(props.initialSnap || 0);
    }
  }, []);

  useEffect(() => {
    console.log('props.snapTo => ', props.snapTo);
    if (BS.current && props.snapTo) {
      BS.current.snapTo(props.snapTo);
    }
  }, [props.snapTo]);

  return (
    <BottomSheet
      ref={BS}
      initialSnap={props.initialSnap}
      // onCloseEnd={props.onCloseEnd}
      enabledContentGestureInteraction={props.contentGesture !== false}
      snapPoints={props.snapPoints}
      enabledHeaderGestureInteraction={props.headerGesture !== false}
      renderHeader={props.header ? () => <View>{props.header}</View> : null}
      renderContent={() => <View>{props.view}</View>}
    />
  );
};

export default BottomModal;
