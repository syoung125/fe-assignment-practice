const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.status === 400) {
      throw Error("400 Bad Request");
    }
    if (res.status === 500) {
      throw Error("500 Internal Server Error ");
    }
    return res.json();
  } catch (e) {
    console.error(e);
  }
};

export const api = {
  fetchCats: async (keyword) => {
    return await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchRandomCats: async () => {
    return await request(`${API_ENDPOINT}/api/cats/random50`);
  },
  fetchCat: async (id) => {
    return await request(`${API_ENDPOINT}/api/cats/${id}`);
  },
};
