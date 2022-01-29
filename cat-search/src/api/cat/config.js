import { baseConfig } from "../requestConfig.js";

export const catListConfig = (keyword) => {
  return baseConfig().get(`/cats/search?q=${keyword}`);
};

export const randomCatListConfig = () => {
  return baseConfig().get(`/cats/random50`);
};

export const readConfig = (id) => {
  return baseConfig().get(`/cats/${id}`);
};
