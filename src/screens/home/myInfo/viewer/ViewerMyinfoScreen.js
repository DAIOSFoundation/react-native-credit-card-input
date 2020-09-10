import React from 'react';

import {View} from '../../../../components/styled/View';
import ViewerMyinfoTop from './ViewerMyinfoTop';
import ViewerMyinfoBody from './ViewerMyinfoBody';
import ToastMessage from '../../../../components/toast/ToastMessage';

const ViewerMyinfoScreen = () => {
  return (
    <View>
      <ViewerMyinfoTop />
      <ViewerMyinfoBody />
      <ToastMessage />
    </View>
  );
};

export default ViewerMyinfoScreen;
