import { useEffect } from "react";

import { getColorTheme } from "./utils/theme";

import ThemeSwitcher from "./components/ThemeSwitcher";

import "./style.css";

function App() {
  useEffect(() => {
    window.addEventListener("load", () => {
      document.documentElement.setAttribute("color-theme", getColorTheme());
    });
  }, []);

  return (
    <div id="App">
      <ThemeSwitcher defaultChecked={getColorTheme() === "dark"} />
    </div>
  );
}

export default App;
