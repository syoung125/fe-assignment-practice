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

    this.$searchResult.addEventListener("click", (e) => {
      const $item = e.path.find((v) => v.className === "item");
      if ($item) {
        const itemId = $item.id.split("_")[1];
        this.onClick(itemId);
      }
    });

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
            <div class="item" id="item_${cat.id}">
              <img src=${cat.url} alt=${cat.name} />
              <div class="overlay">${cat.name}</div>
            </div>
          `
          )
          .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
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
