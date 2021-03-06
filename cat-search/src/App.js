import SessionStorage from "./utils/sessionStorage.js";
import LocalStorage from "./utils/localStorage.js";
import { getColorTheme } from "./utils/theme.js";

import CatService from "./api/cat/index.js";

import ThemeSwitcher from "./ThemeSwitcher.js";
import SearchInput from "./SearchInput.js";
import RecentKeywords from "./RecentKeywords.js";
import Banner from "./Banner.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";

export default class App {
  $target = null;
  data = {
    result: [],
    isLoading: false,
  };

  constructor($target) {
    console.log($target);
    this.$target = $target;
    this.onSearch = this.onSearch.bind(this);

    window.onload = function () {
      document.documentElement.setAttribute("color-theme", getColorTheme());
    };

    this.themeSwitcher = new ThemeSwitcher({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: this.onSearch,
      onRandom: async () => {
        this.setState({ ...this.data, isLoading: true });
        try {
          const res = await CatService.randomCatLIst();
          this.setState({ ...this.data, result: res.data });
          SessionStorage.setLastResult(res.data);
        } catch (error) {}
        this.setState({ ...this.data, isLoading: false });
      },
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onSearch: this.onSearch,
    });

    this.banner = new Banner({
      $target,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (id) => {
        const res = await CatService.read(id);
        this.imageInfo.setState({
          visible: true,
          image: res.data,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  async onSearch(keyword) {
    LocalStorage.addRecentKeyword(keyword);
    this.recentKeywords.render();

    this.setState({ ...this.data, isLoading: true });
    try {
      const res = await CatService.catList(keyword);
      this.setState({ ...this.data, result: res.data });
      SessionStorage.setLastResult(res.data);
    } catch (error) {}
    this.setState({ ...this.data, isLoading: false });
  }
}
