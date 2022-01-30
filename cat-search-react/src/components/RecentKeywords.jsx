import LocalStorage from "../utils/localStorage";

/** @TODO : input 밑 dropdown으로 변경  */
function RecentKeywords({ onSearch }) {
  const onClick = (e) => {
    onSearch(e.target.textContent);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.textContent);
    }
  };

  return (
    <section className="RecentKeywords">
      <small>최근 검색어</small>
      <ul onClick={onClick} onKeyDown={onKeyDown}>
        {LocalStorage.getRecentKeywords().map((keyword) => (
          <li key={keyword} tabIndex={0}>
            {keyword}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentKeywords;
