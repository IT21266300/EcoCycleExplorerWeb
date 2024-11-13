import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { APIEndpoint } from './APIEndpoints';
import AppSettings from './AppSettings';

export default class APIClient {
  private constructor() {}

  static async sendRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: APIEndpoint | string,
    requestModel: any = null,
  ) {
    try {
      const url = AppSettings.BaseUrl + endpoint;
      const accessToken = await AsyncStorage.getItem('access_token');
      const userAgent = await DeviceInfo.getUserAgent();
      // const lang = await AsyncStorage.getItem('lang')
      let options: any = {};

      if (accessToken !== null) {
        if (requestModel == null) {
          options = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': userAgent,
              Authorization: 'Bearer ' + accessToken,
              // 'Accept-Language': lang
            },
          };
        } else {
          options = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': userAgent,
              Authorization: 'Bearer ' + accessToken,
              // 'Accept-Language': lang
            },
            body: JSON.stringify(requestModel),
          };
        }
      } else {
        if (requestModel == null) {
          options = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': userAgent,
              // 'Accept-Language': lang
            },
          };
        } else {
          options = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': userAgent,
              // 'Accept-Language': lang
            },
            body: JSON.stringify(requestModel),
          };
        }
      }

      if (AppSettings.isDebug == true) {
        console.debug('🛠 REQUEST INFO 🛠');
        console.debug('🔵 URL: ' + url);
        console.debug('🔵 METHOD: ' + options.method);

        let headerKeys = Object.keys(options.headers);
        headerKeys.forEach(key => {
          console.debug('🔵 HEADER: ' + `${key} : ` + options.headers[key]);
        });

        console.debug('🔵 BODY: ' + options.body);
        console.debug('🛠 ============ 🛠');
      }

      const response = await fetch(url, options);
      if (response.ok) {
        console.debug('🟢 SUCCESS:', options.method, endpoint);
      } else {
        console.debug(
          '🔴 FAILURE:',
          options.method,
          endpoint,
          '🔗 STATUSCODE: ' + response.status,
        );
      }
      return response;
    } catch (error: any) {
      console.debug('🔴 ERROR:', error.message);
      throw new Error(error.message);
    }
  }
}
