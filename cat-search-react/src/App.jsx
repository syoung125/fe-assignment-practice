import { useEffect, useState } from "react";

import ThemeSwitcher from "./components/ThemeSwitcher";
import SearchInput from "./components/SearchInput";
import RecentKeywords from "./components/RecentKeywords";
import Banner from "./components/Banner";
import SearchResult from "./components/SearchResult";
import ImageInfo from "./components/ImageInfo";

import { getColorTheme } from "./utils/theme";
import LocalStorage from "./utils/localStorage";
import SessionStorage from "./utils/sessionStorage";

import CatService from "./service/api/cat";

import "./style.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    window.addEventListener("load", () => {
      document.documentElement.setAttribute("color-theme", getColorTheme());
    });
  }, []);

  const onSearch = async (keyword) => {
    LocalStorage.addRecentKeyword(keyword);
    setLoading(true);
    try {
      const res = await CatService.catList(keyword);
      setData(res.data);
      SessionStorage.setLastResult(res.data);
    } catch (error) {
      alert(`에러가 발생했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onRandom = async () => {
    setLoading(true);
    try {
      const res = await CatService.randomCatLIst();
      setData(res.data);
      SessionStorage.setLastResult(res.data);
    } catch (error) {
      alert(`에러가 발생했습니다. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onResultItemClick = async (id) => {
    const res = await CatService.read(id);
    setDetailData(res.data);
  };

  return (
    <div id="App">
      <ThemeSwitcher defaultChecked={getColorTheme() === "dark"} />
      <div className="SearchInputWrapper">
        <SearchInput onSearch={onSearch} />
        <button onClick={onRandom}>랜덤 고양이</button>
      </div>
      <RecentKeywords onSearch={onSearch} />
      <Banner />
      <SearchResult
        initialData={data}
        loading={loading}
        onItemClick={onResultItemClick}
      />
      <ImageInfo
        open={detailData}
        onClose={() => setDetailData(null)}
        {...detailData}
      />
    </div>
  );
}

export default App;
