console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    console.log($target);
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.setLoading(true);
        try {
          const res = await api.fetchCats(keyword);
          this.setState(res.data);
        } catch (error) {}
        this.setLoading(false);
      },
      onRandom: async () => {
        this.setLoading(true);
        try {
          const res = await api.fetchRandomCats();
          this.setState(res.data);
        } catch (error) {}
        this.setLoading(false);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        const res = await api.fetchCat(image.id);
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
}
