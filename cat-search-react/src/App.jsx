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

import { useCatList } from "./hooks/api/useCatList";
import { useRandomCatList } from "./hooks/api/useRandomCatList";
import { useCatDetail } from "./hooks/api/useCatDetail";

import "./style.css";

function App() {
  const [mode, setMode] = useState("search"); // "search" | "random"
  const [keyword, setKeyword] = useState("");

  const placeholderData = SessionStorage.getLastResult();
  const {
    data: searchData,
    isLoading: isSearchDataLoading,
    isFetched: isSearchDataFetched,
  } = useCatList(keyword);
  const {
    data: randomData,
    isLoading: isRandomDataLoading,
    isFetched: isRandomDataFetched,
    refetch,
  } = useRandomCatList("randomCats", {
    onSuccess: (res) => {
      SessionStorage.setLastResult(res.data);
    },
    enabled: false,
  });

  const [selectedCatId, setSelectedCatId] = useState(null);
  const [openImageInfo, setImageInfoOpen] = useState(false);

  const { data: catData } = useCatDetail(selectedCatId);

  useEffect(() => {
    const initColorTheme = () => {
      document.documentElement.setAttribute("color-theme", getColorTheme());
    };

    window.addEventListener("load", initColorTheme);

    return () => window.removeEventListener("load", initColorTheme);
  }, []);

  const getData = () => {
    if (!isSearchDataFetched && !isRandomDataFetched && !!placeholderData) {
      return placeholderData;
    }
    return mode === "random" ? randomData?.data : searchData?.data;
  };

  const getLoading = () => {
    if (!isSearchDataFetched && !isRandomDataFetched && !!placeholderData) {
      return false;
    }
    return mode === "random" ? isRandomDataLoading : isSearchDataLoading;
  };

  const onSearch = async (keyword) => {
    setMode("search");
    setKeyword(keyword);
    LocalStorage.addRecentKeyword(keyword);
  };

  const onRandom = async () => {
    setMode("random");
    refetch();
  };

  const onResultItemClick = async (id) => {
    setSelectedCatId(id);
    setImageInfoOpen(true);
  };

  const closeImageInfo = () => {
    setImageInfoOpen(false);
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
        data={getData()}
        loading={getLoading()}
        onItemClick={onResultItemClick}
      />
      <ImageInfo
        open={openImageInfo}
        onClose={closeImageInfo}
        catInfo={catData?.data}
      />
    </div>
  );
}

export default App;
