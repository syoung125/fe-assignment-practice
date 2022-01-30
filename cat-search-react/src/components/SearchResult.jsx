import { useEffect, useState } from "react";

import SessionStorage from "../utils/sessionStorage";
import SearchResultItem from "./SearchResultItem";

function SearchResult({ initialData = [], loading, onItemClick }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData !== null) {
      return;
    }

    const lastResult = SessionStorage.getLastResult();
    if (lastResult != null) {
      setData(lastResult);
    }
  }, []);

  useEffect(() => {
    if (initialData !== null) {
      setData(initialData);
    }
  }, [initialData]);

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
      {loading && <p>로딩중입니다...</p>}
      {!loading && !data.length && <p>검색결과가 없습니다.</p>}
      {!loading &&
        data.length > 0 &&
        data.map((cat, index) => (
          <SearchResultItem key={`${cat.id}_${index}`} {...cat} />
        ))}
    </div>
  );
}

export default SearchResult;
