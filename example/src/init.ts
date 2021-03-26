import { setURL, HttpUtils } from 'react-native-qichang-api';
HttpUtils.setHeaders('getVersion()', 'getDeviceId()', 'getSystemVersion()');
setURL('http://api-app.qichangv.com', 'http://api-search.qichangv.com');
//setURL('http://app-api.bxmauto.com', 'http://search.bxmauto.com');
