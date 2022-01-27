const TEMPLATE = '<input type="text">';

export default class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const $searchInputWrapper = document.createElement("div");
    $searchInputWrapper.className = "SearchInputWrapper";

    const $searchInput = document.createElement("input");
    $searchInput.className = "searchInput";
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true;

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤 고양이";

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
