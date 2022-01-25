console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    console.log($target);
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.setLoading(true);
        api
          .fetchCats(keyword)
          .then(({ data }) => this.setState(data))
          .finally(() => {
            this.setLoading(false);
          });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
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
