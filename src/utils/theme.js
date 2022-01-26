const PREFERS_COLOR_SCHEME = "prefersColorScheme";

function isColorThemeValue(value) {
  return ["dark", "light"].includes(value);
}

export function getColorTheme() {
  const docColorTheme = document.documentElement.getAttribute("color-theme");
  if (isColorThemeValue(docColorTheme)) {
    return docColorTheme;
  }

  const customColorTheme = localStorage.getItem(PREFERS_COLOR_SCHEME);
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
  localStorage.setItem(PREFERS_COLOR_SCHEME, nextTheme);
  document.documentElement.setAttribute("color-theme", nextTheme);
}
