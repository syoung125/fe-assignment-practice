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

  render() {
    this.$searchResult.innerHTML = this.data.isLoading
      ? "<p>로딩중입니다...</p>"
      : this.data.result.length === 0
      ? "<p>검색결과가 없습니다.</p>"
      : this.data.result
          .map(
            (cat) => `
            <div class="item" id="item_${cat.id}">
              <img class="lazy" data-src=${cat.url} alt=${cat.name} />
              <div class="overlay">${cat.name}</div>
            </div>
          `
          )
          .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item) => {
      const $overlay = $item.querySelector(".overlay");
      $item.addEventListener("mouseenter", () => {
        $overlay.style.visibility = "visible";
      });
      $item.addEventListener("mouseleave", () => {
        $overlay.style.visibility = "hidden";
      });
    });

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    this.$searchResult.querySelectorAll(".item > img").forEach(($item) => {
      imageObserver.observe($item);
    });
  }
}
