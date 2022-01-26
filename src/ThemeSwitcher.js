import { getColorTheme, setColorTheme } from "./utils/theme.js";

export default class ThemeSwitcher {
  constructor({ $target }) {
    const $wrapper = document.createElement("div");
    $wrapper.className = "ThemeSwitcher";

    const $themeSwitcher = document.createElement("input");
    this.$themeSwitcher = $themeSwitcher;
    this.$themeSwitcher.type = "checkbox";
    this.$themeSwitcher.id = "colorTheme";
    this.$themeSwitcher.name = "colorTheme";
    this.$themeSwitcher.checked = getColorTheme() === "dark";

    this.$themeSwitcher.addEventListener("change", (e) => {
      const nextTheme = e.currentTarget.checked ? "dark" : "light";
      setColorTheme(nextTheme);
    });

    const $label = document.createElement("label");
    $label.textContent = "다크모드 ON";
    $label.htmlFor = "colorTheme";

    $wrapper.appendChild($themeSwitcher);
    $wrapper.appendChild($label);
    $target.appendChild($wrapper);
  }
}
