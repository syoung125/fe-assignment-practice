const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const $searchInputWrapper = document.createElement("div");
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true;

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤 고양이";

    $searchInputWrapper.className = "searchInputWrapper";
    $searchInput.className = "SearchInput";
    $searchInputWrapper.appendChild($searchInput);
    $searchInputWrapper.appendChild($randomButton);
    $target.appendChild($searchInputWrapper);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
    $searchInput.addEventListener("focus", (e) => {
      this.$searchInput.value = "";
    });
    $randomButton.addEventListener("click", () => {
      onRandom();
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
