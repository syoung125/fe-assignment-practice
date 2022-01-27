import LocalStorage from "./localStorage.js";

function isColorThemeValue(value) {
  return ["dark", "light"].includes(value);
}

export function getColorTheme() {
  const docColorTheme = document.documentElement.getAttribute("color-theme");
  if (isColorThemeValue(docColorTheme)) {
    return docColorTheme;
  }

  const customColorTheme = LocalStorage.getPrefersColorScheme();
  if (isColorThemeValue(customColorTheme)) {
    return customColorTheme;
  }

  const osColorTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  return osColorTheme;
}

export function setColorTheme(value) {
  const nextTheme = value === "dark" ? "dark" : "light";
  LocalStorage.setPrefersColorScheme(nextTheme);
  document.documentElement.setAttribute("color-theme", nextTheme);
}
