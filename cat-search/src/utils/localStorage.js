const localStorageKeys = {
  recentKeywords: "recentKeywords",
  prefersColorScheme: "prefersColorScheme",
};

export default class LocalStorage {
  static getRecentKeywords() {
    const recentKeywords = localStorage.getItem(
      localStorageKeys.recentKeywords
    );
    return recentKeywords ? JSON.parse(recentKeywords) : [];
  }

  static addRecentKeyword(keyword) {
    let recentKeywords = this.getRecentKeywords();
    if (recentKeywords.includes(keyword)) {
      recentKeywords = recentKeywords.filter((v) => v !== keyword);
    }
    recentKeywords = [keyword, ...recentKeywords].slice(0, 5);
    localStorage.setItem(
      localStorageKeys.recentKeywords,
      JSON.stringify(recentKeywords)
    );
  }

  static getPrefersColorScheme() {
    return localStorage.getItem(localStorageKeys.prefersColorScheme);
  }

  static setPrefersColorScheme(theme) {
    localStorage.setItem(localStorageKeys.prefersColorScheme, theme);
  }
}
