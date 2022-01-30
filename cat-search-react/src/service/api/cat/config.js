import { baseConfig } from "../requestConfig.js";

export const listConfig = (keyword) => {
  return baseConfig().get(`/cats/search`, {
    params: { q: keyword },
  });
};

export const randomListConfig = () => {
  return baseConfig().get(`/cats/random50`);
};

export const readConfig = (id) => {
  return baseConfig().get(`/cats/${id}`);
};
