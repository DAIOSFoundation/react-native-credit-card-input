import React, {useRef, useEffect} from 'react';
// Styled Component
import {View, ViewAbsolute} from '../styled/View';
// NPM Module
import Toast from 'react-native-easy-toast';
// redux
import * as globalActions from '../../store/modules/global/actions';
import {useDispatch, useSelector} from 'react-redux';

// *** 토스트 메세지 ***
const ToastMessage = (props) => {
  // 토스트 메세지 참조 선언
  const toastRef = useRef(null);
  const toastMessage = useSelector((state) => state.global.toastMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastMessage) {
      toastRef.current.show(toastMessage);
      dispatch(globalActions.change_toast_message_init());
    }
  }, [toastMessage]);

  return (
    <ViewAbsolute width={'100%'}>
      <Toast
        position={props.position}
        ref={toastRef}
        fadeInDuration={750}
        fadeOutDuration={1000}
      />
    </ViewAbsolute>
  );
};

export default ToastMessage;
