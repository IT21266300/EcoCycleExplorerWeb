import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

class KeychainHelper {
  static async getData(key: string) {
    try {
      return await RNSecureStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  static async setData(key: string, value: any) {
    return await RNSecureStorage.setItem(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  }

  static async clear() {
    return await RNSecureStorage.clear();
  }
}

export default KeychainHelper;
