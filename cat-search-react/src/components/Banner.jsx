import { useState, useEffect } from "react";

import CatService from "../service/api/cat";

const MAX_LENGTH = 5;

function Banner() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await CatService.randomCatLIst();
      setItems(res.data.slice(0, MAX_LENGTH));
    })();
  }, []);

  const onPrev = () => {
    setCurrentIdx(currentIdx === 0 ? MAX_LENGTH - 1 : currentIdx - 1);
  };

  const onNext = () => {
    setCurrentIdx((currentIdx + 1) % MAX_LENGTH);
  };

  return (
    <div className="Banner">
      <ul>
        {items.length === 0 ? (
          <p>로딩중...</p>
        ) : (
          items.map(({ id, url, name }, index) => (
            <li key={id} className={index === currentIdx ? "show fadeIn" : ""}>
              <img src={url} alt={name} />
              <p>{name}</p>
            </li>
          ))
        )}
      </ul>
      <span class="prevBtn" onClick={onPrev}>
        &lt;
      </span>
      <span class="nextBtn" onClick={onNext}>
        &gt;
      </span>
    </div>
  );
}

export default Banner;
