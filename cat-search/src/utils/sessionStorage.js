const sessionStorageKeys = {
  lastResult: "lastResult",
};

export default class SessionStorage {
  static getLastResult() {
    const lastResult = sessionStorage.getItem(sessionStorageKeys.lastResult);
    return lastResult ? JSON.parse(lastResult) : null;
  }

  static setLastResult(data) {
    sessionStorage.setItem(sessionStorageKeys.lastResult, JSON.stringify(data));
  }
}
