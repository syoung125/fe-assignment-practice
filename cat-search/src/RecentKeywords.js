import LocalStorage from "./utils/localStorage.js";

export default class RecentKeywords {
  data = null;
  onSearch = null;

  constructor({ $target, onSearch }) {
    const $recentKeywords = document.createElement("section");
    $recentKeywords.className = "RecentKeywords";
    this.$recentKeywords = $recentKeywords;

    $target.appendChild($recentKeywords);

    this.onSearch = onSearch;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$recentKeywords.innerHTML = `
      <small>최근 검색어</small>
      <ul>
        ${LocalStorage.getRecentKeywords().reduce(
          (acc, keyword) => acc + `<li tabindex='0'>${keyword}</li>`,
          ""
        )}
      </ul>
    `;

    document
      .querySelector(".RecentKeywords ul")
      .addEventListener("click", (e) => {
        this.onSearch(e.target.textContent);
      });

    document
      .querySelector(".RecentKeywords ul")
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.onSearch(e.target.textContent);
        }
      });
  }
}
