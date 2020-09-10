import React, {useEffect} from 'react';
import {SafeAreaView} from '../../../components/styled/View';
import {WebView} from 'react-native-webview';

const TermsOfContentsUtilScreen = () => {
  return (
    <SafeAreaView>
      <WebView
        source={{uri: 'https://dev-api.sellervision.net/pdf/termsOfContentsUtil'}}
      />
    </SafeAreaView>
  );
};

export default TermsOfContentsUtilScreen;
