console.log("app is running!");

class App {
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
          const res = await api.fetchRandomCats();
          this.setState({ ...this.data, result: res.data });
        } catch (error) {}
        this.setState({ ...this.data, isLoading: false });
      },
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onSearch: this.onSearch,
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (id) => {
        const res = await api.fetchCat(id);
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
    this.setState({ ...this.data, isLoading: true });
    addRecentKeyword(keyword);
    this.recentKeywords.render();
    try {
      const res = await api.fetchCats(keyword);
      this.setState({ ...this.data, result: res.data });
    } catch (error) {}
    this.setState({ ...this.data, isLoading: false });
  }
}
