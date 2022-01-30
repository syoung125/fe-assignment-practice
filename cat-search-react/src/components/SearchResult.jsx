import SearchResultItem from "./SearchResultItem";

function SearchResult({ data, loading, onItemClick }) {
  const onClick = (e) => {
    const $item = e.target.closest(".item");
    if ($item) {
      const itemId = $item.dataset.id;
      onItemClick(itemId);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="SearchResult" onClick={onClick}>
      {loading ? (
        <p>로딩중입니다...</p>
      ) : !data?.length ? (
        <p>검색결과가 없습니다.</p>
      ) : (
        data.map((cat, index) => (
          <SearchResultItem key={`${cat.id}_${index}`} {...cat} />
        ))
      )}
    </div>
  );
}

export default SearchResult;
