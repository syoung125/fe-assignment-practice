import { useState } from "react";

import { useRandomCatList } from "../hooks/api/useRandomCatList";

const MAX_LENGTH = 5;

function Banner() {
  const { data, isLoading } = useRandomCatList("randomCatsBanner");
  const [currentIdx, setCurrentIdx] = useState(0);

  const onPrev = () => {
    setCurrentIdx(currentIdx === 0 ? MAX_LENGTH - 1 : currentIdx - 1);
  };

  const onNext = () => {
    setCurrentIdx((currentIdx + 1) % MAX_LENGTH);
  };

  return (
    <div className="Banner">
      <ul>
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          data.data.slice(0, MAX_LENGTH).map(({ id, url, name }, index) => (
            <li key={id} className={index === currentIdx ? "show fadeIn" : ""}>
              <img src={url} alt={name} />
              <p>{name}</p>
            </li>
          ))
        )}
      </ul>
      <span className="prevBtn" onClick={onPrev}>
        &lt;
      </span>
      <span className="nextBtn" onClick={onNext}>
        &gt;
      </span>
    </div>
  );
}

export default Banner;
