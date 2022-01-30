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

  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  if (!catInfo) {
    return null;
  }

  const { name, url, temperament, origin } = catInfo;

  return (
    <div
      className={`ImageInfo ${open ? "fadeIn" : "fadeOut"}`}
      onClick={onClose}
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
