import SessionStorage from "./utils/sessionStorage.js";

export default class SearchResult {
  $searchResult = null;
  data = null; // isLoading, result
  onClick = null;
  isLoading = false;

  constructor({ $target, initialData, onClick }) {
    this.render = this.render.bind(this);

    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.initPagenation();

    const lastResult = SessionStorage.getLastResult();
    if (lastResult != null) {
      this.setState({ ...this.data, result: lastResult });
    }

    this.$searchResult.addEventListener("click", (e) => {
      const $item = e.path.find((v) => v.className === "item");
      if ($item) {
        const itemId = $item.id.split("_")[1];
        this.onClick(itemId);
      }
    });

    // scroll pagenation
    window.addEventListener("scroll", (e) => {
      if (!this.hasMore) {
        return;
      }
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 5) {
        this.loadMore();
      }
    });

    this.render();
  }

  initPagenation() {
    this.offset = 0;
    this.limit = 12;
    this.hasMore = true;
  }

  loadMore() {
    console.log("loadMore");
    if (this.offset > this.data.result.length) {
      this.hasMore = false;
      return;
    }
    this.offset += this.limit;
    this.render();
  }

  getLoadedData() {
    return this.data.result.slice(0, this.offset + this.limit);
  }

  setState(nextData) {
    if (this.data.result !== nextData.result) {
      this.initPagenation();
    }
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data.isLoading
      ? "<p>로딩중입니다...</p>"
      : this.data.result.length === 0
      ? "<p>검색결과가 없습니다.</p>"
      : this.getLoadedData()
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
