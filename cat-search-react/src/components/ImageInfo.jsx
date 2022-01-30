import { useEffect, useState } from "react";

function ImageInfo({ open, onClose, catInfo }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (open) {
      setVisible(true);
    } else {
      timeoutId = setTimeout(() => setVisible(false), 150);
    }

    return () => timeoutId != null && clearTimeout(timeoutId);
  }, [open]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!catInfo) {
    return null;
  }

  const { name, url, temperament, origin } = catInfo;

  return (
    <div
      className={`ImageInfo ${open ? "fadeIn" : "fadeOut"}`}
      onClick={onClose}
      onKeyDown={onKeyDown}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <article className="content-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="title">
          <h1>{name}</h1>
          <button className="close" onClick={onClose}>
            x
          </button>
        </div>
        <img src={url} alt={name} />
        <ul className="description">
          <li>성격: {temperament}</li>
          <li>태생: {origin}</li>
        </ul>
      </article>
    </div>
  );
}

export default ImageInfo;
