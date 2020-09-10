import React, {useEffect} from 'react';
import {SafeAreaView} from '../../../components/styled/View';
import {WebView} from 'react-native-webview';

const TermsOfServiceScreen = () => {
  return (
    <SafeAreaView>
      <WebView
        source={{uri: 'https://dev-api.sellervision.net/pdf/termsOfService'}}
      />
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen;
