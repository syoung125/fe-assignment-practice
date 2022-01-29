import { catListConfig, randomCatListConfig, readConfig } from "./config.js";

const catList = async (keyword) => {
  const res = await axios(catListConfig(keyword));
  return res.data;
};

const randomCatLIst = async () => {
  const res = await axios(randomCatListConfig());
  return res.data;
};

const read = async (id) => {
  const res = await axios(readConfig(id));
  return res.data;
};

const CatService = {
  catList,
  randomCatLIst,
  read,
};

export default CatService;
