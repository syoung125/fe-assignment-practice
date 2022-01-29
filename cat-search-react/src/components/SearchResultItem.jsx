import { useEffect, useRef, useState } from "react";

function SearchResultItem({ id, url, name }) {
  const imgRef = useRef();
  const [showName, setShowName] = useState(false);

  useEffect(() => {
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

    imgRef.current && imageObserver.observe(imgRef.current);
    return () => imageObserver.disconnect();
  }, []);

  return (
    <div
      class="item"
      data-id={id}
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
    >
      <img ref={imgRef} class="lazy" data-src={url} alt={name} />
      {showName && <div class="overlay">{name}</div>}
    </div>
  );
}

export default SearchResultItem;
