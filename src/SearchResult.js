class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  isLoading = false;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.isLoading
      ? "<p>로딩중입니다...</p>"
      : this.data.length === 0
      ? "<p>검색결과가 없습니다.</p>"
      : this.data
          .map(
            (cat) => `
            <div class="item">
              <img src=${cat.url} alt=${cat.name} />
              <div class="overlay">${cat.name}</div>
            </div>
          `
          )
          .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
      const $overlay = $item.querySelector(".overlay");
      $item.addEventListener("mouseenter", () => {
        $overlay.style.visibility = "visible";
      });
      $item.addEventListener("mouseleave", () => {
        $overlay.style.visibility = "hidden";
      });
    });
  }
}
