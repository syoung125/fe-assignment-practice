import { api } from "./api.js";

const MAX_LENGTH = 5;

export default class Banner {
  currentIdx = 0;
  items = [];

  constructor({ $target }) {
    const $banner = document.createElement("div");
    this.$banner = $banner;
    this.$banner.className = "Banner";

    this.getRandomCats();

    $target.appendChild(this.$banner);

    this.render();
  }

  async getRandomCats() {
    const res = await api.fetchRandomCats();
    this.items = res.data.slice(0, MAX_LENGTH);
    this.render();
  }

  onPrev() {
    this.currentIdx =
      this.currentIdx === 0 ? MAX_LENGTH - 1 : this.currentIdx - 1;
    this.render();
  }

  onNext() {
    this.currentIdx = (this.currentIdx + 1) % MAX_LENGTH;
    this.render();
  }

  render() {
    this.$banner.innerHTML = `
      <ul>
        ${
          this.items.length === 0
            ? `<p>로딩중...</p>`
            : this.items.reduce(
                (acc, { url, name }, index) =>
                  acc +
                  `
        <li ${index === this.currentIdx ? "class=show" : ""}>
          <img src=${url} alt=${name}/>
          <p>${name}</p>
        </li>
        `,
                ""
              )
        }
      </ul>
      <span class="prevBtn">&lt;</span>
      <span class="nextBtn">&gt;</span>
    `;

    this.prevBtn = document.querySelector(".prevBtn");
    this.prevBtn.addEventListener("click", () => {
      this.onPrev();
    });

    this.nextBtn = document.querySelector(".nextBtn");
    this.nextBtn.addEventListener("click", () => {
      this.onNext();
    });
  }
}
