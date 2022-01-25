const RECENT_KEYWORDS = "recentKeywords";

function getRecentKeywords() {
  const recentKeywords = localStorage.getItem(RECENT_KEYWORDS);
  return recentKeywords ? JSON.parse(recentKeywords) : [];
}

function addRecentKeyword(keyword) {
  let recentKeywords = getRecentKeywords();
  if (recentKeywords.includes(keyword)) {
    recentKeywords = recentKeywords.filter((v) => v !== keyword);
  }
  recentKeywords = [keyword, ...recentKeywords].slice(0, 5);
  localStorage.setItem(RECENT_KEYWORDS, JSON.stringify(recentKeywords));
}
