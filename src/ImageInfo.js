export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.$imageInfo.addEventListener("click", () => {
      this.onClose();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.onClose();
      }
    });

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  onClose() {
    if (!this.data.visible) {
      return;
    }
    this.setState({
      visible: false,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <article class="content-wrapper">
            <div class="title">
              <h1>${name}</h1>
              <button class="close">x</button>
            </div>
            <img src="${url}" alt="${name}"/>        
            <ul class="description">
              <li>성격: ${temperament}</li>
              <li>태생: ${origin}</li>
            </ul>
          </article>`;
      this.$imageInfo.style.display = "block";

      const $closeBtn = document.querySelector(".close");
      $closeBtn.addEventListener("click", () => {
        this.onClose();
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
