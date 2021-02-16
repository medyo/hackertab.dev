export const canUseLocalStorage = () => {
  try {
    window.localStorage.setItem('test', 'test');
    window.localStorage.removeItem('test');
    return true;
  }
  catch (e) {
    return false;
  }
};


export default class AppStorage {
  static getItem(key, defaultValue = null) {
    let value;
    if(!canUseLocalStorage()){
      return defaultValue
    }
    try {
      value = window.localStorage.getItem(key);
    } catch (e) {
      value = defaultValue
    }
    return value
  }

  static setItem(key, value) {
    try {
      if (typeof(value) != "string") {
        value = JSON.stringify(value)
      }
      window.localStorage.setItem(key, value);
      return true;
    }
    catch (e) {
      return false;
    }
  }

  static removeItem(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }
}
