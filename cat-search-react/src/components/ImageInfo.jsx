function ImageInfo({ open, onClose, name, url, temperament, origin }) {
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="ImageInfo" onClick={onClose} onKeyDown={onKeyDown}>
      <article class="content-wrapper">
        <div class="title">
          <h1>{name}</h1>
          <button class="close" onClick={onClose}>
            x
          </button>
        </div>
        <img src={url} alt={name} />
        <ul class="description">
          <li>성격: {temperament}</li>
          <li>태생: {origin}</li>
        </ul>
      </article>
    </div>
  );
}

export default ImageInfo;
