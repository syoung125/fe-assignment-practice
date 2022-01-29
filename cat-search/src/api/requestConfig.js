export default class RequestConfig {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  setToken(token) {
    this.headers = {
      Authorization: token,
    };
  }

  get(path, config) {
    this.method = "GET";
    this.url = this.baseURL + path;

    return { ...config, ...this };
  }

  delete(path, config) {
    this.method = "DELETE";
    this.url = this.baseURL + path;

    return { ...config, ...this };
  }

  post(path, data, config) {
    this.method = "POST";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  put(path, data, config) {
    this.method = "PUT";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }

  patch(path, data, config) {
    this.method = "PATCH";
    this.url = this.baseURL + path;
    this.data = data;

    return { ...config, ...this };
  }
}

const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api";

export const baseConfig = (auth, token, req) => {
  const requestConfig = new RequestConfig(API_ENDPOINT);
  // if (token) {
  //   requestConfig.setToken(token);
  // } else if (auth) {
  //   requestConfig.setToken(getCookie("ACCESS_TOKEN", req));
  // }
  return requestConfig;
};
