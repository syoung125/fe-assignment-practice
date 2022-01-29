import { setColorTheme } from "../utils/theme";

function ThemeSwitcher({ defaultChecked }) {
  const onChange = (e) => {
    const nextTheme = e.target.checked ? "dark" : "light";
    setColorTheme(nextTheme);
  };

  return (
    <div className="ThemeSwitcher">
      <input
        id="colorTheme"
        name="colorTheme"
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label htmlFor="colorTheme">다크모드 ON</label>
    </div>
  );
}

export default ThemeSwitcher;
