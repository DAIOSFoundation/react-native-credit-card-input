const FBSDK = require('react-native-fbsdk');
const {AccessToken, GraphRequest, GraphRequestManager, LoginManager} = FBSDK;
import {Platform} from 'react-native';

export const facebookLogin = async () => {
  if (Platform.OS === 'ios') {
    await LoginManager.setLoginBehavior('browser'); //IOS browser
  } else {
    await LoginManager.setLoginBehavior('WEB_ONLY'); // Android Web
  }

  const result = await LoginManager.logInWithPermissions(['public_profile']);

  if (result.isCancelled) {
    return false;
  } else {
    const data = await AccessToken.getCurrentAccessToken();
    let accessToken = data.accessToken;
    // console.log('accessToken => ', accessToken.toString());

    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log('responseInfoCallback');
        console.log(error);
      } else {
        let key = 'isCheckLogin';
        let value = 'true';

        let data = {};

        data.platformId = result.id;
        data.email = result.email;
        data.profile_img = result.picture.data.url;
        data.login_platform = 'facebook';
        data.isCheckLogin = true;
        data.accessToken = result.accessToken;
        data.name = result.name;

        if (!result.picture.data.url) {
          data.profile_img = '';
        }
        if (!result.name) {
          data.name = '';
        }
      }
    };

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string:
              'email,name,first_name,middle_name,last_name, cover,picture.type(large)',
          },
        },
      },
      responseInfoCallback,
    );

    // Start the graph request.
    await new GraphRequestManager().addRequest(infoRequest).start();

    return data;
  }
};

export const facebookLogOut = async () => {
  await LoginManager.logOut();
};

export default facebookLogin;
