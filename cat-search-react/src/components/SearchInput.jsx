function SearchInput({ onSearch }) {
  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
    }
  };

  const onFocus = (e) => {
    e.target.value = "";
  };

  return (
    <input
      className="searchInput"
      placeholder="고양이를 검색해보세요.|"
      autoFocus
      onKeyUp={onKeyUp}
      onFocus={onFocus}
    />
  );
}

export default SearchInput;
