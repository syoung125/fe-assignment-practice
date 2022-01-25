class ImageInfo {
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
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
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
