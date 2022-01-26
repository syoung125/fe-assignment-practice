console.log("app is running!");

class App {
  $target = null;
  data = [];

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
        this.setLoading(true);
        try {
          const res = await api.fetchRandomCats();
          this.setState(res.data);
        } catch (error) {}
        this.setLoading(false);
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

  setLoading(isLoading) {
    this.searchResult.setLoading(isLoading);
  }

  async onSearch(keyword) {
    this.setLoading(true);
    addRecentKeyword(keyword);
    this.recentKeywords.render();
    try {
      const res = await api.fetchCats(keyword);
      this.setState(res.data);
    } catch (error) {}
    this.setLoading(false);
  }
}
